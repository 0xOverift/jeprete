import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Plateforme de Prêt d\'Objets',
  description: 'Partagez et empruntez des objets dans votre communauté',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Prêt d'Objets
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/marketplace" className="hover:underline">
                  Marché
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:underline">
                  Inscription
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto py-8">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto text-center text-gray-600">
            © 2023 Plateforme de Prêt d'Objets. Tous droits réservés.
          </div>
        </footer>
      </body>
    </html>
  )
}