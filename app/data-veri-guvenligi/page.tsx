"use client";

import { useState } from "react";
import Link from "next/link";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

interface Urun {
  ad: string;
  kategori: string;
  fiyat: string;
  stok: string;
  durum: string;
  durumRenk: string;
}

// PDF stilleri (aynı stil dosyasını kullanıyoruz)
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53e3e',
    marginBottom: 5,
  },
  companyInfo: {
    fontSize: 10,
    color: '#4a5568',
    marginBottom: 2,
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2d3748',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2d3748',
  },
  table: {
    width: 'auto',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
    borderBottomStyle: 'solid',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
  },
  tableCol: {
    width: '25%',
  },
  tableCell: {
    fontSize: 10,
    color: '#4a5568',
  },
  headerCell: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    borderTopStyle: 'solid',
  },
  footerText: {
    fontSize: 9,
    color: '#718096',
    marginBottom: 3,
  },
  totalSection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 10,
    color: '#4a5568',
    width: 100,
    textAlign: 'right',
  },
  totalValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2d3748',
    width: 100,
    textAlign: 'right',
  },
  grandTotal: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e53e3e',
  },
  notes: {
    marginTop: 30,
    fontSize: 9,
    color: '#718096',
  }
});

const menu = [
  { name: "Dashboard", active: false, href: "/" },
  { name: "Güvenlik Sistemleri", active: false, href: "/guvenlik-sistemleri" },
  { name: "Ağ Teknolojileri", active: false, href: "/ag-teknolojileri" },
  { name: "Data Veri Güvenliği", active: true, href: "/data-veri-guvenligi" },
  { name: "Road Blocker", href: "/road-blocker" },
  { name: "Projeler", href: "/projeler" },
];

const dataUrunleri = [
  { 
    ad: "Veri Yedekleme Sistemi", 
    kategori: "Yedekleme",
    fiyat: "₺12,500",
    stok: "5",
    durum: "Aktif",
    durumRenk: "bg-green-100 text-green-700"
  },
  { 
    ad: "Güvenlik Duvarı", 
    kategori: "Güvenlik",
    fiyat: "₺8,750",
    stok: "8",
    durum: "Aktif",
    durumRenk: "bg-green-100 text-green-700"
  },
  { 
    ad: "Veri Şifreleme Yazılımı", 
    kategori: "Yazılım",
    fiyat: "₺4,250",
    stok: "15",
    durum: "Aktif",
    durumRenk: "bg-green-100 text-green-700"
  },
  { 
    ad: "Veri Kurtarma Paketi", 
    kategori: "Kurtarma",
    fiyat: "₺6,950",
    stok: "10",
    durum: "Aktif",
    durumRenk: "bg-green-100 text-green-700"
  },
];

const aktifProjeler = [
  { 
    no: "DV234612", 
    musteri: "Finans Bankası", 
    urun: "Veri Güvenliği Sistemi", 
    durum: "Kurulum Aşamasında", 
    durumRenk: "bg-yellow-100 text-yellow-700" 
  },
  { 
    no: "DV234611", 
    musteri: "Sigorta Şirketi", 
    urun: "Yedekleme Sistemi", 
    durum: "Tamamlandı", 
    durumRenk: "bg-green-100 text-green-700" 
  },
  { 
    no: "DV234609", 
    musteri: "Hastane", 
    urun: "Veri Şifreleme", 
    durum: "Planlama Aşamasında", 
    durumRenk: "bg-blue-100 text-blue-700" 
  },
];

// Tekil ürün için PDF bileşeni
const TekilUrunFaturaPDF = ({ urun }: { urun: Urun }) => {
  const faturaNo = `DV${Math.floor(Math.random() * 1000000)}`;
  const tarih = new Date().toLocaleDateString('tr-TR');
  const kdvOrani = 0.18; // %18 KDV
  const fiyat = parseFloat(urun.fiyat.replace('₺', '').replace(',', ''));
  const kdvTutari = fiyat * kdvOrani;
  const genelToplam = fiyat + kdvTutari;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Başlık Bölümü */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>KS1 Teknok</Text>
            <Text style={styles.companyInfo}>Gap Mah. Saygılar İş Merkezi</Text>
            <Text style={styles.companyInfo}>Atatürk Blv. Kat:1/1</Text>
            <Text style={styles.companyInfo}>Merkez / BATMAN</Text>
            <Text style={styles.companyInfo}>Tel: 0542 651 34 34</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.companyInfo}>Vergi Dairesi: Batman</Text>
            <Text style={styles.companyInfo}>Vergi No: 1234567890</Text>
            <Text style={styles.companyInfo}>Mersis No: 0123456789100001</Text>
          </View>
        </View>

        <Text style={styles.invoiceTitle}>FATURA</Text>

        {/* Fatura Bilgileri */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FATURA BİLGİLERİ</Text>
          <Text style={styles.tableCell}>Fatura No: {faturaNo}</Text>
          <Text style={styles.tableCell}>Fatura Tarihi: {tarih}</Text>
        </View>

        {/* Ürün Tablosu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ÜRÜN BİLGİLERİ</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.headerCell}>Ürün Adı</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.headerCell}>Kategori</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.headerCell}>Birim Fiyat</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.headerCell}>Stok</Text>
              </View>
            </View>
            
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{urun.ad}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{urun.kategori}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{urun.fiyat}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{urun.stok}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Toplam Bölümü */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Ara Toplam:</Text>
            <Text style={styles.totalValue}>{urun.fiyat}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>KDV (%18):</Text>
            <Text style={styles.totalValue}>₺{kdvTutari.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Genel Toplam:</Text>
            <Text style={[styles.totalValue, styles.grandTotal]}>₺{genelToplam.toFixed(2)}</Text>
          </View>
        </View>

        {/* Notlar */}
        <View style={styles.notes}>
          <Text>Notlar:</Text>
          <Text>1. Bu fatura elektronik ortamda oluşturulmuştur.</Text>
          <Text>2. Ödeme 30 gün içinde yapılmalıdır.</Text>
          <Text>3. Fatura iade süresi 14 gündür.</Text>
        </View>

        {/* Alt Bilgi */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>KS1 Teknok - Data Veri Güvenliği</Text>
          <Text style={styles.footerText}>www.ks1teknok.com</Text>
          <Text style={styles.footerText}>info@ks1teknok.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default function DataVeriGuvenligi() {
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
                  {item.name === "Data Veri Güvenliği" && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
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
          <h1 className="text-2xl font-bold text-gray-900">Data Veri Güvenliği</h1>
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
            <div className="text-3xl font-bold">28</div>
            <div className="text-green-600 text-xs mt-1">+4.8%</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-2">Aktif Projeler</div>
            <div className="text-3xl font-bold">6</div>
            <div className="text-green-600 text-xs mt-1">+1.5%</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-2">Tamamlanan Projeler</div>
            <div className="text-3xl font-bold">42</div>
            <div className="text-green-600 text-xs mt-1">+8.2%</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-2">Stok Uyarısı</div>
            <div className="text-3xl font-bold">3</div>
            <div className="text-red-600 text-xs mt-1">-2.1%</div>
          </div>
        </div>

        {/* Tablolar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data Ürünleri */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-lg">Data Ürünleri</div>
              <a href="#" className="text-red-500 text-sm font-medium">Tüm Ürünler</a>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs">
                  <th className="text-left py-2">ÜRÜN ADI</th>
                  <th className="text-left py-2">KATEGORİ</th>
                  <th className="text-left py-2">FİYAT</th>
                  <th className="text-left py-2">STOK</th>
                  <th className="text-left py-2">DURUM</th>
                  <th className="text-left py-2">İŞLEM</th>
                </tr>
              </thead>
              <tbody>
                {dataUrunleri.map((u) => (
                  <tr key={u.ad} className="border-b last:border-b-0">
                    <td className="py-2 font-medium">{u.ad}</td>
                    <td className="py-2">{u.kategori}</td>
                    <td className="py-2">{u.fiyat}</td>
                    <td className="py-2">{u.stok}</td>
                    <td className="py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${u.durumRenk}`}>{u.durum}</span>
                    </td>
                    <td className="py-2">
                      <PDFDownloadLink
                        document={<TekilUrunFaturaPDF urun={u} />}
                        fileName={`${u.ad.toLowerCase().replace(/\s+/g, '-')}-fatura-${new Date().toISOString().split('T')[0]}.pdf`}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? 'Hazırlanıyor...' : 'Fatura Oluştur'
                        }
                      </PDFDownloadLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Aktif Projeler */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-lg">Aktif Projeler</div>
              <a href="#" className="text-red-500 text-sm font-medium">Tüm Projeler</a>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs">
                  <th className="text-left py-2">PROJE NO</th>
                  <th className="text-left py-2">MÜŞTERİ</th>
                  <th className="text-left py-2">ÜRÜN</th>
                  <th className="text-left py-2">DURUM</th>
                </tr>
              </thead>
              <tbody>
                {aktifProjeler.map((p) => (
                  <tr key={p.no} className="border-b last:border-b-0">
                    <td className="py-2 font-medium text-red-500">{p.no}</td>
                    <td className="py-2">{p.musteri}</td>
                    <td className="py-2">{p.urun}</td>
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