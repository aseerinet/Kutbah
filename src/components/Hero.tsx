import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStart: (tab: string) => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative py-20 overflow-hidden bg-primary-light">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad)" />
          <defs>
            <pattern id="pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#1a4d2e" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-dark mb-6 leading-tight">
              دليل الخطيب — منصة إعداد الخطب والمحاضرات الشرعية
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              أنشئ خطبة جمعة أو محاضرة أو موعظة بأسلوب شرعي منظم ومؤثر خلال دقائق، مع الالتزام بالضوابط العلمية والشرعية.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => onStart('create')}
              className="bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-95 transition-all shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              إعداد خطبة جديدة
            </button>
            <button
              onClick={() => onStart('review')}
              className="bg-white text-primary-dark border-2 border-primary-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              مراجعة خطبة جاهزة
            </button>
            <button
              onClick={() => onStart('templates')}
              className="bg-primary-gold text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-md flex items-center gap-2"
            >
              استعراض القوالب
            </button>
          </motion.div>

          {/* Warning Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg flex items-start gap-4 text-right"
            dir="rtl"
          >
            <ShieldCheck className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
            <p className="text-sm text-orange-800">
              <span className="font-bold">تنبيه شرعي:</span> هذه المنصة تساعد في إعداد المادة العلمية، وينبغي على الخطيب مراجعة الآيات والأحاديث والتأكد من صحتها وتخريجها قبل الإلقاء.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <FeatureCard 
            title="خطبة جمعة" 
            desc="إعداد متكامل للخطبتين الأولى والثانية مع الدعاء الختامي." 
            icon="🕌" 
          />
          <FeatureCard 
            title="محاضرة علمية" 
            desc="تنظيم المحاور والأدلة لموضوع علمي هادئ ومقصل." 
            icon="🎓" 
          />
          <FeatureCard 
            title="موعظة مؤثرة" 
            desc="تركيز على الجانب الوعظي والقصصي المؤثر في النفوس." 
            icon="✨" 
          />
          <FeatureCard 
            title="درس تربوي" 
            desc="إعداد خطوات عملية وتطبيقات واقعية للجمهور." 
            icon="🌱" 
          />
          <FeatureCard 
            title="كلمة قصيرة" 
            desc="خاطرة أو كلمة بعد الصلاة مركزة وسريعة." 
            icon="⏱️" 
          />
          <FeatureCard 
            title="مراجعة وتحسين" 
            desc="إعادة صياغة النصوص الجاهزة وتقوية المحتوى." 
            icon="✍️" 
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-primary-dark mb-2">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
}
