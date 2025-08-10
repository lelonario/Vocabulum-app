'use client'

import CreateListPage from '@/components/CreateListPage'
import { Toaster } from 'react-hot-toast'

export default function Page() {
  return (
    <>
      <CreateListPage />
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
