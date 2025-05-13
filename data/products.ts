export interface Product {
  id: number
  name: string
  description: string
  price: number
  oldPrice?: number
  category?: string
  stock?: number
  createdAt?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Bluetooth Hoparlör',
    description: 'Yüksek ses kalitesi ile taşınabilir hoparlör. Su geçirmez yapısı ve 20 saat pil ömrü ile ideal.',
    price: 499,
    oldPrice: 599,
    category: 'Ses Sistemleri',
    stock: 120,
    createdAt: '2023-09-15'
  },
  {
    id: 2,
    name: 'Kablosuz Mouse',
    description: 'Ergonomik tasarım ve uzun pil ömrü. Hassas sensör teknolojisi ile her yüzeyde mükemmel çalışır.',
    price: 299,
    oldPrice: 399,
    category: 'Bilgisayar Donanım',
    stock: 85,
    createdAt: '2023-10-03'
  },
  {
    id: 3,
    name: 'Mekanik Klavye',
    description: 'RGB aydınlatmalı mekanik tuşlar. Oyuncular ve profesyoneller için tasarlanmış dayanıklı yapı.',
    price: 899,
    oldPrice: 1099,
    category: 'Bilgisayar Donanım',
    stock: 42,
    createdAt: '2023-11-20'
  },
  {
    id: 4,
    name: 'Akıllı Saat',
    description: 'Kalp ritmi takibi, uyku analizi ve spor modları. Su geçirmez, şık tasarımlı akıllı saat.',
    price: 1299,
    oldPrice: 1499,
    category: 'Giyilebilir Teknoloji',
    stock: 30,
    createdAt: '2024-01-05'
  },
  {
    id: 5,
    name: 'Kablosuz Kulaklık',
    description: 'Aktif gürültü önleme teknolojisi ve 30 saat pil ömrü. Kristal netliğinde ses kalitesi sunar.',
    price: 799,
    oldPrice: 999,
    category: 'Ses Sistemleri',
    stock: 65,
    createdAt: '2024-02-12'
  },
  {
    id: 6,
    name: 'Powerbank 10000mAh',
    description: 'Hızlı şarj özellikli, ince ve hafif taşınabilir şarj cihazı. Birden fazla cihazı aynı anda şarj edebilir.',
    price: 399,
    category: 'Aksesuarlar',
    stock: 90,
    createdAt: '2024-03-08'
  }
] 