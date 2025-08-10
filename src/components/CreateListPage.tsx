'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/contexts/AppContext'
import { SUPPORTED_LANGUAGES } from '@/data/languages'
import { VocabularyList, VocabularyWord, Language } from '@/types'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CreateListPage() {
  const { vocabularyLists, setVocabularyLists, theme } = useAppContext()
  const router = useRouter()
  
  const [listName, setListName] = useState('')
  const [listDescription, setListDescription] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0])
  const [category, setCategory] = useState('')
  const [words, setWords] = useState<Array<{ native: string; foreign: string; pronunciation?: string }>>([
    { native: '', foreign: '', pronunciation: '' }
  ])

  const addWord = () => {
    setWords([...words, { native: '', foreign: '', pronunciation: '' }])
  }

  const removeWord = (index: number) => {
    if (words.length > 1) {
      setWords(words.filter((_, i) => i !== index))
    }
  }

  const updateWord = (index: number, field: string, value: string) => {
    const updatedWords = words.map((word, i) =>
      i === index ? { ...word, [field]: value } : word
    )
    setWords(updatedWords)
  }

  const saveList = () => {
    // Validation
    if (!listName.trim()) {
      toast.error('Please enter a list name')
      return
    }

    const validWords = words.filter(word => word.native.trim() && word.foreign.trim())
    
    if (validWords.length === 0) {
      toast.error('Please add at least one word pair')
      return
    }

    // Create vocabulary words
    const vocabularyWords: VocabularyWord[] = validWords.map((word, index) => ({
      id: `custom-${Date.now()}-${index}`,
      native: word.native.trim(),
      foreign: word.foreign.trim(),
      pronunciation: word.pronunciation?.trim() || undefined,
      difficulty: 0,
      created_at: new Date(),
      updated_at: new Date(),
      learned: false,
      favorite: false,
      correct_count: 0,
      incorrect_count: 0
    }))

    // Create vocabulary list
    const newList: VocabularyList = {
      id: `custom-${Date.now()}`,
      name: listName.trim(),
      description: listDescription.trim() || `Custom ${selectedLanguage.name} vocabulary list`,
      language: selectedLanguage,
      category: category.trim() || 'Custom',
      created_at: new Date(),
      updated_at: new Date(),
      word_count: vocabularyWords.length,
      is_default: false,
      is_public: false,
      words: vocabularyWords
    }

    // Add to vocabulary lists
    setVocabularyLists([...vocabularyLists, newList])
    
    toast.success(`Created "${listName}" with ${vocabularyWords.length} words`)
    router.push('/')
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        theme === 'dark'
          ? 'bg-gray-800/80 border-gray-700'
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <h1 className="text-xl font-bold">Create New List</h1>
            </div>
            
            <button
              onClick={saveList}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 btn-hover"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* List Details */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <h2 className="text-lg font-semibold mb-6">List Details</h2>
            
            <div className="space-y-6">
              {/* List Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  placeholder="Enter list name..."
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Enter description..."
                  rows={3}
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  value={listDescription}
                  onChange={(e) => setListDescription(e.target.value)}
                />
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <div className="flex flex-wrap gap-2">
                  {SUPPORTED_LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => setSelectedLanguage(language)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                        selectedLanguage.code === language.code
                          ? 'bg-blue-600 text-white'
                          : theme === 'dark'
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  placeholder="Enter category (optional)..."
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Vocabulary Words */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Vocabulary Words</h2>
              <button
                onClick={addWord}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2 btn-hover"
              >
                <Plus className="w-4 h-4" />
                <span>Add Word</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {words.map((word, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Word {index + 1}
                    </span>
                    {words.length > 1 && (
                      <button
                        onClick={() => removeWord(index)}
                        className="p-1 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">German</label>
                      <input
                        type="text"
                        placeholder="German word..."
                        className={`w-full p-3 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        value={word.native}
                        onChange={(e) => updateWord(index, 'native', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {selectedLanguage.name} Translation
                      </label>
                      <input
                        type="text"
                        placeholder={`${selectedLanguage.name} word...`}
                        className={`w-full p-3 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        value={word.foreign}
                        onChange={(e) => updateWord(index, 'foreign', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className={`p-4 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-gray-300'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <h3 className="font-medium mb-2">📝 Instructions</h3>
            <ul className="text-sm space-y-1">
              <li>• Fill in both German and foreign language words for each pair</li>
              <li>• Empty word pairs will be ignored when saving</li>
              <li>• You need at least one complete word pair to save the list</li>
              <li>• The list will be added to your vocabulary collection</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
