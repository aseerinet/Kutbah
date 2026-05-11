import React from 'react';
import { TEMPLATES } from '../constants';
import { LayoutTemplate, ArrowLeft } from 'lucide-react';
import { SermonRequest } from '../types';

interface TemplatesProps {
  onSelect: (topic: string) => void;
}

export default function Templates({ onSelect }: TemplatesProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-primary-dark">قوالب موضوعية جاهزة</h2>
        <p className="text-gray-500 mt-2">اختر موضوعاً ليبدأ النظام في إعداد خطبتك فوراً</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEMPLATES.map((template, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(template.topic)}
            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all text-right flex flex-col h-full border-b-4 hover:border-b-primary-gold"
          >
            <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center text-primary-dark mb-4 group-hover:bg-primary-gold group-hover:text-white transition-all">
               <LayoutTemplate className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-2">{template.title}</h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">{template.topic}</p>
            <div className="flex items-center text-primary-gold font-bold text-sm gap-2">
              استخدام القالب
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
