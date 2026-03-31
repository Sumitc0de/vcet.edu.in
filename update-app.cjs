const fs = require('fs');
const file = 'C:/Users/sunanda.AMFIIND/Desktop/shubham/VCET BACKEND_and_FRONTEND/vcet.edu.in/App.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('MMSStudentsLifeCustomEvent')) {
  code = code.replace(
    "const MMSStudentsLifeIdeathon = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeIdeathon'));",
    "const MMSStudentsLifeIdeathon = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeIdeathon'));\nconst MMSStudentsLifeCustomEvent = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeCustomEvent'));"
  );
  
  code = code.replace(
    '<Route path="/mms/students-life/ideathon" element={<MMSStudentsLifeIdeathon />} />',
    '<Route path="/mms/students-life/ideathon" element={<MMSStudentsLifeIdeathon />} />\n          <Route path="/mms/students-life/event/:slug" element={<MMSStudentsLifeCustomEvent />} />'
  );
  
  fs.writeFileSync(file, code);
}
