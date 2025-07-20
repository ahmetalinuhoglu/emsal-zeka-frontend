import { create } from 'zustand'

export interface Decision {
  id: string
  title: string
  summary: string
  fullText?: string
  date: string
  daire: string
  category: string
  keywords: string[]
  relevanceScore?: number
}

export interface SearchFilters {
  daire?: string
  category?: string
  dateFrom?: string
  dateTo?: string
  keywords: string[]
}

interface SearchState {
  // Search Query
  query: string
  detailedQuery: string
  filters: SearchFilters
  
  // Results
  results: Decision[]
  totalResults: number
  currentPage: number
  isLoading: boolean
  error: string | null
  llmAnalysis: string | null
  
  // Actions
  setQuery: (query: string) => void
  setDetailedQuery: (query: string) => void
  setFilters: (filters: Partial<SearchFilters>) => void
  clearFilters: () => void
  
  // Search actions
  search: () => Promise<void>
  loadMore: () => Promise<void>
  clearResults: () => void
  
  // Result actions
  setResults: (results: Decision[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setLlmAnalysis: (analysis: string | null) => void
}

const initialFilters: SearchFilters = {
  keywords: []
}

export const useSearchStore = create<SearchState>((set, get) => ({
  // Initial state
  query: '',
  detailedQuery: '',
  filters: initialFilters,
  results: [],
  totalResults: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  llmAnalysis: null,
  
  // Basic setters
  setQuery: (query) => set({ query }),
  setDetailedQuery: (detailedQuery) => set({ detailedQuery }),
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  clearFilters: () => set({ filters: initialFilters }),
  
  // Search actions
  search: async () => {
    const { query, detailedQuery, filters } = get()
    
    if (!query.trim() && !detailedQuery.trim()) {
      set({ error: 'Arama sorgusu boş olamaz' })
      return
    }
    
    set({ isLoading: true, error: null, currentPage: 1 })
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          detailedQuery,
          filters,
          page: 1,
          limit: 10
        })
      })
      
      if (!response.ok) {
        throw new Error('Arama isteği başarısız')
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Arama sırasında bir hata oluştu')
      }
      
      set({ 
        results: data.data.results, 
        totalResults: data.data.totalResults,
        currentPage: data.data.currentPage,
        llmAnalysis: data.data.llm_analysis || null,
        isLoading: false 
      })
      
    } catch (error) {
      let errorMessage = 'Arama sırasında bir hata oluştu'
      
      if (error instanceof Error) {
        if (error.message.includes('Backend bağlantısı')) {
          errorMessage = 'Backend server\'ına bağlanılamıyor. Lütfen backend server\'ının çalıştığından emin olun.'
        } else {
          errorMessage = error.message
        }
      }
      
      set({ 
        error: errorMessage,
        isLoading: false,
        llmAnalysis: null
      })
    }
  },
  
  loadMore: async () => {
    const { currentPage, isLoading, query, detailedQuery, filters } = get()
    
    if (isLoading) return
    
    set({ isLoading: true })
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          detailedQuery,
          filters,
          page: currentPage + 1,
          limit: 10
        })
      })
      
      if (!response.ok) {
        throw new Error('Daha fazla sonuç yüklenirken hata oluştu')
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Daha fazla sonuç yüklenirken hata oluştu')
      }
      
      set((state) => ({
        results: [...state.results, ...data.data.results],
        currentPage: data.data.currentPage,
        isLoading: false
      }))
      
    } catch (error) {
      let errorMessage = 'Daha fazla sonuç yüklenirken hata oluştu'
      
      if (error instanceof Error) {
        if (error.message.includes('Backend bağlantısı')) {
          errorMessage = 'Backend server\'ına bağlanılamıyor. Lütfen backend server\'ının çalıştığından emin olun.'
        } else {
          errorMessage = error.message
        }
      }
      
      set({ 
        error: errorMessage,
        isLoading: false 
      })
    }
  },
  
  clearResults: () => set({ 
    results: [], 
    totalResults: 0, 
    currentPage: 1,
    error: null,
    llmAnalysis: null
  }),
  
  // Direct setters for API integration
  setResults: (results) => set({ results }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setLlmAnalysis: (llmAnalysis) => set({ llmAnalysis }),
})) 