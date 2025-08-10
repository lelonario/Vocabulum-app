# Vocabulum - Modern Vocabulary Learning App

![Vocabulum Logo](./public/icon.svg)

Vocabulum is a modern, mobile-first vocabulary learning application built with Next.js, TypeScript, and Tailwind CSS. It's designed to help users efficiently learn vocabulary across multiple languages with an emphasis on mobile usability and modern UX patterns.

## 🌟 Features

### Core Functionality
- **Multi-Language Support**: Learn English, Spanish, Latin, and more from German
- **Pre-made Vocabulary Lists**: 20+ lists per language with 20+ important words each
- **Custom Lists**: Create, edit, and delete your own vocabulary lists
- **Multiple Study Modes**: Flashcards, multiple choice, input, spelling, cloze tests
- **Spaced Repetition**: Intelligent review system for long-term retention
- **Audio Pronunciation**: High-quality text-to-speech in correct languages
- **Favorites System**: Mark important words for quick access

### User Experience
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Dark/Light Mode**: Automatic theme switching with user preference
- **PWA Support**: Install as a native app on mobile devices
- **Offline Mode**: Study even without internet connection
- **Progress Tracking**: Detailed statistics and achievements
- **Responsive Design**: Works perfectly on desktop and mobile

### Technical Features
- **Import/Export**: CSV, Excel, JSON, and vocabulary trainer formats
- **Search Functionality**: Find lists and words quickly
- **Category Organization**: Organize vocabulary by topics
- **Cloud Sync**: Save progress across devices (Supabase integration)
- **Performance**: Fast loading and smooth animations
- **Accessibility**: Screen reader friendly and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/vocabulum-app.git
cd vocabulum-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Supabase configuration (optional for full cloud features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Mobile Installation

Vocabulum can be installed as a PWA on mobile devices:

### iOS (Safari):
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Confirm installation

### Android (Chrome):
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen" or "Install App"
4. Confirm installation

## 🏗️ Project Structure

```
vocabulum-app/
├── public/                 # Static assets and PWA files
│   ├── manifest.json      # PWA manifest
│   ├── icon-*.png         # App icons
│   └── apple-touch-icon.png
├── src/
│   ├── app/               # Next.js app router pages
│   │   ├── layout.tsx     # Root layout with PWA setup
│   │   ├── page.tsx       # Home page
│   │   ├── study/         # Study pages
│   │   ├── settings/      # Settings page
│   │   └── statistics/    # Statistics page
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── HomePage.tsx   # Main app interface
│   │   ├── StudyPage.tsx  # Vocabulary study interface
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── AppContext.tsx # Global state management
│   ├── data/             # Static data and constants
│   │   └── languages.ts  # Language definitions and vocabulary
│   ├── lib/              # Utilities and services
│   │   ├── utils.ts      # Helper functions
│   │   ├── audio.ts      # Text-to-speech service
│   │   └── supabase.ts   # Database client
│   └── types/            # TypeScript definitions
│       └── index.ts      # Type definitions
└── ...
```

## 🎨 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS transitions and Framer Motion
- **State Management**: React Context + useReducer
- **Database**: [Supabase](https://supabase.com/) (optional)
- **Audio**: Web Speech API
- **PWA**: Next.js PWA support
- **Deployment**: [Vercel](https://vercel.com/) (recommended)

## 🔧 Configuration

### Study Settings
Users can customize their learning experience:
- Study modes (flashcards, multiple choice, etc.)
- Learning direction (German→Foreign or Foreign→German)
- Difficulty levels (new words, mixed, difficult)
- Cards per session
- Audio pronunciation on/off

### Appearance
- Light/Dark mode toggle
- Mobile-optimized layouts
- Safe area insets for modern phones

## 📊 Features Overview

### Study Modes
1. **Flashcard Mode**: Traditional card flipping with tap-to-reveal
2. **Multiple Choice**: Choose from 4 options
3. **Direct Input**: Type the correct answer
4. **Spelling**: Focus on correct spelling
5. **Cloze Tests**: Fill in the blanks
6. **Mixed Mode**: Alternates between different types

### Progress Tracking
- Words learned and reviewed
- Accuracy percentage
- Study streaks
- Time spent learning
- Weekly progress charts
- Achievement system

### Data Management
- Import vocabulary lists (CSV, Excel, JSON)
- Export progress and lists
- Cloud synchronization
- Offline mode with sync on reconnect
- Local storage backup

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Cloudflare Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Language data and vocabulary lists curated for educational purposes
- Icons from [Lucide](https://lucide.dev/)
- Inspiration from modern language learning apps
- Community feedback and contributions

## 📞 Support

For support and questions:
- Create an [issue](https://github.com/your-username/vocabulum-app/issues)
- Check the [documentation](https://github.com/your-username/vocabulum-app/wiki)
- Contact the development team

---

**Vocabulum** - Learn vocabulary the modern way! 📚✨
