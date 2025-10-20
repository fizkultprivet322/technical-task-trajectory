import React, { useMemo, useState } from 'react'
import { useVehicles } from './useVehicles'
import type { Vehicle } from '../../types/vehicle'
import { CreateVehicleForm } from './CreateVehicleForm'
import { MapModal } from './MapModal'
import { validateName, validatePrice } from '../../utils/validators'

function ActionMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="v-actions__menu">
      <button className="btn" style={{ width: '100%' }} onClick={onEdit}>
        Изменить
      </button>
      <button className="btn" style={{ width: '100%', marginTop: '.25rem' }} onClick={onDelete}>
        Удалить
      </button>
    </div>
  )
}

export const VehiclesPage: React.FC = () => {
  const { items, state, toggleSort, update, remove, create } = useVehicles()
  const [query, setQuery] = useState('')
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [mapForId, setMapForId] = useState<number | null>(null)

  const selectedForMap = useMemo(() => {
    if (mapForId == null) return null
    const v = items.find(x => x.id === mapForId) || null
    return v
  }, [items, mapForId])

  React.useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (openMenuId == null) {
        return
      }

      const cell = document.getElementById(`action-cell-${openMenuId}`)
      if (!cell) {
        setOpenMenuId(null)
        return
      }

      const target = e.target as Node | null
      if (target && !cell.contains(target)) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [openMenuId])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(v =>
      [v.name, v.model, String(v.year), String(v.price)].some(x => String(x).toLowerCase().includes(q)),
    )
  }, [items, query])

  const mapModal = selectedForMap && selectedForMap.latitude != null && selectedForMap.longitude != null
    ? <MapModal lat={selectedForMap.latitude as number} lon={selectedForMap.longitude as number} onClose={() => setMapForId(null)} />
    : null

  return (
    <>
    <section className="section">
      <header className="section__head v-toolbar">
        <div>
          <h2 className="section__title">Список машин</h2>
          <p className="section__subtitle">Просмотр, сортировка, редактирование, удаление</p>
        </div>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <button className="btn" onClick={() => toggleSort('year')}>
            Сорт. по году {state.sort.by === 'year' ? (state.sort.dir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button className="btn" onClick={() => toggleSort('price')}>
            Сорт. по цене {state.sort.by === 'price' ? (state.sort.dir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <input className="input" placeholder="Поиск" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </header>

      <div className="card">
        {state.isLoading ? (
          <div style={{ padding: '1rem' }}>Загрузка…</div>
        ) : state.error ? (
          <div style={{ padding: '1rem', color: 'crimson' }}>Ошибка: {state.error}</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Марка</th>
                <th>Модель</th>
                <th>Год</th>
                <th>Цена</th>
                <th>Цвет</th>
                <th style={{ textAlign: 'right' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v: Vehicle) => (
                <tr key={v.id}>
                  <td>
                    {editId === v.id ? (
                      <input className="input" value={editName} onChange={e => setEditName(e.target.value)} />
                    ) : (
                      v.name
                    )}
                  </td>
                  <td>{v.model}</td>
                  <td>{v.year}</td>
                  <td>
                    {editId === v.id ? (
                      <input className="input" value={editPrice} onChange={e => setEditPrice(e.target.value)} inputMode="decimal" placeholder="Цена" />
                    ) : (
                      v.price
                    )}
                  </td>
                  <td>{v.color}</td>
                  <td className="v-actions">
                    {editId === v.id ? (
                      <div className="v-editbar">
                        <button
                          className="btn"
                          onClick={() => {
                            const priceNum = Number(editPrice)
                            const nameErr = validateName(editName)
                            const priceErr = validatePrice(priceNum)
                            if (nameErr || priceErr) {
                              return
                            }
                            update(v.id, { name: editName.trim(), price: priceNum })
                            setEditId(null)
                          }}
                        >Сохранить</button>
                        <button className="btn" onClick={() => setEditId(null)}>Отмена</button>
                      </div>
                    ) : (
                      <div id={`action-cell-${v.id}`} className="v-actions__wrap">
                        {(v.latitude != null && v.longitude != null) && (
                          <button className="btn" onClick={() => setMapForId(v.id)}>
                            На карте
                          </button>
                        )}
                        <button className="btn" onClick={() => setOpenMenuId(openMenuId === v.id ? null : v.id)}>Редактировать</button>
                        {openMenuId === v.id && (
                          <ActionMenu
                            onEdit={() => {
                              setOpenMenuId(null)
                              setEditId(v.id)
                              setEditName(v.name)
                              setEditPrice(String(v.price))
                            }}
                            onDelete={() => {
                              setOpenMenuId(null)
                              remove(v.id)
                            }}
                          />
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <section id="create" className="section">
        <h3 className="section__title" style={{ fontSize: '1.125rem' }}>Создать машину</h3>
        <CreateVehicleForm onCreate={create} />
      </section>
    </section>
    {mapModal}
    </>
  )
}
