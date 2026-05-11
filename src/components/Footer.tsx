import React from 'react';
import { BookOpen, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-right">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="bg-primary-dark p-2 rounded-lg">
                 <BookOpen className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold text-primary-dark">دليل الخطيب</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              منصة تقنية متخصصة لرفع كفاءة الخطاب الدعوي وتوفير الأدوات اللازمة للخطيب لإعداد مادة علمية رصينة ومؤثرة.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-primary-dark">روابط سريعة</h4>
            <ul className="text-gray-500 text-sm space-y-2">
              <li><a href="#" className="hover:text-primary-gold">عن المنصة</a></li>
              <li><a href="#" className="hover:text-primary-gold">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-primary-gold">دليل الاستخدام</a></li>
              <li><a href="#" className="hover:text-primary-gold">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Guidelines */}
          <div className="space-y-4">
             <h4 className="font-bold text-primary-dark">ميثاق المنصة</h4>
             <div className="bg-primary-light p-4 rounded-xl border border-primary-dark/10">
                <div className="flex items-center gap-2 text-primary-dark font-bold text-sm mb-1">
                   <AlertTriangle className="w-4 h-4" />
                   تنبيه هامة
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  نلتزم بمنهج أهل السنة والجماعة، ونحث المستخدمين على مراجعة النصوص وتخريج الأحاديث قبل استخدامها. الذكاء الاصطناعي مساعد فقط وليس مصدراً نهائياً للفتوى أو العلم الشرعي.
                </p>
             </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} دليل الخطيب. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
