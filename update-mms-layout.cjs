const fs = require('fs');
const file = 'C:/Users/sunanda.AMFIIND/Desktop/shubham/VCET BACKEND_and_FRONTEND/vcet.edu.in/components/mms/MMSLayout.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('customEventsMenu.length')) {
  // Add API import if missing
  if (!code.includes("import { get } from")) {
     code = code.replace("import { Link, useLocation } from 'react-router-dom';", "import { Link, useLocation } from 'react-router-dom';\nimport { get } from '../../services/api';");
  }

  // Find export default function MMSLayout
  const funcStart = "export default function MMSLayout({ title, children }: MMSLayoutProps) {";
  const funcInsert = `
  const [customEventsMenu, setCustomEventsMenu] = useState<{label: string, href: string}[]>([]);
  useEffect(() => {
    if (pathname.startsWith('/mms/students-life')) {
      get('/pages/mms-students-life').then(res => {
        const evs = (res.data)?.customEvents || [];
        setCustomEventsMenu(evs.map((e) => ({ label: e.name, href: \`/mms/students-life/event/\${e.slug}\` })));
      }).catch(e => console.warn(e));
    }
  }, [pathname]);

  const baseActiveMenu = sectionMenus.find((menu) => menu.match(pathname));
  const activeMenu = React.useMemo(() => {
    if (!baseActiveMenu) return null;
    if (baseActiveMenu.title === "Student's Life" && customEventsMenu.length > 0) {
      // prevent duplicates
      const newItems = customEventsMenu.filter(cItem => !baseActiveMenu.items.some(i => i.href === cItem.href));
      return { ...baseActiveMenu, items: [...baseActiveMenu.items, ...newItems] };
    }
    return baseActiveMenu;
  }, [baseActiveMenu, customEventsMenu]);
`;

  code = code.replace(funcStart, funcStart + "\n" + funcInsert);
  
  // Now replace all existing activeMenu derivations with our computed one
  code = code.replace(/const activeMenu = sectionMenus\.find[^\n]+;/g, '');
  
  fs.writeFileSync(file, code);
}
