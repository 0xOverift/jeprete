import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      include: { owner: true }
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch items:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newItem = await prisma.item.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        condition: data.condition,
        ownerId: data.ownerId,
        availableFrom: new Date(data.availableFrom),
        availableTo: new Date(data.availableTo),
        image: data.image || null  // Changed from '' to null
      },
      include: { owner: true }
    })
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error('Failed to create item:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const updatedItem = await prisma.item.update({
      where: { id: data.id },
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        condition: data.condition,
        availableFrom: new Date(data.availableFrom),
        availableTo: new Date(data.availableTo),
        image: data.image || null  // Changed to handle null case
      },
      include: { owner: true }
    })
    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Failed to update item:', error)
    return NextResponse.json({ error: 'Item non trouvé' }, { status: 404 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID non fourni' }, { status: 400 })
    }
    const deletedItem = await prisma.item.delete({
      where: { id: id },
      include: { owner: true }
    })
    return NextResponse.json(deletedItem)
  } catch (error) {
    console.error('Failed to delete item:', error)
    return NextResponse.json({ error: 'Item non trouvé' }, { status: 404 })
  }
}