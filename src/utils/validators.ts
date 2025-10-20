export function validateName(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Марка обязательна'
  if (v.length < 2) return 'Марка слишком короткая'
  if (v.length > 50) return 'Марка слишком длинная'
  if (!/^[\p{L}\p{M}\-\s'.]+$/u.test(v)) return 'Марка должна содержать только буквы/пробелы'
  return null
}

export function validateModel(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Модель обязательна'
  if (v.length < 1) return 'Модель слишком короткая'
  if (v.length > 50) return 'Модель слишком длинная'
  if (!/^[\p{L}\p{M}0-9\-\s'.]+$/u.test(v)) return 'Модель: недопустимые символы'
  return null
}

export function validateColor(value: string): string | null {
  const v = value.trim()
  if (!v) return 'Цвет обязателен'
  if (v.length < 2) return 'Цвет слишком короткий'
  if (v.length > 30) return 'Цвет слишком длинный'
  if (!/^[\p{L}\p{M}\-\s']+$/u.test(v)) return 'Цвет должен содержать только буквы/пробелы'
  return null
}

export function validateYear(value: number): string | null {
  if (!Number.isFinite(value)) return 'Год должен быть числом'
  if (!Number.isInteger(value)) return 'Год должен быть целым'
  if (value < 1900 || value > 2100) return 'Год вне допустимого диапазона'
  return null
}

export function validatePrice(value: number): string | null {
  if (!Number.isFinite(value)) return 'Цена должна быть числом'
  if (value < 0) return 'Цена не может быть отрицательной'
  if (value > 1_000_000_000) return 'Слишком большая цена'
  return null
}
