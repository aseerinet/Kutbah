import React, { useState } from 'react';
import { SermonRequest } from '../types';
import { SERMON_TYPES, AUDIENCE_TYPES, DURATIONS, STYLES, LANGUAGE_LEVELS, OCCASIONS } from '../constants';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface SermonFormProps {
  onSubmit: (request: SermonRequest) => void;
  isLoading: boolean;
  initialValues?: Partial<SermonRequest>;
}

export default function SermonForm({ onSubmit, isLoading, initialValues }: SermonFormProps) {
  const [formData, setFormData] = useState<SermonRequest>({
    type: (initialValues?.type as any) || 'جمعة',
    topic: initialValues?.topic || '',
    audience: initialValues?.audience || 'عام',
    duration: initialValues?.duration || '15 دقيقة',
    style: initialValues?.style || 'وعظي مؤثر',
    language: initialValues?.language || 'متوسطة',
    occasion: initialValues?.occasion || 'بدون مناسبة',
    additionalElements: initialValues?.additionalElements || {
      quran: true,
      hadith: true,
      salaf: true,
      examples: true,
      story: false,
      dua: true,
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof SermonRequest['additionalElements']) => {
    setFormData(prev => ({
      ...prev,
      additionalElements: {
        ...prev.additionalElements,
        [name]: !prev.additionalElements[name]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto">
      <div className="bg-primary-dark p-6 text-white text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-primary-gold" />
          إدخال بيانات الخطبة
        </h2>
        <p className="opacity-80 mt-1">املاً البيانات التالية بدقة لنساعدك في خلق محتوى متميز</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topic */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">موضوع الخطبة</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              placeholder="مثلاً: فضل الصبر على البلاء، أو بر الوالدين في الإسلام"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-dark focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">نوع المحتوى</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
              {SERMON_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Audience */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">الجمهور المستهدف</label>
            <select name="audience" value={formData.audience} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
              {AUDIENCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">مدة الإلقاء</label>
            <select name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
              {DURATIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">الأسلوب</label>
            <select name="style" value={formData.style} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
              {STYLES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Language Level */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">مستوى اللغة</label>
            <select name="language" value={formData.language} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
              {LANGUAGE_LEVELS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">المناسبة</label>
            <select name="occasion" value={formData.occasion} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
              {OCCASIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          <label className="block text-sm font-bold text-gray-700 mb-4">عناصر إضافية</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <CheckboxItem 
              label="آيات قرآنية" 
              checked={formData.additionalElements.quran} 
              onChange={() => handleCheckboxChange('quran')} 
            />
            <CheckboxItem 
              label="أحاديث نبوية" 
              checked={formData.additionalElements.hadith} 
              onChange={() => handleCheckboxChange('hadith')} 
            />
            <CheckboxItem 
              label="أقوال السلف" 
              checked={formData.additionalElements.salaf} 
              onChange={() => handleCheckboxChange('salaf')} 
            />
            <CheckboxItem 
              label="أمثلة واقعية" 
              checked={formData.additionalElements.examples} 
              onChange={() => handleCheckboxChange('examples')} 
            />
            <CheckboxItem 
              label="قصة مؤثرة" 
              checked={formData.additionalElements.story} 
              onChange={() => handleCheckboxChange('story')} 
            />
            <CheckboxItem 
              label="دعاء ختامي" 
              checked={formData.additionalElements.dua} 
              onChange={() => handleCheckboxChange('dua')} 
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-gold text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              جاري إعداد الخطبة...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 -rotate-90" />
              توليد الخطبة الآن
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${checked ? 'bg-primary-dark border-primary-dark' : 'bg-white border-gray-300'}`}>
        {checked && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </div>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <span className="text-gray-600 group-hover:text-primary-dark transition-colors">{label}</span>
    </label>
  );
}
