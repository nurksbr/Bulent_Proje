"use client";

import { useState } from "react";
import Link from "next/link";

const menu = [
  { name: "Dashboard", active: false, href: "/" },
  { name: "Güvenlik Sistemleri", active: false, href: "/guvenlik-sistemleri" },
  { name: "Ağ Teknolojileri", active: false, href: "/ag-teknolojileri" },
  { name: "Data Veri Güvenliği", active: false, href: "/data-veri-guvenligi" },
  { name: "Road Blocker", active: false, href: "/road-blocker" },
  { name: "Projeler", active: true, href: "/projeler" },
];

const tumProjeler = [
  // Güvenlik Sistemleri Projeleri
  { 
    no: "GS234612", 
    kategori: "Güvenlik Sistemleri",
    musteri: "Plaza İş Merkezi", 
    urun: "Kamera Sistemi", 
    durum: "Kurulum Aşamasında", 
    durumRenk: "bg-yellow-100 text-yellow-700",
    baslangic: "01.03.2024",
    bitis: "15.03.2024"
  },
  { 
    no: "GS234611", 
    kategori: "Güvenlik Sistemleri",
    musteri: "Alışveriş Merkezi", 
    urun: "Alarm Sistemi", 
    durum: "Tamamlandı", 
    durumRenk: "bg-green-100 text-green-700",
    baslangic: "15.02.2024",
    bitis: "28.02.2024"
  },
  { 
    no: "GS234609", 
    kategori: "Güvenlik Sistemleri",
    musteri: "Organize Sanayi", 
    urun: "Geçiş Kontrol", 
    durum: "Planlama Aşamasında", 
    durumRenk: "bg-blue-100 text-blue-700",
    baslangic: "01.04.2024",
    bitis: "15.04.2024"
  },

  // Ağ Teknolojileri Projeleri
  { 
    no: "AT234612", 
    kategori: "Ağ Teknolojileri",
    musteri: "Plaza İş Merkezi", 
    urun: "Ağ Altyapısı", 
    durum: "Kurulum Aşamasında", 
    durumRenk: "bg-yellow-100 text-yellow-700",
    baslangic: "01.03.2024",
    bitis: "20.03.2024"
  },
  { 
    no: "AT234611", 
    kategori: "Ağ Teknolojileri",
    musteri: "Alışveriş Merkezi", 
    urun: "WiFi Sistemi", 
    durum: "Tamamlandı", 
    durumRenk: "bg-green-100 text-green-700",
    baslangic: "01.02.2024",
    bitis: "15.02.2024"
  },
  { 
    no: "AT234609", 
    kategori: "Ağ Teknolojileri",
    musteri: "Organize Sanayi", 
    urun: "Fiber Optik Ağ", 
    durum: "Planlama Aşamasında", 
    durumRenk: "bg-blue-100 text-blue-700",
    baslangic: "01.04.2024",
    bitis: "30.04.2024"
  },

  // Data Veri Güvenliği Projeleri
  { 
    no: "DV234612", 
    kategori: "Data Veri Güvenliği",
    musteri: "Finans Bankası", 
    urun: "Veri Güvenliği Sistemi", 
    durum: "Kurulum Aşamasında", 
    durumRenk: "bg-yellow-100 text-yellow-700",
    baslangic: "01.03.2024",
    bitis: "25.03.2024"
  },
  { 
    no: "DV234611", 
    kategori: "Data Veri Güvenliği",
    musteri: "Sigorta Şirketi", 
    urun: "Yedekleme Sistemi", 
    durum: "Tamamlandı", 
    durumRenk: "bg-green-100 text-green-700",
    baslangic: "01.02.2024",
    bitis: "20.02.2024"
  },
  { 
    no: "DV234609", 
    kategori: "Data Veri Güvenliği",
    musteri: "Hastane", 
    urun: "Veri Şifreleme", 
    durum: "Planlama Aşamasında", 
    durumRenk: "bg-blue-100 text-blue-700",
    baslangic: "01.04.2024",
    bitis: "25.04.2024"
  },

  // Road Blocker Projeleri
  { 
    no: "RB234612", 
    kategori: "Road Blocker",
    musteri: "Belediye Binası", 
    urun: "Hidrolik Road Blocker", 
    durum: "Kurulum Aşamasında", 
    durumRenk: "bg-yellow-100 text-yellow-700",
    baslangic: "01.03.2024",
    bitis: "20.03.2024"
  },
  { 
    no: "RB234611", 
    kategori: "Road Blocker",
    musteri: "Hastane", 
    urun: "Elektrikli Road Blocker", 
    durum: "Tamamlandı", 
    durumRenk: "bg-green-100 text-green-700",
    baslangic: "01.02.2024",
    bitis: "15.02.2024"
  },
  { 
    no: "RB234609", 
    kategori: "Road Blocker",
    musteri: "Üniversite", 
    urun: "Yarı Otomatik Road Blocker", 
    durum: "Planlama Aşamasında", 
    durumRenk: "bg-blue-100 text-blue-700",
    baslangic: "01.04.2024",
    bitis: "25.04.2024"
  },
];

export default function Projeler() {
  const [selectedKategori, setSelectedKategori] = useState<string>("Tümü");
  const [selectedDurum, setSelectedDurum] = useState<string>("Tümü");

  const kategoriler = ["Tümü", ...new Set(tumProjeler.map(p => p.kategori))];
  const durumlar = ["Tümü", "Tamamlandı", "Kurulum Aşamasında", "Planlama Aşamasında"];

  const filteredProjeler = tumProjeler.filter(proje => {
    const kategoriMatch = selectedKategori === "Tümü" || proje.kategori === selectedKategori;
    const durumMatch = selectedDurum === "Tümü" || proje.durum === selectedDurum;
    return kategoriMatch && durumMatch;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sol Menü */}
      <aside className="w-64 bg-black text-white flex flex-col justify-between py-8 px-6">
        <div>
          <div className="flex items-center mb-10">
            <span className="text-2xl font-bold text-red-500">KS1</span>
            <span className="text-xl font-semibold ml-1">Teknok</span>
          </div>
          <nav className="space-y-2">
            {menu.map((item) => (
              <Link href={item.href} key={item.name}>
                <div
                  className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${item.active ? "bg-gray-900 text-white" : "hover:bg-gray-800 text-gray-300"}`}
                >
                  {item.name === "Dashboard" && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                  )}
                  {item.name === "Projeler" && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  )}
                  {item.name}
                </div>
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-xs text-gray-400 mt-8">
          <div className="mb-1">İLETİŞİM</div>
          <div>0542 651 34 34</div>
          <div>Gap Mah. Saygılar İş Merkezi</div>
          <div>Atatürk Blv. Kat:1/1</div>
          <div>Merkez / BATMAN</div>
        </div>
      </aside>

      {/* İçerik */}
      <main className="flex-1 p-8">
        {/* Üst Bilgi */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Projeler</h1>
          <div className="flex items-center space-x-6">
            <a href="tel:05426513434" className="text-blue-600 font-medium">0542 651 34 34</a>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">KS</div>
              <span className="font-medium text-gray-700">Yönetici</span>
            </div>
          </div>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
                className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              >
                {kategoriler.map((kategori) => (
                  <option key={kategori} value={kategori}>{kategori}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
              <select
                value={selectedDurum}
                onChange={(e) => setSelectedDurum(e.target.value)}
                className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              >
                {durumlar.map((durum) => (
                  <option key={durum} value={durum}>{durum}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Proje Tablosu */}
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold text-lg">Tüm Projeler</div>
            <div className="text-sm text-gray-500">
              Toplam {filteredProjeler.length} Proje
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs">
                  <th className="text-left py-2">PROJE NO</th>
                  <th className="text-left py-2">KATEGORİ</th>
                  <th className="text-left py-2">MÜŞTERİ</th>
                  <th className="text-left py-2">ÜRÜN</th>
                  <th className="text-left py-2">BAŞLANGIÇ</th>
                  <th className="text-left py-2">BİTİŞ</th>
                  <th className="text-left py-2">DURUM</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjeler.map((p) => (
                  <tr key={p.no} className="border-b last:border-b-0">
                    <td className="py-2 font-medium text-red-500">{p.no}</td>
                    <td className="py-2">{p.kategori}</td>
                    <td className="py-2">{p.musteri}</td>
                    <td className="py-2">{p.urun}</td>
                    <td className="py-2">{p.baslangic}</td>
                    <td className="py-2">{p.bitis}</td>
                    <td className="py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.durumRenk}`}>{p.durum}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 