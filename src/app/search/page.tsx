'use client'

import { Search, Filter, Calendar, Building2, Gavel, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useSearchStore } from '@/stores/searchStore'

export default function SearchPage() {
  const {
    query,
    detailedQuery,
    filters,
    results,
    totalResults,
    isLoading,
    error,
    setQuery,
    setDetailedQuery,
    setFilters,
    search,
    loadMore
  } = useSearchStore()

  const daireler = [
    "1. Hukuk Dairesi", "2. Hukuk Dairesi", "3. Hukuk Dairesi", "4. Hukuk Dairesi",
    "5. Hukuk Dairesi", "6. Hukuk Dairesi", "7. Hukuk Dairesi", "8. Hukuk Dairesi",
    "9. Hukuk Dairesi", "10. Hukuk Dairesi", "11. Hukuk Dairesi", "12. Hukuk Dairesi",
    "13. Hukuk Dairesi", "14. Hukuk Dairesi", "15. Hukuk Dairesi"
  ]

  const categories = [
    "Tazminat", "Sigorta", "İş Hukuku", "Gayrimenkul", "Aile Hukuku", 
    "Ticaret Hukuku", "Borçlar Hukuku", "Eşya Hukuku", "Miras Hukuku"
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Gelişmiş Arama
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Filtreleme seçenekleri ile istediğiniz emsal kararları bulun
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtreler
                </CardTitle>
                <CardDescription>
                  Arama sonuçlarını daraltın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Daire Seçimi */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Yargıtay Dairesi
                  </label>
                  <Select 
                    value={filters.daire || ''} 
                    onValueChange={(value) => setFilters({ daire: value || undefined })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tüm Daireler" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tüm Daireler</SelectItem>
                      {daireler.map((daire) => (
                        <SelectItem key={daire} value={daire}>
                          {daire}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Kategori */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Kategori
                  </label>
                  <div className="space-y-2">
                    {categories.slice(0, 6).map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={category}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tarih Aralığı */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Karar Tarihi
                  </label>
                  <div className="space-y-2">
                    <Input type="date" className="text-sm" />
                    <Input type="date" className="text-sm" />
                  </div>
                </div>

                <Button className="w-full">
                  Filtreleri Uygula
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Search Form */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  
                  {/* Main Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Anahtar Kelime
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Örnek: trafik kazası tazminat..."
                        className="text-lg h-12"
                      />
                      <Button 
                        size="lg" 
                        className="px-8"
                        onClick={search}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                          <Search className="h-5 w-5 mr-2" />
                        )}
                        Ara
                      </Button>
                    </div>
                  </div>

                  {/* AI Powered Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Yapay Zeka Destekli Arama (Detaylı açıklama)
                    </label>
                    <Textarea
                      value={detailedQuery}
                      onChange={(e) => setDetailedQuery(e.target.value)}
                      placeholder="Durumunuzu detaylı olarak açıklayın. Örnek: 'Müvekkilim trafik kazası geçirdi, karşı taraf kırmızı ışık ihlali yaptı. Araç hasarı 50.000 TL, tedavi masrafları 15.000 TL oldu. Nasıl bir tazminat talep edebiliriz?'"
                      className="min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      AI, açıklamanıza göre en uygun emsal kararları bulacaktır.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            <div className="space-y-6">
              
              {/* Results Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Arama Sonuçları
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {totalResults} sonuç bulundu
                  </p>
                </div>
                <Select defaultValue="date">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">En Yeni</SelectItem>
                    <SelectItem value="relevance">En İlgili</SelectItem>
                    <SelectItem value="daire">Daire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Results List */}
              <div className="space-y-4">
                {results.map((result) => (
                  <Card key={result.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600">
                            {result.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {result.daire}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(result.date).toLocaleDateString('tr-TR')}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">{result.category}</Badge>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {result.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {result.keywords.map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              {results.length > 0 && (
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={loadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Yükleniyor...
                      </>
                    ) : (
                      'Daha Fazla Sonuç Yükle'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 