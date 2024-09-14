import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Bienvenu sur je prete.fr</h1>
      <p className="text-xl mb-8">Le site qui facilite le prêt d'objets entre amis, voisins, membre d'une famille...</p>
      <Link href="/about" className="text-blue-500 hover:text-blue-700 underline">
        Se connecter
      </Link>
    </div>
  )
}