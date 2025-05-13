'use client'

import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20 sm:py-32">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Dijital Dünyada <br />
                <span className="text-yellow-400">İşinizi Büyütün</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-xl">
                Şirketinizi dijital dünyada temsil etmek için ihtiyacınız olan tüm çözümler tek bir çatı altında. Web tasarım, mobil uygulama ve dijital pazarlama hizmetlerimizle yanınızdayız.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/hizmetler" className="btn bg-white text-purple-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
                  Hizmetlerimiz
                </Link>
                <Link href="/iletisim" className="btn border-2 border-white text-white hover:bg-white hover:text-purple-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  İletişime Geçin
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-400 rounded-lg opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-pink-500 rounded-lg opacity-50"></div>
                <Image 
                  src="/hero-image.svg" 
                  alt="Dijital Çözümler" 
                  width={600} 
                  height={400}
                  className="relative z-10 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Hizmetler Bölümü */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dijital dünyada ihtiyacınız olan tüm hizmetleri profesyonel ekibimizle sunuyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hizmet 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Web Tasarım ve Geliştirme</h3>
              <p className="text-gray-600 mb-6">
                Modern ve kullanıcı dostu web siteleri tasarlıyor, sizi dijital dünyada en iyi şekilde temsil ediyoruz.
              </p>
              <Link href="/hizmetler/web-tasarim" className="text-purple-700 font-medium hover:text-purple-800 flex items-center">
                Detaylı Bilgi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            {/* Hizmet 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobil Uygulama Geliştirme</h3>
              <p className="text-gray-600 mb-6">
                iOS ve Android platformları için modern, kullanıcı odaklı ve yüksek performanslı mobil uygulamalar geliştiriyoruz.
              </p>
              <Link href="/hizmetler/mobil-uygulama" className="text-blue-700 font-medium hover:text-blue-800 flex items-center">
                Detaylı Bilgi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            {/* Hizmet 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dijital Pazarlama</h3>
              <p className="text-gray-600 mb-6">
                SEO, SEM, sosyal medya yönetimi ve içerik pazarlaması ile markanızı dijital dünyada öne çıkarıyoruz.
              </p>
              <Link href="/hizmetler/dijital-pazarlama" className="text-green-700 font-medium hover:text-green-800 flex items-center">
                Detaylı Bilgi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/hizmetler" className="inline-block btn bg-purple-700 hover:bg-purple-800 text-white py-3 px-8 rounded-lg font-medium transition-colors">
              Tüm Hizmetlerimiz
            </Link>
          </div>
        </div>
      </section>
      
      {/* Neden Biz Bölümü */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Neden Bizi Tercih Etmelisiniz?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yılların deneyimi ve teknoloji tutkusu ile işimizi en iyi şekilde yapıyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Özellik 1 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hızlı Çözümler</h3>
              <p className="text-gray-600">
                Projelerinizi hızlı ve verimli bir şekilde tamamlıyor, vakit kaybetmeden sonuç alıyorsunuz.
              </p>
            </div>
            
            {/* Özellik 2 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Güvenli Altyapı</h3>
              <p className="text-gray-600">
                En son güvenlik teknolojileri ile geliştirdiğimiz sistemlerle verileriniz güvende.
              </p>
            </div>
            
            {/* Özellik 3 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Uzman Ekip</h3>
              <p className="text-gray-600">
                Alanında uzman ekibimizle en iyi hizmeti ve desteği alıyorsunuz.
              </p>
            </div>
            
            {/* Özellik 4 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">7/24 Destek</h3>
              <p className="text-gray-600">
                İhtiyacınız olduğunda her an yanınızdayız, sorularınızı hızlıca yanıtlıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Bölümü */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Projeniz için Teklif Alın</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-8">
              Fikirlerinizi gerçeğe dönüştürmek için hemen ücretsiz teklif alın. Uzman ekibimiz sizinle iletişime geçsin.
            </p>
            <Link href="/iletisim" className="inline-block btn bg-white text-purple-700 hover:bg-gray-100 py-3 px-8 rounded-lg font-medium transition-colors">
              Ücretsiz Teklif Alın
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
