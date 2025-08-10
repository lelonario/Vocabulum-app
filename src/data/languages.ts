import { Language, VocabularyList, VocabularyWord } from '@/types'

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    voice: 'en-US'
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸',
    voice: 'es-ES'
  },
  {
    code: 'la',
    name: 'Latin',
    flag: '🏛️',
    voice: 'en-US' // No native Latin TTS, fallback to English
  }
]

// Pre-made vocabulary lists for each language
export const DEFAULT_VOCABULARY_LISTS: VocabularyList[] = [
  // English Lists
  {
    id: 'en-basics',
    name: 'Basic Words',
    description: 'Essential everyday vocabulary',
    language: SUPPORTED_LANGUAGES[0],
    category: 'Basics',
    created_at: new Date(),
    updated_at: new Date(),
    word_count: 20,
    is_default: true,
    is_public: true,
    words: [
      { id: '1', native: 'Hallo', foreign: 'Hello', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '2', native: 'Auf Wiedersehen', foreign: 'Goodbye', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '3', native: 'Danke', foreign: 'Thank you', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '4', native: 'Bitte', foreign: 'Please', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '5', native: 'Entschuldigung', foreign: 'Excuse me', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '6', native: 'Ja', foreign: 'Yes', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '7', native: 'Nein', foreign: 'No', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '8', native: 'Wasser', foreign: 'Water', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '9', native: 'Essen', foreign: 'Food', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '10', native: 'Haus', foreign: 'House', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '11', native: 'Auto', foreign: 'Car', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '12', native: 'Zeit', foreign: 'Time', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '13', native: 'Geld', foreign: 'Money', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '14', native: 'Arbeit', foreign: 'Work', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '15', native: 'Schule', foreign: 'School', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '16', native: 'Freund', foreign: 'Friend', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '17', native: 'Familie', foreign: 'Family', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '18', native: 'Liebe', foreign: 'Love', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '19', native: 'Leben', foreign: 'Life', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '20', native: 'Welt', foreign: 'World', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 }
    ]
  },
  {
    id: 'en-colors',
    name: 'Colors',
    description: 'Learn all the colors',
    language: SUPPORTED_LANGUAGES[0],
    category: 'Basics',
    created_at: new Date(),
    updated_at: new Date(),
    word_count: 20,
    is_default: true,
    is_public: true,
    words: [
      { id: '21', native: 'rot', foreign: 'red', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '22', native: 'blau', foreign: 'blue', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '23', native: 'grün', foreign: 'green', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '24', native: 'gelb', foreign: 'yellow', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '25', native: 'orange', foreign: 'orange', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '26', native: 'lila', foreign: 'purple', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '27', native: 'rosa', foreign: 'pink', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '28', native: 'braun', foreign: 'brown', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '29', native: 'schwarz', foreign: 'black', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '30', native: 'weiß', foreign: 'white', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '31', native: 'grau', foreign: 'gray', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '32', native: 'silber', foreign: 'silver', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '33', native: 'golden', foreign: 'gold', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '34', native: 'dunkel', foreign: 'dark', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '35', native: 'hell', foreign: 'light', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '36', native: 'bunt', foreign: 'colorful', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '37', native: 'hellblau', foreign: 'light blue', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '38', native: 'dunkelgrün', foreign: 'dark green', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '39', native: 'türkis', foreign: 'turquoise', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '40', native: 'magenta', foreign: 'magenta', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 }
    ]
  },
  // Spanish Lists
  {
    id: 'es-basics',
    name: 'Basic Words',
    description: 'Essential Spanish vocabulary',
    language: SUPPORTED_LANGUAGES[1],
    category: 'Basics',
    created_at: new Date(),
    updated_at: new Date(),
    word_count: 20,
    is_default: true,
    is_public: true,
    words: [
      { id: '41', native: 'Hallo', foreign: 'Hola', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '42', native: 'Auf Wiedersehen', foreign: 'Adiós', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '43', native: 'Danke', foreign: 'Gracias', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '44', native: 'Bitte', foreign: 'Por favor', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '45', native: 'Entschuldigung', foreign: 'Perdón', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '46', native: 'Ja', foreign: 'Sí', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '47', native: 'Nein', foreign: 'No', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '48', native: 'Wasser', foreign: 'Agua', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '49', native: 'Essen', foreign: 'Comida', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '50', native: 'Haus', foreign: 'Casa', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '51', native: 'Auto', foreign: 'Coche', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '52', native: 'Zeit', foreign: 'Tiempo', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '53', native: 'Geld', foreign: 'Dinero', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '54', native: 'Arbeit', foreign: 'Trabajo', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '55', native: 'Schule', foreign: 'Escuela', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '56', native: 'Freund', foreign: 'Amigo', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '57', native: 'Familie', foreign: 'Familia', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '58', native: 'Liebe', foreign: 'Amor', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '59', native: 'Leben', foreign: 'Vida', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '60', native: 'Welt', foreign: 'Mundo', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 }
    ]
  },
  // Latin Lists  
  {
    id: 'la-basics',
    name: 'Basic Latin Words',
    description: 'Essential Latin vocabulary',
    language: SUPPORTED_LANGUAGES[2],
    category: 'Basics',
    created_at: new Date(),
    updated_at: new Date(),
    word_count: 20,
    is_default: true,
    is_public: true,
    words: [
      { id: '81', native: 'Hallo', foreign: 'Salve', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '82', native: 'Auf Wiedersehen', foreign: 'Vale', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '83', native: 'Danke', foreign: 'Gratias tibi', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '84', native: 'Ja', foreign: 'Ita', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '85', native: 'Nein', foreign: 'Non', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '86', native: 'Wasser', foreign: 'Aqua', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '87', native: 'Essen', foreign: 'Cibus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '88', native: 'Haus', foreign: 'Domus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '89', native: 'Zeit', foreign: 'Tempus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '90', native: 'Arbeit', foreign: 'Labor', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '91', native: 'Freund', foreign: 'Amicus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '92', native: 'Liebe', foreign: 'Amor', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '93', native: 'Leben', foreign: 'Vita', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '94', native: 'Welt', foreign: 'Mundus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '95', native: 'Frieden', foreign: 'Pax', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '96', native: 'Krieg', foreign: 'Bellum', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '97', native: 'König', foreign: 'Rex', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '98', native: 'Volk', foreign: 'Populus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '99', native: 'Wahrheit', foreign: 'Veritas', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '100', native: 'Weisheit', foreign: 'Sapientia', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 }
    ]
  },
  {
    id: 'la-roman-life',
    name: 'Roman Life',
    description: 'Vocabulary about daily life in ancient Rome',
    language: SUPPORTED_LANGUAGES[2],
    category: 'Culture',
    created_at: new Date(),
    updated_at: new Date(),
    word_count: 20,
    is_default: true,
    is_public: true,
    words: [
      { id: '101', native: 'Forum', foreign: 'Forum', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '102', native: 'Senat', foreign: 'Senatus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '103', native: 'Kaiser', foreign: 'Imperator', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '104', native: 'Bürger', foreign: 'Civis', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '105', native: 'Sklave', foreign: 'Servus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '106', native: 'Tempel', foreign: 'Templum', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '107', native: 'Gott', foreign: 'Deus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '108', native: 'Göttin', foreign: 'Dea', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '109', native: 'Soldat', foreign: 'Miles', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '110', native: 'Legion', foreign: 'Legio', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '111', native: 'Schwert', foreign: 'Gladius', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '112', native: 'Schild', foreign: 'Scutum', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '113', native: 'Straße', foreign: 'Via', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '114', native: 'Markt', foreign: 'Mercatus', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '115', native: 'Geld', foreign: 'Pecunia', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '116', native: 'Wein', foreign: 'Vinum', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '117', native: 'Brot', foreign: 'Panis', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '118', native: 'Amphitheater', foreign: 'Amphitheatrum', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '119', native: 'Gladiator', foreign: 'Gladiator', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 },
      { id: '120', native: 'Villa', foreign: 'Villa', difficulty: 0, created_at: new Date(), updated_at: new Date(), learned: false, favorite: false, correct_count: 0, incorrect_count: 0 }
    ]
  }
]

// Generate additional vocabulary lists for comprehensive coverage
const englishWordSets = {
  'Travel': [
    { native: 'Reise', foreign: 'Travel' }, { native: 'Flugzeug', foreign: 'Airplane' }, { native: 'Hotel', foreign: 'Hotel' },
    { native: 'Koffer', foreign: 'Suitcase' }, { native: 'Pass', foreign: 'Passport' }, { native: 'Ticket', foreign: 'Ticket' },
    { native: 'Bahnhof', foreign: 'Train station' }, { native: 'Bus', foreign: 'Bus' }, { native: 'Taxi', foreign: 'Taxi' },
    { native: 'Strand', foreign: 'Beach' }, { native: 'Berg', foreign: 'Mountain' }, { native: 'See', foreign: 'Lake' },
    { native: 'Restaurant', foreign: 'Restaurant' }, { native: 'Karte', foreign: 'Map' }, { native: 'Foto', foreign: 'Photo' },
    { native: 'Urlaub', foreign: 'Vacation' }, { native: 'Tourist', foreign: 'Tourist' }, { native: 'Sehenswürdigkeit', foreign: 'Attraction' },
    { native: 'Abenteuer', foreign: 'Adventure' }, { native: 'Kultur', foreign: 'Culture' }
  ],
  'Food': [
    { native: 'Apfel', foreign: 'Apple' }, { native: 'Banane', foreign: 'Banana' }, { native: 'Brot', foreign: 'Bread' },
    { native: 'Käse', foreign: 'Cheese' }, { native: 'Fleisch', foreign: 'Meat' }, { native: 'Fisch', foreign: 'Fish' },
    { native: 'Gemüse', foreign: 'Vegetables' }, { native: 'Salat', foreign: 'Salad' }, { native: 'Suppe', foreign: 'Soup' },
    { native: 'Pizza', foreign: 'Pizza' }, { native: 'Pasta', foreign: 'Pasta' }, { native: 'Reis', foreign: 'Rice' },
    { native: 'Kartoffel', foreign: 'Potato' }, { native: 'Tomate', foreign: 'Tomato' }, { native: 'Zwiebel', foreign: 'Onion' },
    { native: 'Knoblauch', foreign: 'Garlic' }, { native: 'Salz', foreign: 'Salt' }, { native: 'Pfeffer', foreign: 'Pepper' },
    { native: 'Zucker', foreign: 'Sugar' }, { native: 'Honig', foreign: 'Honey' }
  ],
  'Technology': [
    { native: 'Computer', foreign: 'Computer' }, { native: 'Handy', foreign: 'Mobile phone' }, { native: 'Internet', foreign: 'Internet' },
    { native: 'Website', foreign: 'Website' }, { native: 'E-Mail', foreign: 'Email' }, { native: 'Software', foreign: 'Software' },
    { native: 'App', foreign: 'App' }, { native: 'Bildschirm', foreign: 'Screen' }, { native: 'Tastatur', foreign: 'Keyboard' },
    { native: 'Maus', foreign: 'Mouse' }, { native: 'Drucker', foreign: 'Printer' }, { native: 'Kamera', foreign: 'Camera' },
    { native: 'Video', foreign: 'Video' }, { native: 'Audio', foreign: 'Audio' }, { native: 'Download', foreign: 'Download' },
    { native: 'Upload', foreign: 'Upload' }, { native: 'Cloud', foreign: 'Cloud' }, { native: 'Virus', foreign: 'Virus' },
    { native: 'Passwort', foreign: 'Password' }, { native: 'Sicherheit', foreign: 'Security' }
  ]
}

const spanishWordSets = {
  'Travel': [
    { native: 'Reise', foreign: 'Viaje' }, { native: 'Flugzeug', foreign: 'Avión' }, { native: 'Hotel', foreign: 'Hotel' },
    { native: 'Koffer', foreign: 'Maleta' }, { native: 'Pass', foreign: 'Pasaporte' }, { native: 'Ticket', foreign: 'Billete' },
    { native: 'Bahnhof', foreign: 'Estación de tren' }, { native: 'Bus', foreign: 'Autobús' }, { native: 'Taxi', foreign: 'Taxi' },
    { native: 'Strand', foreign: 'Playa' }, { native: 'Berg', foreign: 'Montaña' }, { native: 'See', foreign: 'Lago' },
    { native: 'Restaurant', foreign: 'Restaurante' }, { native: 'Karte', foreign: 'Mapa' }, { native: 'Foto', foreign: 'Foto' },
    { native: 'Urlaub', foreign: 'Vacaciones' }, { native: 'Tourist', foreign: 'Turista' }, { native: 'Sehenswürdigkeit', foreign: 'Atracción' },
    { native: 'Abenteuer', foreign: 'Aventura' }, { native: 'Kultur', foreign: 'Cultura' }
  ],
  'Food': [
    { native: 'Apfel', foreign: 'Manzana' }, { native: 'Banane', foreign: 'Plátano' }, { native: 'Brot', foreign: 'Pan' },
    { native: 'Käse', foreign: 'Queso' }, { native: 'Fleisch', foreign: 'Carne' }, { native: 'Fisch', foreign: 'Pescado' },
    { native: 'Gemüse', foreign: 'Verduras' }, { native: 'Salat', foreign: 'Ensalada' }, { native: 'Suppe', foreign: 'Sopa' },
    { native: 'Pizza', foreign: 'Pizza' }, { native: 'Pasta', foreign: 'Pasta' }, { native: 'Reis', foreign: 'Arroz' },
    { native: 'Kartoffel', foreign: 'Patata' }, { native: 'Tomate', foreign: 'Tomate' }, { native: 'Zwiebel', foreign: 'Cebolla' },
    { native: 'Knoblauch', foreign: 'Ajo' }, { native: 'Salz', foreign: 'Sal' }, { native: 'Pfeffer', foreign: 'Pimienta' },
    { native: 'Zucker', foreign: 'Azúcar' }, { native: 'Honig', foreign: 'Miel' }
  ]
}

const latinWordSets = {
  'Philosophy': [
    { native: 'Denken', foreign: 'Cogitare' }, { native: 'Wissen', foreign: 'Scientia' }, { native: 'Tugend', foreign: 'Virtus' },
    { native: 'Ehre', foreign: 'Honor' }, { native: 'Gerechtigkeit', foreign: 'Iustitia' }, { native: 'Mut', foreign: 'Fortitudo' },
    { native: 'Klugheit', foreign: 'Prudentia' }, { native: 'Mäßigung', foreign: 'Temperantia' }, { native: 'Glück', foreign: 'Felicitas' },
    { native: 'Schicksal', foreign: 'Fatum' }, { native: 'Natur', foreign: 'Natura' }, { native: 'Vernunft', foreign: 'Ratio' },
    { native: 'Seele', foreign: 'Anima' }, { native: 'Geist', foreign: 'Mens' }, { native: 'Körper', foreign: 'Corpus' },
    { native: 'Gedächtnis', foreign: 'Memoria' }, { native: 'Hoffnung', foreign: 'Spes' }, { native: 'Glaube', foreign: 'Fides' },
    { native: 'Ewigkeit', foreign: 'Aeternitas' }, { native: 'Unsterblichkeit', foreign: 'Immortalitas' }
  ],
  'Nature': [
    { native: 'Himmel', foreign: 'Caelum' }, { native: 'Erde', foreign: 'Terra' }, { native: 'Sonne', foreign: 'Sol' },
    { native: 'Mond', foreign: 'Luna' }, { native: 'Stern', foreign: 'Stella' }, { native: 'Meer', foreign: 'Mare' },
    { native: 'Fluss', foreign: 'Fluvius' }, { native: 'Wald', foreign: 'Silva' }, { native: 'Baum', foreign: 'Arbor' },
    { native: 'Blume', foreign: 'Flos' }, { native: 'Gras', foreign: 'Herba' }, { native: 'Stein', foreign: 'Lapis' },
    { native: 'Feuer', foreign: 'Ignis' }, { native: 'Luft', foreign: 'Aer' }, { native: 'Wind', foreign: 'Ventus' },
    { native: 'Regen', foreign: 'Pluvia' }, { native: 'Schnee', foreign: 'Nix' }, { native: 'Tier', foreign: 'Animal' },
    { native: 'Vogel', foreign: 'Avis' }, { native: 'Pferd', foreign: 'Equus' }
  ]
}

// Generate comprehensive lists
const generateComprehensiveLists = (): VocabularyList[] => {
  const lists: VocabularyList[] = []
  let wordId = 1000

  // English additional lists
  Object.entries(englishWordSets).forEach(([category, words], categoryIndex) => {
    lists.push({
      id: `en-${category.toLowerCase()}`,
      name: category,
      description: `${category} vocabulary in English`,
      language: SUPPORTED_LANGUAGES[0],
      category,
      created_at: new Date(),
      updated_at: new Date(),
      word_count: words.length,
      is_default: true,
      is_public: true,
      words: words.map((word, index) => ({
        id: (wordId + index).toString(),
        native: word.native,
        foreign: word.foreign,
        difficulty: 0,
        created_at: new Date(),
        updated_at: new Date(),
        learned: false,
        favorite: false,
        correct_count: 0,
        incorrect_count: 0
      }))
    })
    wordId += words.length
  })

  // Spanish additional lists
  Object.entries(spanishWordSets).forEach(([category, words], categoryIndex) => {
    lists.push({
      id: `es-${category.toLowerCase()}`,
      name: category,
      description: `${category} vocabulary in Spanish`,
      language: SUPPORTED_LANGUAGES[1],
      category,
      created_at: new Date(),
      updated_at: new Date(),
      word_count: words.length,
      is_default: true,
      is_public: true,
      words: words.map((word, index) => ({
        id: (wordId + index).toString(),
        native: word.native,
        foreign: word.foreign,
        difficulty: 0,
        created_at: new Date(),
        updated_at: new Date(),
        learned: false,
        favorite: false,
        correct_count: 0,
        incorrect_count: 0
      }))
    })
    wordId += words.length
  })

  // Latin additional lists
  Object.entries(latinWordSets).forEach(([category, words], categoryIndex) => {
    lists.push({
      id: `la-${category.toLowerCase()}`,
      name: category,
      description: `${category} vocabulary in Latin`,
      language: SUPPORTED_LANGUAGES[2],
      category,
      created_at: new Date(),
      updated_at: new Date(),
      word_count: words.length,
      is_default: true,
      is_public: true,
      words: words.map((word, index) => ({
        id: (wordId + index).toString(),
        native: word.native,
        foreign: word.foreign,
        difficulty: 0,
        created_at: new Date(),
        updated_at: new Date(),
        learned: false,
        favorite: false,
        correct_count: 0,
        incorrect_count: 0
      }))
    })
    wordId += words.length
  })

  return lists
}

export const ALL_DEFAULT_LISTS = [...DEFAULT_VOCABULARY_LISTS, ...generateComprehensiveLists()]
