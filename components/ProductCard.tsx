'use client'

import React from 'react'
import Image from 'next/image'
import { Product } from '@/data/products'

type ProductCardProps = Product & {
  onEdit?: (product: Product) => void
  onDelete?: (productId: number) => void
}

// Her ürün için bir görsel URL'si oluşturan fonksiyon
function getProductImage(id: number): string {
  // Ürün ID'sine göre kategori belirleme
  const categories = ['electronics', 'headphones', 'laptop', 'smartwatch', 'speaker'];
  const category = categories[(id - 1) % categories.length];
  
  // Placeholder görsel kullan
  return `https://placehold.co/300x200/e2e8f0/1e40af?text=${category.charAt(0).toUpperCase() + category.slice(1)}`;
}

function ProductCard({ 
  id, 
  name, 
  description, 
  price, 
  oldPrice, 
  category = 'Genel',
  stock = 100,
  createdAt,
  onEdit,
  onDelete
}: ProductCardProps) {
  // KDV dahil fiyat hesabı (%18)
  const taxIncludedPrice = price * 1.18
  
  // Fiyat formatı
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0
    }).format(value)
  }

  // İndirim yüzdesi hesaplama
  const getDiscountPercent = () => {
    if (!oldPrice || oldPrice <= price) return null
    return Math.round(((oldPrice - price) / oldPrice) * 100)
  }

  const discountPercent = getDiscountPercent()

  // Ürün düzenleme
  const handleEdit = () => {
    if (onEdit) {
      onEdit({
        id,
        name,
        description,
        price,
        oldPrice,
        category,
        stock,
        createdAt
      })
    }
  }

  // Ürün silme
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Ürün görsel alanı */}
      <div className="relative h-48 w-full bg-gray-200">
        <div className="w-full h-full relative">
          <Image 
            src={getProductImage(id)}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
          
          {discountPercent && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              %{discountPercent} İNDİRİM
            </div>
          )}
        </div>
      </div>
      
      {/* Ürün başlık kısmı */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center mt-1">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{category}</span>
              <span className="ml-2 text-xs text-gray-500">Ürün ID: {id}</span>
            </div>
          </div>
          
          {/* Ürün stok durumu */}
          <div className="flex flex-col items-end">
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              stock > 50 ? 'bg-green-100 text-green-700' : 
              stock > 10 ? 'bg-yellow-100 text-yellow-700' : 
              'bg-red-100 text-red-700'
            }`}>
              {stock > 50 ? 'Stokta' : stock > 10 ? 'Sınırlı Stok' : 'Tükeniyor'}
            </div>
            <span className="text-xs text-gray-500 mt-1">{stock} adet</span>
          </div>
        </div>
      </div>
      
      {/* Ürün içerik kısmı */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* Fiyat bilgileri */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center">
              {oldPrice && oldPrice > price && (
                <span className="text-gray-400 text-sm line-through mr-2">
                  {formatPrice(oldPrice)}
                </span>
              )}
              <span className="text-xl font-bold text-blue-600">{formatPrice(price)}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              KDV Dahil: {formatPrice(taxIncludedPrice)}
            </div>
          </div>
          
          {/* Hızlı işlem butonları */}
          <div className="flex space-x-2">
            <button 
              onClick={handleEdit}
              className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button 
              onClick={handleDelete}
              className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Alt butonlar */}
        <div className="flex space-x-2">
          <button 
            onClick={handleEdit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
          >
            Düzenle
          </button>
          <button 
            onClick={handleDelete}
            className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 text-sm font-medium py-2 px-3 rounded-md transition-colors"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 