'use client'

import { useRouter } from 'next/navigation'
import { Search, Scale, BookOpen, Gavel } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSearchStore } from '@/stores/searchStore'

export default function HomePage() {
  const router = useRouter()
  const { query, setQuery, search } = useSearchStore()

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return
    
    // Navigate to search page and perform search
    router.push('/search')
    await search()
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Scale className="h-16 w-16 text-blue-600" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Emsal Zeka
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Yapay zeka destekli Yargıtay kararları arama sistemi. 
            Hukuki araştırmalarınızı hızlandırın, en doğru emsal kararları bulun.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Örnek: tazminat davası, sigorta, trafik kazası..."
                className="text-lg h-12"
              />
              <Button type="submit" size="lg" className="px-8">
                <Search className="h-5 w-5 mr-2" />
                Ara
              </Button>
            </div>
            
            <div className="flex justify-center mt-4 gap-2">
              <Badge variant="secondary">Tazminat</Badge>
              <Badge variant="secondary">Sigorta</Badge>
              <Badge variant="secondary">İş Hukuku</Badge>
              <Badge variant="secondary">Gayrimenkul</Badge>
            </div>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Search className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle>Akıllı Arama</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle>Geniş Arşiv</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Gavel className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle>Hızlı Sonuç</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Decisions Preview */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Son Eklenen Kararlar</h2>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">
                      Yargıtay {i}. Hukuk Dairesi - 2024/{1000 + i}
                    </h3>
                    <Badge>Tazminat</Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Trafik kazasından doğan maddi ve manevi tazminat talebinin değerlendirilmesi...
                  </p>
                  <div className="text-xs text-gray-500">
                    Karar Tarihi: {new Date().toLocaleDateString('tr-TR')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Tüm Kararları Görüntüle
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
