'use client'

import React from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { progressService } from '@/lib/progress'
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Clock, 
  Calendar,
  TrendingUp,
  Award,
  Flame,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

export default function StatisticsPage() {
  const { vocabularyLists, theme } = useAppContext()

  // Get real progress data
  const progress = progressService.getProgress()
  const weeklyData = progressService.getWeeklyProgress()
  
  const stats = {
    totalWords: vocabularyLists.reduce((total, list) => total + list.word_count, 0),
    wordsLearned: progress.wordsLearned || 0,
    currentStreak: progress.currentStreak || 0,
    longestStreak: progress.longestStreak || 0,
    totalSessions: progress.totalSessions || 0,
    totalTime: Math.round((progress.totalTime || 0) / 60), // Convert to hours
    accuracy: Math.round(progress.accuracy || 0),
    weeklyGoal: (progress.dailyGoal || 10) * 7,
    weeklyProgress: progress.weeklyProgress || 0,
    achievements: [
      { 
        id: 1, 
        name: 'First Steps', 
        description: 'Completed your first vocabulary session', 
        earned: (progress.totalSessions || 0) > 0, 
        icon: '🎯' 
      },
      { 
        id: 2, 
        name: 'Word Master', 
        description: 'Learned 100 words', 
        earned: (progress.wordsLearned || 0) >= 100, 
        icon: '📚' 
      },
      { 
        id: 3, 
        name: 'Streak Master', 
        description: 'Maintained a 7-day streak', 
        earned: (progress.longestStreak || 0) >= 7, 
        icon: '🔥' 
      },
      { 
        id: 4, 
        name: 'Perfectionist', 
        description: 'Achieved 95% accuracy in a session', 
        earned: (progress.accuracy || 0) >= 95, 
        icon: '💎' 
      },
      {
        id: 5,
        name: 'Dedicated Learner',
        description: 'Completed 10 study sessions',
        earned: (progress.totalSessions || 0) >= 10,
        icon: '📖'
      }
    ]
  }

  const languageBreakdown = vocabularyLists
    .reduce((acc, list) => {
      const lang = list.language.name
      const existing = acc.find(l => l.name === lang)
      if (existing) {
        existing.words += list.word_count
        existing.lists += 1
      } else {
        acc.push({
          name: lang,
          flag: list.language.flag,
          words: list.word_count,
          lists: 1
        })
      }
      return acc
    }, [] as Array<{name: string, flag: string, words: number, lists: number}>)

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
              
              <h1 className="text-xl font-bold">Statistics</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-6 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Words Learned
                  </p>
                  <p className="text-2xl font-bold">{stats.wordsLearned}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    of {stats.totalWords}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center space-x-3">
                <Flame className="w-8 h-8 text-red-500" />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Current Streak
                  </p>
                  <p className="text-2xl font-bold">{stats.currentStreak}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    days
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-green-500" />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Accuracy
                  </p>
                  <p className="text-2xl font-bold">{stats.accuracy}%</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    overall
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-blue-500" />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Time Studied
                  </p>
                  <p className="text-2xl font-bold">{stats.totalTime}h</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    total
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Weekly Progress</span>
              </h2>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stats.weeklyProgress} of {stats.weeklyGoal} words this week
              </p>
            </div>
            
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className={`w-full rounded-full h-3 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((stats.weeklyProgress / stats.weeklyGoal) * 100, 100)}%` }}
                />
              </div>
              
              {/* Daily Breakdown */}
              <div className="grid grid-cols-7 gap-2">
                {weeklyData.map((day) => (
                  <div key={day.day} className="text-center">
                    <div
                      className={`w-full rounded-lg mb-2 flex items-end justify-center ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                      style={{ height: '60px' }}
                    >
                      {day.words > 0 && (
                        <div
                          className="w-full bg-blue-600 rounded-lg transition-all duration-300"
                          style={{ 
                            height: `${Math.min((day.words / 20) * 100, 100)}%`,
                            minHeight: day.words > 0 ? '4px' : '0'
                          }}
                        />
                      )}
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {day.day}
                    </p>
                    <p className="text-xs font-medium">{day.words}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Achievements</span>
              </h2>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stats.achievements.filter(a => a.earned).length} of {stats.achievements.length} earned
              </p>
            </div>
            
            <div className="grid gap-3">
              {stats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors ${
                    achievement.earned 
                      ? theme === 'dark'
                        ? 'border-blue-600/30 bg-blue-600/10'
                        : 'border-blue-200 bg-blue-50'
                      : theme === 'dark'
                        ? 'border-gray-700 bg-gray-700/30'
                        : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`text-3xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      achievement.earned 
                        ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                        : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {achievement.name}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-6 rounded-xl border text-center ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Sessions
              </p>
              <p className="text-2xl font-bold">{stats.totalSessions}</p>
            </div>
            
            <div className={`p-6 rounded-xl border text-center ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <TrendingUp className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Best Streak
              </p>
              <p className="text-2xl font-bold">{stats.longestStreak}</p>
            </div>
          </div>

          {/* Language Breakdown */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Language Progress</h2>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Your progress across different languages
              </p>
            </div>
            
            <div className="space-y-4">
              {languageBreakdown.map((lang) => (
                <div 
                  key={lang.name} 
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <p className="font-medium">{lang.name}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {lang.lists} lists • {lang.words} words
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {Math.round((stats.wordsLearned / lang.words) * 100)}%
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      learned
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
