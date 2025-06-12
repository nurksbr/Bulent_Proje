'use client'

import MainLayout from '@/components/layout/MainLayout'

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Hakkımızda</h1>
        <p className="text-lg text-gray-600 mb-12">
          TikoBilişim olarak, teknoloji ve bilişim alanında en iyi çözümleri sunmak için çalışıyoruz.
        </p>
      </div>
    </MainLayout>
  )
} 