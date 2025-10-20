import React from 'react'

type Props = {
  children: React.ReactNode
}

export const AppContainer: React.FC<Props> = ({ children }) => {
  return (
    <main className="container section">
      {children}
    </main>
  )
}

