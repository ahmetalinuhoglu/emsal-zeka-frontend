'use client'

import { useState } from 'react'
import { Search, Loader2, MessageSquare, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Removed unused import

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!query.trim()) {
      setError('Lütfen bir soru yazın')
      return
    }

    setIsLoading(true)
    setError(null)
    setResponse('')

    try {
      const result = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          detailedQuery: '',
          filters: {},
          page: 1,
          limit: 10
        })
      })

      const data = await result.json()

      if (data.success && data.data?.llm_analysis) {
        setResponse(data.data.llm_analysis)
      } else {
        setError(data.error || 'Bir hata oluştu')
      }

    } catch {
      setError('Bağlantı hatası. Backend server çalışıyor mu?')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto pt-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Scale className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Emsal Zeka
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Aradığınız kararları, Emsal Zeka ile bulun.
          </p>
        </div>

        {/* Search Input */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSearch}>
              <div className="flex gap-3 mb-4">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Aradığınız kararlardan kısaca bahsedin... (Örnek: tahliye kararı)"
                  className="text-lg h-14 flex-1"
                  disabled={isLoading}
                />
                <Button 
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  size="lg"
                  className="h-14 px-8"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5 mr-2" />
                  )}
                  {isLoading ? 'Emsal kararlar aranıyor...' : 'Ara'}
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                Enter&apos;a basın ya da Ara butonuna tıklayın
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-900/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="text-red-500">⚠️</div>
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <p className="text-gray-600 dark:text-gray-400">
                  Emsal Zeka sizin için emsal kararlar arıyor...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Response Display */}
        {response && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <MessageSquare className="h-5 w-5" />
                Emsal Kararlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {response}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-12">
          <p>Bu sistem yapay zeka desteklidir. Lütfen emsal kararlarınızın doğruluğunu kontrol ediniz.</p>
        </div>
      </div>
    </div>
  )
}
