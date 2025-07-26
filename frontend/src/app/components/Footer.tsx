import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#010060] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">İletişim</h2>
          <p className="mb-4">
            Benimle iletişime geçmek için: &nbsp; 
            <a href="mailto:uyaryusuf01@gmail.com" className="text-blue-300 hover:underline">
              uyaryusuf01@gmail.com
            </a>
          </p>
          <div className="flex justify-center gap-6">
          <a href="https://www.linkedin.com/in/yusuf-uyr/" className="text-gray-700 hover:text-blue-600">
                <Image
                  src="/icons/linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
            </a>
            <a href="https://github.com/yusufuyar01" className="text-gray-700 hover:text-blue-600">
                <Image
                  src="/icons/github.png"
                  alt="GitHub"
                  width={24}
                  height={24}
                />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
