import React, { useEffect, useRef, useState } from 'react';
import { admissionsApi } from '../../api/admissions';
import type { AdmissionItem, AdmissionItemPayload, AdmissionSection, AdmissionSectionPayload } from '../../types';
import { GripVertical } from 'lucide-react';

type SectionKey = 'intake' | 'fees' | 'documents' | 'cutoffs' | 'brochure' | 'scholarships';

interface AdmissionFormProps {
  activeSection?: string;
  onBack?: () => void;
}

interface SectionConfig {
  slug: string;
  label: string;
  sectionType: 'course_list' | 'document_list';
  helperText: string;
}

interface EditableItem {
  client_id: string;
  id?: number;
  item_type: 'course' | 'document';
  title: string;
  description: string;
  category: string;
  academic_year: string;
  badge: string;
  tag: string;
  group_key: string;
  group_label: string;
  intake: string;
  external_url: string;
  existingExternalUrl: string;
  currentDocumentUrl: string;
  currentDocumentName: string;
  pdfFile: File | null;
  is_active: boolean;
  sort_order: number;
}

interface SectionFormState {
  slug: string;
  navigation_title: string;
  title: string;
  summary: string;
  description: string;
  section_type: 'course_list' | 'document_list';
  has_dropdown: boolean;
  dropdown_key: string;
  sort_order: string;
  is_active: boolean;
  content: Record<string, unknown>;
}

const SECTION_CONFIGS: Record<SectionKey, SectionConfig> = {
  intake: {
    slug: 'courses-intake',
    label: 'Courses & Intake',
    sectionType: 'course_list',
    helperText: 'Manage the academic programs and seat intake shown on the admission course page.',
  },
  fees: {
    slug: 'fees-structure',
    label: 'Fees Structure',
    sectionType: 'document_list',
    helperText: 'Manage the fee-structure records and the supporting copy shown on the fees page.',
  },
  documents: {
    slug: 'documents-required',
    label: 'Documents Required',
    sectionType: 'document_list',
    helperText: 'Manage the downloadable checklists required during admission.',
  },
  cutoffs: {
    slug: 'cut-off',
    label: 'Cut Off Details',
    sectionType: 'document_list',
    helperText: 'Manage CAP cut-off documents, years, and badges shown on the archive page.',
  },
  brochure: {
    slug: 'brochure',
    label: 'Brochure',
    sectionType: 'document_list',
    helperText: 'Manage the brochure page copy and the brochure document itself.',
  },
  scholarships: {
    slug: 'scholarships',
    label: 'Scholarships',
    sectionType: 'document_list',
    helperText: 'Manage scholarship information including government and institutional scholarship schemes.',
  },
};

const COURSE_GROUPS = [
  { key: 'UG', label: 'Under Graduate Program' },
  { key: 'PG', label: 'Post Graduate Program' },
  { key: 'Management', label: 'Management Program' },
];



const inputBase = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/10';
const labelBase = 'mb-2 block text-[11px] font-black uppercase tracking-[0.22em] text-slate-400';
const dragCardBase = 'transition-transform duration-150 ease-out';
const AUTO_SCROLL_EDGE_PX = 120;
const AUTO_SCROLL_MAX_SPEED = 22;

interface DragState {
  itemId: string;
  listId: string;
  currentClientY: number;
  grabOffsetY: number;
}

let editableItemCounter = 0;

function createEditableItemId(): string {
  editableItemCounter += 1;
  return `admission-item-${editableItemCounter}`;
}

const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, 3500);
    return () => window.clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-4 text-sm font-bold text-white shadow-2xl ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
      {message}
    </div>
  );
};

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-lg shadow-slate-200/40">
    <div className="border-b border-slate-100 px-8 py-5">
      <h2 className="text-sm font-extrabold uppercase tracking-[0.22em] text-slate-700">{title}</h2>
    </div>
    <div className="space-y-6 p-8">{children}</div>
  </div>
);

const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#2563EB] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

/* ── Document List Manager ─────────────────────────────────────────────────── */
interface DocItem extends AdmissionDocument {
  file?: File | null;
}

const DocumentListManager: React.FC<{
  items: DocItem[];
  onChange: (items: DocItem[]) => void;
  type: 'fees' | 'documents' | 'cutoffs' | 'scholarships';
}> = ({ items, onChange, type }) => {
  const addItem = () => {
    onChange([...(items || []), { title: '', description: '', year: '2024-25', category: 'UG - FIRST YEAR', fileUrl: null, fileName: null }]);
  };

  const removeItem = (index: number) => {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const toggleItemCollapse = (clientId: string) => {
    setCollapsedItems((current) => {
      const next = new Set(current);
      if (next.has(clientId)) {
        next.delete(clientId);
      } else {
        next.add(clientId);
      }
      return next;
    });
  };

  const getListIndices = (listId: string, sourceItems: EditableItem[]) => {
    if (sectionKey === 'intake') {
      return sourceItems.reduce<number[]>((indices, item, index) => {
        if (item.category === listId) {
          indices.push(index);
        }

        return indices;
      }, []);
    }

    return sourceItems.map((_, index) => index);
  };

  const reorderWithinList = (sourceItems: EditableItem[], listId: string, itemId: string, insertPosition: number) => {
    const listIndices = getListIndices(listId, sourceItems);
    const fromPosition = listIndices.findIndex((index) => sourceItems[index]?.client_id === itemId);

    if (fromPosition === -1) {
      return sourceItems;
    }

    const clampedPosition = Math.max(0, Math.min(insertPosition, listIndices.length - 1));
    if (fromPosition === clampedPosition) {
      return sourceItems;
    }

    const subset = listIndices.map((index) => sourceItems[index]);
    const [movedItem] = subset.splice(fromPosition, 1);
    subset.splice(clampedPosition, 0, movedItem);

    return sourceItems.map((item, index) => {
      const listPosition = listIndices.indexOf(index);
      return listPosition === -1 ? item : subset[listPosition];
    });
  };

  return (
    <div className="space-y-4">
      {Array.isArray(items) && items.map((item, idx) => (
        <div key={idx} className="relative group flex items-start gap-6 bg-slate-50 border border-slate-200 rounded-[2rem] p-6 transition-all hover:shadow-md hover:border-slate-300">
          <div className="flex-shrink-0 w-12 h-12 border-2 border-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-black text-lg bg-white">
            {(idx + 1).toString().padStart(2, '0')}
          </div>
          
          <div className="flex-grow space-y-4">
            <button 
              type="button" 
              onClick={() => removeItem(idx)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={type === 'scholarships' ? "md:col-span-2" : "md:col-span-1"}>
                <label className={labelBase}>
                  {type === 'scholarships' ? 'Scholarship Name' : 'Document Title'}
                </label>
                <input 
                  value={item.title} 
                  onChange={e => updateItem(idx, { title: e.target.value })}
                  className={inputBase}
                  placeholder={type === 'scholarships' ? "e.g. Post Matric Scholarship for OBC" : "e.g. F.E. (First Year Engineering) 2024-25"}
                />
              </div>
              {type !== 'scholarships' && (
              <div className="md:col-span-1 text-right">
                 <label className={labelBase}>{type === 'documents' ? 'Category' : 'Academic Year'}</label>
                 {type === 'documents' ? (
                   <select 
                      value={item.category} 
                      onChange={e => updateItem(idx, { category: e.target.value })}
                      className={inputBase}
                   >
                      <option value="UG - FIRST YEAR">UG - FIRST YEAR</option>
                      <option value="UG - DIRECT SE">UG - DIRECT SE</option>
                      <option value="PG - M.E.">PG - M.E.</option>
                      <option value="MANAGEMENT - MMS">MANAGEMENT - MMS</option>
                   </select>
                 ) : (
                   <select 
                      value={item.year} 
                      onChange={e => updateItem(idx, { year: e.target.value })}
                      className={inputBase}
                   >
                      <option value="2025-26">2025-26</option>
                      <option value="2024-25">2024-25</option>
                      <option value="2023-24">2023-24</option>
                   </select>
                 )}
              </div>
              )}
              {type !== 'scholarships' && (
              <div className="md:col-span-2">
                <label className={labelBase}>{type === 'cutoffs' ? 'Subtitle (e.g. Engineering Department)' : 'Short Description'}</label>
                <input 
                  value={item.description} 
                  onChange={e => updateItem(idx, { description: e.target.value })}
                  className={inputBase}
                  placeholder={type === 'cutoffs' ? "e.g. Engineering Department" : "Briefly explain what this document is for..."}
                />
              </div>
              )}
              <div className="md:col-span-2">
                <label className={labelBase}>PDF Document</label>
                <div className="relative overflow-hidden bg-white border-2 border-dashed border-slate-200 rounded-2xl p-4 transition-all hover:border-[#2563EB]">
                  <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={e => updateItem(idx, { file: e.target.files?.[0] || null })}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" /></svg>
                    </div>
                    <span className="text-xs font-bold text-slate-600 truncate">
                      {item.file?.name || item.fileName || 'Click or drag to upload PDF'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      );
    }

    if (sectionKey === 'documents') {
      return (
        <SectionCard title="Page Copy">
          <div>
            <label className={labelBase}>Heading</label>
            <input className={inputBase} value={getContentValue(form.content, 'heading', 'Required Documentation')} onChange={(event) => updateContentField('heading', event.target.value)} />
          </div>
        </SectionCard>
      );
    }

    return null;
  };

  const renderCourseItems = () => (
    <SectionCard title="Courses">
      <div className="space-y-8">
        {COURSE_GROUPS.map((group) => {
          const groupItems = items
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => item.category === group.key);

          return (
            <div key={group.key} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-800">{group.label}</h3>
                <button type="button" onClick={() => addCourseItem(group.key)} className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-slate-800">
                  Add Course
                </button>
              </div>

              {groupItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-8 text-center text-sm font-semibold text-slate-400">
                  No courses added yet for this group.
                </div>
              ) : (
                groupItems.map(({ item, index }) => {
                  const isCollapsed = collapsedItems.has(item.client_id);
                  
                  return (
                  <div
                    key={item.client_id}
                    ref={registerItemRef(item.client_id)}
                    className="relative"
                  >
                    <div
                      style={getDragCardStyle(item.client_id)}
                      className={`rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 ${dragCardBase} ${
                        dragState?.itemId === item.client_id ? 'ring-2 ring-[#2563EB]/25 transition-none' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4 mb-5">
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                                Course Item
                              </p>
                              {item.title && (
                                <p className="mt-1 text-sm font-semibold text-slate-700">{item.title}</p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleItemCollapse(item.client_id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                              aria-label={isCollapsed ? 'Expand item' : 'Collapse item'}
                            >
                              <svg
                                className={`h-5 w-5 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {renderDragHandle(item.client_id, group.key, `Drag to reorder ${item.title || 'course item'}`)}
                      </div>
                      
                      {!isCollapsed && (
                        <div className="grid gap-4 md:grid-cols-[1fr_180px_auto]">
                          <div>
                            <label className={labelBase}>Course Name</label>
                            <input className={inputBase} value={item.title} onChange={(event) => updateItem(index, { title: event.target.value })} placeholder="e.g. Computer Engineering" />
                          </div>
                          <div>
                            <label className={labelBase}>Intake</label>
                            <input className={inputBase} type="number" min="1" value={item.intake} onChange={(event) => updateItem(index, { intake: event.target.value })} placeholder="60" />
                          </div>
                          <div className="flex items-end justify-end">
                            <button type="button" onClick={() => removeItem(index)} className="rounded-xl border border-red-200 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-red-600 transition hover:bg-red-50">
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
                })
              )}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );

  const renderDocumentItems = () => {
    const showAcademicYear = sectionKey === 'fees' || sectionKey === 'cutoffs';
    const showTag = sectionKey === 'documents';
    const showBadge = sectionKey === 'cutoffs';

    return (
      <SectionCard title={sectionKey === 'brochure' ? 'Brochure File' : 'Documents'}>
        <div className="space-y-5">
          {(sectionKey !== 'brochure' || items.length === 0) && (
            <div className="flex justify-end">
              <button type="button" onClick={addDocumentItem} className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-slate-800">
                {sectionKey === 'brochure' ? 'Add Brochure' : 'Add Document'}
              </button>
            </div>
          )}

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-8 text-center text-sm font-semibold text-slate-400">
              {sectionKey === 'brochure' ? 'No brochure file has been added yet.' : 'No documents added yet.'}
            </div>
          ) : (
            items.map((item, index) => {
              const isCollapsed = collapsedItems.has(item.client_id);
              
              return (
              <div
                key={item.client_id}
                ref={registerItemRef(item.client_id)}
                className="relative"
              >
                <div
                  style={getDragCardStyle(item.client_id)}
                  className={`space-y-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 ${dragCardBase} ${
                    dragState?.itemId === item.client_id ? 'ring-2 ring-[#2563EB]/25 transition-none' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                            {sectionKey === 'brochure' ? 'Brochure Asset' : `Item ${index + 1}`}
                          </p>
                          {item.title && (
                            <p className="mt-1 text-sm font-semibold text-slate-700">{item.title}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleItemCollapse(item.client_id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                          aria-label={isCollapsed ? 'Expand item' : 'Collapse item'}
                        >
                          <svg
                            className={`h-5 w-5 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      {!isCollapsed && (
                        <p className="mt-2 text-sm font-semibold text-slate-600">
                          Drag to change how this appears on the website.
                        </p>
                      )}
                    </div>
                    {renderDragHandle(item.client_id, 'documents', `Drag to reorder ${item.title || 'document item'}`)}
                  </div>
                  
                  {!isCollapsed && (
                    <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelBase}>Title</label>
                      <input className={inputBase} value={item.title} onChange={(event) => updateItem(index, { title: event.target.value })} />
                    </div>
                    <div>
                      <label className={labelBase}>Category</label>
                      <input className={inputBase} value={item.category} onChange={(event) => updateItem(index, { category: event.target.value })} placeholder="e.g. Engineering" />
                    </div>

                    {showAcademicYear && (
                      <div>
                        <label className={labelBase}>Academic Year</label>
                        <input className={inputBase} value={item.academic_year} onChange={(event) => updateItem(index, { academic_year: event.target.value })} placeholder="2025-26" />
                      </div>
                    )}

                    {showTag && (
                      <div>
                        <label className={labelBase}>Tag</label>
                        <input className={inputBase} value={item.tag} onChange={(event) => updateItem(index, { tag: event.target.value })} placeholder="UG - First Year" />
                      </div>
                    )}

                    {showBadge && (
                      <div>
                        <label className={labelBase}>Badge</label>
                        <input className={inputBase} value={item.badge} onChange={(event) => updateItem(index, { badge: event.target.value })} placeholder="New" />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className={labelBase}>Description</label>
                      <textarea className={`${inputBase} min-h-[110px] resize-y`} value={item.description} onChange={(event) => updateItem(index, { description: event.target.value })} />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelBase}>Document URL</label>
                      <input className={inputBase} value={item.external_url} onChange={(event) => updateItem(index, { external_url: event.target.value })} placeholder="https://..." />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelBase}>Upload PDF</label>
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4">
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(event) => updateItem(index, { pdfFile: event.target.files?.[0] ?? null })}
                          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-white hover:file:bg-slate-800"
                        />
                        <p className="mt-3 text-xs font-semibold text-slate-400">
                          {item.pdfFile?.name || item.currentDocumentName || item.currentDocumentUrl || 'No document selected yet.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {sectionKey !== 'brochure' && (
                    <div className="flex justify-end">
                      <button type="button" onClick={() => removeItem(index)} className="rounded-xl border border-red-200 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-red-600 transition hover:bg-red-50">
                        Remove
                      </button>
                    </div>
                  )}
                  </>
                  )}
                </div>
              </div>
            );
            })
          )}
        </div>
      </SectionCard>
    );
  };

  if (loading || !form) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-100 border-t-[#2563EB]" />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Loading Admission Section...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          {onBack && (
            <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">
              {activeSection ? `Edit ${activeSection === 'intake' ? 'Intake' : 
                                      activeSection === 'fees' ? 'Fees' : 
                                      activeSection === 'documents' ? 'Documents' : 
                                      activeSection === 'cutoffs' ? 'Cutoffs' : 
                                      activeSection === 'brochure' ? 'Brochure' : 
                                      activeSection === 'scholarships' ? 'Scholarships' : 'Section'}` : 'Admission Module'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {activeSection ? `Manage your admission ${activeSection} details here.` : 'Manage intake, fees, and academic brochures.'}
            </p>
          </div>
        </div>
        <div className="text-right text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
          <div>Slug: {config.slug}</div>
          <div className="mt-1">Records: {items.length}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {renderSectionMeta()}
        {renderSectionContent()}
        {sectionKey === 'intake' ? renderCourseItems() : renderDocumentItems()}

        <div className="flex flex-col items-center justify-between gap-4 rounded-[2rem] border border-slate-100 bg-white px-8 py-6 shadow-lg shadow-slate-200/40 sm:flex-row">
          <p className="text-sm text-slate-500">
            Saving updates the section record first, then syncs the individual admission items against the Laravel API.
          </p>
          <button type="submit" disabled={saving} className="inline-flex min-w-[180px] items-center justify-center rounded-2xl bg-[#2563EB] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
