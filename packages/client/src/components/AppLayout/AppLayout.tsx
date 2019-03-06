import React from 'react'
import AppHeader from '../AppHeader/AppHeader'

const Layout: React.FunctionComponent = ({ children }) => (
  <>
    <AppHeader />
    <main>{children}</main>
  </>
)

export default Layout
