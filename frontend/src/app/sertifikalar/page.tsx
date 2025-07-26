"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Sertifikalar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    document.title = "Sertifikalarım";
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
            <Link href="/sertifikalar" className={`text-white hover:text-blue-300 transition ${currentPath === '/sertifikalar' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : 'font-bold border-b-[3px] border-blue-300 pb-1'}`}>Sertifikalarım</Link>
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? 'font-bold border-b-[3px] border-blue-300 pb-1' : ''}`}>Aldığım Kurslar</Link>
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
            <Link href="/sertifikalar" className={`text-white hover:text-blue-300 transition ${currentPath === '/sertifikalar' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit'}`}>Sertifikalarım</Link>
            <Link href="/kurslar" className={`text-white hover:text-blue-300 transition ${currentPath === '/kurslar' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Aldığım Kurslar</Link>
            <Link href="/beceriler" className={`text-white hover:text-blue-300 transition ${currentPath === '/beceriler' ? 'font-bold border-b-[3px] border-blue-300 pb-1 w-fit' : ''}`}>Becerilerim</Link>
          </div>
        )}
      </nav>

      <div className="p-8 pb-20 gap-16 sm:p-20">
        <main>
          <h1 className="text-4xl font-bold text-center text-white mb-12">Sertifikalarım</h1>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <a href="\Sertifikalar\Uygulamalarla_Nesne_Yönelimli_Programlama_Sertifika.jpg" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Image src="\Sertifikalar\Uygulamalarla_Nesne_Yönelimli_Programlama_Sertifika.jpg" alt="Uygulamalarla Nesne Yönelimli Programlama" width={300} height={150} className="mb-6 m-2.5" />
              </a>
              <h3 className="text-xl font-semibold mb-2 text-white text-center">Uygulamalarla Nesne Yönelimli Programlama</h3>
              <p className="text-gray-200 text-center">BTK Akademi</p>
            </div>
            
            
            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <a href="\Sertifikalar\JAVA İIe ProgramIamaya Giriş.jpg" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Image src="\Sertifikalar\JAVA İIe ProgramIamaya Giriş.jpg" alt="JAVA İle Programlamaya Giriş" width={300} height={150} className="mb-6 m-2.5" />
                <h3 className="text-xl font-semibold mb-2 text-white text-center">JAVA İle Programlamaya Giriş</h3>
                <p className="text-gray-200 text-center">BTK Akademi</p>
              </a>
            </div>

            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <a href="\Sertifikalar\Algoritma Tasarımı.jpg" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Image src="\Sertifikalar\Algoritma Tasarımı.jpg" alt="Algoritma Tasarımı" width={300} height={150} className="mb-6 m-2.5" />
                <h3 className="text-xl font-semibold mb-2 text-white text-center">Algoritma Tasarımı</h3>
                <p className="text-gray-200 text-center">BTK Akademi</p>
              </a>
            </div>

            <div className="bg-[#1E1E9F] p-6 rounded-lg shadow-lg">
              <a href="\Sertifikalar\Algoritma Programlama ve Veri Yapılarına Giriş.jpg" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <Image src="\Sertifikalar\Algoritma Programlama ve Veri Yapılarına Giriş.jpg" alt="Algoritma Programlama ve Veri Yapılarına Giriş" width={300} height={150} className="mb-6 m-2.5" />
                <h3 className="text-xl font-semibold mb-2 text-white text-center">Algoritma Programlama ve Veri Yapılarına Giriş</h3>
                <p className="text-gray-200 text-center">BTK Akademi</p>
              </a>
            </div>
            {/* Diğer sertifikalar buraya eklenebilir */}
          </div>
        </main>
      </div>
    </div>
  );
} 