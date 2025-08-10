'use client'

import StatisticsPage from '@/components/StatisticsPage'
import { Toaster } from 'react-hot-toast'

export default function Page() {
  return (
    <>
      <StatisticsPage />
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
