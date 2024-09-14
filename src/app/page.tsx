import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Bienvenue sur Jeprete.fr</h1>
      <p className="text-xl mb-8 text-gray-600 max-w-md">
        Rejoignez notre communauté, partagez vos objets et empruntez ce dont vous avez besoin. C'est aussi simple que ça !
      </p>
      <Link href="/onboarding">
        <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">Commencer</Button>
      </Link>
    </div>
  )
}