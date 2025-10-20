import React from 'react'
import { AppHeader } from '../layout/AppHeader'
import { AppContainer } from '../layout/AppContainer'
import { VehiclesPage } from '../vehicles/VehiclesPage'

const App: React.FC = () => {
  return (
    <div>
      <AppHeader />
      <AppContainer>
        <VehiclesPage />
      </AppContainer>
    </div>
  )
}

export default App

