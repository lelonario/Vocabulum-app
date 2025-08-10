interface Progress {
  wordsLearned: number
  wordsStudied: number
  currentStreak: number
  longestStreak: number
  lastStudyDate: string
  totalSessions: number
  totalTime: number
  accuracy: number
  dailyGoal: number
  weeklyProgress: number
  sessionsThisWeek: number
  wordsThisWeek: number
}

interface WeeklyData {
  day: string
  words: number
  sessions: number
  date: string
}

class ProgressService {
  private storageKey = 'vocabulum-progress'
  private wordProgressKey = 'vocabulum-word-progress'

  getProgress(): Progress {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress()
    }

    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        const progress = JSON.parse(stored)
        return { ...this.getDefaultProgress(), ...progress }
      }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }

    return this.getDefaultProgress()
  }

  private getDefaultProgress(): Progress {
    return {
      wordsLearned: 0,
      wordsStudied: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: '',
      totalSessions: 0,
      totalTime: 0,
      accuracy: 0,
      dailyGoal: 20,
      weeklyProgress: 0,
      sessionsThisWeek: 0,
      wordsThisWeek: 0
    }
  }

  updateProgress(sessionData: {
    wordsStudied: number
    correctAnswers: number
    incorrectAnswers: number
    timeSpent: number
  }): void {
    if (typeof window === 'undefined') return

    const progress = this.getProgress()
    const today = new Date().toDateString()

    // Update basic stats
    progress.wordsStudied += sessionData.wordsStudied
    progress.wordsLearned += sessionData.correctAnswers
    progress.totalSessions += 1

    // Update accuracy
    const totalAnswers = sessionData.correctAnswers + sessionData.incorrectAnswers
    const sessionAccuracy = totalAnswers > 0 ? (sessionData.correctAnswers / totalAnswers) * 100 : 0
    
    // Weighted average of previous accuracy and session accuracy
    if (progress.totalSessions === 1) {
      progress.accuracy = sessionAccuracy
    } else {
      progress.accuracy = ((progress.accuracy * (progress.totalSessions - 1)) + sessionAccuracy) / progress.totalSessions
    }

    // Update streak
    if (progress.lastStudyDate !== today) {
      const lastDate = progress.lastStudyDate ? new Date(progress.lastStudyDate) : null
      const todayDate = new Date()
      
      if (lastDate) {
        const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysDiff === 1) {
          // Consecutive day
          progress.currentStreak += 1
        } else if (daysDiff > 1) {
          // Streak broken
          progress.currentStreak = 1
        }
        // If daysDiff === 0, it's the same day, don't change streak
      } else {
        // First time studying
        progress.currentStreak = 1
      }
      
      progress.lastStudyDate = today
      
      // Update longest streak
      if (progress.currentStreak > progress.longestStreak) {
        progress.longestStreak = progress.currentStreak
      }
    }

    // Update weekly progress
    this.updateWeeklyProgress(progress, sessionData.wordsStudied)

    this.saveProgress(progress)
  }

  private updateWeeklyProgress(progress: Progress, wordsStudied: number): void {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay()) // Sunday
    startOfWeek.setHours(0, 0, 0, 0)

    // Get weekly data
    const weeklyData = this.getWeeklyProgress()
    const todayStr = now.toDateString()
    
    // Find today's entry or create it
    let todayEntry = weeklyData.find(d => d.date === todayStr)
    if (!todayEntry) {
      todayEntry = {
        day: now.toLocaleDateString('en', { weekday: 'short' }),
        words: 0,
        sessions: 0,
        date: todayStr
      }
      weeklyData.push(todayEntry)
    }

    // Update today's entry
    todayEntry.words += wordsStudied
    todayEntry.sessions += 1

    // Calculate total words this week
    progress.wordsThisWeek = weeklyData.reduce((total, day) => total + day.words, 0)
    progress.sessionsThisWeek = weeklyData.reduce((total, day) => total + day.sessions, 0)
    progress.weeklyProgress = progress.wordsThisWeek

    // Save weekly data
    this.saveWeeklyData(weeklyData)
  }

  private saveWeeklyData(weeklyData: WeeklyData[]): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem('vocabulum-weekly-data', JSON.stringify(weeklyData))
    } catch (error) {
      console.error('Failed to save weekly data:', error)
    }
  }

  getWeeklyProgress(): WeeklyData[] {
    if (typeof window === 'undefined') return []

    try {
      const stored = localStorage.getItem('vocabulum-weekly-data')
      if (stored) {
        const data = JSON.parse(stored)
        
        // Filter to current week only
        const now = new Date()
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - now.getDay())
        startOfWeek.setHours(0, 0, 0, 0)

        const currentWeekData = data.filter((entry: WeeklyData) => {
          const entryDate = new Date(entry.date)
          return entryDate >= startOfWeek
        })

        // Ensure we have entries for all 7 days of the week
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const completeWeek: WeeklyData[] = []

        for (let i = 0; i < 7; i++) {
          const date = new Date(startOfWeek)
          date.setDate(startOfWeek.getDate() + i)
          const dateStr = date.toDateString()
          
          const existingEntry = currentWeekData.find(entry => entry.date === dateStr)
          completeWeek.push(existingEntry || {
            day: days[i],
            words: 0,
            sessions: 0,
            date: dateStr
          })
        }

        return completeWeek
      }
    } catch (error) {
      console.error('Failed to load weekly progress:', error)
    }

    // Return empty week if no data
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days.map((day, index) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + index)
      return {
        day,
        words: 0,
        sessions: 0,
        date: date.toDateString()
      }
    })
  }

  recordAnswer(wordId: string, isCorrect: boolean): void {
    if (typeof window === 'undefined') return

    try {
      const wordProgress = JSON.parse(localStorage.getItem(this.wordProgressKey) || '{}')
      
      if (!wordProgress[wordId]) {
        wordProgress[wordId] = {
          correctCount: 0,
          incorrectCount: 0,
          lastReviewed: new Date().toISOString(),
          difficulty: 0
        }
      }

      if (isCorrect) {
        wordProgress[wordId].correctCount += 1
        wordProgress[wordId].difficulty = Math.max(0, wordProgress[wordId].difficulty - 1)
      } else {
        wordProgress[wordId].incorrectCount += 1
        wordProgress[wordId].difficulty = Math.min(5, wordProgress[wordId].difficulty + 1)
      }

      wordProgress[wordId].lastReviewed = new Date().toISOString()

      localStorage.setItem(this.wordProgressKey, JSON.stringify(wordProgress))
    } catch (error) {
      console.error('Failed to record answer:', error)
    }
  }

  private saveProgress(progress: Progress): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(progress))
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  resetProgress(): void {
    if (typeof window === 'undefined') return

    localStorage.removeItem(this.storageKey)
    localStorage.removeItem(this.wordProgressKey)
    localStorage.removeItem('vocabulum-weekly-data')
  }
}

export const progressService = new ProgressService()
