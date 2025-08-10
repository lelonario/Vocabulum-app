'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { VocabularyWord, StudyMode } from '@/types'
import { progressService } from '@/lib/progress'
import { audioService } from '@/lib/audio'
import { ArrowLeft, Volume2, RotateCcw, Check, X, ChevronRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface StudyPageProps {
  listId: string
}

export default function StudyPage({ listId }: StudyPageProps) {
  const { 
    vocabularyLists, 
    theme, 
    studyMode, 
    setStudyMode,
    difficultyLevel, 
    audioEnabled, 
    reverseMode 
  } = useAppContext()
  
  const list = vocabularyLists.find(l => l.id === listId)
  
  // Study state
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionWords, setSessionWords] = useState<VocabularyWord[]>([])
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  })
  const [userAnswer, setUserAnswer] = useState('')
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null)
  
  // Filter words based on difficulty level
  const filteredWords = useMemo(() => {
    if (!list) return []
    
    switch (difficultyLevel) {
      case 'new':
        return list.words.filter(word => word.correct_count === 0)
      case 'difficult':
        return list.words.filter(word => word.incorrect_count > word.correct_count)
      case 'mixed':
      default:
        return list.words
    }
  }, [list, difficultyLevel])
  
  const currentWord = sessionWords[currentWordIndex]
  const progress = ((currentWordIndex + 1) / sessionWords.length) * 100
  
  // Initialize session
  useEffect(() => {
    if (filteredWords.length > 0) {
      const shuffled = [...filteredWords].sort(() => Math.random() - 0.5)
      setSessionWords(shuffled)
      setSessionStats({
        correct: 0,
        incorrect: 0,
        total: shuffled.length
      })
    }
  }, [filteredWords])
  
  // Generate multiple choice options
  useEffect(() => {
    if (currentWord && studyMode === 'multiple-choice' && list) {
      const correctAnswer = reverseMode ? currentWord.native : currentWord.foreign
      const otherWords = list.words.filter(w => w.id !== currentWord.id)
      const randomOptions = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => reverseMode ? w.native : w.foreign)
      
      const allOptions = [correctAnswer, ...randomOptions].sort(() => Math.random() - 0.5)
      setMultipleChoiceOptions(allOptions)
      setSelectedOption(null)
    }
  }, [currentWord, studyMode, reverseMode, list])
  
  // Reset states when word changes
  useEffect(() => {
    setHasAnswered(false)
    setShowAnswer(false)
    setAnswerSubmitted(false)
    setIsFlipped(false)
    setUserAnswer('')
    setSelectedOption(null)
    setShowNextButton(false)
    setLastAnswerCorrect(null)
  }, [currentWordIndex])
  
  const playAudio = async () => {
    if (!currentWord || !audioEnabled || !list) return

    try {
      setIsSpeaking(true)
      const textToSpeak = reverseMode ? currentWord.native : currentWord.foreign
      const languageCode = reverseMode ? 'de-DE' : list.language.voice
      await audioService.speak(textToSpeak, languageCode)
    } catch (error) {
      console.error('Audio failed:', error)
    } finally {
      setIsSpeaking(false)
    }
  }
  
  const handleFlip = () => {
    if (studyMode === 'flashcards' && !isFlipped) {
      setIsFlipped(true)
      setHasAnswered(true)
      setShowAnswer(true)
      
      // Automatically play audio after flip
      if (audioEnabled) {
        setTimeout(playAudio, 300)
      }
    }
  }
  
  const handleFlashcardAnswer = (isCorrect: boolean) => {
    setLastAnswerCorrect(isCorrect)
    setShowNextButton(true)
    
    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }))
    
    // Update word statistics
    if (currentWord) {
      progressService.recordAnswer(currentWord.id, isCorrect)
    }
    
    // Show feedback
    toast.success(isCorrect ? '✅ Correct!' : '❌ Keep practicing!', {
      duration: 1500
    })
  }
  
  const handleSubmitAnswer = () => {
    if (!currentWord || answerSubmitted) return
    
    const correctAnswer = reverseMode ? currentWord.native : currentWord.foreign
    let isCorrect = false
    
    if (studyMode === 'input' || studyMode === 'spelling') {
      isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    } else if (studyMode === 'multiple-choice') {
      isCorrect = selectedOption === correctAnswer
    }
    
    setAnswerSubmitted(true)
    setShowAnswer(true)
    setHasAnswered(true)
    setLastAnswerCorrect(isCorrect)
    setShowNextButton(true)
    
    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }))
    
    // Update word statistics
    if (currentWord) {
      progressService.recordAnswer(currentWord.id, isCorrect)
    }
    
    // Show feedback
    toast.success(isCorrect ? '✅ Correct!' : '❌ Keep practicing!', {
      duration: 1500
    })
    
    // Play audio automatically after answering
    if (audioEnabled) {
      setTimeout(playAudio, 500)
    }
  }
  
  const handleMultipleChoice = (option: string) => {
    if (answerSubmitted) return
    setSelectedOption(option)
  }
  
  const nextWord = () => {
    if (currentWordIndex < sessionWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      completeSession()
    }
  }
  
  const prevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1)
    }
  }
  
  const completeSession = () => {
    // Update progress
    progressService.updateProgress({
      wordsStudied: sessionStats.total,
      correctAnswers: sessionStats.correct,
      incorrectAnswers: sessionStats.incorrect,
      timeSpent: Date.now()
    })
    
    // Show completion message
    const accuracy = Math.round((sessionStats.correct / sessionStats.total) * 100)
    toast.success(`🎉 Session completed!\n${sessionStats.correct}/${sessionStats.total} correct (${accuracy}%)`, {
      duration: 4000
    })
    
    // Navigate back
    setTimeout(() => {
      window.history.back()
    }, 2000)
  }
  
  const resetSession = () => {
    setCurrentWordIndex(0)
    setSessionStats({
      correct: 0,
      incorrect: 0,
      total: sessionWords.length
    })
    toast.success('Session reset! 🔄')
  }
  
  if (!list) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="text-center">
          <h1 className="text-title-2 mb-4">List not found</h1>
          <Link href="/" className="btn-apple btn-primary px-6 py-3">Return to Home</Link>
        </div>
      </div>
    )
  }
  
  if (sessionWords.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="text-center">
          <h1 className="text-title-2 mb-4">No words available</h1>
          <p className="text-body mb-6" style={{ color: 'var(--muted-foreground)' }}>
            No words match your current difficulty settings.
          </p>
          <Link href="/" className="btn-apple btn-primary px-6 py-3">Return to Home</Link>
        </div>
      </div>
    )
  }
  
  const renderStudyMode = () => {
    if (!currentWord) return null
    
    switch (studyMode) {
      case 'flashcards':
        return (
          <div className="flip-card h-96 mb-8">
            <div className={`flip-card-inner w-full h-full ${isFlipped ? 'flipped' : ''}`}>
              {/* Front of card */}
              <div className="flip-card-front absolute w-full h-full card-apple p-8 flex flex-col items-center justify-center cursor-pointer"
                   onClick={handleFlip}>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-6">
                    {reverseMode ? currentWord.foreign : currentWord.native}
                  </div>
                  <div className="text-caption">Tap to reveal answer</div>
                </div>
              </div>
              
              {/* Back of card */}
              <div className="flip-card-back absolute w-full h-full card-apple p-8 flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold mb-4">
                    {reverseMode ? currentWord.native : currentWord.foreign}
                  </div>
                </div>
                
                {!showNextButton && (
                  <div className="flex space-x-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleFlashcardAnswer(false) }}
                      className="btn-apple status-error px-6 py-3 flex items-center space-x-2"
                    >
                      <X className="w-5 h-5" />
                      <span>Difficult</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleFlashcardAnswer(true) }}
                      className="btn-apple status-success px-6 py-3 flex items-center space-x-2"
                    >
                      <Check className="w-5 h-5" />
                      <span>Easy</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
        
      case 'multiple-choice':
        return (
          <div className="card-apple p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-title-2 mb-4">
                {reverseMode ? currentWord.foreign : currentWord.native}
              </div>
              <div className="text-body mb-4" style={{ color: 'var(--muted-foreground)' }}>
                Choose the correct translation:
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3 mb-6">
              {multipleChoiceOptions.map((option, index) => {
                const isSelected = selectedOption === option
                const isCorrect = option === (reverseMode ? currentWord.native : currentWord.foreign)
                const showResult = answerSubmitted
                
                return (
                  <button
                    key={index}
                    onClick={() => handleMultipleChoice(option)}
                    disabled={answerSubmitted}
                    className={`input-apple text-left transition-all ${
                      showResult
                        ? isCorrect
                          ? 'status-success'
                          : isSelected
                            ? 'status-error'
                            : 'opacity-50'
                        : isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                          : 'hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            
            {selectedOption && !answerSubmitted && (
              <div className="text-center">
                <button onClick={handleSubmitAnswer} className="btn-apple btn-primary px-8 py-3">
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        )
        
      case 'input':
      case 'spelling':
        return (
          <div className="card-apple p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-title-2 mb-4">
                {reverseMode ? currentWord.foreign : currentWord.native}
              </div>
              <div className="text-body mb-4" style={{ color: 'var(--muted-foreground)' }}>
                Type the translation:
              </div>
            </div>
            
            <div className="mb-6">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !answerSubmitted && handleSubmitAnswer()}
                disabled={answerSubmitted}
                placeholder="Enter your answer..."
                className={`input-apple w-full text-center text-lg ${
                  answerSubmitted
                    ? userAnswer.toLowerCase().trim() === (reverseMode ? currentWord.native : currentWord.foreign).toLowerCase().trim()
                      ? 'status-success'
                      : 'status-error'
                    : ''
                }`}
              />
            </div>
            
            {showAnswer && (
              <div className="text-center mb-6">
                <div className="text-body font-medium">
                  Correct answer: {reverseMode ? currentWord.native : currentWord.foreign}
                </div>
              </div>
            )}
            
            {!answerSubmitted && userAnswer.trim() && (
              <div className="text-center">
                <button onClick={handleSubmitAnswer} className="btn-apple btn-primary px-8 py-3">
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        )
        
      default:
        return (
          <div className="card-apple p-8 mb-8">
            <div className="text-center">
              <p>Study mode not implemented yet</p>
            </div>
          </div>
        )
    }
  }
  
  return (
    <div className="min-h-screen safe-area-padding" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <header className="nav-apple sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              
              <div>
                <h1 className="font-semibold text-body">{list.name}</h1>
                <p className="text-footnote" style={{ color: 'var(--muted-foreground)' }}>
                  {list.language.flag} {list.language.name}
                  {reverseMode && ' → 🇩🇪 German'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Study Mode Selector */}
              <div className="relative">
                <select
                  value={studyMode}
                  onChange={(e) => setStudyMode(e.target.value as StudyMode)}
                  className="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ 
                    background: 'var(--card)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <option value="flashcards">📚 Flashcards</option>
                  <option value="multiple-choice">✨ Multiple Choice</option>
                  <option value="input">✍️ Input</option>
                  <option value="spelling">🔤 Spelling</option>
                  <option value="mixed">🎯 Mixed Mode</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button onClick={resetSession} className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="w-full h-1" style={{ background: 'var(--muted)' }}>
        <div className="progress-bar h-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      
      {/* Study Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Session Stats */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
              {sessionStats.correct}
            </div>
            <div className="text-caption">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--destructive)' }}>
              {sessionStats.incorrect}
            </div>
            <div className="text-caption">Incorrect</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
              {currentWordIndex + 1}/{sessionStats.total}
            </div>
            <div className="text-caption">Progress</div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={prevWord}
            disabled={currentWordIndex === 0}
            className={`btn-apple btn-secondary px-4 py-3 flex items-center space-x-2 ${
              currentWordIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Audio Button */}
            <button
              onClick={playAudio}
              disabled={isSpeaking || !audioEnabled || !hasAnswered}
              className={`p-3 rounded-xl transition-all ${
                hasAnswered && audioEnabled
                  ? 'btn-apple btn-primary'
                  : 'opacity-40 cursor-not-allowed'
              }`}
              title={hasAnswered ? 'Play pronunciation' : 'Answer first to hear pronunciation'}
            >
              <Volume2 className={`w-6 h-6 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </button>
          </div>
          
          <button
            onClick={nextWord}
            disabled={!showNextButton}
            className={`btn-apple px-4 py-3 flex items-center space-x-2 ${
              showNextButton 
                ? lastAnswerCorrect 
                  ? 'status-success' 
                  : 'status-error'
                : 'btn-secondary opacity-40 cursor-not-allowed'
            }`}
          >
            <span>{currentWordIndex === sessionWords.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Study Card */}
        <div className="max-w-2xl mx-auto">
          {renderStudyMode()}
        </div>
      </main>
    </div>
  )
}
