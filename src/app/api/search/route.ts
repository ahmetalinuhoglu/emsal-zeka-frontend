import { NextRequest, NextResponse } from 'next/server'
import type { Decision, SearchFilters } from '@/stores/searchStore'

// Mock data - Later this will come from Python backend/database
const mockDecisions: Decision[] = [
  {
    id: '1',
    title: "Yargıtay 4. Hukuk Dairesi - 2024/1542",
    summary: "Trafik kazasından doğan maddi ve manevi tazminat talebinin değerlendirilmesi, kusur oranının belirlenmesi. Davacının %30 kusuru bulunduğu tespit edilmiş, tazminat miktarı bu oranda azaltılmıştır.",
    fullText: "YARGITAY 4. HUKUK DAİRESİ\nEsas No: 2024/1542\nKarar No: 2024/3856\n\nTrafik kazasından doğan maddi ve manevi tazminat davası...",
    date: "2024-03-15",
    category: "Tazminat",
    daire: "4. Hukuk Dairesi",
    keywords: ["Trafik Kazası", "Tazminat", "Kusur", "Maddi Zarar", "Manevi Zarar"],
    relevanceScore: 0.95
  },
  {
    id: '2',
    title: "Yargıtay 2. Hukuk Dairesi - 2024/891",
    summary: "Sigorta şirketi aleyhine açılan tazminat davasında, sigorta poliçesi kapsamının belirlenmesi ve teminat limitlerinin değerlendirilmesi. Sigorta şirketi sorumlu tutulmuştur.",
    fullText: "YARGITAY 2. HUKUK DAİRESİ\nEsas No: 2024/891\nKarar No: 2024/2341\n\nSigorta şirketi aleyhine tazminat davası...",
    date: "2024-03-12",
    category: "Sigorta",
    daire: "2. Hukuk Dairesi",
    keywords: ["Sigorta", "Poliçe", "Tazminat", "Teminat", "Sigorta Şirketi"],
    relevanceScore: 0.87
  },
  {
    id: '3',
    title: "Yargıtay 9. Hukuk Dairesi - 2024/634",
    summary: "İş kazasından doğan tazminat davasında işverenin sorumluluğu ve iş güvenliği önlemlerinin değerlendirilmesi. İşveren tam sorumlu bulunmuştur.",
    date: "2024-03-10",
    category: "İş Hukuku",
    daire: "9. Hukuk Dairesi",
    keywords: ["İş Kazası", "İşveren Sorumluluğu", "İş Güvenliği", "Tazminat"],
    relevanceScore: 0.82
  },
  {
    id: '4',
    title: "Yargıtay 6. Hukuk Dairesi - 2024/445",
    summary: "Gayrimenkul alım-satım sözleşmesinden doğan uyuşmazlık. Satıcının ayıplı ifa sorumluluğu ve alıcının sözleşmeden dönme hakkı incelenmiştir.",
    date: "2024-03-08",
    category: "Gayrimenkul",
    daire: "6. Hukuk Dairesi",
    keywords: ["Gayrimenkul", "Alım-Satım", "Ayıplı İfa", "Sözleşmeden Dönme"],
    relevanceScore: 0.78
  },
  {
    id: '5',
    title: "Yargıtay 3. Hukuk Dairesi - 2024/756",
    summary: "Boşanma davasında mal rejimi ve nafaka konularının değerlendirilmesi. Eşlerin ekonomik durumları dikkate alınarak nafaka miktarı belirlenmiştir.",
    date: "2024-03-05",
    category: "Aile Hukuku",
    daire: "3. Hukuk Dairesi",
    keywords: ["Boşanma", "Mal Rejimi", "Nafaka", "Eş Hakları"],
    relevanceScore: 0.75
  }
]

// Simple search algorithm (will be replaced with AI-powered search)
function searchDecisions(query: string, detailedQuery: string, filters: SearchFilters): Decision[] {
  let results = [...mockDecisions]
  
  // Filter by daire
  if (filters.daire) {
    results = results.filter(d => d.daire === filters.daire)
  }
  
  // Filter by category
  if (filters.category) {
    results = results.filter(d => d.category === filters.category)
  }
  
  // Filter by date range
  if (filters.dateFrom) {
    results = results.filter(d => new Date(d.date) >= new Date(filters.dateFrom!))
  }
  
  if (filters.dateTo) {
    results = results.filter(d => new Date(d.date) <= new Date(filters.dateTo!))
  }
  
  // Text search
  const searchTerms = [query, detailedQuery].filter(Boolean).join(' ').toLowerCase()
  
  if (searchTerms) {
    results = results.filter(decision => {
      const searchableText = [
        decision.title,
        decision.summary,
        decision.fullText || '',
        ...decision.keywords
      ].join(' ').toLowerCase()
      
      return searchableText.includes(searchTerms)
    })
    
    // Calculate relevance score based on keyword matches
    results.forEach(decision => {
      const searchableText = [
        decision.title,
        decision.summary,
        ...decision.keywords
      ].join(' ').toLowerCase()
      
      const matches = searchTerms.split(' ').filter(term => 
        term.length > 2 && searchableText.includes(term)
      ).length
      
      decision.relevanceScore = Math.min(0.5 + (matches * 0.1), 0.99)
    })
    
    // Sort by relevance
    results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
  }
  
  return results
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query = '', detailedQuery = '', filters = {}, page = 1, limit = 10 } = body
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Perform search
    const results = searchDecisions(query, detailedQuery, filters)
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResults = results.slice(startIndex, endIndex)
    
    return NextResponse.json({
      success: true,
      data: {
        results: paginatedResults,
        totalResults: results.length,
        currentPage: page,
        totalPages: Math.ceil(results.length / limit),
        hasMore: endIndex < results.length
      }
    })
    
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Arama sırasında bir hata oluştu' 
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
  
  const filters: SearchFilters = {
    daire: daire || undefined,
    category: category || undefined,
    keywords: []
  }
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const results = searchDecisions(query, '', filters)
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResults = results.slice(startIndex, endIndex)
    
    return NextResponse.json({
      success: true,
      data: {
        results: paginatedResults,
        totalResults: results.length,
        currentPage: page,
        totalPages: Math.ceil(results.length / limit),
        hasMore: endIndex < results.length
      }
    })
    
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Arama sırasında bir hata oluştu' 
      },
      { status: 500 }
    )
  }
} 