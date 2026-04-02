import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Video, Trash2, Plus, CheckCircle, AlertTriangle } from 'lucide-react';
import { resolveApiUrl } from '../../api/client';
import type { MMSHomePayload } from '../../types';
import { mmsHomeApi } from '../../api/mmsHomeApi';

const emptyForm: MMSHomePayload = {
  sliders: Array(3).fill({ title: '', subtitle: '', image: null }),
  admission: { heading: '', description: '', banner: null },
  notices: Array(3).fill({ title: '', label: '', text: '' }),
  notifications: Array(3).fill({ title: '', text: '' }),
  internships: Array(3).fill({ title: '', altText: '', logo: null }),
  events: Array(3).fill({ title: '', eventTitle: '', altText: '', image: null }),
  testimonials: Array(3).fill({ sectionTitle: '', name: '', role: '', quote: '' }),
  videos: Array(3).fill({ sectionTitle: '', videoTitle: '', posterAlt: '', videoFile: null, videoUrl: '', poster: null }),
  documents: Array(2).fill({ label: '', url: '', pdfFile: null })
};

const MMSHomepageForm: React.FC = () => {
  const [form, setForm] = useState<MMSHomePayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsHomeApi.get();
      if (res.data) {
        const fetchedData = { ...res.data };
        ['sliders', 'notices', 'notifications', 'internships', 'events', 'testimonials', 'videos', 'documents'].forEach(key => {
           if (fetchedData[key] !== null && typeof fetchedData[key] === 'object' && !Array.isArray(fetchedData[key])) {
              fetchedData[key] = Object.values(fetchedData[key]);
           }
        });
        setForm({ ...emptyForm, ...fetchedData });
      }
    } catch (e) {
      console.warn('Could not fetch old data, assuming empty CMS state', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccessMsg('');
    try {
      await mmsHomeApi.update(form);
      setSuccessMsg('MMS Homepage updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update homepage');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: keyof MMSHomePayload, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key: keyof MMSHomePayload, index: number, field: string, value: any) => {
    setForm(prev => {
      const list = [...(prev[key] as any[])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [key]: list };
    });
  };

  const addArrayItem = (key: keyof MMSHomePayload, defaultItem: any) => {
    setForm(prev => ({
      ...prev,
      [key]: [...(prev[key] as any[]), defaultItem]
    }));
  };

  const removeArrayItem = (key: keyof MMSHomePayload, index: number) => {
    setForm(prev => ({
      ...prev,
      [key]: (prev[key] as any[]).filter((_, i) => i !== index)
    }));
  };

  if (loading) return <div className="p-8 text-slate-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Edit MMS Homepage</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {successMsg}
        </div>
      )}

      <div className="space-y-8">
        {/* Admission Highlight */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Admission Highlight</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Heading (Max 60)</label>
              <input id="mmshomepageform-1" name="mmshomepageform-1" aria-label="mmshomepageform field" maxLength={60} value={form.admission.heading || ''} onChange={e => updateField('admission', { ...form.admission, heading: e.target.value })} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (Max 220)</label>
              <textarea id="mmshomepageform-textarea-1" name="mmshomepageform-textarea-1" aria-label="mmshomepageform textarea field" maxLength={220} value={form.admission.description || ''} onChange={e => updateField('admission', { ...form.admission, description: e.target.value })} className="w-full p-2 border rounded-lg" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Banner Image</label>
        <input id="mmshomepageform-2" name="mmshomepageform-2" aria-label="mmshomepageform field" type="file" accept="image/*" onChange={e => updateField('admission', { ...form.admission, banner: e.target.files?.[0] || null })} className="w-full p-2 border rounded-lg" />
        <FilePreview file={form.admission.banner} type="image" onRemove={() => updateField('admission', { ...form.admission, banner: null })} />

            </div>
          </div>
        </section>

        {/* Notice Board */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Notice Board</h2>
            <button type="button" onClick={() => addArrayItem('notices', { title: '', label: '', text: '' })} className="flex items-center gap-1 text-sm bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-lg hover:bg-brand-blue/20 font-medium">
              <Plus className="w-4 h-4" /> Add Notice
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
            {form.notices.map((item, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-4 relative">
                <button type="button" onClick={() => removeArrayItem('notices', i)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove notice">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-4 pr-10">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title (Max 35)</label>
                    <input id="mmshomepageform-3" name="mmshomepageform-3" aria-label="mmshomepageform field" maxLength={35} value={item.title || ''} onChange={e => handleArrayChange('notices', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg focus:border-brand-blue/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Label (Max 20)</label>
                    <input id="mmshomepageform-4" name="mmshomepageform-4" aria-label="mmshomepageform field" maxLength={20} value={item.label || ''} onChange={e => handleArrayChange('notices', i, 'label', e.target.value)} className="w-full p-2 border rounded-lg focus:border-brand-blue/50 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Text (Max 120)</label>
                  <textarea id="mmshomepageform-textarea-2" name="mmshomepageform-textarea-2" aria-label="mmshomepageform textarea field" maxLength={120} value={item.text || ''} onChange={e => handleArrayChange('notices', i, 'text', e.target.value)} className="w-full p-2 border rounded-lg focus:border-brand-blue/50 outline-none" rows={2} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Notifications */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Latest Notifications</h2>
            <button type="button" onClick={() => addArrayItem('notifications', { title: '', text: '' })} className="flex items-center gap-1 text-sm bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-lg hover:bg-brand-blue/20 font-medium">
              <Plus className="w-4 h-4" /> Add Notification
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
            {form.notifications.map((item, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-4 relative">
                <button type="button" onClick={() => removeArrayItem('notifications', i)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove notification">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="pr-10">
                  <label className="block text-sm font-medium mb-1">Notification Title / Text</label>
                  <input id="mmshomepageform-5" name="mmshomepageform-5" aria-label="mmshomepageform field" value={item.title || item.text || ''} onChange={e => handleArrayChange('notifications', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg focus:border-brand-blue/50 outline-none" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Testimonials (3 items)</h2>
          {form.testimonials.map((item, i) => (
            <div key={i} className="p-4 border rounded-lg mb-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Section Title (Max 40)</label>
                <input id="mmshomepageform-6" name="mmshomepageform-6" aria-label="mmshomepageform field" maxLength={40} value={item.sectionTitle || ''} onChange={e => handleArrayChange('testimonials', i, 'sectionTitle', e.target.value)} className="w-full p-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Student Name (Max 35)</label>
                  <input id="mmshomepageform-7" name="mmshomepageform-7" aria-label="mmshomepageform field" maxLength={35} value={item.name || ''} onChange={e => handleArrayChange('testimonials', i, 'name', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role (Max 30)</label>
                  <input id="mmshomepageform-8" name="mmshomepageform-8" aria-label="mmshomepageform field" maxLength={30} value={item.role || ''} onChange={e => handleArrayChange('testimonials', i, 'role', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quote (Max 320)</label>
                <textarea id="mmshomepageform-textarea-3" name="mmshomepageform-textarea-3" aria-label="mmshomepageform textarea field" maxLength={320} value={item.quote || ''} onChange={e => handleArrayChange('testimonials', i, 'quote', e.target.value)} className="w-full p-2 border rounded-lg" rows={3} />
              </div>
            </div>
          ))}
        </section>

        {/* Summer Internships */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Summer Internships</h2>
            <button type="button" onClick={() => addArrayItem('internships', { title: '', altText: '', logo: null })} className="flex items-center gap-1 text-sm bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-lg hover:bg-brand-blue/20 font-medium">
              <Plus className="w-4 h-4" /> Add Internship
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
            {form.internships.map((item, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-4 relative bg-slate-50">
                <button type="button" onClick={() => removeArrayItem('internships', i)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Remove internship">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="pr-10">
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input id="mmshomepageform-9" name="mmshomepageform-9" aria-label="mmshomepageform field" maxLength={60} value={item.title || ''} onChange={e => handleArrayChange('internships', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg focus:border-brand-blue/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company Logo</label>
                  <input id="mmshomepageform-10" name="mmshomepageform-10" aria-label="mmshomepageform field" type="file" accept="image/*" onChange={e => handleArrayChange('internships', i, 'logo', e.target.files?.[0] || null)} className="w-full p-2 border rounded-lg bg-white" />
                  <FilePreview file={item.logo} type="image" onRemove={() => handleArrayChange('internships', i, 'logo', null)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Events */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Our Events</h2>
            <button type="button" onClick={() => addArrayItem('events', { title: '', eventTitle: '', altText: '', image: null })} className="flex items-center gap-1 text-sm bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-lg hover:bg-brand-blue/20 font-medium">
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
            {form.events.map((item, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-4 relative bg-slate-50">
                <button type="button" onClick={() => removeArrayItem('events', i)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Remove event">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="pr-10">
                  <label className="block text-sm font-medium mb-1">Event Title (Max 60)</label>
                  <input id="mmshomepageform-11" name="mmshomepageform-11" aria-label="mmshomepageform field" maxLength={60} value={item.title || item.eventTitle || ''} onChange={e => handleArrayChange('events', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg focus:border-brand-blue/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Event Flyer / Image</label>
                  <input id="mmshomepageform-12" name="mmshomepageform-12" aria-label="mmshomepageform field" type="file" accept="image/*" onChange={e => handleArrayChange('events', i, 'image', e.target.files?.[0] || null)} className="w-full p-2 border rounded-lg bg-white" />
                  <FilePreview file={item.image} type="image" onRemove={() => handleArrayChange('events', i, 'image', null)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experiential Learning Videos */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Experiential Learning Videos</h2>
          {form.videos.map((item, i) => (
            <div key={i} className="p-4 border rounded-lg mb-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Title (Max 45)</label>
                  <input id="mmshomepageform-13" name="mmshomepageform-13" aria-label="mmshomepageform field" maxLength={45} value={item.sectionTitle || ''} onChange={e => handleArrayChange('videos', i, 'sectionTitle', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Video Title (Max 55)</label>
                  <input id="mmshomepageform-14" name="mmshomepageform-14" aria-label="mmshomepageform field" maxLength={55} value={item.videoTitle || ''} onChange={e => handleArrayChange('videos', i, 'videoTitle', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Video URL (Max 250)</label>
                  <input id="mmshomepageform-15" name="mmshomepageform-15" aria-label="mmshomepageform field" maxLength={250} value={item.videoUrl || ''} onChange={e => handleArrayChange('videos', i, 'videoUrl', e.target.value)} placeholder="Or upload below" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Video File Upload</label>
            <input id="mmshomepageform-16" name="mmshomepageform-16" aria-label="mmshomepageform field" type="file" accept="video/*" onChange={e => handleArrayChange('videos', i, 'videoFile', e.target.files?.[0] || null)} className="w-full p-2 border rounded-lg" />
            <FilePreview file={item.videoFile} type="video" onRemove={() => handleArrayChange('videos', i, 'videoFile', null)} />

                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Poster Alt Text (Max 90)</label>
                  <input id="mmshomepageform-17" name="mmshomepageform-17" aria-label="mmshomepageform field" maxLength={90} value={item.posterAlt || ''} onChange={e => handleArrayChange('videos', i, 'posterAlt', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Poster Image</label>
            <input id="mmshomepageform-18" name="mmshomepageform-18" aria-label="mmshomepageform field" type="file" accept="image/*" onChange={e => handleArrayChange('videos', i, 'poster', e.target.files?.[0] || null)} className="w-full p-2 border rounded-lg" />
            <FilePreview file={item.poster} type="image" onRemove={() => handleArrayChange('videos', i, 'poster', null)} />

                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Resources / PDF Documents */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Resources / Documents</h2>
            <button type="button" onClick={() => addArrayItem('documents', { label: '', url: '', pdfFile: null })} className="flex items-center gap-1 text-sm bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-lg hover:bg-brand-blue/20 font-medium">
              <Plus className="w-4 h-4" /> Add Document
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
            {form.documents.map((item, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-4 relative bg-slate-50">
                <button type="button" onClick={() => removeArrayItem('documents', i)} className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Remove document">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="pr-10">
                  <label className="block text-sm font-medium mb-1">Document Label (Max 60)</label>
                  <input id="mmshomepageform-19" name="mmshomepageform-19" aria-label="mmshomepageform field" maxLength={60} value={item.label || ''} onChange={e => handleArrayChange('documents', i, 'label', e.target.value)} className="w-full p-2 border rounded-lg focus:border-brand-blue/50 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">External URL (Optional)</label>
                    <input id="mmshomepageform-20" name="mmshomepageform-20" aria-label="mmshomepageform field" value={item.url || ''} onChange={e => handleArrayChange('documents', i, 'url', e.target.value)} placeholder="https://..." className="w-full p-2 border rounded-lg focus:border-brand-blue/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Upload PDF File</label>
                    <input id="mmshomepageform-21" name="mmshomepageform-21" aria-label="mmshomepageform field" type="file" accept="application/pdf" onChange={e => handleArrayChange('documents', i, 'pdfFile', e.target.files?.[0] || null)} className="w-full p-2 border rounded-lg bg-white" />
                    <FilePreview file={item.pdfFile} type="pdf" onRemove={() => handleArrayChange('documents', i, 'pdfFile', null)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default MMSHomepageForm;

const FilePreview = ({ file, type, onRemove }: { file: any, type: 'image' | 'video' | 'pdf', onRemove?: () => void }) => {
  if (!file) return null;
  const url = typeof file === 'string' ? resolveApiUrl(file) : (file.url ? resolveApiUrl(file.url) : URL.createObjectURL(file as File));
  return (
    <div className="mt-2 rounded border border-slate-200 p-2 bg-slate-50 flex items-center justify-between">
      <div className="flex items-center">
        {type === 'image' ? (
          <img src={url} alt="preview" className="h-12 w-auto rounded object-cover" />
        ) : type === 'video' ? (
          <video src={url} className="h-12 w-auto rounded object-cover" muted />
        ) : (
          <div className="h-12 w-12 flex items-center justify-center bg-brand-blue/10 text-brand-blue rounded">
            <span className="text-xs font-bold">PDF</span>
          </div>
        )}
        <div className="text-xs text-slate-500 max-w-xs truncate ml-2">
          {typeof file === 'string' ? file.split('/').pop() : ((file as any).name || 'Current ' + type)}
        </div>
      </div>
      {onRemove && (
        <button type="button" onClick={onRemove} className="ml-4 p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
