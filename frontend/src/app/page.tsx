"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    document.title = "Ana Sayfa";
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
            <Link href="/" className={`text-white hover:text-blue-300 transition ${currentPath === '/' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : 'font-bold border-b-[3px] border-blue-300 pb-1'}`}>Ana Sayfa</Link>
            <Link href="/sertifikalar" className={`text-white hover:text-blue-300 transition ${currentPath === '/sertifikalar' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Sertifikalarım</Link>
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Aldığım Kurslar</Link>
            <Link href="/beceriler" className={`text-white hover:text-blue-300 transition ${currentPath === '/beceriler' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Becerilerim</Link>
            <Link href="/testler" className={`text-white hover:text-blue-300 transition ${currentPath === '/testler' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Test Otomasyonu</Link>
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
          <div className="flex flex-col md:hidden">
            <Link href="/" className={`text-white hover:text-blue-300 transition ${currentPath === '/' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Ana Sayfa</Link>
            <Link href="/sertifikalar" className={`text-white hover:text-blue-300 transition ${currentPath === '/sertifikalar' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Sertifikalarım</Link>
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Aldığım Kurslar</Link>
            <Link href="/beceriler" className={`text-white hover:text-blue-300 transition ${currentPath === '/beceriler' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Becerilerim</Link>
            <Link href="/testler" className={`text-white hover:text-blue-300 transition ${currentPath === '/testler' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Test Otomasyonu</Link>
          </div>
        )}
      </nav>

      <div className="p-8 pb-20 gap-16 sm:p-20">
        <main>
          {/* Hero Section */}
          <section id="hero" className="mb-16 text-center">
            <div className="rounded-full w-48 h-48 mx-auto mb-8 overflow-hidden">
              <Image 
                src="/profil.jpeg" 
                alt="Profil Fotoğrafı"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-4xl font-bold mb-4">YUSUF UYAR</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Kırklareli Üniversitesinde Yazılım Mühendisliği 3. sınıf
              öğrencisi olarak eğitim görmekteyim. Analitik düşünme
              yeteneğim ve problem çözme becerim ile projelerde
              etkili sonuçlar elde etmeyi amaçlıyorum. Öğrenirken
              zevk aldığım ve daha çok şey öğrenebileceğim bu
              yolculukta aileme, dostlarıma, yakınlarıma, vatanıma ve
              milletime hayırlı bir insan olmak istiyorum.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
