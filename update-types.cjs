const fs = require('fs');
const file = 'C:/Users/sunanda.AMFIIND/Desktop/shubham/VCET BACKEND_and_FRONTEND/vcet.edu.in/admin/types.ts';
let code = fs.readFileSync(file, 'utf8');
code = code.replace('pdfs: {', 'customEvents: { id: string; name: string; slug: string; description: string; images: GalleryItem[]; }[];\n    pdfs: {');
fs.writeFileSync(file, code);
