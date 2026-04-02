import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle, File as FileIcon, Video } from 'lucide-react';
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
        setForm({ ...emptyForm, ...res.data });
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
              <input maxLength={60} value={form.admission.heading} onChange={e => updateField('admission', { ...form.admission, heading: e.target.value })} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (Max 220)</label>
              <textarea maxLength={220} value={form.admission.description} onChange={e => updateField('admission', { ...form.admission, description: e.target.value })} className="w-full p-2 border rounded-lg" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Banner Image</label>
              <div className="relative inline-flex flex-col items-start gap-2">
                <input
                  id="mms-home-banner-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={e => updateField('admission', { ...form.admission, banner: e.target.files?.[0] || null })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  Upload Banner Image
                </span>
                <span className="text-xs text-slate-500">PNG, JPG, JPEG supported</span>
              </div>
            </div>
          </div>
        </section>

        {/* Notice Board */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Notice Board (3 items)</h2>
          {form.notices.map((item, i) => (
            <div key={i} className="p-4 border rounded-lg mb-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title (Max 35)</label>
                  <input maxLength={35} value={item.title} onChange={e => handleArrayChange('notices', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Label (Max 20)</label>
                  <input maxLength={20} value={item.label} onChange={e => handleArrayChange('notices', i, 'label', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Text (Max 120)</label>
                <textarea maxLength={120} value={item.text} onChange={e => handleArrayChange('notices', i, 'text', e.target.value)} className="w-full p-2 border rounded-lg" rows={2} />
              </div>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Testimonials (3 items)</h2>
          {form.testimonials.map((item, i) => (
            <div key={i} className="p-4 border rounded-lg mb-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Section Title (Max 40)</label>
                <input maxLength={40} value={item.sectionTitle} onChange={e => handleArrayChange('testimonials', i, 'sectionTitle', e.target.value)} className="w-full p-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Student Name (Max 35)</label>
                  <input maxLength={35} value={item.name} onChange={e => handleArrayChange('testimonials', i, 'name', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role (Max 30)</label>
                  <input maxLength={30} value={item.role} onChange={e => handleArrayChange('testimonials', i, 'role', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quote (Max 320)</label>
                <textarea maxLength={320} value={item.quote} onChange={e => handleArrayChange('testimonials', i, 'quote', e.target.value)} className="w-full p-2 border rounded-lg" rows={3} />
              </div>
            </div>
          ))}
        </section>

        {/* Experiential Learning Videos */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Experiential Learning Videos</h2>
          {form.videos.map((item, i) => (
            <div key={i} className="p-4 border rounded-lg mb-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Title (Max 45)</label>
                  <input maxLength={45} value={item.sectionTitle} onChange={e => handleArrayChange('videos', i, 'sectionTitle', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Video Title (Max 55)</label>
                  <input maxLength={55} value={item.videoTitle} onChange={e => handleArrayChange('videos', i, 'videoTitle', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Video URL (Max 250)</label>
                  <input maxLength={250} value={item.videoUrl} onChange={e => handleArrayChange('videos', i, 'videoUrl', e.target.value)} placeholder="Or upload below" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Video File Upload</label>
                  <div className="relative inline-flex flex-col items-start gap-2">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={e => handleArrayChange('videos', i, 'videoFile', e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                      <Video className="w-4 h-4 text-blue-600" />
                      Upload Video
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.videoFile instanceof File ? item.videoFile.name : 'MP4, WebM supported'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Poster Alt Text (Max 90)</label>
                  <input maxLength={90} value={item.posterAlt} onChange={e => handleArrayChange('videos', i, 'posterAlt', e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Poster Image</label>
                  <div className="relative inline-flex flex-col items-start gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleArrayChange('videos', i, 'poster', e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      Upload Poster Image
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.poster instanceof File ? item.poster.name : 'PNG, JPG, JPEG supported'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default MMSHomepageForm;