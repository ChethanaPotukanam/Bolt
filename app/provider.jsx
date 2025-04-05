"use client"
import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/ui/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { useState } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext'
function Provider({ children }) {
  const [messages, setMessages] = useState()
  const [userDetail,setUserDetail]=useState()
  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <MessagesContext.Provider value={{ messages, setMessages }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <Header />

          {children}</NextThemesProvider>
      </MessagesContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default Provider