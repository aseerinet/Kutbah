import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Save, FileText, Download, Scissors, Maximize, Languages, ShieldAlert, Sparkles, Wand2 } from 'lucide-react';
import { editSermonAction } from '../services/geminiService';

interface SermonResultProps {
  content: string;
  onSave: () => void;
  onUpdate: (newContent: string) => void;
}

export default function SermonResult({ content, onSave, onUpdate }: SermonResultProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert('تم نسخ النص');
  };

  const runAction = async (action: string) => {
    setIsProcessing(true);
    try {
      const result = await editSermonAction(content, action);
      onUpdate(result);
    } catch (err) {
      alert('حدث خطأ أثناء المعالجة');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {/* Actions Toolbar - Desktop */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
          <h3 className="text-lg font-bold text-primary-dark mb-4 border-b pb-2">أدوات التحسين</h3>
          <div className="grid grid-cols-1 gap-2">
            <ActionButton icon={Scissors} label="اختصار الخطبة" onClick={() => runAction('اختصار الخطبة مع الحفاظ على المعنى والأدلة')} disabled={isProcessing} />
            <ActionButton icon={Maximize} label="إطالة الخطبة" onClick={() => runAction('التوسع في شرح النقاط وإضافة شواهد أدبية')} disabled={isProcessing} />
            <ActionButton icon={Languages} label="تحسين اللغة" onClick={() => runAction('تحسين البلاغة واللغة وجعلها أكثر قوّة وعمقاً')} disabled={isProcessing} />
            <ActionButton icon={Sparkles} label="تقوية المقدمة" onClick={() => runAction('جعل المقدمة أكثر تأثيراً وجذباً للانتباه')} disabled={isProcessing} />
            <ActionButton icon={Wand2} label="تحويل لنقاط" onClick={() => runAction('تحويل النص إلى نقاط إلقاء مركزة')} disabled={isProcessing} />
            <hr className="my-2" />
            <button
               onClick={handleCopy}
               className="flex items-center gap-2 w-full p-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all font-medium"
            >
              <Copy className="w-4 h-4" />
              <span>نسخ النص</span>
            </button>
            <button
               onClick={onSave}
               className="flex items-center gap-2 w-full p-3 rounded-xl bg-primary-gold/10 text-primary-gold hover:bg-primary-gold hover:text-white transition-all font-medium"
            >
              <Save className="w-4 h-4" />
              <span>حفظ في مكتبتي</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Display */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[800px] relative">
          {isProcessing && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-primary-dark border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-primary-dark font-bold">جاري المعالجة والتحسين...</p>
              </div>
            </div>
          )}

          <div className="bg-primary-light px-8 py-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-primary-dark font-bold">
               <FileText className="w-5 h-5" />
               نص الخطبة المولّد
            </div>
          </div>

          <div className="p-10 text-right leading-loose">
            <div className="prose prose-lg max-w-none sermon-content text-gray-800">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>

          {/* Footer Warning */}
          <div className="bg-red-50 p-6 border-t border-red-100 flex gap-4">
             <ShieldAlert className="w-10 h-10 text-red-500 mt-1 flex-shrink-0" />
             <div>
               <h4 className="font-bold text-red-800 mb-1">الملاحظة الشرعية:</h4>
               <p className="text-sm text-red-700">الآيات والأحاديث المذكورة أعلاه تم اختيارها بواسطة الذكاء الاصطناعي. يجب على الخطيب مراجعة درجة صحة الأحاديث ونص الآيات من المصادر الموثوقة (مثل الدرر السنية أو التفاسير المعتمدة) قبل صعود المنبر.</p>
             </div>
          </div>
        </div>

        {/* Mobile Toolbar */}
        <div className="lg:hidden mt-6 grid grid-cols-2 gap-4">
           {/* Mobile buttons would go here - simplified for this implementation */}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, disabled }: { icon: any; label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 w-full p-3 rounded-xl hover:bg-primary-dark hover:text-white transition-all text-gray-600 font-medium ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
