import React from 'react'

export const AppHeader: React.FC = () => {
  return (
    <header className="header">
      <div className="container header__inner">
        <h1 className="text-lg font-semibold tracking-tight">Vehicles Manager</h1>
        <nav className="header__nav">
          <a className="header__link" href="#list">Список</a>
          <a className="header__link" href="#create">Создать</a>
        </nav>
      </div>
    </header>
  )
}

