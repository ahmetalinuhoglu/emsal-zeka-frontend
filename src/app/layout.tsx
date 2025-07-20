import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Scale, Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: "Emsal Zeka - Yargıtay Karar Arama Sistemi",
  description: "Yapay zeka destekli Yargıtay kararları arama sistemi. Hukuki araştırmalarınızı hızlandırın, en doğru emsal kararları bulun.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {/* Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo */}
              <div className="flex items-center gap-2">
                <Scale className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Emsal Zeka
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Ana Sayfa
                </Link>
                {/* <Link href="/search" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Gelişmiş Arama
                </Link>
                <Link href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Kategoriler
                </Link> */}
                <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  İletişim
                </Link>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <User className="h-4 w-4 mr-2" />
                  Giriş Yap
                </Button>
                
                {/* Mobile Menu Button */}
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              
              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="h-6 w-6 text-blue-600" />
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Emsal Zeka
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Yapay zeka destekli Yargıtay kararları arama sistemi. 
                  Hukuki araştırmalarınızı hızlandırın, en doğru emsal kararları bulun.
                </p>
                <p className="text-xs text-gray-500">
                  © 2024 Emsal Zeka. Tüm hakları saklıdır.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Hızlı Linkler
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      Ana Sayfa
                    </Link>
                  </li>
                  <li>
                    <Link href="/search" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      Gelişmiş Arama
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      Kategoriler
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Destek
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      Yardım
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      İletişim
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      Gizlilik
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
