"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Kurslar() {

  const [isOpen, setIsOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    document.title = "Aldığım Kurslar";
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
            <Link href="/" className={`text-white hover:text-blue-300 transition ${currentPath === '/' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Ana Sayfa</Link>
            <Link href="/sertifikalar" className={`text-white hover:text-blue-300 transition ${currentPath === '/sertifikalar' ? '' : ''}`}>Sertifikalarım</Link>
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? '' : 'font-bold border-b-[3px] border-blue-300 pb-1'}`}>Aldığım Kurslar</Link>
            <Link href="/beceriler" className={`text-white hover:text-blue-300 transition ${currentPath === '/beceriler' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Becerilerim</Link>
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
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit'}`}>Aldığım Kurslar</Link>
            <Link href="/beceriler" className={`text-white hover:text-blue-300 transition ${currentPath === '/beceriler' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Becerilerim</Link>
          </div>
        )}
      </nav>

      <div className="p-8 pb-20 gap-16 sm:p-20">
        <main>
          <h1 className="text-4xl font-bold text-center text-white mb-12">Aldığım Kurslar</h1>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* kurs 1 */}
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <a href="https://www.udemy.com/course/chatgpt-prompt-muhendisligi/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Image src="/kurslar/Prompt Mühendisliği.jpg" alt="ChatGPT 2025: Prompt Mühendisliği, İçerik ve Görsel Üretme" width={300} height={150} className="mb-6 m-2.5" />
              </a>
                <h3 className="text-xl font-semibold mb-2 text-white text-center">ChatGPT 2025: Prompt Mühendisliği, İçerik ve Görsel Üretme</h3>
                <p className="text-gray-200 text-center">Udemy - Atıl Samancıoğlu, Academy Club</p>
                <p className="text-gray-300 mt-2 text-center">Prompt Mühendisliği, OpenAI API, Fine Tuning, Gemini konularını tamamen pratik örneklerle öğrenin</p>
              
            </div>

            {/* kurs 2 */}
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <a href="https://www.udemy.com/course/react-egitimi/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Image src="/kurslar/Uygulamalı React JS.jpg" alt="ChatGPT 2025: Prompt Mühendisliği, İçerik ve Görsel Üretme" width={300} height={150} className="mb-6 m-2.5" />
              </a>
                <h3 className="text-xl font-semibold mb-2 text-white text-center">React JS : Uygulamalı React JS -Redux Eğitimi</h3>
                <p className="text-gray-200 text-center">Udemy - Can Boz</p>
                <p className="text-gray-300 mt-2 text-center">React 18 - React Component - React State - React Hooks - React Router 6 - React Typescript - Redux Toolkit - Context Api</p>
              
            </div>
            
            {/* kurs 3 */}
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <a href="https://www.udemy.com/course/the-complete-web-development-bootcamp/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Image src="/kurslar/Full-Stack Web Development.jpg" alt="ChatGPT 2025: Prompt Mühendisliği, İçerik ve Görsel Üretme" width={300} height={150} className="mb-6 m-2.5" />
              </a>
                <h3 className="text-xl font-semibold mb-2 text-white text-center">The Complete Full-Stack Web Development Bootcamp</h3>
                <p className="text-gray-200 text-center">Udemy - Dr. Angela Yu, Developer and Lead Instructor</p>
                <p className="text-gray-300 mt-2 text-center">Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps</p>
              
            </div>

            {/* kurs 4 */}
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <a href="https://www.udemy.com/course/etik-hacker-olma-kursu/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Image src="/kurslar/Etik Hacker Olma Kursu.jpg" alt="ChatGPT 2025: Prompt Mühendisliği, İçerik ve Görsel Üretme" width={300} height={150} className="mb-6 m-2.5" />
              </a>
                <h3 className="text-xl font-semibold mb-2 text-white text-center">Etik Hacker Olma Kursu</h3>
                <p className="text-gray-200 text-center">Udemy - Atıl Samancıoğlu, Academy Club</p>
                <p className="text-gray-300 mt-2 text-center">En güncel yazılımların ve araçların kullanımını öğrenerek, canlı örnekler yaparak Etik Hacker olmayı öğrenin!</p>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 