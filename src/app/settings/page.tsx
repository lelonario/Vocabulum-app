'use client'

import SettingsPage from '@/components/SettingsPage'
import { Toaster } from 'react-hot-toast'

export default function Page() {
  return (
    <>
      <SettingsPage />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </>
  )
}
