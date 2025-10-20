import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Vehicle, VehicleCreateInput, VehicleEditableFields } from '../../types/vehicle'
import { fetchVehicles } from '../../api/vehicles'

export type VehiclesSort = { by: 'year' | 'price' | null; dir: 'asc' | 'desc' }

export type VehiclesState = {
  items: Vehicle[]
  isLoading: boolean
  error: string | null
  sort: VehiclesSort
}

export function useVehicles() {
  const [state, setState] = useState<VehiclesState>({
    items: [],
    isLoading: true,
    error: null,
    sort: { by: null, dir: 'asc' },
  })

  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setState(s => ({ ...s, isLoading: true, error: null }))
    fetchVehicles(ctrl.signal)
      .then(items => setState(s => ({ ...s, items, isLoading: false })))
      .catch(err => {
        if (err?.name === 'AbortError') return
        setState(s => ({ ...s, error: String(err?.message ?? err), isLoading: false }))
      })
    return () => ctrl.abort()
  }, [])

  const sortedItems = useMemo(() => {
    const { by, dir } = state.sort
    if (!by) return state.items
    const sorted = [...state.items].sort((a, b) => a[by]! - b[by]!)
    return dir === 'asc' ? sorted : sorted.reverse()
  }, [state.items, state.sort])

  const toggleSort = useCallback((by: 'year' | 'price') => {
    setState(s => {
      if (s.sort.by !== by) return { ...s, sort: { by, dir: 'asc' } }
      const dir = s.sort.dir === 'asc' ? 'desc' : 'asc'
      return { ...s, sort: { by, dir } }
    })
  }, [])

  const create = useCallback((input: VehicleCreateInput) => {
    setState(s => {
      const maxId = s.items.reduce((m, v) => Math.max(m, v.id), 0)
      const next: Vehicle = { id: maxId + 1, ...input }
      return { ...s, items: [next, ...s.items] }
    })
  }, [])

  const update = useCallback((id: number, fields: VehicleEditableFields) => {
    setState(s => ({
      ...s,
      items: s.items.map(v => (v.id === id ? { ...v, ...fields } : v)),
    }))
  }, [])

  const remove = useCallback((id: number) => {
    setState(s => ({ ...s, items: s.items.filter(v => v.id !== id) }))
  }, [])

  return {
    state,
    items: sortedItems,
    toggleSort,
    create,
    update,
    remove,
  }
}

