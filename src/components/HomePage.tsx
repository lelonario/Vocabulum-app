'use client'

import React, { useState, useMemo, useRef } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { SUPPORTED_LANGUAGES } from '@/data/languages'
import { progressService } from '@/lib/progress'
import { importExportService } from '@/lib/import-export'
import { Search, Plus, Download, Upload, Sun, Moon, BarChart3, Settings, Play, Repeat } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function HomePage() {
  const { 
    theme, 
    toggleTheme,
    vocabularyLists, 
    setVocabularyLists, 
    selectedLanguage, 
    setSelectedLanguage,
    searchQuery,
    setSearchQuery,
    reverseMode,
    setReverseMode
  } = useAppContext()
  
  const [progress] = useState(() => progressService.getProgress())
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Filter lists based on selected language and search query
  const filteredLists = useMemo(() => {
    let filtered = vocabularyLists
    
    // Filter by language
    if (selectedLanguage) {
      filtered = filtered.filter(list => list.language.code === selectedLanguage.code)
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(list => 
        list.name.toLowerCase().includes(query) ||
        list.description.toLowerCase().includes(query) ||
        list.category.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [vocabularyLists, selectedLanguage, searchQuery])
  
  // Group lists by category
  const listsByCategory = useMemo(() => {
    const grouped: { [category: string]: typeof filteredLists } = {}
    filteredLists.forEach(list => {
      if (!grouped[list.category]) {
        grouped[list.category] = []
      }
      grouped[list.category].push(list)
    })
    return grouped
  }, [filteredLists])
  
  // Statistics
  const stats = useMemo(() => {
    const totalWords = vocabularyLists.reduce((sum, list) => sum + list.word_count, 0)
    const wordsLearned = progress.wordsLearned || 0
    const streak = progress.currentStreak || 0
    const accuracy = Math.round(progress.accuracy || 0)
    
    return { totalWords, wordsLearned, streak, accuracy }
  }, [vocabularyLists, progress])
  
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    try {
      const importedLists = await importExportService.importFile(file)
      const updatedLists = [...vocabularyLists, ...importedLists]
      setVocabularyLists(updatedLists)
      toast.success(`✅ Successfully imported ${importedLists.length} vocabulary list(s)!`)
    } catch (error: any) {
      console.error('Import failed:', error)
      toast.error(`❌ Import failed: ${error.message}`)
    }
    
    event.target.value = ''
  }
  
  const handleExport = () => {
    try {
      if (vocabularyLists.length === 0) {
        toast.error('No vocabulary lists to export')
        return
      }
      importExportService.exportToJSON(vocabularyLists)
      toast.success('✅ Vocabulary lists exported successfully!')
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('❌ Failed to export vocabulary lists')
    }
  }
  
  const handleDownloadTemplate = () => {
    try {
      importExportService.downloadCSVTemplate()
      toast.success('✅ CSV template downloaded!')
    } catch (error) {
      console.error('Template download failed:', error)
      toast.error('❌ Failed to download CSV template')
    }
  }
  
  const triggerImport = () => {
    fileInputRef.current?.click()
  }
  
  return (
    <div className="min-h-screen safe-area-padding" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <header className="nav-apple sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Using the new SVG logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="Vocabulum Logo"
                  width={48}
                  height={48}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-title-3 font-bold">Vocabulum</h1>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  Smart Language Learning
                </p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Link
                href="/statistics"
                className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                style={{ color: 'var(--foreground)' }}
              >
                <BarChart3 className="w-5 h-5" />
              </Link>
              
              <Link
                href="/settings"
                className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                style={{ color: 'var(--foreground)' }}
              >
                <Settings className="w-5 h-5" />
              </Link>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                style={{ color: 'var(--foreground)' }}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card-apple p-6 text-center">
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
              {stats.wordsLearned}
            </div>
            <div className="text-caption">Words Learned</div>
          </div>
          
          <div className="card-apple p-6 text-center">
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--success)' }}>
              {stats.streak}
            </div>
            <div className="text-caption">Day Streak</div>
          </div>
          
          <div className="card-apple p-6 text-center">
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--warning)' }}>
              {stats.accuracy}%
            </div>
            <div className="text-caption">Accuracy</div>
          </div>
          
          <div className="card-apple p-6 text-center">
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--muted-foreground)' }}>
              {stats.totalWords}
            </div>
            <div className="text-caption">Total Words</div>
          </div>
        </div>
        
        {/* Learning Mode Toggle */}
        <div className="card-apple p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Repeat className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <div>
                <div className="font-medium">Learning Direction</div>
                <div className="text-footnote" style={{ color: 'var(--muted-foreground)' }}>
                  {reverseMode ? 'Foreign Language → German' : 'German → Foreign Language'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setReverseMode(!reverseMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                reverseMode 
                  ? 'bg-blue-600' 
                  : theme === 'dark' 
                    ? 'bg-gray-700' 
                    : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                reverseMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
        
        {/* Language Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedLanguage(null)}
              className={`btn-apple px-4 py-2 font-medium ${
                !selectedLanguage ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              All Languages
            </button>
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language)}
                className={`btn-apple px-4 py-2 font-medium flex items-center space-x-2 ${
                  selectedLanguage?.code === language.code ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
                <span className="text-xs px-2 py-1 rounded-full"
                      style={{ 
                        background: selectedLanguage?.code === language.code ? 'rgba(255,255,255,0.2)' : 'var(--muted)',
                        color: selectedLanguage?.code === language.code ? 'white' : 'var(--muted-foreground)'
                      }}>
                  {vocabularyLists.filter(list => list.language.code === language.code).length}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Search and Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      style={{ color: 'var(--muted-foreground)' }} />
              <input
                type="text"
                placeholder="Search vocabulary lists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-body font-medium"
                style={{ 
                  background: 'var(--card)',
                  color: 'var(--foreground)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
                >
                  ×
                </button>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/lists/new"
              className="btn-apple btn-primary px-6 py-4 font-medium flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New List</span>
            </Link>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleImport}
              className="hidden"
            />
            
            <button
              onClick={triggerImport}
              className="btn-apple btn-secondary px-4 py-4 font-medium flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline">Import</span>
            </button>
            
            <button
              onClick={handleExport}
              className="btn-apple btn-secondary px-4 py-4 font-medium flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
            
            <button
              onClick={handleDownloadTemplate}
              className="btn-apple btn-secondary px-4 py-4 font-medium flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span className="hidden lg:inline">Template</span>
            </button>
          </div>
        </div>
        
        {/* Vocabulary Lists */}
        {Object.keys(listsByCategory).length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📚</div>
            <h3 className="text-title-2 mb-4">
              {searchQuery ? 'No matching lists found' : 'No vocabulary lists yet'}
            </h3>
            <p className="text-body mb-8 max-w-md mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              {searchQuery 
                ? 'Try adjusting your search terms or clear the search to see all lists.'
                : 'Create your first vocabulary list to get started learning!'
              }
            </p>
            {!searchQuery && (
              <Link
                href="/lists/new"
                className="btn-apple btn-primary px-6 py-4 font-medium flex items-center space-x-2 mx-auto w-fit"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First List</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(listsByCategory).map(([category, lists]) => (
              <div key={category} className="animate-slide-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-title-2 font-bold flex items-center space-x-3">
                    <span>{category}</span>
                    <span className="text-footnote px-3 py-1 rounded-full"
                          style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                      {lists.length}
                    </span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {lists.map((list) => (
                    <div key={list.id} className="card-apple p-6 group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{list.language.flag}</span>
                          <div>
                            <h3 className="font-semibold text-body">{list.name}</h3>
                            <p className="text-footnote" style={{ color: 'var(--muted-foreground)' }}>
                              {reverseMode ? `${list.language.name} → German` : `German → ${list.language.name}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-caption mb-6" style={{ color: 'var(--muted-foreground)' }}>
                        {list.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-caption" style={{ color: 'var(--muted-foreground)' }}>
                          {list.word_count} words
                        </span>
                        {list.is_default && (
                          <span className="text-xs px-2 py-1 rounded-full"
                                style={{ background: 'var(--success)', color: 'white' }}>
                            Default
                          </span>
                        )}
                      </div>
                      
                      <Link
                        href={`/study/${list.id}`}
                        className="btn-apple btn-primary w-full flex items-center justify-center space-x-2 py-4"
                      >
                        <Play className="w-4 h-4" />
                        <span>Study Now</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
