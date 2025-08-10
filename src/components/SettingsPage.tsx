'use client'

import React from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { ArrowLeft, Sun, Moon, Volume2, VolumeX, RotateCcw, Save } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const {
    theme,
    toggleTheme,
    studyMode,
    setStudyMode,
    difficultyLevel,
    setDifficultyLevel,
    audioEnabled,
    setAudioEnabled,
    reverseMode,
    setReverseMode
  } = useAppContext()
  
  const handleSaveSettings = () => {
    // Settings are automatically saved through useEffect in AppContext
    toast.success('Settings saved successfully!')
  }
  
  const handleResetSettings = () => {
    setStudyMode('flashcards')
    setDifficultyLevel('mixed')
    setAudioEnabled(true)
    setReverseMode(false)
    toast.success('Settings reset to defaults!')
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
              <Link
                href="/"
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              
              <h1 className="text-xl font-bold">Settings</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetSettings}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 btn-hover"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Appearance Settings */}
          <section className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <h2 className="text-lg font-semibold mb-4">Appearance</h2>
            
            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Theme</label>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Choose between light and dark mode
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`p-3 rounded-xl transition-colors flex items-center space-x-3 ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-5 h-5" />
                      <span>Switch to Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" />
                      <span>Switch to Dark</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
          
          {/* Study Settings */}
          <section className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <h2 className="text-lg font-semibold mb-4">Study Settings</h2>
            
            <div className="space-y-6">
              {/* Study Mode */}
              <div>
                <label className="block font-medium mb-2">Default Study Mode</label>
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Choose your preferred study method
                </p>
                <select
                  value={studyMode}
                  onChange={(e) => setStudyMode(e.target.value as any)}
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="flashcards">Flashcards</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="input">Input Mode</option>
                  <option value="spelling">Spelling Test</option>
                  <option value="mixed">Mixed Mode</option>
                </select>
              </div>
              
              {/* Difficulty Level */}
              <div>
                <label className="block font-medium mb-2">Difficulty Level</label>
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Choose which words to focus on
                </p>
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value as any)}
                  className={`w-full p-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="new">New Words Only</option>
                  <option value="difficult">Difficult Words</option>
                  <option value="mixed">Mixed (All Words)</option>
                </select>
              </div>
              
              {/* Audio Settings */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Audio Pronunciation</label>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Enable audio pronunciation for vocabulary words
                  </p>
                </div>
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`p-3 rounded-xl transition-colors flex items-center space-x-3 ${
                    audioEnabled
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {audioEnabled ? (
                    <>
                      <Volume2 className="w-5 h-5" />
                      <span>Enabled</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-5 h-5" />
                      <span>Disabled</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Reverse Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Reverse Mode</label>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Study from foreign language to German instead of German to foreign
                  </p>
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
          </section>
          
          {/* Learning Settings */}
          <section className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <h2 className="text-lg font-semibold mb-4">Learning Preferences</h2>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="font-medium mb-2">Spaced Repetition</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Vocabulum uses spaced repetition to help you remember words more effectively. 
                  Words you find difficult will appear more frequently, while words you know well 
                  will appear less often.
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="font-medium mb-2">Progress Tracking</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your learning progress is automatically saved locally and can be synced 
                  to the cloud when you create an account.
                </p>
              </div>
            </div>
          </section>
          
          {/* About */}
          <section className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <h2 className="text-lg font-semibold mb-4">About Vocabulum</h2>
            
            <div className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>
                Vocabulum is a modern vocabulary learning app designed to help you learn 
                languages efficiently using proven learning techniques like spaced repetition.
              </p>
              <p>
                <strong>Supported Languages:</strong> English, Spanish, Latin
              </p>
              <p>
                <strong>Study Modes:</strong> Flashcards, Multiple Choice, Input, Spelling, Mixed
              </p>
              <p>
                <strong>Version:</strong> 1.0.0
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
