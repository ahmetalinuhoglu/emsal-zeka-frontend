import { NextRequest, NextResponse } from 'next/server'

import { getBackendUrl } from '@/lib/config'

// Backend API URL - environment aware
const BACKEND_URL = getBackendUrl()

// Define types for the request data
interface SearchFilters {
  daire?: string
  category?: string
  keywords: string[]
}

interface SearchRequestData {
  query: string
  detailedQuery: string
  filters: SearchFilters
  page: number
  limit: number
}

// Forward search requests to Python backend
async function forwardToBackend(requestData: SearchRequestData) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      throw new Error(`Backend response: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Backend connection error:', error)
    
    // Fallback to basic response if backend is not available
    return {
      success: false,
      error: 'Backend bağlantısı kurulamadı. Backend server\'ının çalıştığından emin olun.'
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Forward the request to Python backend
    const backendResponse = await forwardToBackend(body)
    
    return NextResponse.json(backendResponse)
    
  } catch (error) {
    console.error('Frontend API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Frontend API hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata')
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const daire = searchParams.get('daire') || ''
  const category = searchParams.get('category') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  
  const requestData = {
    query,
    detailedQuery: '',
    filters: {
      daire: daire || undefined,
      category: category || undefined,
      keywords: []
    },
    page,
    limit
  }
  
  try {
    // Forward to backend
    const backendResponse = await forwardToBackend(requestData)
    return NextResponse.json(backendResponse)
    
  } catch (error) {
    console.error('Frontend API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Frontend API hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata')
      },
      { status: 500 }
    )
  }
} 