import type { Vehicle } from '../types/vehicle'

const API_URL = 'https://ofc-test-01.tspb.su/test-task/vehicles'

export async function fetchVehicles(signal?: AbortSignal): Promise<Vehicle[]> {
  const res = await fetch(API_URL, { signal })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  const data = (await res.json()) as unknown

  if (!Array.isArray(data)) {
    throw new Error('Некорректный формат ответа API')
  }

  return data.map((item: any) => ({
    id: Number(item.id),
    name: String(item.name ?? ''),
    model: String(item.model ?? ''),
    year: Number(item.year ?? 0),
    color: String(item.color ?? ''),
    price: Number(item.price ?? 0),
    latitude: item.latitude == null ? undefined : Number(item.latitude),
    longitude: item.longitude == null ? undefined : Number(item.longitude),
  }))
}
