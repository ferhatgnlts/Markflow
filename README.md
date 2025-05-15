# Markflow ⚡

A lightning-fast Markdown parser and player with real-time preview. Converts Markdown to clean HTML with support for advanced features like nested lists, tables, emojis and more.

![Demo Screenshot](https://via.placeholder.com/800x400?text=MarkFlow+Demo) 
*(Replace with actual screenshot)*

## ✅ Implemented Features
- [x] **Headings** (H1-H6 with proper nesting)
- [x] **Text formatting** (bold, italic, strikethrough, inline code)
- [x] **Lists** 
  - [x] Nested unordered lists
  - [x] Ordered lists with correct numbering
- [x] **Task lists** (with checkbox states)
- [x] **Tables** (with alignment support)
- [x] **Code blocks**
- [x] **Blockquotes** (single and nested)
- [x] **Horizontal rules** (`---`, `***`, `___`)
- [x] **Emoji support** (`:smile:` → 😊)
- [x] **Image embedding**
- [x] **Syntax escaping** (`\*not bold\*`)

## 🚧 Planned Features
- [ ] **Video embedding**
- [ ] **Automatic link detection**
- [ ] **LaTeX math support** (`$$E=mc^2$$`)
- [ ] **Mermaid.js integration** for diagrams
- [ ] **Dark/Light theme** toggle
- [ ] **Export options** (PDF, HTML, DOCX)
- [ ] **Word count** and reading time
- [ ] **Syntax highlighting for code blocks** (e.g., JavaScript, Python, HTML)


## 🚀 Quick Start
```javascript
// You can use it in main.js file to get only the results.
alert(renderHTML(parseTokens(tokenize("# Hello World"))));
```


> The code structure might be a bit messy since I had to finish the project quickly. I apologize for that and will try to improve it in future versions. I’ve tried to organize the code in a way that’s as understandable as possible. You’re welcome to support the continued development of the project.


## 📜 License
MIT © 2025 [Ferhat Gönültaş]
