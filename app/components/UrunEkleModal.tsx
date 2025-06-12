"use client";

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface UrunEkleModalProps {
  isOpen: boolean;
  onClose: () => void;
  kategori: string;
}

export default function UrunEkleModal({ isOpen, onClose, kategori }: UrunEkleModalProps) {
  const [urun, setUrun] = useState({
    ad: '',
    kategori: kategori,
    fiyat: '',
    stok: '',
    durum: 'Aktif',
    durumRenk: 'bg-green-100 text-green-700'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...urun,
        fiyat: parseFloat(urun.fiyat),
        stok: parseInt(urun.stok),
        createdAt: new Date()
      });
      console.log("Ürün başarıyla eklendi:", docRef.id);
      onClose();
      setUrun({
        ad: '',
        kategori: kategori,
        fiyat: '',
        stok: '',
        durum: 'Aktif',
        durumRenk: 'bg-green-100 text-green-700'
      });
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Yeni Ürün Ekle</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ürün Adı
            </label>
            <input
              type="text"
              value={urun.ad}
              onChange={(e) => setUrun({ ...urun, ad: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fiyat
            </label>
            <input
              type="number"
              value={urun.fiyat}
              onChange={(e) => setUrun({ ...urun, fiyat: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stok
            </label>
            <input
              type="number"
              value={urun.stok}
              onChange={(e) => setUrun({ ...urun, stok: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durum
            </label>
            <select
              value={urun.durum}
              onChange={(e) => {
                const durum = e.target.value;
                const durumRenk = durum === 'Aktif' 
                  ? 'bg-green-100 text-green-700'
                  : durum === 'Pasif'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700';
                setUrun({ ...urun, durum, durumRenk });
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="Aktif">Aktif</option>
              <option value="Pasif">Pasif</option>
              <option value="Beklemede">Beklemede</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 