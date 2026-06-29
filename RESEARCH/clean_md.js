const fs = require('fs');
const path = require('path');

const files = [
  'GreenCreditAI_Research_Paper.md',
  'GreenCreditAI_Research_Paper_Part2.md',
  'GreenCreditAI_Research_Paper_Part3.md'
];

files.forEach(f => {
  const p = path.join(__dirname, f);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/\u2014/g, ' -- '); // em dash
    c = c.replace(/\u2013/g, ' -- '); // en dash
    c = c.replace(/\u201C/g, '"');    // left double quote
    c = c.replace(/\u201D/g, '"');    // right double quote
    c = c.replace(/\u2018/g, "'");    // left single quote
    c = c.replace(/\u2019/g, "'");    // right single quote
    c = c.replace(/\u20B9/g, 'Rs. '); // Rupee
    c = c.replace(/\u2705/g, 'Yes');  // Checkmark
    c = c.replace(/\u274C/g, 'No');   // Cross
    c = c.replace(/\u00B7/g, ' and '); // Middle dot
    c = c.replace(/\u00A0/g, ' ');    // NBSP
    c = c.replace(/\u2022/g, '-');    // Bullet
    fs.writeFileSync(p, c, 'utf8');
    console.log(`Cleaned ${f}`);
  }
});
