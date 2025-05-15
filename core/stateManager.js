// core/stateManager.js
import { tokenize } from './tokenizer.js';

export function parseTokens(tokens) {
  const ast = [];
  let state = 'normal';
  let tableBuffer = [];
  let blockquoteMode = false;
  let quoteBuffer = [];
  let listStack = []; // Liste hiyerarşisini takip etmek için stack
  let currentIndent = 0;

  for (const token of tokens) {
    const isQuote = token.type === 'quote';

    if (isQuote) {
      quoteBuffer.push(token.content.replace(/^>\s*/, ''));
      blockquoteMode = true;
      continue;
    }

    if (blockquoteMode && !isQuote) {
      flushQuote();
    }

    switch (token.type) {
      case 'escaped':
        ast.push({ 
          type: 'escaped', 
          content: token.content.replace(/\\([*_`~#])/g, '$1')
        });
        break;
        
        case 'task':
        flushTable();
        ast.push({ type: 'task', checked: token.checked==true, text: token.content.replace(/^- \[.\]\s*/, '') });
        break;
        
       /* case 'task':
        flushTable();
        const taskItem = {
        type: 'task',
        text: token.content,
        checked: token.checked,
        indent: token.indent
        };*/
        
        if (listStack.length > 0 && listStack[listStack.length-1].indent < token.indent) {
        listStack[listStack.length-1].children.push(taskItem);
        } else {
        const newList = {
        type: 'unorderedList',
        children: [taskItem],
        indent: token.indent
        };
        ast.push(newList);
        listStack.push(taskItem);
        }
        break;
        
      case 'header':
        flushTable();
        ast.push({ 
          type: 'header', 
          level: token.content.match(/^#+/)[0].length, 
          text: token.content.replace(/^#+\s*/, '') 
        });
        break;

      case 'paragraph':
        flushTable();
        if (/^!\[.*\]\(.*\)$/.test(token.content)) {
          const match = token.content.match(/^!\[(.*?)\]\((.*?)\)$/);
          ast.push({ type: 'image', alt: match[1], src: match[2] });
        } else if (/^\[.*\]\(.*\)$/.test(token.content)) {
          const match = token.content.match(/^\[(.*?)\]\((.*?)\)$/);
          ast.push({ type: 'link', text: match[1], href: match[2] });
        } else {
          ast.push({ type: 'paragraph', text: token.content });
        }
        break;
      
      case 'listItem':
      case 'nestedListItem':
      case 'orderedListItem':
      case 'nestedOrderedItem': {
      flushTable();
      const isOrdered = token.type.includes('ordered');
      const listType = isOrdered ? 'orderedList' : 'unorderedList';
      
      const newItem = {
      type: 'listItem',
      text: token.content,
      indent: token.indent,
      children: []
      };
      
      while (listStack.length && listStack[listStack.length - 1].indent >= token.indent) {
      listStack.pop();
      }
      
      if (listStack.length > 0) {
      const parentItem = listStack[listStack.length - 1];
      
      if (!parentItem.sublist) {
      const sublist = {
      type: listType,
      children: []
      };
      parentItem.children.push(sublist);
      parentItem.sublist = sublist;
      }
      
      parentItem.sublist.children.push(newItem);
      } else {
      const newList = {
      type: listType,
      children: [newItem],
      indent: token.indent
      };
      ast.push(newList);
      }
      
      listStack.push(newItem);
      break;
      }

      case 'tableRow':
        tableBuffer.push(token);
        break;

      case 'codeFence':
        flushTable();
        state = state === 'code' ? 'normal' : 'code';
        ast.push({ type: 'codeFenceToggle' });
        break;

      case 'blank':
        flushTable();
        ast.push({ type: 'blank' });
        break;

      case 'horizontalRule':
        flushTable();
        ast.push({ type: 'horizontalRule' });
        break;

      case 'comment':
        flushTable();
        break;

      default:
        if (state === 'code') {
          ast.push({ type: 'codeLine', text: token.content });
        }
    }
  }

  if (blockquoteMode) flushQuote();
  flushTable();

  function flushTable() {
    if (tableBuffer.length > 0) {
      const rows = tableBuffer.map(t => t.content);
      ast.push({ type: 'table', rows });
      tableBuffer = [];
    }
  }

  function flushQuote() {
    if (quoteBuffer.length === 0) return;
    const innerTokens = tokenize(quoteBuffer.join('\n'));
    const innerAST = parseTokens(innerTokens);
    ast.push({ type: 'blockquote', children: innerAST });
    quoteBuffer = [];
    blockquoteMode = false;
  }

  return ast;
}