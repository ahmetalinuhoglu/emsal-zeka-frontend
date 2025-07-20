// Environment configuration

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

export const config = {
  // Environment
  isDevelopment,
  isProduction,
  
  // Backend URLs
  backend: {
    url: isDevelopment 
      ? process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
      : process.env.NEXT_PUBLIC_BACKEND_URL || 'https://your-app.railway.app',
  },
  
  // Frontend URLs  
  frontend: {
    url: isDevelopment
      ? 'http://localhost:3000'  
      : 'https://your-app.vercel.app',
  },
  
  // API endpoints
  api: {
    search: '/api/search'
  }
}

// Utility functions
export const getBackendUrl = () => config.backend.url
export const getApiUrl = (endpoint: string) => `${config.backend.url}${endpoint}`

// Debug info (sadece development'ta)
if (isDevelopment) {
  console.log('🔧 Config loaded:', {
    environment: process.env.NODE_ENV,
    backendUrl: config.backend.url,
    frontendUrl: config.frontend.url
  })
} 