import React from 'react'

type StatsCardProps = {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: {
    value: number
    type: 'increase' | 'decrease' | 'neutral'
    period?: string
  }
  bgColor?: string
  textColor?: string
  borderColor?: string
  iconColor?: string
  iconBgColor?: string
}

function StatsCard({
  title,
  value,
  icon,
  change,
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  borderColor = 'border-gray-200',
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-100',
}: StatsCardProps) {
  // Değişimi gösterecek değerleri belirle
  const getChangeColor = () => {
    if (!change) return 'text-gray-500'
    
    switch (change.type) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      case 'neutral':
        return 'text-yellow-600'
      default:
        return 'text-gray-500'
    }
  }
  
  const getChangeIcon = () => {
    if (!change) return null
    
    switch (change.type) {
      case 'increase':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        )
      case 'decrease':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
          </svg>
        )
      case 'neutral':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        )
      default:
        return null
    }
  }
  
  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className={`mt-2 text-2xl font-semibold ${textColor}`}>{value}</h3>
            
            {change && (
              <div className={`flex items-center mt-2 text-sm ${getChangeColor()}`}>
                {getChangeIcon()}
                <span>
                  {Math.abs(change.value)}% 
                  {change.type === 'increase' ? ' artış' : change.type === 'decrease' ? ' azalış' : ' değişim'}
                  {change.period ? ` (${change.period})` : ''}
                </span>
              </div>
            )}
          </div>
          
          <div className={`p-3 rounded-lg ${iconBgColor} ${iconColor}`}>
            {icon}
          </div>
        </div>
      </div>
      
      {change && (
        <div className="h-1 w-full">
          <div 
            className={`h-full ${
              change.type === 'increase' ? 'bg-green-500' : 
              change.type === 'decrease' ? 'bg-red-500' : 
              change.type === 'neutral' ? 'bg-yellow-500' : 
              'bg-blue-500'
            }`}
            style={{ width: `${Math.min(Math.abs(change.value) * 2, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  )
}

export default StatsCard 