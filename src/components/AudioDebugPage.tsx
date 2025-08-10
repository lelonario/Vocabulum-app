'use client'

import React, { useState, useEffect } from 'react'
import { audioService } from '@/lib/audio'
import { Volume2, Play } from 'lucide-react'

export default function AudioDebugPage() {
  const [isSupported, setIsSupported] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [testText, setTestText] = useState('Hello world')
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    setIsSupported(audioService.isSupported())
    
    // Load voices after a short delay to ensure they're loaded
    setTimeout(() => {
      setVoices(audioService.getAvailableVoices())
    }, 500)
    
    // Also try to load voices on user interaction
    const loadVoices = () => {
      setVoices(audioService.getAvailableVoices())
    }
    
    document.addEventListener('click', loadVoices, { once: true })
    
    return () => {
      document.removeEventListener('click', loadVoices)
    }
  }, [])

  const testSpeak = async () => {
    setIsSpeaking(true)
    try {
      await audioService.speak(testText, selectedLanguage)
    } catch (error) {
      console.error('Test speak failed:', error)
    } finally {
      setIsSpeaking(false)
    }
  }

  const testQuickPhrases = async () => {
    const phrases = [
      { text: 'Hallo', lang: 'de-DE' },
      { text: 'Hello', lang: 'en-US' },
      { text: 'Hola', lang: 'es-ES' },
      { text: 'Salve', lang: 'en-US' } // Latin with English pronunciation
    ]
    
    for (const phrase of phrases) {
      console.log(`Speaking: ${phrase.text} (${phrase.lang})`)
      await audioService.speak(phrase.text, phrase.lang)
      await new Promise(resolve => setTimeout(resolve, 500)) // Small delay between phrases
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Audio Service Debug</h1>
        
        <div className="space-y-6">
          {/* Support Status */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Support Status</h2>
            <p className={`text-lg ${isSupported ? 'text-green-600' : 'text-red-600'}`}>
              Speech Synthesis: {isSupported ? '✅ Supported' : '❌ Not Supported'}
            </p>
          </div>

          {/* Available Voices */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Available Voices ({voices.length})</h2>
            <div className="max-h-60 overflow-y-auto">
              {voices.length === 0 ? (
                <p className="text-gray-600">No voices loaded. Try clicking the "Load Voices" button or interact with the page.</p>
              ) : (
                <div className="grid gap-2">
                  {voices.map((voice, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">{voice.name}</span>
                        <span className="text-gray-600 ml-2">({voice.lang})</span>
                      </div>
                      <button
                        onClick={() => audioService.speak('Test', voice.lang)}
                        className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setVoices(audioService.getAvailableVoices())}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Reload Voices
            </button>
          </div>

          {/* Test Speaking */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Test Speaking</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Text to speak:</label>
                <input
                  type="text"
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter text to speak..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Language:</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en-US">English (US)</option>
                  <option value="de-DE">German</option>
                  <option value="es-ES">Spanish</option>
                  <option value="en">English (Generic)</option>
                </select>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={testSpeak}
                  disabled={isSpeaking || !testText.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isSpeaking ? 'Speaking...' : 'Test Speak'}</span>
                </button>
                
                <button
                  onClick={() => audioService.stop()}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Stop
                </button>
                
                <button
                  onClick={testQuickPhrases}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Test All Languages
                </button>
              </div>
            </div>
          </div>

          {/* Browser Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Browser Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'}</p>
              <p><strong>Speech Synthesis:</strong> {typeof window !== 'undefined' && 'speechSynthesis' in window ? 'Available' : 'Not Available'}</p>
              <p><strong>Available Languages:</strong> {audioService.getAvailableLanguages().join(', ')}</p>
            </div>
          </div>

          {/* Quick Tests */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Quick Vocabulary Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => audioService.speak('Hello', 'en-US')}
                className="p-4 bg-blue-100 border-2 border-blue-300 rounded hover:bg-blue-200"
              >
                🇺🇸 Hello (English)
              </button>
              
              <button
                onClick={() => audioService.speak('Hallo', 'de-DE')}
                className="p-4 bg-red-100 border-2 border-red-300 rounded hover:bg-red-200"
              >
                🇩🇪 Hallo (German)
              </button>
              
              <button
                onClick={() => audioService.speak('Hola', 'es-ES')}
                className="p-4 bg-yellow-100 border-2 border-yellow-300 rounded hover:bg-yellow-200"
              >
                🇪🇸 Hola (Spanish)
              </button>
              
              <button
                onClick={() => audioService.speak('Salve', 'en-US')}
                className="p-4 bg-purple-100 border-2 border-purple-300 rounded hover:bg-purple-200"
              >
                🏛️ Salve (Latin)
              </button>
              
              <button
                onClick={() => audioService.speak('Aqua', 'en-US')}
                className="p-4 bg-purple-100 border-2 border-purple-300 rounded hover:bg-purple-200"
              >
                🏛️ Aqua (Latin)
              </button>
              
              <button
                onClick={() => audioService.speak('Tempus', 'en-US')}
                className="p-4 bg-purple-100 border-2 border-purple-300 rounded hover:bg-purple-200"
              >
                🏛️ Tempus (Latin)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
