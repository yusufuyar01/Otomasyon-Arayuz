"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Beceriler() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    document.title = "Becerilerim";
    setIsPhone(window.innerWidth < 768);
    setCurrentPath(window.location.pathname);
    
    const handleResize = () => {
      setIsPhone(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#010080]">
      {/* Navbar */}
      <nav className="bg-[#010060] p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {isPhone ? 
          <button 
            className="text-white md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✖' : '☰'}
          </button>
          :
          <div className="flex space-x-6"> 
            <Link href="/" className={`text-white hover:text-blue-300 transition ${currentPath === '/' ? '' : ''}`}>Ana Sayfa</Link>
            <Link href="/sertifikalar" className={`text-white hover:text-blue-300 transition ${currentPath === '/sertifikalar' ? '' : ''}`}>Sertifikalarım</Link>
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? '' : ''}`}>Aldığım Kurslar</Link>
            <Link href="/beceriler" className={`text-white hover:text-blue-300 transition ${currentPath === '/beceriler' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : 'font-bold border-b-[3px] border-blue-300 pb-1'}`}>Becerilerim</Link>
          </div>
          }
          <a 
            href="/Yusuf Uyar - CV.pdf" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            download
          >
            CV&apos;mi İndir
          </a>
        </div>
        {isOpen && (
          <div className="flex flex-col md:hidden mt-4 space-y-2">
            <Link href="/" className={`text-white hover:text-blue-300 transition ${currentPath === '/' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Ana Sayfa</Link>
            <Link href="/sertifikalar" className={`text-white hover:text-blue-300 transition ${currentPath === '/sertifikalar' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Sertifikalarım</Link>
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Aldığım Kurslar</Link>
            <Link href="/beceriler" className={`text-white hover:text-blue-300 transition ${currentPath === '/beceriler' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit'}`}>Becerilerim</Link>
          </div>
        )}
      </nav>

      <div className="p-8 pb-20 gap-16 sm:p-20">
        <main>
          <h1 className="text-4xl font-bold text-center text-white mb-12">Becerilerim</h1>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Programlama Dilleri */}
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white text-center">Programlama Dilleri</h2>
              <ul className="space-y-2 text-gray-200">
                <li>• Java</li>
                <li>• C</li>
                <li>• C#</li>
                <li>• PHP</li>
                <li>• Python</li>
              </ul>
            </div>

            {/* Web Teknolojileri */}
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white text-center">Web Teknolojileri</h2>
              <ul className="space-y-2 text-gray-200">
                <li>• HTML5</li>
                <li>• CSS</li>
                <li>• JavaScript</li>
                <li>• React.js</li>
                <li>• Node.js</li>
                <li>• PHP</li>
              </ul>
            </div>

            {/* Veritabanları */}
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white text-center">Veritabanları</h2>
              <ul className="space-y-2 text-gray-200">
                <li>• MySQL</li>
                <li>• PostgreSQL</li>
                <li>• MSSQL</li>
              </ul>
            </div>

            {/* Araçlar ve Diğer */}
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white text-center">Araçlar ve Diğer</h2>
              <ul className="space-y-2 text-gray-200">
                <li>• Git/GitHub</li>
                <li>• Kali Linux</li>
                <li>• VirtualBox</li>
                <li>• Office Programları</li>
                <li>• OOP (Nesne Yönelimli Programlama)</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 