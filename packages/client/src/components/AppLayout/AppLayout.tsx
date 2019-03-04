import React from 'react'
import AppHeader from '../AppHeader/AppHeader'

const Layout: React.SFC = ({ children }) => (
  <>
    <AppHeader />
    <main>{children}</main>
  </>
)

export default Layout
