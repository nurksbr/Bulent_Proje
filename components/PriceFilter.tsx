'use client'

import React from 'react'

type PriceFilterProps = {
  maxPrice: number | null
  onFilterChange: (price: number | null) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

function PriceFilter({
  maxPrice,
  onFilterChange,
  searchTerm,
  onSearchChange
}: PriceFilterProps) {
  // Fiyat aralıkları için önceden belirlenmiş değerler
  const priceRanges = [
    { label: 'Tümü', value: null },
    { label: '₺500 ve altı', value: 500 },
    { label: '₺1000 ve altı', value: 1000 },
    { label: '₺2000 ve altı', value: 2000 },
    { label: '₺5000 ve altı', value: 5000 }
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-10 transition-all hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Ürün Filtreleme
      </h2>
      
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="flex-1">
          <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
            Ürün Ara
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Ürün adı..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <label htmlFor="priceFilter" className="block mb-2 text-sm font-medium text-gray-700">
            Maksimum Fiyat: <span className="font-bold text-indigo-600">{maxPrice ? `${maxPrice} ₺` : 'Filtre yok'}</span>
          </label>
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => onFilterChange(range.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    maxPrice === range.value 
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => onFilterChange(null)}
              className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Filtreyi Sıfırla
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceFilter