"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import UrunEkleModal from "../components/UrunEkleModal";

// Font.register({
//   family: 'Roboto',
//   src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
// });

interface Urun {
  id: string;
  ad: string;
  kategori: string;
  fiyat: number;
  stok: number;
  durum: string;
  durumRenk: string;
}

// PDF stilleri
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

// Tekil ürün için PDF bileşeni
const TekilUrunFaturaPDF = ({ urun }: { urun: Urun }) => {
  const faturaNo = `GS${Math.floor(Math.random() * 1000000)}`;
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
                <Text style={styles.tableCell}>{urun.fiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Text>
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
            <Text style={styles.totalValue}>{urun.fiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Text>
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
          <Text style={styles.footerText}>KS1 Teknok - Güvenlik Sistemleri</Text>
          <Text style={styles.footerText}>www.ks1teknok.com</Text>
          <Text style={styles.footerText}>info@ks1teknok.com</Text>
        </View>
      </Page>
    </Document>
  );
};

const menu = [
  { name: "Dashboard", active: false, href: "/" },
  { name: "Güvenlik Sistemleri", active: true, href: "/guvenlik-sistemleri" },
  { name: "Ağ Teknolojileri", href: "/ag-teknolojileri" },
  { name: "Data Veri Güvenliği", href: "/data-veri-guvenligi" },
  { name: "Road Blocker", href: "/road-blocker" },
  { name: "Projeler", href: "/projeler" },
];

const guvenlikUrunleri = [
  { 
    ad: "IP Kamera - 4MP", 
    kategori: "Kamera Sistemleri",
    fiyat: "₺2,450",
    stok: "15",
    durum: "Aktif",
    durumRenk: "bg-green-100 text-green-700"
  },
  { 
    ad: "NVR - 16 Kanal", 
    kategori: "Kayıt Sistemleri",
    fiyat: "₺4,850",
    stok: "8",
    durum: "Aktif",
    durumRenk: "bg-green-100 text-green-700"
  },
  { 
    ad: "Geçiş Kontrol Sistemi", 
    kategori: "Kontrol Sistemleri",
    fiyat: "₺12,750",
    stok: "3",
    durum: "Aktif",
    durumRenk: "bg-green-100 text-green-700"
  },
  { 
    ad: "Alarm Paneli", 
    kategori: "Alarm Sistemleri",
    fiyat: "₺3,250",
    stok: "12",
    durum: "Aktif",
    durumRenk: "bg-green-100 text-green-700"
  },
];

const aktifProjeler = [
  { 
    no: "GS234612", 
    musteri: "Belediye Binası", 
    urun: "IP Kamera Sistemi", 
    durum: "Kurulum Aşamasında", 
    durumRenk: "bg-yellow-100 text-yellow-700" 
  },
  { 
    no: "GS234611", 
    musteri: "Plaza İş Merkezi", 
    urun: "Geçiş Kontrol Sistemi", 
    durum: "Tamamlandı", 
    durumRenk: "bg-green-100 text-green-700" 
  },
  { 
    no: "GS234609", 
    musteri: "Alışveriş Merkezi", 
    urun: "Alarm Sistemi", 
    durum: "Planlama Aşamasında", 
    durumRenk: "bg-blue-100 text-blue-700" 
  },
];

export default function GuvenlikSistemleri() {
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrunler();
  }, []);

  const fetchUrunler = async () => {
    try {
      const q = query(collection(db, "products"), where("kategori", "==", "Güvenlik Sistemleri"));
      const querySnapshot = await getDocs(q);
      const urunlerData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Urun[];
      setUrunler(urunlerData);
    } catch (error) {
      console.error("Ürünler yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Güvenlik Sistemleri</h1>
          <div className="flex items-center space-x-6">
            <a href="tel:05426513434" className="text-blue-600 font-medium">0542 651 34 34</a>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">KS</div>
              <span className="font-medium text-gray-700">Yönetici</span>
            </div>
          </div>
        </div>

        {/* Ürün Tablosu */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold text-lg">Güvenlik Sistemleri Ürünleri</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Yeni Ürün Ekle
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs">
                  <th className="text-left py-2">ÜRÜN ADI</th>
                  <th className="text-left py-2">KATEGORİ</th>
                  <th className="text-left py-2">FİYAT</th>
                  <th className="text-left py-2">STOK</th>
                  <th className="text-left py-2">DURUM</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">Yükleniyor...</td>
                  </tr>
                ) : urunler.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">Henüz ürün eklenmemiş</td>
                  </tr>
                ) : (
                  urunler.map((urun) => (
                    <tr key={urun.id} className="border-b last:border-b-0">
                      <td className="py-2 font-medium">{urun.ad}</td>
                      <td className="py-2">{urun.kategori}</td>
                      <td className="py-2">{urun.fiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                      <td className="py-2">{urun.stok}</td>
                      <td className="py-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urun.durumRenk}`}>
                          {urun.durum}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Aktif Projeler Tablosu */}
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
      </main>

      {/* Ürün Ekleme Modal */}
      <UrunEkleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        kategori="Güvenlik Sistemleri"
      />
    </div>
  );
} 