const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'chapters');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tex'));

files.forEach(fname => {
  const fpath = path.join(dir, fname);
  let c = fs.readFileSync(fpath, 'utf8');
  c = c.replace(/â€"/g, '---');          // em dash
  c = c.replace(/â€™/g, "'");            // right single quote
  c = c.replace(/â€œ/g, '``');           // left double quote
  c = c.replace(/â€/g, "''");            // right double quote
  c = c.replace(/Â§/g, '\\S{}');         // section sign
  c = c.replace(/â†'/g, '$\\to$');       // right arrow
  c = c.replace(/â†"/g, '$\\leftrightarrow$');
  fs.writeFileSync(fpath, c, 'utf8');
  console.log('Fixed:', fname);
});

console.log('All done.');
