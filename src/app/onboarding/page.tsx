'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'

const categories = [
  { name: 'Musique', items: ['Guitare', 'Clavier', 'Batterie', 'Microphone', 'Amplificateur', 'Violon', 'Saxophone', 'Équipement DJ'] },
  { name: 'Sport', items: ['Vélo', 'Skis', 'Raquette de tennis', 'Ballon de football', 'Ballon de basket', 'Tapis de yoga', 'Haltères', 'Planche de surf'] },
  { name: 'Bricolage', items: ['Perceuse', 'Scie', 'Marteau', 'Jeu de tournevis', 'Échelle', 'Pistolet à peinture', 'Machine à souder', 'Nettoyeur haute pression'] },
  { name: 'Cuisine', items: ['Mixeur', 'Robot culinaire', 'Robot pâtissier', 'Mijoteuse', 'Friteuse à air', 'Extracteur de jus', 'Machine à pain', 'Machine à expresso'] },
  { name: 'Jardin', items: ['Tondeuse', 'Taille-haie', 'Nettoyeur haute pression', 'Souffleur de feuilles', 'Tronçonneuse', 'Motoculteur', 'Brouette', 'Système d\'arrosage'] },
  { name: 'Électronique', items: ['Appareil photo', 'Projecteur', 'Drone', 'Casque VR', 'Console de jeu', 'Imprimante 3D', 'Tablette', 'Chargeur portable'] },
]

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const router = useRouter()

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
    return phoneRegex.test(number)
  }

  const handleNext = () => {
    if (step === 1) {
      if (!username) {
        alert('Veuillez entrer un nom d\'utilisateur')
        return
      }
      if (!validatePhoneNumber(phoneNumber)) {
        setPhoneError('Veuillez entrer un numéro de téléphone valide')
        return
      }
      setPhoneError('')
      setStep(2)
    } else if (step === 2) {
      // Submit data and redirect to marketplace
      console.log('Soumission:', { username, phoneNumber, selectedItems })
      router.push('/marketplace')
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleItemToggle = (item: string) => {
    setSelectedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  const isCategorySelected = (category: string) => {
    return categories.find(c => c.name === category)?.items.some(item => selectedItems.includes(item)) || false
  }

  return (
    <div className="max-w-4xl w-full px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Commencez</h1>
      {step === 1 ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Label htmlFor="username" className="text-lg mb-2 block">Choisissez un nom d'utilisateur</Label>
          <Input
            id="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className="mb-4"
            placeholder="Entrez votre nom d'utilisateur"
          />
          <Label htmlFor="phoneNumber" className="text-lg mb-2 block">Numéro de téléphone</Label>
          <Input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
            className="mb-2"
            placeholder="Entrez votre numéro de téléphone"
            type="tel"
          />
          <p className="text-sm text-gray-500 mb-4">Nous avons besoin de votre numéro de téléphone pour que les autres utilisateurs puissent vous contacter pour emprunter des objets.</p>
          {phoneError && <Alert variant="destructive" className="mb-4"><AlertDescription>{phoneError}</AlertDescription></Alert>}
          <Button onClick={handleNext} className="w-full bg-blue-500 hover:bg-blue-600 text-white">Suivant</Button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Sélectionnez les objets que vous pouvez prêter :</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {categories.map((category) => (
              <Card 
                key={category.name} 
                className={`cursor-pointer transition-all ${
                  selectedCategory === category.name ? 'ring-2 ring-blue-500' : ''
                } ${
                  isCategorySelected(category.name) ? 'bg-green-50' : ''
                }`}
                onClick={() => handleCategorySelect(category.name)}
              >
                <CardContent className="flex items-center justify-center h-24">
                  <span className="text-lg font-medium">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedCategory && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Objets {selectedCategory} :</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.find(c => c.name === selectedCategory)?.items.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox 
                      id={item} 
                      checked={selectedItems.includes(item)}
                      onCheckedChange={() => handleItemToggle(item)}
                    />
                    <label htmlFor={item} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{item}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button onClick={handleNext} className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white">Terminer</Button>
        </div>
      )}
    </div>
  )
}