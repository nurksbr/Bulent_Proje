"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import UrunEkleModal from "../components/UrunEkleModal";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { aktifProjeler, Proje } from "@/app/data/projeler";

interface Urun {
  id: string;
  ad: string;
  kategori: string;
  fiyat: number;
  stok: number;
  durum: string;
  durumRenk: string;
}

const menu = [
  { name: "Dashboard", active: false, href: "/" },
  { name: "Güvenlik Sistemleri", active: false, href: "/guvenlik-sistemleri" },
  { name: "Ağ Teknolojileri", active: false, href: "/ag-teknolojileri" },
  { name: "Data Veri Güvenliği", active: false, href: "/data-veri-guvenligi" },
  { name: "Road Blocker", active: true, href: "/road-blocker" },
  { name: "Projeler", active: false, href: "/projeler" },
];

// PDF Stilleri
const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
    paddingBottom: 12,
  },
  logo: {
    width: 64,
    height: 64,
  },
  companyInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53e3e',
    marginBottom: 2,
  },
  companyDetails: {
    fontSize: 10,
    color: '#4a5568',
    marginBottom: 1,
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#2d3748',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoBlock: {
    flexDirection: 'column',
  },
  infoLabel: {
    fontSize: 10,
    color: '#718096',
  },
  infoValue: {
    fontSize: 11,
    color: '#1a202c',
    fontWeight: 'bold',
  },
  table: {
    display: 'flex',
    width: 'auto',
    marginTop: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 24,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f7fafc',
  },
  tableCol: {
    width: '25%',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    padding: 6,
  },
  tableCell: {
    fontSize: 10,
    color: '#1f2937',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 12,
    color: '#1f2937',
    marginRight: 10,
  },
  totalValue: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  notes: {
    marginTop: 24,
    fontSize: 9,
    color: '#718096',
  },
  footer: {
    marginTop: 32,
    fontSize: 9,
    color: '#718096',
    textAlign: 'center',
  },
});

// PDF Bileşeni
const TekilUrunFaturaPDF = ({ urun }: { urun: Urun }) => {
  const kdv = urun.fiyat * 0.18;
  const toplam = urun.fiyat + kdv;
  const tarih = new Date().toLocaleDateString('tr-TR');
  const faturaNo = `RB${String(urun.id).slice(-6).padStart(6, '0')}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header & Logo */}
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.logo} />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>KS1 TEKNOLOJİ</Text>
            <Text style={styles.companyDetails}>Gap Mah. Saygılar İş Merkezi</Text>
            <Text style={styles.companyDetails}>Atatürk Blv. Kat:1/1</Text>
            <Text style={styles.companyDetails}>Merkez / BATMAN</Text>
            <Text style={styles.companyDetails}>Tel: 0542 651 34 34</Text>
            <Text style={styles.companyDetails}>Vergi Dairesi: Batman</Text>
            <Text style={styles.companyDetails}>Vergi No: 1234567890</Text>
          </View>
        </View>
        <Text style={styles.invoiceTitle}>FATURA</Text>
        {/* Fatura ve Müşteri Bilgileri */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Fatura No</Text>
            <Text style={styles.infoValue}>{faturaNo}</Text>
            <Text style={styles.infoLabel}>Fatura Tarihi</Text>
            <Text style={styles.infoValue}>{tarih}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Müşteri</Text>
            <Text style={styles.infoValue}>Genel Müşteri</Text>
            <Text style={styles.infoLabel}>Adres</Text>
            <Text style={styles.infoValue}>Batman, Türkiye</Text>
          </View>
        </View>
        {/* Ürün Tablosu */}
        <View style={[styles.table, { marginTop: 24 }]}> 
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Ürün Adı</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Kategori</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Fiyat</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>KDV (%18)</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{urun.ad}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{urun.kategori}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{urun.fiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{kdv.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Text></View>
          </View>
        </View>
        {/* Toplamlar */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Genel Toplam:</Text>
          <Text style={styles.totalValue}>{toplam.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Text>
        </View>
        {/* Notlar */}
        <Text style={styles.notes}>Bu fatura elektronik ortamda oluşturulmuştur. Ödeme süresi 30 gündür. Fatura iade süresi 14 gündür.</Text>
        {/* Footer */}
        <Text style={styles.footer}>KS1 TEKNOLOJİ - Road Blocker | www.ks1teknok.com | info@ks1teknok.com</Text>
      </Page>
    </Document>
  );
};

export default function RoadBlocker() {
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrunler();
  }, []);

  const fetchUrunler = async () => {
    try {
      const q = query(collection(db, "products"), where("kategori", "==", "Road Blocker"));
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
          <h1 className="text-2xl font-bold text-gray-900">Road Blocker</h1>
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
            <div className="font-semibold text-lg">Road Blocker Ürünleri</div>
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
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ürün Adı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İŞLEM</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">Yükleniyor...</td>
                  </tr>
                ) : urunler.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">Henüz ürün eklenmemiş</td>
                  </tr>
                ) : (
                  urunler.map((urun) => (
                    <tr key={urun.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{urun.ad}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{urun.kategori}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {urun.fiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{urun.stok}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${urun.durumRenk}`}
                        >
                          {urun.durum}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <PDFDownloadLink
                          document={<TekilUrunFaturaPDF urun={urun} />}
                          fileName={`${urun.ad}-fatura.pdf`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? 'Yükleniyor...' : 'Fatura İndir'
                          }
                        </PDFDownloadLink>
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs">
                  <th className="text-left py-2">PROJE NO</th>
                  <th className="text-left py-2">MÜŞTERİ</th>
                  <th className="text-left py-2">ÜRÜN</th>
                  <th className="text-left py-2">BAŞLANGIÇ</th>
                  <th className="text-left py-2">BİTİŞ</th>
                  <th className="text-left py-2">DURUM</th>
                </tr>
              </thead>
              <tbody>
                {aktifProjeler.map((p) => (
                  <tr key={p.no} className="border-b last:border-b-0">
                    <td className="py-2 font-medium text-red-500">{p.no}</td>
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

      {/* Ürün Ekleme Modal */}
      <UrunEkleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        kategori="Road Blocker"
      />
    </div>
  );
} 