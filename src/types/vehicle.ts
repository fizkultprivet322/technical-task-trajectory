export type Vehicle = {
  id: number
  name: string
  model: string
  year: number
  color: string
  price: number
  latitude?: number
  longitude?: number
}

export type VehicleCreateInput = Omit<Vehicle, 'id'>

export type VehicleEditableFields = Pick<Vehicle, 'name' | 'price'>

