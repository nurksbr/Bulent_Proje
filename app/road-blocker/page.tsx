"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import UrunEkleModal from "../components/UrunEkleModal";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface Urun {
  id: string;
  ad: string;
  kategori: string;
  fiyat: number;
  stok: number;
  durum: string;
  durumRenk: string;
}

interface Proje {
  no: string;
  musteri: string;
  urun: string;
  baslangic: string;
  bitis: string;
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
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1f2937'
  },
  section: {
    margin: 10,
    padding: 10
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 20
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 30,
    alignItems: 'center'
  },
  tableCol: {
    width: '25%',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    padding: 5
  },
  tableCell: {
    fontSize: 10,
    color: '#1f2937'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb'
  },
  totalLabel: {
    fontSize: 12,
    color: '#1f2937',
    marginRight: 10
  },
  totalValue: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: 'bold'
  }
});

// PDF Bileşeni
const TekilUrunFaturaPDF = ({ urun }: { urun: Urun }) => {
  const kdv = urun.fiyat * 0.18;
  const toplam = urun.fiyat + kdv;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Ürün Faturası</Text>
        </View>
        <View style={styles.section}>
          <Text>Ürün Adı: {urun.ad}</Text>
          <Text>Kategori: {urun.kategori}</Text>
          <Text>Fiyat: {urun.fiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Açıklama</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tutar</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Ürün Fiyatı</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{urun.fiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>KDV (%18)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{kdv.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Text>
            </View>
          </View>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Toplam:</Text>
          <Text style={styles.totalValue}>{toplam.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default function RoadBlocker() {
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aktifProjeler] = useState<Proje[]>([
    {
      no: "RB-2024-001",
      musteri: "Batman Belediyesi",
      urun: "Road Blocker 2000",
      baslangic: "01.03.2024",
      bitis: "15.03.2024",
      durum: "Kurulum Aşamasında",
      durumRenk: "bg-yellow-100 text-yellow-800"
    },
    {
      no: "RB-2024-002",
      musteri: "Batman Üniversitesi",
      urun: "Road Blocker 3000",
      baslangic: "10.03.2024",
      bitis: "25.03.2024",
      durum: "Planlama Aşamasında",
      durumRenk: "bg-blue-100 text-blue-800"
    },
    {
      no: "RB-2024-003",
      musteri: "Batman Valiliği",
      urun: "Road Blocker 4000",
      baslangic: "15.03.2024",
      bitis: "30.03.2024",
      durum: "Tamamlandı",
      durumRenk: "bg-green-100 text-green-800"
    }
  ]);

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
                      <td className="py-2">
                        <PDFDownloadLink
                          document={<TekilUrunFaturaPDF urun={urun} />}
                          fileName={`${urun.ad}-fatura-${new Date().toISOString().split('T')[0]}.pdf`}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? 'Hazırlanıyor...' : 'Fatura Oluştur'
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