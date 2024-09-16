'use client'

import { useState, useEffect } from 'react'
import { Item } from '../../../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image';

interface Item {
  id: string
  name: string
  category: string
  owner: string
  phoneNumber: string
  description: string
  condition: string
  availableFrom: string
  availableTo: string
  image: string
}

const defaultEmojis: { [key: string]: string } = {
  'Musique': '🎸',
  'Sport': '🚲',
  'Bricolage': '🔨',
  'Cuisine': '🍳',
  'Jardin': '🌱',
  'Électronique': '📷',
}

const categories = ['Musique', 'Sport', 'Bricolage', 'Cuisine', 'Jardin', 'Électronique']

export default function Marketplace() {
  const [items, setItems] = useState<Item[]>([])
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({
    name: '',
    category: '',
    owner: '',
    phoneNumber: '',
    description: '',
    condition: '',
    availableFrom: '',
    availableTo: '',
    image: '',
  })

  useEffect(() => {
    // In a real app, this would be an API call
    setItems([
      { id: '1', name: 'Guitare', category: 'Musique', owner: 'Alice', phoneNumber: '06 12 34 56 78', description: 'Guitare acoustique, parfaite pour les débutants', condition: 'Bon état', availableFrom: '2023-06-01', availableTo: '2023-06-30', image: '' },
      { id: '2', name: 'Vélo', category: 'Sport', owner: 'Bob', phoneNumber: '07 23 45 67 89', description: 'VTT, adapté aux terrains accidentés', condition: 'Excellent', availableFrom: '2023-06-15', availableTo: '2023-07-15', image: '' },
      { id: '3', name: 'Perceuse', category: 'Bricolage', owner: 'Charlie', phoneNumber: '01 23 45 67 89', description: 'Perceuse sans fil avec différents embouts', condition: 'Comme neuf', availableFrom: '2023-06-10', availableTo: '2023-06-20', image: '' },
      { id: '4', name: 'Mixeur', category: 'Cuisine', owner: 'David', phoneNumber: '06 34 56 78 90', description: 'Mixeur puissant pour smoothies', condition: 'Bon état', availableFrom: '2023-06-05', availableTo: '2023-06-25', image: '' },
      { id: '5', name: 'Tondeuse', category: 'Jardin', owner: 'Eve', phoneNumber: '07 45 67 89 01', description: 'Tondeuse électrique, facile à utiliser', condition: 'Correct', availableFrom: '2023-06-01', availableTo: '2023-08-31', image: '' },
      { id: '6', name: 'Appareil photo', category: 'Électronique', owner: 'Frank', phoneNumber: '06 56 78 90 12', description: 'Appareil photo reflex avec deux objectifs', condition: 'Excellent', availableFrom: '2023-06-20', availableTo: '2023-07-10', image: '' },
    ])
  }, [])

  const handleEditItem = (item: Item) => {
    setEditingItem(item)
  }

  const handleSaveItem = (updatedItem: Item) => {
    setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item))
    setEditingItem(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setItems(prevItems => prevItems.map(item => 
          item.id === itemId ? { ...item, image: reader.result as string } : item
        ))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddItem = () => {
    const id = (items.length + 1).toString()
    setItems(prevItems => [...prevItems, { ...newItem, id }])
    setIsAddingItem(false)
    setNewItem({
      name: '',
      category: '',
      owner: '',
      phoneNumber: '',
      description: '',
      condition: '',
      availableFrom: '',
      availableTo: '',
      image: '',
    })
  }

  return (
    <div className="w-full px-4 pt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Objets Disponibles</h1>
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setIsAddingItem(true)} className="bg-green-500 hover:bg-green-600 text-white">
          Ajouter un nouvel objet
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                {item.name}
                <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>Modifier</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-center">
                {item.image ? (
                  <Image src={item.image} alt={item.name} width={128} height={128} className="object-cover rounded" />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center text-4xl bg-gray-100 rounded">
                    {defaultEmojis[item.category] || '📦'}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-2">Catégorie : {item.category}</p>
              <p className="text-sm text-gray-500 mb-2">État : {item.condition}</p>
              <p className="text-sm text-gray-500 mb-2">Disponible du {item.availableFrom} au {item.availableTo}</p>
              <p className="text-sm text-gray-700 mb-4">{item.description}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Demander à Emprunter</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Informations de Contact</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <p><strong>Propriétaire :</strong> {item.owner}</p>
                    <p><strong>Téléphone :</strong> {item.phoneNumber}</p>
                    <p className="mt-4 text-sm text-gray-500">Veuillez contacter le propriétaire pour organiser les détails de l&apos;emprunt.</p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier l&apos;objet</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              handleSaveItem(editingItem)
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="condition" className="text-right">
                    État
                  </Label>
                  <Input
                    id="condition"
                    value={editingItem.condition}
                    onChange={(e) => setEditingItem({ ...editingItem, condition: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="availableFrom" className="text-right">
                    Disponible à partir du
                  </Label>
                  <Input
                    id="availableFrom"
                    type="date"
                    value={editingItem.availableFrom}
                    onChange={(e) => setEditingItem({ ...editingItem, availableFrom: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="availableTo" className="text-right">
                    Disponible jusqu&apos;au
                  </Label>
                  <Input
                    id="availableTo"
                    type="date"
                    value={editingItem.availableTo}
                    onChange={(e) => setEditingItem({ ...editingItem, availableTo: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => handleImageUpload(e, editingItem.id)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Enregistrer les modifications</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel objet</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            handleAddItem()
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="new-name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-category" className="text-right">
                  Catégorie
                </Label>
                <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-owner" className="text-right">
                  Propriétaire
                </Label>
                <Input
                  id="new-owner"
                  value={newItem.owner}
                  onChange={(e) => setNewItem({ ...newItem, owner: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-phoneNumber" className="text-right">
                  Téléphone
                </Label>
                <Input
                  id="new-phoneNumber"
                  value={newItem.phoneNumber}
                  onChange={(e) => setNewItem({ ...newItem, phoneNumber: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="new-description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-condition" className="text-right">
                  État
                </Label>
                <Input
                  id="new-condition"
                  value={newItem.condition}
                  onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-availableFrom" className="text-right">
                  Disponible à partir du
                </Label>
                <Input
                  id="new-availableFrom"
                  type="date"
                  value={newItem.availableFrom}
                  onChange={(e) => setNewItem({ ...newItem, availableFrom: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-availableTo" className="text-right">
                  Disponible jusqu&apos;au
                </Label>
                <Input
                  id="new-availableTo"
                  type="date"
                  value={newItem.availableTo}
                  onChange={(e) => setNewItem({ ...newItem, availableTo: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Ajouter l&apos;objet</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}