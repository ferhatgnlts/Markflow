// core/renderer.js
import { convertEmojis } from '../emojis.js';

export function renderHTML(ast) {
  let html = '';
  let inList = false;
  let inCode = false;

  const renderNode = (node) => {
    switch (node.type) {
      case 'task':
      html += `<li class="task-item" style="list-style-type:none;margin-left:${node.indent}px">
      <input type="checkbox" ${node.checked ? 'checked' : ''} disabled>
      <span>${renderInline(node.text)}</span>
      </li>\n`;
      break;
      
      case 'unorderedList':
      case 'orderedList': {
      const tag = node.type === 'unorderedList' ? 'ul' : 'ol';
      html += `<${tag}>\n`;
      node.children.forEach(child => {
      html += `<li>${renderInline(child.text)}`;
      if (child.children?.length > 0) {
      html += `\n${renderHTML(child.children)}`;
      }
      html += `</li>\n`;
      });
      html += `</${tag}>\n`;
      break;
      }
      
      /*case 'task':
      html += `<li class="task-item">
      <input type="checkbox" ${node.checked ? 'checked' : ''} disabled>
      <span>${renderInline(node.text)}</span>
      </li>`;
      break;*/

      case 'listItem':
        html += `<li>${renderInline(node.text)}`;
        if (node.children && node.children.length > 0) {
          node.children.forEach(child => renderNode(child));
        }
        html += '</li>\n';
        break;

      case 'escaped':
        html += escapeHTML(node.content);
        break;

      case 'header':
        html += `<h${node.level}>${renderInline(node.text)}</h${node.level}>\n`;
        break;

      case 'paragraph':
      if(!inCode){
        html += `<p>${renderInline(node.text)}</p>\n`;
        }else{
          html += `${renderInline(node.text)}\n`;
        }
        break;

      case 'image':
        html += `<img src="${escapeHTML(node.src)}" alt="${escapeHTML(node.alt)}" />\n`;
        break;

      case 'link':
        html += `<a href="${escapeHTML(node.href)}">${renderInline(node.text)}</a>\n`;
        break;

      case 'task':
        html += `<li><input type="checkbox" ${node.checked ? 'checked' : ''} disabled> ${renderInline(node.text)}</li>\n`;
        break;

      case 'blockquote':
        html += '<blockquote>\n' + renderHTML(node.children) + '</blockquote>\n';
        break;

      case 'table':
        const [headerRow, , ...bodyRows] = node.rows;
        const headerCells = headerRow.split('|').slice(1, -1).map(c => `<th>${renderInline(c.trim())}</th>`).join('');
        html += '<table border="1">\n<thead><tr>' + headerCells + '</tr></thead>\n<tbody>\n';
        for (const row of bodyRows) {
          const cells = row.split('|').slice(1, -1).map(c => `<td>${renderInline(c.trim())}</td>`).join('');
          html += `<tr>${cells}</tr>\n`;
        }
        html += '</tbody></table>\n';
        break;

      case 'codeFenceToggle':
        html += inCode ? '</code></pre>\n' : '<pre><code>';
        inCode = !inCode;
        break;

      case 'codeLine':
        html += `${escapeHTML(node.text)}\n`;
        break;

      case 'horizontalRule':
        html += '<hr />\n';
        break;

      case 'blank':
        break;
    }
  };

  ast.forEach(node => renderNode(node));
  if (inCode) html += '</code></pre>\n'; // Açık kalan kod bloklarını kapat

  return html;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderInline(text) {
  text = convertEmojis(text);
  return escapeHTML(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/`(.*?)`/g, '<code class="mincode">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}