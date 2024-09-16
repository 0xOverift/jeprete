export interface Item {
    id: string
    name: string
    category: string
    description: string
    condition: string
    availableFrom: string
    availableTo: string
    image: string
    owner: {
      id: string
      username: string
      phone: string
    }
  }