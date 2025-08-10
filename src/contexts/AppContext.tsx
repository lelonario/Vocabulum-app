'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { VocabularyList, Language, StudyMode, DifficultyLevel } from '@/types'
import { ALL_DEFAULT_LISTS } from '@/data/languages'

interface AppContextType {
  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void
  
  // Vocabulary
  vocabularyLists: VocabularyList[]
  setVocabularyLists: (lists: VocabularyList[]) => void
  
  // Current selections
  selectedLanguage: Language | null
  setSelectedLanguage: (language: Language | null) => void
  
  // Settings
  studyMode: StudyMode
  setStudyMode: (mode: StudyMode) => void
  difficultyLevel: DifficultyLevel
  setDifficultyLevel: (level: DifficultyLevel) => void
  audioEnabled: boolean
  setAudioEnabled: (enabled: boolean) => void
  reverseMode: boolean
  setReverseMode: (reverse: boolean) => void
  
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // Loading states
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  // Vocabulary state
  const [vocabularyLists, setVocabularyLists] = useState<VocabularyList[]>([])
  
  // Current selections
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  
  // Settings
  const [studyMode, setStudyMode] = useState<StudyMode>('flashcards')
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('mixed')
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [reverseMode, setReverseMode] = useState(false)
  
  // Search
  const [searchQuery, setSearchQuery] = useState('')
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false)
  
  // Initialize vocabulary lists
  useEffect(() => {
    const savedLists = localStorage.getItem('vocabularyLists')
    if (savedLists) {
      try {
        const parsed = JSON.parse(savedLists)
        setVocabularyLists(parsed)
      } catch (error) {
        console.error('Failed to parse saved vocabulary lists:', error)
        setVocabularyLists(ALL_DEFAULT_LISTS)
      }
    } else {
      setVocabularyLists(ALL_DEFAULT_LISTS)
    }
  }, [])
  
  // Save vocabulary lists to localStorage when they change
  useEffect(() => {
    if (vocabularyLists.length > 0) {
      localStorage.setItem('vocabularyLists', JSON.stringify(vocabularyLists))
    }
  }, [vocabularyLists])
  
  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    applyTheme(initialTheme)
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        applyTheme(newTheme)
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings')
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        setStudyMode(settings.studyMode || 'flashcards')
        setDifficultyLevel(settings.difficultyLevel || 'mixed')
        setAudioEnabled(settings.audioEnabled !== undefined ? settings.audioEnabled : true)
        setReverseMode(settings.reverseMode || false)
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
  }, [])
  
  // Save settings to localStorage when they change
  useEffect(() => {
    const settings = {
      studyMode,
      difficultyLevel,
      audioEnabled,
      reverseMode
    }
    localStorage.setItem('appSettings', JSON.stringify(settings))
  }, [studyMode, difficultyLevel, audioEnabled, reverseMode])
  
  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
    } else {
      root.removeAttribute('data-theme')
      root.classList.remove('dark')
    }
  }
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }
  
  const value: AppContextType = {
    // Theme
    theme,
    toggleTheme,
    
    // Vocabulary
    vocabularyLists,
    setVocabularyLists,
    
    // Current selections
    selectedLanguage,
    setSelectedLanguage,
    
    // Settings
    studyMode,
    setStudyMode,
    difficultyLevel,
    setDifficultyLevel,
    audioEnabled,
    setAudioEnabled,
    reverseMode,
    setReverseMode,
    
    // Search
    searchQuery,
    setSearchQuery,
    
    // Loading states
    isLoading,
    setIsLoading
  }
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
