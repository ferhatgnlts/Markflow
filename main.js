// main.js
import { tokenize } from './core/tokenizer.js';
import { parseTokens } from './core/stateManager.js';
import { renderHTML } from './core/renderer.js';

const textarea = document.getElementById('markdown');
const output = document.getElementById('output');


/* Examample code: convert md code to html
alert(renderHTML(parseTokens(tokenize("# Hello World"))));*/


// To convert textarea code
function update() {
  const md = textarea.value;
  const tokens = tokenize(md);
  const ast = parseTokens(tokens);
  const html = renderHTML(ast);
  output.innerHTML = html; // result
}


textarea.addEventListener('input', update);
update(); // First load