import React from 'react';
import { FaPlay, FaUpload, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased bg-gray-50 text-slate-900 selection:bg-slate-900 selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="flex items-center gap-3 cursor-default group">
          <div className="relative flex items-center justify-center w-10 h-10 transition-transform duration-300 bg-slate-900 rounded-xl group-hover:rotate-6 group-hover:scale-105 shadow-lg shadow-slate-900/20">
            <FaPlay className="text-sm text-white ml-0.5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Go File <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Pro</span>
          </h1>
        </div>
        <a
          href="https://viplay.top"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 bg-slate-900 rounded-full hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/25 active:scale-95"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaUpload className="text-xs" />
          <span>Upload</span>
        </a>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full h-full opacity-100 transition-opacity duration-500">
          {children}
        </div>
      </main>

      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-500 font-medium">
            © 2024 No Ads Stream. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-slate-900 transition-colors">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-slate-900 transition-colors">
              <FaGithub size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-slate-900 transition-colors">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default Layout;