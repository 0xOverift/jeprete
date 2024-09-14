import { NextResponse } from 'next/server'

const items = [
  { id: '1', name: 'Guitare', category: 'Musique', owner: 'Alice', phoneNumber: '06 12 34 56 78', description: 'Guitare acoustique, parfaite pour les débutants', condition: 'Bon état', availableFrom: '2023-06-01', availableTo: '2023-06-30', image: '' },
  { id: '2', name: 'Vélo', category: 'Sport', owner: 'Bob', phoneNumber: '07 23 45 67 89', description: 'VTT, adapté aux terrains accidentés', condition: 'Excellent', availableFrom: '2023-06-15', availableTo: '2023-07-15', image: '' },
]

export async function GET() {
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const newItem = await request.json()
  newItem.id = (items.length + 1).toString()
  items.push(newItem)
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedItem = await request.json()
  const index = items.findIndex(item => item.id === updatedItem.id)
  if (index !== -1) {
    items[index] = updatedItem
    return NextResponse.json(updatedItem)
  }
  return NextResponse.json({ error: 'Item non trouvé' }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const index = items.findIndex(item => item.id === id)
  if (index !== -1) {
    const deletedItem = items.splice(index, 1)[0]
    return NextResponse.json(deletedItem)
  }
  return NextResponse.json({ error: 'Item non trouvé' }, { status: 404 })
}