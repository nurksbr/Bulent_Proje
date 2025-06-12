'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MenuGroup = {
  id: string
  title: string
  items: MenuItem[]
}

type MenuItem = {
  id: string
  title: string
  icon: React.ReactNode
  path: string
  badge?: {
    count: number
    color: string
  }
  children?: MenuItem[]
}

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({})
  
  // Responsive davranış için medya sorgusu
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])
  
  // Mobil görünümde sayfa değiştiğinde sidebar'ı kapat
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])
  
  // Sidebar açıkken dışarı tıklanınca kapat (sadece mobil görünümde)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        isMobile && 
        isOpen && 
        !target.closest('[data-sidebar]') && 
        !target.closest('[data-sidebar-toggle]')
      ) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobile, isOpen])
  
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])
  
  const handleSubmenuToggle = (id: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }))
  }
  
  // Sidebar menüsü için veri 
  const menuGroups: MenuGroup[] = [
    {
      id: 'main',
      title: 'Menü',
      items: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          path: '/',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          ),
        },
        {
          id: 'guvenlik',
          title: 'Güvenlik Sistemleri',
          path: '/guvenlik',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 2l7.997 3.884A2 2 0 0120 7.764V17a2 2 0 01-2 2H2a2 2 0 01-2-2V7.764a2 2 0 01.003-1.88zM10 4.236L4 6.618V17h12V6.618l-6-2.382z" />
            </svg>
          ),
        },
        {
          id: 'roadblocker',
          title: 'Road Blocker',
          path: '/roadblocker',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 2h10v10H5V5z" />
            </svg>
          ),
        },
        {
          id: 'projeler',
          title: 'Projeler',
          path: '/projeler',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5zm2 2v2h2V7H7zm0 4v2h2v-2H7zm4-4v2h2V7h-2zm0 4v2h2v-2h-2z" />
            </svg>
          ),
          children: [
            {
              id: 'satin-alim',
              title: 'Satın Alım',
              path: '/projeler/satin-alim',
            },
            {
              id: 'pdf-yazdir',
              title: 'PDF Yazdır',
              path: '/projeler/pdf-yazdir',
            },
            {
              id: 'fatura-olustur',
              title: 'Fatura Oluştur',
              path: '/projeler/fatura-olustur',
            },
          ],
        },
      ]
    }
  ]

  // Aktif menü öğesini kontrol et
  const isActive = useCallback((path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }, [pathname])

  return (
    <>
      {/* Mobil sidebar toggle */}
      <button
        type="button"
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={toggle}
        data-sidebar-toggle
        aria-label="Toggle Sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        data-sidebar
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200 lg:z-10`}
      >
        {/* Logo Alanı */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
          <Link href="/" className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-blue-600" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-800">TikoPanel</span>
          </Link>
          
          {/* Mobil kapatma butonu */}
          {isMobile && (
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Menü içeriği */}
        <div className="h-full overflow-y-auto pt-4 pb-20">
          <nav className="space-y-6 px-2">
            {menuGroups.map((group) => (
              <div key={group.id} className="space-y-1">
                <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {group.title}
                </h3>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md focus:outline-none transition-colors ${
                              isActive(item.path)
                                ? 'text-blue-700 bg-blue-50'
                                : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                            }`}
                            onClick={() => handleSubmenuToggle(item.id)}
                          >
                            <span className={`mr-3 ${
                              isActive(item.path) ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                            }`}>
                              {item.icon}
                            </span>
                            <span className="flex-1 truncate text-left">{item.title}</span>
                            <svg className={`ml-2 h-4 w-4 transition-transform ${openSubmenus[item.id] ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                          </button>
                          {openSubmenus[item.id] && (
                            <ul className="ml-8 mt-1 space-y-1">
                              {item.children.map((child) => (
                                <li key={child.id}>
                                  <Link
                                    href={child.path}
                                    className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                      isActive(child.path)
                                        ? 'text-blue-700 bg-blue-50'
                                        : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    {child.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.path}
                          className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                            isActive(item.path)
                              ? 'text-blue-700 bg-blue-50'
                              : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`mr-3 ${
                            isActive(item.path) ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                          }`}>
                            {item.icon}
                          </span>
                          <span className="flex-1 truncate">{item.title}</span>
                          {item.badge && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${item.badge.color}`}>
                              {item.badge.count}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        
        {/* Footer alanı */}
        <div className="absolute bottom-0 w-full border-t border-gray-200 bg-white p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                <span className="text-sm font-medium">AY</span>
              </div>
            </div>
            <div className="ml-3 min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-700 truncate">Ahmet Yılmaz</p>
              <p className="text-xs text-gray-500 truncate">ahmet@example.com</p>
            </div>
            <button className="ml-auto p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
} 