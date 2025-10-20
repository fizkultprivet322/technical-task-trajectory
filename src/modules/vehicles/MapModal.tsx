import React from 'react'

export function MapModal({ lat, lon, onClose }: { lat: number; lon: number; onClose: () => void }) {
  const ll = `${lon.toFixed(6)}%2C${lat.toFixed(6)}`
  const poi = `${lon.toFixed(6)}%2C${lat.toFixed(6)}`
  const src = `https://yandex.ru/map-widget/v1/?ll=${ll}&mode=poi&poi%5Bpoint%5D=${poi}&z=13.2`

  return (
    <div className="v-overlay" onClick={onClose}>
      <div className="card v-modal" onClick={e => e.stopPropagation()}>
        <div className="v-modal__head">
          <h4 className="section__title" style={{ fontSize: '1rem', margin: 0 }}>
            На карте
          </h4>
          <button className="btn" onClick={onClose}>
            Закрыть
          </button>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <iframe
            src={src}
            width="100%"
            height="400"
            frameBorder={1}
            style={{ position: 'relative' }}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
