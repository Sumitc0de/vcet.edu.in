import React, { useEffect, useState } from 'react';
import { pagesApi } from '../../api/pagesApi';
import type { FacilityData, FacilityPayload } from '../../types';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';

/* ── Toast Component ────────────────────────────────────────────────────────── */
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold animate-slide-up ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {message}
    </div>
  );
};

/* ── UI Components ─────────────────────────────────────────────────────────── */
const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{icon}</div>
      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#2563EB] rounded-2xl px-5 py-3/4 text-sm font-bold transition-all outline-none';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';
const filePreviewCache = new WeakMap<File, string>();

const getFilePreviewUrl = (file: File): string => {
  const cached = filePreviewCache.get(file);
  if (cached) return cached;
  const url = URL.createObjectURL(file);
  filePreviewCache.set(file, url);
  return url;
};

const resolveImage = (value: any): string | null => {
  if (!value) return null;
  if (value instanceof File) return getFilePreviewUrl(value);
  if (typeof value === 'string') return resolveUploadedAssetUrl(value) || value;
  return null;
};

const normalizeStringList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.map((item) => String(item ?? '').trim()).filter(Boolean)
    : [];

const normalizeLibraryMemberships = (value: unknown) =>
  Array.isArray(value)
    ? value
        .map((item) => {
          if (item && typeof item === 'object' && !Array.isArray(item)) {
            return {
              title: String((item as Record<string, unknown>).title ?? '').trim(),
              desc: String((item as Record<string, unknown>).desc ?? '').trim(),
              loc: String((item as Record<string, unknown>).loc ?? '').trim(),
            };
          }

          const title = String(item ?? '').trim();
          return { title, desc: '', loc: '' };
        })
        .filter((item) => item.title.length > 0)
    : [];

const normalizeLibraryDelnetFacilities = (value: unknown, legacyValue: unknown) => {
  if (Array.isArray(value) && value.length > 0) {
    return value
      .map((item) => ({
        label: String((item as Record<string, unknown>)?.label ?? '').trim(),
        value: String((item as Record<string, unknown>)?.value ?? '').trim(),
      }))
      .filter((item) => item.label.length > 0);
  }

  return normalizeStringList(legacyValue).map((label) => ({ label, value: '' }));
};

const isLibraryConvenerRole = (value: unknown): boolean => {
  const role = String(value ?? '').trim().toLowerCase();
  return role === 'convener' || role === 'convenor';
};

const normalizeLibraryFacilityPayload = (value: FacilityData | null | undefined): FacilityPayload => {
  const source = value && typeof value === 'object' ? value : ({} as FacilityData);
  const legacyRules = normalizeStringList(source.rules);
  const staffRules = normalizeStringList(source.staffRules);
  const studentRules = normalizeStringList(source.studentRules);
  const delnetFacilities = normalizeLibraryDelnetFacilities(source.delnetFacilities, source.facilitiesList);
  const memberships = normalizeLibraryMemberships(source.memberships);
  const committeeRows = Array.isArray(source.committee) ? source.committee : [];
  const convenerFromCommittee = committeeRows.find((item) => isLibraryConvenerRole((item as Record<string, unknown>)?.role));
  const convener =
    source.convener && typeof source.convener === 'object'
      ? source.convener
      : source.convenor && typeof source.convenor === 'object'
        ? source.convenor
        : convenerFromCommittee && typeof convenerFromCommittee === 'object'
          ? {
              name: String((convenerFromCommittee as Record<string, unknown>).name ?? '').trim(),
              role: 'Convener',
              sub: String((convenerFromCommittee as Record<string, unknown>).sub ?? '').trim(),
            }
        : undefined;

  return {
    ...source,
    librarySections: Array.isArray(source.librarySections) ? source.librarySections : [],
    stats: Array.isArray(source.stats) ? source.stats : [],
    eResources: Array.isArray(source.eResources) ? source.eResources : [],
    delnetFacilities,
    facilitiesList: delnetFacilities.map((item) => item.label).filter(Boolean),
    memberships,
    staffRules: staffRules.length > 0 ? staffRules : legacyRules,
    studentRules: studentRules.length > 0 ? studentRules : legacyRules,
    fines: Array.isArray(source.fines) ? source.fines : [],
    tabs: Array.isArray(source.tabs) ? source.tabs : [],
    committee: committeeRows.filter((item) => !isLibraryConvenerRole((item as Record<string, unknown>)?.role)),
    gallery: Array.isArray(source.gallery) ? source.gallery : [],
    contact: {
      phone: String(source.contact?.phone ?? '').trim(),
      email: String(source.contact?.email ?? '').trim(),
      address: String(source.contact?.address ?? '').trim(),
    },
    convener,
    convenor: convener,
  };
};

const buildFacilitiesSubmitPayload = (slug: string, value: FacilityPayload): FacilityPayload => {
  if (slug !== 'library') {
    return value;
  }

  const normalized = normalizeLibraryFacilityPayload(value as FacilityData);
  const mergedRules = Array.from(
    new Set([
      ...normalizeStringList(normalized.staffRules),
      ...normalizeStringList(normalized.studentRules),
      ...normalizeStringList((value as FacilityData).rules),
    ]),
  );
  const convenerName = String(normalized.convener?.name ?? '').trim();
  const convenerSub = String(normalized.convener?.sub ?? '').trim();
  const convenerRow = convenerName
    ? [{ name: convenerName, role: 'Convener', sub: convenerSub }]
    : [];
  const committeeRows = Array.isArray(normalized.committee) ? normalized.committee : [];
  const combinedCommittee = [...convenerRow, ...committeeRows.map((item) => ({
    name: String(item?.name ?? '').trim(),
    role: String(item?.role ?? '').trim(),
    sub: String(item?.sub ?? '').trim(),
  }))];
  const normalizedConvener = convenerName
    ? { name: convenerName, role: 'Convener', sub: convenerSub }
    : undefined;

  return {
    ...value,
    ...normalized,
    facilitiesList: (normalized.delnetFacilities ?? []).map((item) => item.label).filter(Boolean),
    rules: mergedRules,
    committee: combinedCommittee,
    convener: normalizedConvener,
    convenor: normalizedConvener,
  };
};

/* ── Reusable Managers ──────────────────────────────────────────────────────── */

// Text Input with Character Counter
const LimitedInput: React.FC<{ value: string; onChange: (v: string) => void; max: number; label: string; placeholder?: string; type?: 'text'|'textarea' }> = ({ value, onChange, max, label, placeholder, type='text' }) => (
  <div className="relative">
    <label className={labelBase}>{label}</label>
    {type === 'text' ? (
      <input value={value || ''} onChange={e => { if (e.target.value.length <= max) onChange(e.target.value) }} className={`${inputBase} p-4`} placeholder={placeholder} />
    ) : (
      <textarea value={value || ''} onChange={e => { if (e.target.value.length <= max) onChange(e.target.value) }} className={`${inputBase} p-4 min-h-[100px] resize-y`} placeholder={placeholder} />
    )}
    <div className={`absolute bottom-3 right-4 text-[10px] font-bold ${value?.length >= max ? 'text-red-500' : 'text-slate-400'}`}>
      {value?.length || 0} / {max}
    </div>
  </div>
);

// Generic Items List Manager (Allows adding/editing objects in an array with Up/Down arrows)
const DynamicListManager: React.FC<{ 
  items: any[]; 
  maxItems: number; 
  fields: { key: string; label: string; max: number; type?: 'text'|'textarea' }[]; 
  onChange: (val: any[]) => void 
}> = ({ items = [], maxItems, fields, onChange }) => {
  const add = () => { if (items.length < maxItems) { const empty: any = {}; fields.forEach(f => empty[f.key] = ''); onChange([...items, empty]); } };
  const upd = (i: number, u: any) => { const n = [...items]; n[i] = { ...n[i], ...u }; onChange(n); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, up: boolean) => {
    if (up && i > 0) { const n = [...items]; [n[i], n[i-1]] = [n[i-1], n[i]]; onChange(n); }
    if (!up && i < items.length - 1) { const n = [...items]; [n[i], n[i+1]] = [n[i+1], n[i]]; onChange(n); }
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
         <div key={idx} className="flex gap-4 p-5 bg-slate-50 border border-slate-100 rounded-3xl relative transition-all group overflow-hidden">
            <div className="flex flex-col gap-2 pt-8 pr-2 border-r border-slate-200">
              <button disabled={idx===0} onClick={() => move(idx, true)} className="text-slate-400 hover:text-blue-500 disabled:opacity-30"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"/></svg></button>
              <button disabled={idx===items.length-1} onClick={() => move(idx, false)} className="text-slate-400 hover:text-blue-500 disabled:opacity-30"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg></button>
            </div>
            <div className="grid grid-cols-1 gap-y-4 flex-grow">
               {fields.map(f => (
                  <LimitedInput key={f.key} label={f.label} max={f.max} type={f.type} value={item[f.key]} onChange={v => upd(idx, { [f.key]: v })} />
               ))}
            </div>
            <button onClick={() => del(idx)} className="self-start mt-8 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
         </div>
      ))}
      <button onClick={add} disabled={items.length >= maxItems} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 disabled:bg-slate-50 disabled:hover:border-slate-200 disabled:text-slate-300 transition-all flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        Add Item ({items.length}/{maxItems})
      </button>
    </div>
  );
};

// String Array Manager
const StringListManager: React.FC<{ items: string[]; maxItems: number; maxLength: number; onChange: (val: string[]) => void; label?: string }> = ({ items = [], maxItems, maxLength, onChange, label='Entry' }) => {
  const add = () => { if (items.length < maxItems) onChange([...items, '']); };
  const upd = (i: number, v: string) => { const n = [...items]; n[i] = v; onChange(n); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, up: boolean) => {
    if (up && i > 0) { const n = [...items]; [n[i], n[i-1]] = [n[i-1], n[i]]; onChange(n); }
    if (!up && i < items.length - 1) { const n = [...items]; [n[i], n[i+1]] = [n[i+1], n[i]]; onChange(n); }
  };

  return (
    <div className="space-y-3">
      {items.map((str, idx) => (
         <div key={idx} className="flex gap-3 items-center group">
            <div className="flex gap-1">
              <button disabled={idx===0} onClick={() => move(idx, true)} className="text-slate-300 hover:text-blue-500 disabled:opacity-30"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"/></svg></button>
              <button disabled={idx===items.length-1} onClick={() => move(idx, false)} className="text-slate-300 hover:text-blue-500 disabled:opacity-30"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg></button>
            </div>
            <div className="flex-grow">
               <LimitedInput label={`${label} ${idx+1}`} max={maxLength} value={str} onChange={v => upd(idx, v)} />
            </div>
            <button onClick={() => del(idx)} className="p-2 text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 mt-6"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
         </div>
      ))}
      <button onClick={add} disabled={items.length >= maxItems} className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest disabled:opacity-50">+ Add {label} ({items.length}/{maxItems})</button>
    </div>
  );
};

const ImageUploadInput: React.FC<{
  label: string;
  value: string | File | null | undefined;
  onChange: (value: string | File | null) => void;
}> = ({ label, value, onChange }) => {
  const preview = resolveImage(value);
  return (
    <div className="space-y-3">
      <label className={labelBase}>{label}</label>
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <input
          type="file"
          accept="image/*"
          className="text-sm font-semibold text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-blue-700"
          onChange={e => {
            const file = e.target.files?.[0] || null;
            if (file) onChange(file);
          }}
        />
        {preview ? (
          <div className="mt-4 space-y-2">
            <img src={preview} alt={label} className="h-32 w-full rounded-xl border border-slate-200 object-cover" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        ) : (
          <p className="mt-3 text-xs text-slate-500">No image selected</p>
        )}
      </div>
    </div>
  );
};

/* ── Main Form ─────────────────────────────────────────────────────────────── */
interface FacilitiesFormProps {
  slug: string;
  onBack: () => void;
}

const FacilitiesForm: React.FC<FacilitiesFormProps> = ({ slug, onBack }) => {
  const [data, setData] = useState<FacilityData | null>(null);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    pagesApi.facilities.get(slug).then(res => {
      const nextData = slug === 'library'
        ? normalizeLibraryFacilityPayload(res.data)
        : (res.data || {});
      setData(nextData as FacilityData);
      setPayload(nextData);
    }).finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await pagesApi.facilities.update(slug, buildFacilitiesSubmitPayload(slug, payload));
      setToast({ message: 'Saved successfully', type: 'success' });
    } catch {
      setToast({ message: 'Error saving data', type: 'error' });
    } finally { setSaving(false); }
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">LOADING...</div>;

  const updateProp = (key: string, val: any) => setPayload({ ...payload, [key]: val });
  const updateGeneral = (key: string, val: any) => setPayload({ ...payload, general: { ...payload.general, [key]: val }});
  
  const renderContent = () => {
    switch (slug) {
      case 'central-computing':
        return (
          <div className="space-y-8">
            <SectionCard title="Statistics" icon="📊">
              <DynamicListManager items={payload.stats} maxItems={5} onChange={v=>updateProp('stats', v)} fields={[
                { key: 'label', label: 'Stat Label', max: 15 },
                { key: 'value', label: 'Number Value', max: 6 }
              ]} />
            </SectionCard>
            <SectionCard title="Key Staff" icon="👥">
              <DynamicListManager items={payload.staff} maxItems={8} onChange={v=>updateProp('staff', v)} fields={[
                { key: 'name', label: 'Name', max: 30 },
                { key: 'role', label: 'Role/Title', max: 40 }
              ]} />
            </SectionCard>
            <SectionCard title="Computing Labs" icon="💻">
              <DynamicListManager items={payload.labs} maxItems={6} onChange={v=>updateProp('labs', v)} fields={[
                { key: 'name', label: 'Lab Name', max: 30 },
                { key: 'pcCount', label: 'PC Count', max: 5 },
                { key: 'specs', label: 'Config Specs (CPU/RAM)', max: 80 },
                { key: 'specLine', label: 'Short Subline', max: 120 }
              ]} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(payload.labs || []).map((lab: any, idx: number) => (
                  <ImageUploadInput
                    key={`lab-image-${idx}`}
                    label={`Lab ${idx + 1} Image`}
                    value={lab?.imageUrl ?? lab?.image ?? null}
                    onChange={(next) => {
                      const rows = [...(payload.labs || [])];
                      rows[idx] = { ...rows[idx], imageUrl: next, image: next };
                      updateProp('labs', rows);
                    }}
                  />
                ))}
              </div>
            </SectionCard>
          </div>
        );

      case 'counselling-cell':
        return (
          <div className="space-y-8">
            <SectionCard title="General Intro" icon="ℹ️">
               <LimitedInput label="Section Heading" max={50} value={payload.general?.title} onChange={v=>updateGeneral('title', v)} />
               <div className="mt-4"><LimitedInput label="Description" type="textarea" max={400} value={payload.general?.description} onChange={v=>updateGeneral('description', v)} /></div>
            </SectionCard>
            <SectionCard title="Counsellor Profile" icon="🧠">
              <DynamicListManager items={payload.staff} maxItems={6} onChange={v=>updateProp('staff', v)} fields={[
                { key: 'name', label: 'Name', max: 30 },
                { key: 'role', label: 'Role', max: 40 },
                { key: 'desc', label: 'Short Bio', max: 150, type: 'textarea' }
              ]} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(payload.staff || []).map((person: any, idx: number) => (
                  <ImageUploadInput
                    key={`staff-image-${idx}`}
                    label={`Staff ${idx + 1} Image`}
                    value={person?.imageUrl ?? null}
                    onChange={(next) => {
                      const rows = [...(payload.staff || [])];
                      rows[idx] = { ...rows[idx], imageUrl: next };
                      updateProp('staff', rows);
                    }}
                  />
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Mentoring Modules" icon="🤝">
              <DynamicListManager items={payload.mentors} maxItems={8} onChange={v=>updateProp('mentors', v)} fields={[
                { key: 'title', label: 'Module Title', max: 40 },
                { key: 'description', label: 'Description', max: 150, type: 'textarea' }
              ]} />
            </SectionCard>
          </div>
        );

      case 'differently-abled':
      case 'health-facilities':
        const isHealth = slug === 'health-facilities';
        return (
           <SectionCard title={isHealth ? "Health Infrastructure" : "Accessible Facilities"} icon={isHealth ? "⚕️" : "♿"}>
              <div className="p-4 mb-4 bg-orange-50 text-orange-700 text-xs font-bold rounded-xl border border-orange-200">
                 These items will be displayed in an elegant 3-column grid layout on the main site.
              </div>
              <DynamicListManager items={payload.items} maxItems={18} onChange={v=>updateProp('items', v)} fields={[
                { key: 'name', label: 'Facility Name', max: 40 },
                { key: 'description', label: 'Description', max: 150, type: 'textarea' }
              ]} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(payload.items || []).map((item: any, idx: number) => (
                  <ImageUploadInput
                    key={`item-image-${idx}`}
                    label={`Item ${idx + 1} Image`}
                    value={item?.imageUrl ?? null}
                    onChange={(next) => {
                      const rows = [...(payload.items || [])];
                      rows[idx] = { ...rows[idx], imageUrl: next };
                      updateProp('items', rows);
                    }}
                  />
                ))}
              </div>
           </SectionCard>
        );

      case 'ladies-common-room':
        return (
          <div className="space-y-8">
             <SectionCard title="Overview" icon="🌸">
               <LimitedInput label="Main Title" max={30} value={payload.general?.title} onChange={v=>updateGeneral('title', v)} />
                <div className="mt-4"><LimitedInput label="Description" type="textarea" max={120} value={payload.general?.description} onChange={v=>updateGeneral('description', v)} /></div>
                <ImageUploadInput
                  label="Overview Image"
                  value={payload.general?.imageUrl ?? null}
                  onChange={v=>updateGeneral('imageUrl', v)}
                />
             </SectionCard>
             <SectionCard title="Indoor Activities" icon="🎯">
                <DynamicListManager items={payload.activities} maxItems={6} onChange={v=>updateProp('activities', v)} fields={[
                  { key: 'name', label: 'Activity Name', max: 30 },
                  { key: 'description', label: 'Rules / Detail', max: 100 }
                ]} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(payload.activities || []).map((item: any, idx: number) => (
                    <ImageUploadInput
                      key={`activity-image-${idx}`}
                      label={`Activity ${idx + 1} Image`}
                      value={item?.imageUrl ?? null}
                      onChange={(next) => {
                        const rows = [...(payload.activities || [])];
                        rows[idx] = { ...rows[idx], imageUrl: next };
                        updateProp('activities', rows);
                      }}
                    />
                  ))}
                </div>
             </SectionCard>
          </div>
        );

      case 'library':
         return (
            <div className="space-y-8">
               <SectionCard title="Library Timing Sections" icon="🕐">
                  <div className="p-4 mb-4 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-200">
                     First two items appear in the Overview tab (Reading Room & Circulation Desk timings).
                  </div>
                  <DynamicListManager items={payload.librarySections || []} maxItems={5} onChange={v=>updateProp('librarySections', v)} fields={[
                     { key: 'heading', label: 'Heading', max: 80 },
                     { key: 'paragraph', label: 'Content Body', max: 1000, type: 'textarea' }
                  ]} />
               </SectionCard>

               <SectionCard title="Library Stats (Resources Tab)" icon="📊">
                  <div className="p-4 mb-4 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-200">
                     These stats appear as cards and in the table on the Resources tab.
                  </div>
                  <DynamicListManager items={payload.stats || []} maxItems={10} onChange={v=>updateProp('stats', v)} fields={[
                     { key: 'label', label: 'Resource Name', max: 50 },
                     { key: 'value', label: 'Numerical Value', max: 10 },
                     { key: 'vendor', label: 'Service Vendor', max: 40 }
                  ]} />
               </SectionCard>

               <SectionCard title="E-Resources (E-Resources Tab)" icon="💻">
                  <div className="p-4 mb-4 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-200">
                     Digital resource providers shown on the E-Resources tab.
                  </div>
                  <DynamicListManager items={payload.eResources || []} maxItems={10} onChange={v=>updateProp('eResources', v)} fields={[
                     { key: 'title', label: 'Provider Name', max: 60 },
                     { key: 'desc', label: 'Description', max: 150, type: 'textarea' },
                     { key: 'value', label: 'Value (e.g. "97 E-Books")', max: 30 }
                  ]} />
               </SectionCard>

               <SectionCard title="DELNET Facilities (Facilities Tab)" icon="🌐">
                  <div className="p-4 mb-4 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-200">
                     DELNET resource ecosystem items with numeric counts.
                  </div>
                  <DynamicListManager items={payload.delnetFacilities || []} maxItems={12} onChange={v=>updateProp('delnetFacilities', v)} fields={[
                     { key: 'label', label: 'Resource Label', max: 60 },
                     { key: 'value', label: 'Numeric Value', max: 15 }
                  ]} />
               </SectionCard>

               <SectionCard title="Memberships (Membership Tab)" icon="🤝">
                  <div className="p-4 mb-4 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-200">
                     Institutional membership partnerships.
                  </div>
                  <DynamicListManager items={payload.memberships || []} maxItems={10} onChange={v=>updateProp('memberships', v)} fields={[
                     { key: 'title', label: 'Institution Name', max: 60 },
                     { key: 'desc', label: 'Description', max: 150, type: 'textarea' },
                     { key: 'loc', label: 'Location', max: 30 }
                  ]} />
               </SectionCard>

               <SectionCard title="Rules & Regulations (Rules Tab)" icon="📜">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-6 border border-slate-200 rounded-3xl">
                        <h4 className="text-sm font-black mb-4 uppercase">Staff Rules</h4>
                        <StringListManager items={payload.staffRules || []} maxItems={15} maxLength={150} onChange={v=>updateProp('staffRules', v)} label="Staff Rule" />
                     </div>
                     <div className="p-6 border border-slate-200 rounded-3xl">
                        <h4 className="text-sm font-black mb-4 uppercase">Student Rules</h4>
                        <StringListManager items={payload.studentRules || []} maxItems={15} maxLength={150} onChange={v=>updateProp('studentRules', v)} label="Student Rule" />
                     </div>
                  </div>
               </SectionCard>

               <SectionCard title="Fine System (Rules Tab)" icon="💰">
                  <DynamicListManager items={payload.fines || []} maxItems={6} onChange={v=>updateProp('fines', v)} fields={[
                     { key: 'period', label: 'Delay Period', max: 30 },
                     { key: 'amount', label: 'Fine / Penalty', max: 50 }
                  ]} />
               </SectionCard>

               <SectionCard title="Convenor (Committee Tab)" icon="⭐">
                  <div className="p-4 mb-4 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-200">
                     This entry is saved as the first committee member with role set to Convener.
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <LimitedInput
                        label="Convenor Name"
                        max={50}
                        value={payload.convener?.name || payload.convenor?.name || ''}
                        onChange={v=>updateProp('convener', {
                           name: v,
                           role: 'Convener',
                           sub: payload.convener?.sub || payload.convenor?.sub || '',
                        })}
                     />
                     <LimitedInput
                        label="Role"
                        max={60}
                        value="Convener"
                        onChange={() => {}}
                     />
                     <div className="md:col-span-2">
                        <LimitedInput
                           label="Department/Details"
                           max={80}
                           value={payload.convener?.sub || payload.convenor?.sub || ''}
                           onChange={v=>updateProp('convener', {
                              name: payload.convener?.name || payload.convenor?.name || '',
                              role: 'Convener',
                              sub: v,
                           })}
                        />
                     </div>
                  </div>
               </SectionCard>

               <SectionCard title="Committee Members (Committee Tab)" icon="👥">
                  <div className="p-4 mb-4 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-200">
                     Add the remaining committee members here. The convenor above will be inserted first automatically.
                  </div>
                  <DynamicListManager items={payload.committee || []} maxItems={14} onChange={v=>updateProp('committee', v)} fields={[
                     { key: 'name', label: 'Member Name', max: 50 },
                     { key: 'role', label: 'Role', max: 60 },
                     { key: 'sub', label: 'Department/Details', max: 80 }
                  ]} />
               </SectionCard>

               <SectionCard title="Library Contact" icon="📞">
                  <div className="grid grid-cols-2 gap-4">
                     <LimitedInput label="Phone Number" max={15} value={payload.contact?.phone} onChange={v=>updateProp('contact', {...payload.contact, phone: v})} />
                     <LimitedInput label="Email" max={40} value={payload.contact?.email} onChange={v=>updateProp('contact', {...payload.contact, email: v})} />
                     <div className="col-span-2"><LimitedInput label="Address Block" type="textarea" max={250} value={payload.contact?.address} onChange={v=>updateProp('contact', {...payload.contact, address: v})} /></div>
                  </div>
               </SectionCard>

               <SectionCard title="Navigation Tabs" icon="🧭">
                  <DynamicListManager items={payload.tabs || []} maxItems={10} onChange={v=>updateProp('tabs', v)} fields={[
                     { key: 'label', label: 'Tab Label', max: 25 },
                     { key: 'content', label: 'Short Description', max: 120, type: 'textarea' }
                  ]} />
               </SectionCard>

               <SectionCard title="Library Gallery" icon="🖼️">
                  <DynamicListManager items={payload.gallery || []} maxItems={20} onChange={v=>updateProp('gallery', v)} fields={[
                     { key: 'label', label: 'Image Label', max: 120 }
                  ]} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {(payload.gallery || []).map((item: any, idx: number) => (
                        <ImageUploadInput
                           key={`library-gallery-${idx}`}
                           label={`Gallery ${idx + 1} Image`}
                           value={item?.imageUrl ?? null}
                           onChange={(next) => {
                              const rows = [...(payload.gallery || [])];
                              rows[idx] = { ...rows[idx], imageUrl: next };
                              updateProp('gallery', rows);
                           }}
                        />
                     ))}
                  </div>
               </SectionCard>
            </div>
         );

      case 'sports-gymkhana':
         return (
            <div className="space-y-8">
               <SectionCard title="Available Sports" icon="🏃">
                  <DynamicListManager items={payload.sports} maxItems={15} onChange={v=>updateProp('sports', v)} fields={[
                     { key: 'name', label: 'Sport Name', max: 25 },
                     { key: 'icon', label: 'Emoji / Icon', max: 4 }
                  ]} />
               </SectionCard>
               <SectionCard title="Top Achievements" icon="🏆">
                  <StringListManager items={payload.achievements} maxItems={10} maxLength={120} onChange={v=>updateProp('achievements', v)} label="Achievement" />
               </SectionCard>
                <SectionCard title="Tournament Results" icon="🏅">
                   <DynamicListManager items={payload.results} maxItems={5} onChange={v=>updateProp('results', v)} fields={[
                      { key: 'year', label: 'Academic Year', max: 10 },
                      { key: 'cricket', label: 'Cricket Position', max: 40 },
                      { key: 'football', label: 'Football Position', max: 40 },
                      { key: 'kabaddi', label: 'Kabaddi Position', max: 40 }
                   ]} />
                </SectionCard>
                <SectionCard title="Gymkhana Rules" icon="⚖️">
                   <StringListManager items={payload.rules} maxItems={10} maxLength={200} onChange={v=>updateProp('rules', v)} label="Rule" />
                </SectionCard>
                <SectionCard title="Sports Gallery" icon="🖼️">
                  <DynamicListManager items={payload.gallery || []} maxItems={8} onChange={v=>updateProp('gallery', v)} fields={[
                    { key: 'label', label: 'Image Label', max: 120 }
                  ]} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(payload.gallery || []).map((item: any, idx: number) => (
                      <ImageUploadInput
                        key={`sports-gallery-${idx}`}
                        label={`Gallery ${idx + 1} Image`}
                        value={item?.imageUrl ?? null}
                        onChange={(next) => {
                          const rows = [...(payload.gallery || [])];
                          rows[idx] = { ...rows[idx], imageUrl: next };
                          updateProp('gallery', rows);
                        }}
                      />
                    ))}
                  </div>
                </SectionCard>
             </div>
          );

      default:
        return <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-3xl">Module being refined...</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">{data?.name}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">FACILITIES EDITOR</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
         {renderContent()}
      </div>
    </div>
  );
};

export default FacilitiesForm;
