export interface Proje {
  no: string;
  musteri: string;
  urun: string;
  baslangic: string;
  bitis: string;
  durum: string;
  durumRenk: string;
}

export const aktifProjeler: Proje[] = [
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
]; 