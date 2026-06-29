// Build script: Merge 3 markdown parts into a single clean HTML
// Fixes Unicode encoding issues and produces print-ready output
const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Read all 3 parts
let parts = [
  fs.readFileSync(path.join(dir, 'GreenCreditAI_Research_Paper.md'), 'utf8'),
  fs.readFileSync(path.join(dir, 'GreenCreditAI_Research_Paper_Part2.md'), 'utf8'),
  fs.readFileSync(path.join(dir, 'GreenCreditAI_Research_Paper_Part3.md'), 'utf8'),
];

let md = parts.join('\n\n');

// ---- Fix encoding / Unicode issues ----
// Replace em-dash variants
md = md.replace(/\u2014/g, '--');
md = md.replace(/\u2013/g, '--');
// Replace smart quotes
md = md.replace(/\u201C/g, '"');
md = md.replace(/\u201D/g, '"');
md = md.replace(/\u2018/g, "'");
md = md.replace(/\u2019/g, "'");
// Replace rupee sign with Rs.
md = md.replace(/\u20B9/g, 'Rs.');
// Replace checkmark and cross
md = md.replace(/\u2705/g, 'Yes');
md = md.replace(/\u274C/g, 'No');
md = md.replace(/\u2714/g, 'Yes');
// Replace bullet
md = md.replace(/\u2022/g, '-');
// Replace middot used as separator
md = md.replace(/\u00B7/g, ' and ');
// Replace non-breaking space
md = md.replace(/\u00A0/g, ' ');
// Replace any remaining problematic chars
md = md.replace(/\u00A9/g, '(c)');
// Fix double-dash to proper display
md = md.replace(/\s--\s/g, ' -- ');

// Strip the <style> block from the markdown
md = md.replace(/<style>[\s\S]*?<\/style>/g, '');

// ---- Markdown to HTML conversion ----
function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function processInline(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  text = text.replace(/`(.*?)`/g, '<code>$1</code>');
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  return text;
}

function buildTable(rows) {
  if (rows.length === 0) return '';
  let html = '<table>\n<thead>\n<tr>';
  const headers = rows[0].split('|').filter(c => c.trim() !== '');
  headers.forEach(h => { html += '<th>' + processInline(h.trim()) + '</th>'; });
  html += '</tr>\n</thead>\n<tbody>\n';
  for (let i = 1; i < rows.length; i++) {
    html += '<tr>';
    const cells = rows[i].split('|').filter(c => c.trim() !== '');
    cells.forEach(c => { html += '<td>' + processInline(c.trim()) + '</td>'; });
    html += '</tr>\n';
  }
  html += '</tbody>\n</table>';
  return html;
}

function convert(md) {
  const lines = md.split('\n');
  let result = [];
  let inTable = false;
  let tableRows = [];
  let inCode = false;
  let inList = false;
  let listType = '';

  function flushTable() {
    if (inTable && tableRows.length > 0) {
      result.push(buildTable(tableRows));
      inTable = false;
      tableRows = [];
    }
  }

  function flushList() {
    if (inList) {
      result.push(listType === 'ol' ? '</ol>' : '</ul>');
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Code blocks
    if (line.trim().startsWith('```')) {
      flushTable(); flushList();
      if (inCode) {
        result.push('</code></pre>');
        inCode = false;
      } else {
        result.push('<pre><code>');
        inCode = true;
      }
      continue;
    }
    if (inCode) { result.push(escapeHtml(line)); continue; }

    // Table rows
    if (line.trim().match(/^\|.*\|$/)) {
      flushList();
      if (!inTable) { inTable = true; tableRows = []; }
      if (line.trim().match(/^\|[\s\-:|]+\|$/)) continue; // separator
      tableRows.push(line);
      continue;
    } else { flushTable(); }

    // HTML passthrough (divs etc)
    if (line.trim().startsWith('<div') || line.trim().startsWith('</div') || line.trim() === '&nbsp;') {
      flushList();
      result.push(line);
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') { flushList(); result.push('<hr>'); continue; }

    // Headings
    const hMatch = line.match(/^(#{1,4})\s+(.*)/);
    if (hMatch) {
      flushList();
      const level = hMatch[1].length;
      result.push('<h' + level + '>' + processInline(hMatch[2]) + '</h' + level + '>');
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushList();
      result.push('<blockquote><p>' + processInline(line.slice(2)) + '</p></blockquote>');
      continue;
    }

    // Ordered list item
    const olMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      if (!inList || listType !== 'ol') { flushList(); result.push('<ol>'); inList = true; listType = 'ol'; }
      result.push('<li>' + processInline(olMatch[2]) + '</li>');
      continue;
    }

    // Unordered list item
    if (line.trim().startsWith('- ')) {
      if (!inList || listType !== 'ul') { flushList(); result.push('<ul>'); inList = true; listType = 'ul'; }
      result.push('<li>' + processInline(line.trim().slice(2)) + '</li>');
      continue;
    }

    // Empty line
    if (line.trim() === '') { flushList(); result.push(''); continue; }

    // Paragraph
    flushList();
    result.push('<p>' + processInline(line) + '</p>');
  }
  flushTable(); flushList();
  return result.join('\n');
}

const bodyHtml = convert(md);

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Green Credit AI -- Research Paper</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Libre Baskerville', 'Bookman Old Style', Georgia, serif;
    font-size: 12pt;
    line-height: 1.65;
    text-align: justify;
    color: #1a1a1a;
    max-width: 820px;
    margin: 0 auto;
    padding: 50px 44px;
    background: #fff;
  }

  h1 { font-size: 20pt; font-weight: 600; text-align: center; margin: 44px 0 20px; line-height: 1.35; color: #000; }
  h2 { font-size: 15pt; font-weight: 600; margin: 38px 0 14px; padding-bottom: 7px; border-bottom: 2px solid #000; color: #000; }
  h3 { font-size: 13pt; font-weight: 600; margin: 26px 0 10px; color: #000; }
  h4 { font-size: 12pt; font-weight: 600; margin: 18px 0 8px; color: #000; }

  p { margin: 10px 0; }

  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 10pt; line-height: 1.4; page-break-inside: avoid; }
  th, td { border: 1px solid #aaa; padding: 7px 9px; text-align: left; vertical-align: top; }
  th { background: #eee; font-weight: 600; color: #000; }
  tr:nth-child(even) td { background: #f9f9f9; }

  blockquote { border-left: 4px solid #666; padding: 10px 18px; margin: 16px 0; background: #f5f5f5; color: #000; }
  blockquote p { margin: 0; font-style: italic; }

  pre { background: #f4f4f4; border: 1px solid #ddd; border-radius: 3px; padding: 14px; overflow-x: auto; font-size: 9.5pt; line-height: 1.35; font-family: Consolas, 'Courier New', monospace; page-break-inside: avoid; }
  code { font-family: Consolas, 'Courier New', monospace; font-size: 10pt; }
  p > code, li > code { background: #f0f0f0; padding: 1px 4px; border-radius: 2px; }

  ul, ol { margin: 8px 0 8px 28px; }
  li { margin: 4px 0; }

  hr { border: none; border-top: 1px solid #ccc; margin: 30px 0; }

  a { color: #000; text-decoration: underline; }

  strong { font-weight: 600; }

  .title-page { text-align: center; min-height: 92vh; display: flex; flex-direction: column; justify-content: center; align-items: center; page-break-after: always; padding: 60px 20px; }
  .title-page h1 { font-size: 21pt; border: none; margin-bottom: 28px; color: #000; }
  .title-page p { text-align: center; margin: 5px 0; }

  /* Print / PDF styles */
  @media print {
    body { padding: 0; font-size: 11pt; max-width: none; }
    .title-page { min-height: 100vh; }
    h2 { break-after: avoid; }
    h3 { break-after: avoid; }
    table, pre, blockquote { break-inside: avoid; }
  }

  @page { margin: 2.5cm; size: A4; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

// Write with explicit UTF-8 (no BOM)
fs.writeFileSync(path.join(dir, 'GreenCreditAI_Research_Paper.html'), fullHtml, { encoding: 'utf8' });
console.log('HTML generated: GreenCreditAI_Research_Paper.html (' + (fullHtml.length / 1024).toFixed(1) + ' KB)');

// Verify no bad encoding chars remain
const badChars = fullHtml.match(/[\u0080-\u009F\u00C0-\u00FF]/g);
if (badChars) {
  console.log('Warning: Found ' + badChars.length + ' potentially problematic characters');
  const unique = [...new Set(badChars)];
  console.log('Unique chars:', unique.map(c => c + ' (U+' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4,'0') + ')').join(', '));
} else {
  console.log('Encoding check: CLEAN - no problematic characters found');
}
