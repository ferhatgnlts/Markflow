// core/tokenizer.js
export function tokenize(input) {
  const lines = input.split('\n');
  
  return lines.map((line, index) => {
  const indent = line.match(/^\s*/)[0].length;
  const trimmed = line.trim();
  let type = detectType(line);
  
  if (trimmed.match(/^-\s\[[ xX]\]\s.+/)) {
  return {
  type: 'task',
  checked: trimmed[3].toLowerCase() === 'x', // [x] ise true
  content: trimmed.slice(5).trim()
  };
  return;
  }
  
  if (/^\s*[-*+] /.test(line)) {
  type = indent >= 2 ? 'nestedListItem' : 'listItem';
  return {
  type,
  indent,
  content: trimmed.slice(2).trim(),
  line: index + 1
  };
  }
  if (/^\s*\d+\. /.test(line)) {
  type = indent >= 2 ? 'nestedOrderedItem' : 'orderedListItem';
  return {
  type,
  indent,
  content: trimmed.replace(/^\d+\.\s*/, '').trim(),
  line: index + 1
  };
  }
  
  return {
  type,
  indent,
  content: trimmed,
  line: index + 1
  };
  });
    
    const indent = line.match(/^\s*/)[0].length;
    const content = line.trim();
    
    if (content.startsWith('- ') || content.startsWith('* ') || content.startsWith('+ ')) {
    return {
    type: indent >= 2 ? 'nestedListItem' : 'listItem',
    indent,
    content: content.slice(2).trim() // "- " kısmını kaldır
    };
    }
    if (content.match(/^\d+\. /)) {
    return {
    type: indent >= 2 ? 'nestedOrderedItem' : 'orderedListItem',
    indent,
    content: content.replace(/^\d+\.\s*/, '').trim()
    };
    }
    
    if (token.type === 'nestedListItem' || token.type === 'nestedOrderedItem') {
      token.indent = line.match(/^\s*/)[0].length;
    }
    
    return token;
  }

function detectType(line) {
  const trimmed = line.trim();
  
  if (trimmed.match(/^-\s\[([ xX]?)\]\s.+/)) {
  return {
  type: 'task',
  checked: trimmed[3].toLowerCase() === 'x', // [x] ise true
  content: trimmed.slice(5).trim(),
  indent: line.match(/^\s*/)[0].length
  };
  }
  
  if (line.includes('\\')) return 'escaped';
  if (trimmed.startsWith('#')) return 'header';
  if (trimmed.startsWith('```')) return 'codeFence';
  if (line.startsWith('- [ ]') || line.startsWith('- [x]')) return 'task';
  if (trimmed.startsWith('- [ ]') || trimmed.startsWith('- [x]')) return 'task';
  if (trimmed.startsWith('>')) return 'quote';
  if (trimmed.startsWith('|')) return 'tableRow';
  if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) return 'horizontalRule';
  if (trimmed === '') return 'blank';

  if (/^\s*[-*+] /.test(line)) {
    return line.match(/^\s*/)[0].length >= 2 ? 'nestedListItem' : 'listItem';
  }
  if (/^\s*\d+\. /.test(line)) {
    return line.match(/^\s*/)[0].length >= 2 ? 'nestedOrderedItem' : 'orderedListItem';
  }

  return 'paragraph';
}