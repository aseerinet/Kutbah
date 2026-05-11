import React from 'react';
import { BookOpen, Library, Search, PenTool, LayoutTemplate, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: BookOpen },
    { id: 'create', label: 'إعداد خطبة', icon: PenTool },
    { id: 'library', label: 'مكتبتي', icon: Library },
    { id: 'review', label: 'مراجعة خطبة', icon: Search },
    { id: 'templates', label: 'القوالب', icon: LayoutTemplate },
  ];

  return (
    <header className="bg-primary-dark text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 space-x-reverse cursor-pointer"
            onClick={() => setActiveTab('home')}
          >
            <div className="bg-primary-gold p-2 rounded-lg">
               <BookOpen className="w-8 h-8 text-primary-dark" />
            </div>
            <span className="text-2xl font-bold tracking-tight">دليل الخطيب</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 space-x-reverse px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'text-primary-gold bg-white/10' 
                    : 'text-gray-200 hover:text-primary-gold hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button (Simplified) */}
          <div className="md:hidden flex items-center">
             <button className="text-white p-2">
               <span className="sr-only">فتح القائمة</span>
               {/* Simplified icon for brevity */}
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
               </svg>
             </button>
          </div>
        </div>
      </div>
    </header>
  );
}
