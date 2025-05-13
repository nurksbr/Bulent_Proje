'use client'

import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Topbar */}
        <Topbar />
        
        {/* Page content */}
        <main className="flex-grow p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="py-4 px-6 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} TikoPanel. Tüm hakları saklıdır.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
} 