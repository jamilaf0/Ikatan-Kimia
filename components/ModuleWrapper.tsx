
import React from 'react';

interface ModuleWrapperProps {
  title: string;
  children: React.ReactNode;
}

const ModuleWrapper: React.FC<ModuleWrapperProps> = ({ title, children }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-50 pb-4">
          {title}
        </h2>
        <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-blue-600 prose-ul:list-disc prose-li:my-2">
          {children}
        </div>
      </section>
    </div>
  );
};

export default ModuleWrapper;
