'use client'

import StudyPage from '@/components/StudyPage'
import { Toaster } from 'react-hot-toast'
import { use } from 'react'

interface StudyPageProps {
  params: Promise<{ listId: string }>
}

export default function Page({ params }: StudyPageProps) {
  const { listId } = use(params)
  
  return (
    <>
      <StudyPage listId={listId} />
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
