'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  
  // Dışarı tıklandığında dropdown'ları kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current && 
        !notificationsRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-dropdown="notifications"]')
      ) {
        setShowNotifications(false)
      }
      
      if (
        userMenuRef.current && 
        !userMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-dropdown="user-menu"]')
      ) {
        setShowUserMenu(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 shadow-sm">
      <div className="flex items-center justify-between w-full">
        {/* Sol taraf - Sayfa başlığı veya Logo */}
        <div className="md:hidden">
          <button 
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-gray-800">Yönetim Paneli</h1>
        </div>
        
        {/* Orta - Arama */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Arama..."
            />
          </div>
        </div>
        
        {/* Sağ taraf - Bildirimler ve Kullanıcı Menüsü */}
        <div className="flex items-center space-x-3">
          {/* Arama ikonu (mobil) */}
          <button className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Bildirimler */}
          <div className="relative">
            <button
              data-dropdown="notifications"
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                setShowNotifications(!showNotifications)
                if (showUserMenu) setShowUserMenu(false)
              }}
            >
              <span className="sr-only">Bildirimleri görüntüle</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            
            {showNotifications && (
              <div 
                ref={notificationsRef}
                className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-2 px-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Bildirimler</h3>
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-500">
                      Tümünü okundu işaretle
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">Yeni bir sipariş aldınız</p>
                        <p className="text-xs text-gray-500 mt-1">2 dakika önce</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">Ürün fiyatları güncellendi</p>
                        <p className="text-xs text-gray-500 mt-1">1 saat önce</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">Sistem bakımı planlanan bildirim</p>
                        <p className="text-xs text-gray-500 mt-1">Dün</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2 px-4 border-t border-gray-100 text-center">
                  <Link 
                    href="/notifications"
                    className="text-xs font-medium text-blue-600 hover:text-blue-500"
                  >
                    Tüm bildirimleri gör
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Kullanıcı menüsü */}
          <div className="relative ml-3">
            <button
              data-dropdown="user-menu"
              className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                setShowUserMenu(!showUserMenu)
                if (showNotifications) setShowNotifications(false)
              }}
            >
              <span className="sr-only">Kullanıcı menüsü</span>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                  <span className="text-sm font-medium">AY</span>
                </div>
                <span className="hidden ml-2 text-sm text-gray-700 font-medium md:inline-block">
                  Ahmet Yılmaz
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:inline-block h-4 w-4 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
            
            {showUserMenu && (
              <div 
                ref={userMenuRef}
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Ahmet Yılmaz</p>
                    <p className="text-xs text-gray-500 mt-1">ahmet@example.com</p>
                  </div>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Hesap Ayarları
                  </Link>
                  <Link 
                    href="/help" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Yardım ve Destek
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 