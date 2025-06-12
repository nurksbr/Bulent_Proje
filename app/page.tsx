"use client";

import { useState } from "react";
import Link from "next/link";

const menu = [
  { name: "Dashboard", active: true, href: "/" },
  { name: "Güvenlik Sistemleri", active: false, href: "/guvenlik-sistemleri" },
  { name: "Ağ Teknolojileri", href: "/ag-teknolojileri" },
  { name: "Data Veri Güvenliği", href: "/data-veri-guvenligi" },
  { name: "Road Blocker", href: "/road-blocker" },
  { name: "Projeler", href: "/projeler" },
];

const sonSatislar = [
  { no: "SP234612", musteri: "Belediye Binası", tutar: "₺124,850", durum: "Tamamlandı", durumRenk: "bg-green-100 text-green-700" },
  { no: "SP234611", musteri: "Plaza İş Merkezi", tutar: "₺56,730", durum: "Tamamlandı", durumRenk: "bg-green-100 text-green-700" },
  { no: "SP234609", musteri: "Alışveriş Merkezi", tutar: "₺212,750", durum: "İptal Edildi", durumRenk: "bg-red-100 text-red-700" },
  { no: "SP234608", musteri: "Organize Sanayi", tutar: "₺95,420", durum: "Tamamlandı", durumRenk: "bg-green-100 text-green-700" },
];

const kritikStok = [
  { ad: "Fiber Optik Kablo (500m)", kategori: "Ağ Teknolojileri", stok: "2 / 5", renk: "text-red-600", islem: true },
  { ad: "IP Kamera - 4MP", kategori: "Güvenlik Sistemleri", stok: "3 / 10", renk: "text-red-600", islem: true },
  { ad: "Mantar Bariyer", kategori: "Road Blocker", stok: "1 / 3", renk: "text-red-600", islem: true },
  { ad: "8 Port PoE Switch", kategori: "Ağ Teknolojileri", stok: "4 / 8", renk: "text-red-600", islem: true },
  { ad: "NVR - 16 Kanal", kategori: "Güvenlik Sistemleri", stok: "2 / 5", renk: "text-red-600", islem: true },
];

export default function Dashboard() {
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
                  {item.name === "Güvenlik Sistemleri" && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-6">
            <a href="tel:05426513434" className="text-blue-600 font-medium">0542 651 34 34</a>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">KS</div>
              <span className="font-medium text-gray-700">Yönetici</span>
            </div>
          </div>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-2">Toplam Ürün</div>
            <div className="text-3xl font-bold">146</div>
            <div className="text-green-600 text-xs mt-1">+8.5%</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-2">Toplam Satış</div>
            <div className="text-3xl font-bold">₺875,240</div>
            <div className="text-green-600 text-xs mt-1">+12.2%</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-2">Aktif Projeler</div>
            <div className="text-3xl font-bold">14</div>
            <div className="text-green-600 text-xs mt-1">+5.1%</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-2">Stok Uyarısı</div>
            <div className="text-3xl font-bold">8</div>
            <div className="text-red-600 text-xs mt-1">-2.3%</div>
          </div>
        </div>

        {/* Tablolar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Son Satışlar */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-lg">Son Satışlar</div>
              <a href="#" className="text-red-500 text-sm font-medium">Tümünü Görüntüle</a>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs">
                  <th className="text-left py-2">SİPARİŞ NO</th>
                  <th className="text-left py-2">MÜŞTERİ</th>
                  <th className="text-left py-2">TUTAR</th>
                  <th className="text-left py-2">DURUM</th>
                </tr>
              </thead>
              <tbody>
                {sonSatislar.map((s) => (
                  <tr key={s.no} className="border-b last:border-b-0">
                    <td className="py-2 font-medium text-red-500">{s.no}</td>
                    <td className="py-2">{s.musteri}</td>
                    <td className="py-2">{s.tutar}</td>
                    <td className="py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.durumRenk}`}>{s.durum}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Kritik Stok Uyarısı */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-lg">Kritik Stok Uyarısı</div>
              <a href="#" className="text-red-500 text-sm font-medium">Tüm Ürünler</a>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs">
                  <th className="text-left py-2">ÜRÜN ADI</th>
                  <th className="text-left py-2">KATEGORİ</th>
                  <th className="text-left py-2">STOK</th>
                  <th className="text-left py-2">İŞLEM</th>
                </tr>
              </thead>
              <tbody>
                {kritikStok.map((k) => (
                  <tr key={k.ad} className="border-b last:border-b-0">
                    <td className="py-2">{k.ad}</td>
                    <td className="py-2">{k.kategori}</td>
                    <td className={`py-2 font-semibold ${k.renk}`}>{k.stok}</td>
                    <td className="py-2">
                      {k.islem && <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Stok Ekle</button>}
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
