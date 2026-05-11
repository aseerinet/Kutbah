/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SermonForm from './components/SermonForm';
import SermonResult from './components/SermonResult';
import SermonLibrary from './components/SermonLibrary';
import SermonReview from './components/SermonReview';
import Templates from './components/Templates';
import Footer from './components/Footer';
import { SermonRequest, Sermon } from './types';
import { generateSermon } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [currentRequest, setCurrentRequest] = useState<SermonRequest | null>(null);
  const [selectedTemplateTopic, setSelectedTemplateTopic] = useState<string | null>(null);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleGenerate = async (request: SermonRequest) => {
    setIsLoading(true);
    setResult(null);
    setCurrentRequest(request);
    setActiveTab('create');
    try {
      const generatedContent = await generateSermon(request);
      setResult(generatedContent);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!result || !currentRequest) return;
    
    const newSermon: Sermon = {
      id: Date.now().toString(),
      title: currentRequest.topic,
      topic: currentRequest.topic,
      content: result,
      date: new Date().toISOString(),
      request: currentRequest
    };

    const saved = localStorage.getItem('sermons_library');
    const library = saved ? JSON.parse(saved) : [];
    library.unshift(newSermon);
    localStorage.setItem('sermons_library', JSON.stringify(library));
    
    alert('تم حفظ الخطبة في مكتبتك بنجاح');
    setActiveTab('library');
  };

  const handleOpenSermon = (sermon: Sermon) => {
    setResult(sermon.content);
    setCurrentRequest(sermon.request);
    setActiveTab('result');
  };

  const handleTemplateSelect = (topic: string) => {
    setSelectedTemplateTopic(topic);
    setActiveTab('create');
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header activeTab={activeTab === 'result' ? 'create' : activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-8 pb-16">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero onStart={(tab) => setActiveTab(tab)} />
            </motion.div>
          )}

          {activeTab === 'create' && (
            <motion.div key="create" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="container mx-auto px-4">
                <SermonForm 
                  onSubmit={handleGenerate} 
                  isLoading={isLoading} 
                  initialValues={selectedTemplateTopic ? { topic: selectedTemplateTopic } : undefined}
                />
                {(result || isLoading) && (
                   <div className="mt-12">
                     {isLoading ? (
                       <div className="bg-white rounded-3xl p-20 text-center shadow-xl border border-gray-100">
                          <div className="w-16 h-16 border-4 border-primary-dark border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                          <h3 className="text-xl font-bold text-primary-dark mb-2">جاري إعداد المادة العلمية...</h3>
                          <p className="text-gray-500">نقوم الآن بجمع الأدلة وصياغة المحاور بأسلوب شرعي رصين</p>
                       </div>
                     ) : result && (
                       <SermonResult 
                          content={result} 
                          onSave={handleSave} 
                          onUpdate={(newContent) => setResult(newContent)} 
                       />
                     )}
                   </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'library' && (
            <motion.div key="library" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SermonLibrary onOpen={handleOpenSermon} />
            </motion.div>
          )}

          {activeTab === 'review' && (
            <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SermonReview />
            </motion.div>
          )}

          {activeTab === 'templates' && (
            <motion.div key="templates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Templates onSelect={handleTemplateSelect} />
            </motion.div>
          )}

          {activeTab === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="container mx-auto px-4">
                <SermonResult 
                  content={result} 
                  onSave={handleSave} 
                  onUpdate={(newContent) => setResult(newContent)} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
