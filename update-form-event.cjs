const fs = require('fs');
const file = 'C:/Users/sunanda.AMFIIND/Desktop/shubham/VCET BACKEND_and_FRONTEND/vcet.edu.in/admin/pages/mms/MMSStudentsLifeForm.tsx';
let code = fs.readFileSync(file, 'utf8');

const anchor = "{section === 'pdfs' && (";
const insertion = 
      {section === 'custom-events' && (
        <>
          {renderSectionHeader('Custom Events', 'DYNAMIC EVENTS CMS')}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
            <div className="space-y-12">
              {form.customEvents?.map((ev, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 p-6 rounded-3xl relative">
                  <button type="button" onClick={() => { const n = [...form.customEvents!]; n.splice(i, 1); setForm({...form, customEvents: n}) }} className="absolute -top-4 -right-4 w-10 h-10 bg-red-50 text-red-500 flex items-center justify-center rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-md z-10"><Trash2 className="w-5 h-5"/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700" placeholder="Event Name (e.g. IDEATHON 1.0)" value={ev.name} onChange={e => { const n = [...form.customEvents!]; n[i].name = e.target.value; n[i].slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); setForm({...form, customEvents: n}); }}/>
                    <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 cursor-not-allowed" placeholder="URL Slug (auto-generated)" value={ev.slug} readOnly />
                  </div>
                  {renderTextArea(\Description for \\, ev.description || '', 10, 500, (v) => { const n = [...form.customEvents!]; n[i].description = v; setForm({...form, customEvents: n}); })}
                  <div className="mt-6">
                    {renderGalleryEditor(\Gallery for \\, ev.images || [], 10, 45, (g) => { const n = [...form.customEvents!]; n[i].images = g; setForm({...form, customEvents: n}); })}
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <button type="button" onClick={() => setForm({...form, customEvents: [...(form.customEvents || []), { id: Date.now().toString(), name: '', slug: '', description: '', images: [] }]})} className="w-full py-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center gap-2 text-slate-400 font-bold text-xs hover:border-blue-400 hover:text-blue-500 transition-all uppercase tracking-widest"><Plus className="w-5 h-5"/> Add New Generic Event</button>
              </div>
            </div>
          </div>
        </>
      )}

      ;

code = code.replace(anchor, insertion + anchor);
fs.writeFileSync(file, code);
