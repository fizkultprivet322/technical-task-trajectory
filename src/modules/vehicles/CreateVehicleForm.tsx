import React, { useState } from 'react'
import type { VehicleCreateInput } from '../../types/vehicle'
import { validateColor, validateModel, validateName, validatePrice, validateYear } from '../../utils/validators'

export function CreateVehicleForm({ onCreate }: { onCreate: (input: VehicleCreateInput) => void }) {
  const [form, setForm] = useState<VehicleCreateInput>({
    name: '',
    model: '',
    year: 0,
    color: '',
    price: 0,
  })

  const [error, setError] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    setError(null)

    const nameErr = validateName(form.name)
    if (nameErr) { setError(nameErr); return }

    const modelErr = validateModel(form.model)
    if (modelErr) { setError(modelErr); return }

    const yearErr = validateYear(form.year)
    if (yearErr) { setError(yearErr); return }

    const colorErr = validateColor(form.color)
    if (colorErr) { setError(colorErr); return }

    const priceErr = validatePrice(form.price)
    if (priceErr) { setError(priceErr); return }

    onCreate(form)

    setForm({
      name: '',
      model: '',
      year: 0,
      color: '',
      price: 0,
    })
  }

  return (
    <form className="grid-form" onSubmit={submit}>
      <input
        className="input"
        placeholder="Марка (name)"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input"
        placeholder="Модель (model)"
        value={form.model}
        onChange={e => setForm({ ...form, model: e.target.value })}
      />

      <input
        className="input"
        placeholder="Год (year)"
        inputMode="numeric"
        value={form.year ? String(form.year) : ''}
        onChange={e => {
          const raw = e.target.value.replace(/[^0-9]/g, '')
          const num = raw === '' ? 0 : Number(raw)
          setForm({ ...form, year: Number.isFinite(num) ? num : 0 })
        }}
      />

      <input
        className="input"
        placeholder="Цвет (color)"
        value={form.color}
        onChange={e => setForm({ ...form, color: e.target.value })}
      />

      <input
        className="input"
        placeholder="Цена (price)"
        inputMode="decimal"
        value={form.price ? String(form.price) : ''}
        onChange={e => {
          const raw = e.target.value.replace(',', '.')
          const num = raw === '' ? 0 : Number(raw)
          setForm({ ...form, price: Number.isFinite(num) ? num : 0 })
        }}
      />

      <button
        type="submit"
        className="btn"
        style={{ background: '#0f172a', color: '#fff', borderColor: '#0f172a' }}
      >
        Сохранить
      </button>

      {error && (
        <div style={{ color: 'crimson' }}>
          {error}
        </div>
      )}
    </form>
  )
}
