import { VocabularyList, VocabularyWord, Language } from '@/types'
import { SUPPORTED_LANGUAGES } from '@/data/languages'

class ImportExportService {
  
  // Export vocabulary lists to JSON
  exportToJSON(lists: VocabularyList[]): void {
    try {
      const dataStr = JSON.stringify(lists, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `vocabulum-lists-${new Date().toISOString().split('T')[0]}.json`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
      throw new Error('Failed to export vocabulary lists')
    }
  }

  // Export single list to CSV
  exportListToCSV(list: VocabularyList): void {
    try {
      const csvContent = [
        'German,English,Spanish,Latin', // Header
        ...list.words.map(word => `"${word.native}","${word.foreign}","",""`).slice(0, 20)
      ].join('\n')
      
      const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${list.name.replace(/[^a-z0-9]/gi, '_')}.csv`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('CSV export failed:', error)
      throw new Error('Failed to export list to CSV')
    }
  }

  // Download CSV template
  downloadCSVTemplate(): void {
    try {
      const template = [
        'German,English,Spanish,Latin',
        'Hallo,Hello,Hola,Salve',
        'Danke,Thank you,Gracias,Gratias',
        'Wasser,Water,Agua,Aqua',
        'Zeit,Time,Tiempo,Tempus',
        'Haus,House,Casa,Domus'
      ].join('\n')
      
      const dataBlob = new Blob([template], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'vocabulum-template.csv'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Template download failed:', error)
      throw new Error('Failed to download CSV template')
    }
  }

  // Import from file
  async importFile(file: File): Promise<VocabularyList[]> {
    if (!file) {
      throw new Error('No file selected')
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    try {
      if (fileExtension === 'json') {
        return await this.importFromJSON(file)
      } else if (fileExtension === 'csv') {
        return await this.importFromCSV(file)
      } else {
        throw new Error('Unsupported file format. Please use .json or .csv files.')
      }
    } catch (error) {
      console.error('Import failed:', error)
      throw error
    }
  }

  private async importFromJSON(file: File): Promise<VocabularyList[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string)
          
          if (!Array.isArray(data)) {
            reject(new Error('Invalid JSON format. Expected an array of vocabulary lists.'))
            return
          }

          const lists: VocabularyList[] = data.map((item: any, index: number) => ({
            id: item.id || `imported-${Date.now()}-${index}`,
            name: item.name || `Imported List ${index + 1}`,
            description: item.description || 'Imported vocabulary list',
            language: this.findLanguage(item.language?.code) || SUPPORTED_LANGUAGES[0],
            category: item.category || 'Imported',
            created_at: new Date(),
            updated_at: new Date(),
            word_count: item.words?.length || 0,
            is_default: false,
            is_public: false,
            words: this.validateWords(item.words || [])
          }))

          resolve(lists.filter(list => list.words.length > 0))
        } catch (error) {
          reject(new Error('Invalid JSON format'))
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }

  private async importFromCSV(file: File): Promise<VocabularyList[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (event) => {
        try {
          const csvData = event.target?.result as string
          const lines = csvData.split('\n').filter(line => line.trim())
          
          if (lines.length < 2) {
            reject(new Error('CSV file must have at least a header and one data row'))
            return
          }

          // Parse header to determine columns
          const header = lines[0].split(',').map(col => col.replace(/"/g, '').trim().toLowerCase())
          const germanIndex = header.findIndex(col => col.includes('german') || col.includes('deutsch'))
          const englishIndex = header.findIndex(col => col.includes('english') || col.includes('englisch'))
          const spanishIndex = header.findIndex(col => col.includes('spanish') || col.includes('spanisch'))
          const latinIndex = header.findIndex(col => col.includes('latin'))

          if (germanIndex === -1) {
            reject(new Error('CSV must contain a German column'))
            return
          }

          // Create lists for each target language found
          const lists: VocabularyList[] = []

          // English list
          if (englishIndex !== -1) {
            const englishWords = this.parseCSVWords(lines.slice(1), germanIndex, englishIndex)
            if (englishWords.length > 0) {
              lists.push(this.createListFromWords('Imported English', englishWords, SUPPORTED_LANGUAGES[0]))
            }
          }

          // Spanish list
          if (spanishIndex !== -1) {
            const spanishWords = this.parseCSVWords(lines.slice(1), germanIndex, spanishIndex)
            if (spanishWords.length > 0) {
              lists.push(this.createListFromWords('Imported Spanish', spanishWords, SUPPORTED_LANGUAGES[1]))
            }
          }

          // Latin list
          if (latinIndex !== -1) {
            const latinWords = this.parseCSVWords(lines.slice(1), germanIndex, latinIndex)
            if (latinWords.length > 0) {
              lists.push(this.createListFromWords('Imported Latin', latinWords, SUPPORTED_LANGUAGES[2]))
            }
          }

          if (lists.length === 0) {
            reject(new Error('No valid vocabulary pairs found in CSV'))
            return
          }

          resolve(lists)
        } catch (error) {
          reject(new Error('Failed to parse CSV file'))
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }

  private parseCSVWords(dataLines: string[], germanIndex: number, foreignIndex: number): VocabularyWord[] {
    const words: VocabularyWord[] = []

    dataLines.forEach((line, index) => {
      const columns = line.split(',').map(col => col.replace(/"/g, '').trim())
      const german = columns[germanIndex]?.trim()
      const foreign = columns[foreignIndex]?.trim()

      if (german && foreign) {
        words.push({
          id: `imported-word-${Date.now()}-${index}`,
          native: german,
          foreign: foreign,
          difficulty: 0,
          created_at: new Date(),
          updated_at: new Date(),
          learned: false,
          favorite: false,
          correct_count: 0,
          incorrect_count: 0
        })
      }
    })

    return words
  }

  private createListFromWords(name: string, words: VocabularyWord[], language: Language): VocabularyList {
    return {
      id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: `Imported ${language.name} vocabulary list`,
      language,
      category: 'Imported',
      created_at: new Date(),
      updated_at: new Date(),
      word_count: words.length,
      is_default: false,
      is_public: false,
      words
    }
  }

  private findLanguage(code: string): Language | null {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code) || null
  }

  private validateWords(words: any[]): VocabularyWord[] {
    return words.filter(word => word.native && word.foreign).map((word, index) => ({
      id: word.id || `word-${Date.now()}-${index}`,
      native: word.native,
      foreign: word.foreign,
      difficulty: word.difficulty || 0,
      created_at: new Date(word.created_at) || new Date(),
      updated_at: new Date(word.updated_at) || new Date(),
      learned: word.learned || false,
      favorite: word.favorite || false,
      correct_count: word.correct_count || 0,
      incorrect_count: word.incorrect_count || 0
    }))
  }
}

export const importExportService = new ImportExportService()
