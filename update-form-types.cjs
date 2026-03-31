const fs = require('fs');
const file = 'C:/Users/sunanda.AMFIIND/Desktop/shubham/VCET BACKEND_and_FRONTEND/vcet.edu.in/admin/pages/mms/MMSStudentsLifeForm.tsx';
let code = fs.readFileSync(file, 'utf8');
code = code.replace('pdfs: []', 'customEvents: [],\n  pdfs: []');
fs.writeFileSync(file, code);
