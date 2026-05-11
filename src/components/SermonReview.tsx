import React, { useState } from 'react';
import { Sparkles, Loader2, Wand2, FileText, LayoutList, MessageCircle, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { editSermonAction } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export default function SermonReview() {
  const [inputContent, setInputContent] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const performReview = async (action: string) => {
    if (!inputContent.trim()) return;
    setIsLoading(true);
    try {
      const res = await editSermonAction(inputContent, action);
      setResult(res);
    } catch (err) {
      alert('فشل في المعالجة');
    } finally {
      setIsLoading(false);
    }
  };

  const actions = [
    { id: 'improve', label: 'تحسين اللغة والبلاغة', icon: Wand2, desc: 'إعادة صياغة النص بأسلوب أدبي قوي' },
    { id: 'organize', label: 'ترتيب المحاور والعناصر', icon: LayoutList, desc: 'إعادة تنظيم الأفكار بشكل منطقي' },
    { id: 'shorten', label: 'تبسيط للمستمعين', icon: MessageCircle, desc: 'جعل العبارات أسهل وأوضح للعامة' },
    { id: 'spiritual', label: 'تقوية التأثير الوعظي', icon: Sparkles, desc: 'إضافة لمسات وجدانية ومؤثرة' },
    { id: 'points', label: 'تحويل لنقاط إلقاء', icon: FileText, desc: 'استخراج رؤوس الأقلام للخطيب' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-primary-dark">مراجعة وتحسين الخطب الجاهزة</h2>
        <p className="text-gray-500 mt-2">الصق نص خطبتك هنا وسنساعدك في تطويرها وتحسينها</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Area */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
               <ArrowLeftRight className="w-4 h-4" />
               النص الأصلي (الخطبة الجاهزة)
            </label>
            <textarea
              className="w-full h-[400px] p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-dark outline-none resize-none leading-relaxed"
              placeholder="الصق نص الخطبة هنا..."
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
             {actions.map(action => (
               <button
                 key={action.id}
                 disabled={isLoading || !inputContent.trim()}
                 onClick={() => performReview(action.label)}
                 className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-primary-gold hover:shadow-md transition-all group disabled:opacity-50"
               >
                 <div className="bg-primary-light p-3 rounded-xl group-hover:bg-primary-gold group-hover:text-white transition-all">
                   <action.icon className="w-5 h-5" />
                 </div>
                 <div className="text-right">
                   <h4 className="font-bold text-primary-dark">{action.label}</h4>
                   <p className="text-xs text-gray-400">{action.desc}</p>
                 </div>
               </button>
             ))}
          </div>
        </div>

        {/* Result Area */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 bg-primary-dark text-white flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-primary-gold" />
               نتيجة التحسين
            </h3>
            {result && <button onClick={() => { navigator.clipboard.writeText(result); alert('تم النسخ'); }} className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20">نسخ</button>}
          </div>

          <div className="flex-1 p-8 overflow-y-auto min-h-[500px]">
             {isLoading ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
                 <Loader2 className="w-12 h-12 animate-spin mb-4" />
                 <p className="font-bold">جاري تحليل النص وإعادة صياغته...</p>
                 <p className="text-sm">هذا قد يستغرق لحظات حسب طول النص</p>
               </div>
             ) : result ? (
               <div className="prose prose-lg sermon-content text-right text-gray-800">
                 <ReactMarkdown>{result}</ReactMarkdown>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-gray-300 text-center">
                  <Sparkles className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">سيظهر النص المحسن هنا بعد اختيار أحد الخيارات الجانبية</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
