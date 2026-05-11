import React, { useState, useEffect } from 'react';
import { Sermon } from '../types';
import { Search, Trash2, ExternalLink, Calendar, Book, Clock } from 'lucide-react';

interface SermonLibraryProps {
  onOpen: (sermon: Sermon) => void;
}

export default function SermonLibrary({ onOpen }: SermonLibraryProps) {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('sermons_library');
    if (saved) {
      setSermons(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الخطبة؟')) {
      const updated = sermons.filter(s => s.id !== id);
      setSermons(updated);
      localStorage.setItem('sermons_library', JSON.stringify(updated));
    }
  };

  const filteredSermons = sermons.filter(s => 
    s.title.includes(searchTerm) || s.topic.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-primary-dark text-right">مكتبة الخطب الخاصة بي</h2>
          <p className="text-gray-500 mt-2">استعرض وادر خطبك التي قمت بإعدادها مسبقاً</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="البحث عن خطبة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary-gold outline-none"
          />
        </div>
      </div>

      {filteredSermons.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
           <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
           <p className="text-xl text-gray-400 font-medium">لا توجد خطب محفوظة حالياً</p>
           <p className="text-gray-400 mt-1">ابدأ بإعداد خطبة جديدة وحفظها لتظهر هنا</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map(sermon => (
            <div key={sermon.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-primary-light text-primary-dark text-xs font-bold px-3 py-1 rounded-full">{sermon.request.type}</span>
                  <button onClick={() => handleDelete(sermon.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-2 line-clamp-2">{sermon.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{sermon.topic}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                   <div className="flex items-center gap-1">
                     <Calendar className="w-3 h-3" />
                     {new Date(sermon.date).toLocaleDateString('ar-EG')}
                   </div>
                   <div className="flex items-center gap-1">
                     <Clock className="w-3 h-3" />
                     {sermon.request.duration}
                   </div>
                </div>
              </div>
              <button
                onClick={() => onOpen(sermon)}
                className="w-full bg-gray-50 py-3 text-primary-dark font-bold hover:bg-primary-gold hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                فتح الخطبة
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
