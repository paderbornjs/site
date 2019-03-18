import React from 'react'
import AppHeader from '../AppHeader/AppHeader'

const Layout: React.FC = ({ children }) => (
  <>
    <AppHeader />
    <main>{children}</main>
  </>
)

export default Layout
