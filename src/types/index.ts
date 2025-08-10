export interface VocabularyWord {
  id: string
  native: string
  foreign: string
  pronunciation?: string
  category?: string
  difficulty: number
  created_at: Date
  updated_at: Date
  learned: boolean
  favorite: boolean
  correct_count: number
  incorrect_count: number
  last_reviewed?: Date
  next_review?: Date
}

export interface VocabularyList {
  id: string
  name: string
  description?: string
  language: Language
  category?: string
  created_at: Date
  updated_at: Date
  word_count: number
  is_default: boolean
  is_public: boolean
  user_id?: string
  words: VocabularyWord[]
}

export interface Language {
  code: string
  name: string
  flag: string
  voice?: string
}

export interface UserProgress {
  id: string
  user_id: string
  language: string
  words_learned: number
  words_reviewed: number
  error_rate: number
  daily_goal: number
  streak: number
  total_time: number
  achievements: string[]
  created_at: Date
  updated_at: Date
}

export interface StudySession {
  id: string
  user_id: string
  list_id: string
  mode: StudyMode
  duration: number
  words_studied: number
  correct_answers: number
  incorrect_answers: number
  created_at: Date
}

export enum StudyMode {
  FLASHCARD = 'flashcard',
  MULTIPLE_CHOICE = 'multiple_choice',
  INPUT = 'input',
  SPELLING = 'spelling',
  CLOZE = 'cloze',
  MIXED = 'mixed'
}

export enum Difficulty {
  NEW = 0,
  LEARNING = 1,
  REVIEW = 2,
  DIFFICULT = 3
}

export interface StudySettings {
  mode: StudyMode
  direction: 'native-to-foreign' | 'foreign-to-native' | 'both'
  difficulty: 'new' | 'mixed' | 'difficult' | 'all'
  audio: boolean
  time_limit?: number
  card_count?: number
}

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  native_language: string
  created_at: Date
  updated_at: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  condition: string
  points: number
}
