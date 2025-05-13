'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const menuItems = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hizmetler', href: '/hizmetler' },
    { name: 'Ürünler', href: '/urunler' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
  ]
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-10 w-10 bg-purple-700 rounded-lg flex items-center justify-center text-white">
              <span className="text-xl font-bold">T</span>
            </div>
            <span className={`ml-2.5 text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              TikoBilişim
            </span>
          </Link>
          
          {/* Masaüstü Menü */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled 
                    ? 'text-gray-800 hover:text-purple-700' 
                    : 'text-gray-900 hover:text-purple-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/iletisim"
              className="btn ml-4 bg-purple-700 hover:bg-purple-800 text-white py-2.5 px-5 rounded-lg text-sm font-medium transition-colors"
            >
              Bize Ulaşın
            </Link>
          </nav>
          
          {/* Mobil Menü Butonu */}
          <button
            type="button"
            className="md:hidden flex items-center text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Menüyü aç</span>
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 mt-2">
          <div className="container max-w-7xl mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-4 py-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className="text-gray-800 hover:text-purple-700 font-medium text-base py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/iletisim"
                className="btn bg-purple-700 hover:bg-purple-800 text-white py-2.5 px-5 rounded-lg text-sm font-medium transition-colors inline-block text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Bize Ulaşın
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
} 