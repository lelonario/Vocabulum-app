class AudioService {
  private synthesis: SpeechSynthesis | null = null
  private voices: SpeechSynthesisVoice[] = []
  private isVoicesLoaded = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis
      this.loadVoices()
    }
  }

  private async loadVoices(): Promise<void> {
    if (!this.synthesis) return

    return new Promise((resolve) => {
      const loadVoicesHandler = () => {
        this.voices = this.synthesis!.getVoices()
        this.isVoicesLoaded = true
        resolve()
      }

      // Load voices immediately if available
      const voices = this.synthesis.getVoices()
      if (voices.length > 0) {
        this.voices = voices
        this.isVoicesLoaded = true
        resolve()
        return
      }

      // Otherwise wait for the voices to be loaded
      if (this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = loadVoicesHandler
      } else {
        setTimeout(loadVoicesHandler, 100)
      }
    })
  }

  private getBestVoiceForLanguage(languageCode: string): SpeechSynthesisVoice | null {
    if (!this.voices.length) {
      this.voices = this.synthesis?.getVoices() || []
    }

    // Priority order for better voices (prefer premium/neural voices)
    const priorityVoices = [
      // German voices (high quality)
      'Anna', 'Helena', 'Petra', 'Yannick',
      // English voices (high quality)
      'Samantha', 'Alex', 'Daniel', 'Karen', 'Moira', 'Tessa',
      // Spanish voices (high quality)
      'Monica', 'Paulina', 'Marisol',
    ]

    const languageMap: { [key: string]: string[] } = {
      'en-US': ['en-US', 'en'],
      'es-ES': ['es-ES', 'es'],
      'de-DE': ['de-DE', 'de'],
      'en': ['en-US', 'en'],
      'es': ['es-ES', 'es'],
      'de': ['de-DE', 'de'],
      'la': ['en-US', 'en'] // Latin fallback to English
    }

    const lookupCodes = languageMap[languageCode] || [languageCode]

    // First, try to find high-quality voices
    for (const code of lookupCodes) {
      for (const priorityName of priorityVoices) {
        const voice = this.voices.find(v => 
          v.name.includes(priorityName) && 
          v.lang.toLowerCase().startsWith(code.toLowerCase())
        )
        if (voice) {
          return voice
        }
      }
    }

    // Then try to find any voice for the language
    for (const code of lookupCodes) {
      const voice = this.voices.find(v => 
        v.lang.toLowerCase().startsWith(code.toLowerCase()) &&
        !v.name.includes('compact') // Avoid compact/low-quality voices
      )
      if (voice) {
        return voice
      }
    }

    // Last resort: first available voice
    return this.voices[0] || null
  }

  async speak(text: string, languageCode: string = 'en-US'): Promise<void> {
    return new Promise(async (resolve) => {
      if (!this.synthesis || !text.trim()) {
        resolve()
        return
      }

      // Ensure voices are loaded
      if (!this.isVoicesLoaded) {
        await this.loadVoices()
      }

      // Cancel any ongoing speech
      this.synthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text.trim())
      const voice = this.getBestVoiceForLanguage(languageCode)
      
      if (voice) {
        utterance.voice = voice
      }

      // Optimize settings for better quality
      utterance.lang = voice?.lang || languageCode
      utterance.rate = 0.9  // Slightly slower for clarity
      utterance.pitch = 1.0 // Natural pitch
      utterance.volume = 0.8 // Comfortable volume

      utterance.onend = () => resolve()
      utterance.onerror = () => resolve() // Silent fail

      try {
        this.synthesis.speak(utterance)
      } catch (error) {
        resolve()
      }
    })
  }

  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel()
    }
  }

  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices
  }

  getAvailableLanguages(): string[] {
    return [...new Set(this.voices.map(voice => voice.lang))]
  }
}

export const audioService = new AudioService()
