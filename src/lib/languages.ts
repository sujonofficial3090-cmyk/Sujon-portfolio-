export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const POPULAR_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
];

export const ALL_LANGUAGES: Language[] = [
  ...POPULAR_LANGUAGES,
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", flag: "🇿🇦" },
  { code: "sq", name: "Albanian", nativeName: "Shqip", flag: "🇦🇱" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹" },
  { code: "hy", name: "Armenian", nativeName: "Հայերեն", flag: "🇦🇲" },
  { code: "az", name: "Azerbaijani", nativeName: "Azərbaycan", flag: "🇦🇿" },
  { code: "eu", name: "Basque", nativeName: "Euskara", flag: "🇪🇸" },
  { code: "be", name: "Belarusian", nativeName: "Беларуская", flag: "🇧🇾" },
  { code: "bs", name: "Bosnian", nativeName: "Bosanski", flag: "🇧🇦" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", flag: "🇧🇬" },
  { code: "ca", name: "Catalan", nativeName: "Català", flag: "🇪🇸" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", flag: "🇭🇷" },
  { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿" },
  { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "et", name: "Estonian", nativeName: "Eesti", flag: "🇪🇪" },
  { code: "tl", name: "Filipino", nativeName: "Filipino", flag: "🇵🇭" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮" },
  { code: "gl", name: "Galician", nativeName: "Galego", flag: "🇪🇸" },
  { code: "ka", name: "Georgian", nativeName: "ქართული", flag: "🇬🇪" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺" },
  { code: "is", name: "Icelandic", nativeName: "Íslenska", flag: "🇮🇸" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ga", name: "Irish", nativeName: "Gaeilge", flag: "🇮🇪" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "kk", name: "Kazakh", nativeName: "Қазақша", flag: "🇰🇿" },
  { code: "km", name: "Khmer", nativeName: "ខ្មែរ", flag: "🇰🇭" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "ku", name: "Kurdish", nativeName: "Kurdî", flag: "🇮🇶" },
  { code: "ky", name: "Kyrgyz", nativeName: "Кыргызча", flag: "🇰🇬" },
  { code: "lo", name: "Lao", nativeName: "ລາວ", flag: "🇱🇦" },
  { code: "lv", name: "Latvian", nativeName: "Latviešu", flag: "🇱🇻" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių", flag: "🇱🇹" },
  { code: "mk", name: "Macedonian", nativeName: "Македонски", flag: "🇲🇰" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "mn", name: "Mongolian", nativeName: "Монгол", flag: "🇲🇳" },
  { code: "my", name: "Myanmar (Burmese)", nativeName: "မြန်မာ", flag: "🇲🇲" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", flag: "🇳🇵" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴" },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴" },
  { code: "sr", name: "Serbian", nativeName: "Српски", flag: "🇷🇸" },
  { code: "si", name: "Sinhala", nativeName: "සිංහල", flag: "🇱🇰" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", flag: "🇸🇰" },
  { code: "sl", name: "Slovenian", nativeName: "Slovenščina", flag: "🇸🇮" },
  { code: "so", name: "Somali", nativeName: "Soomaali", flag: "🇸🇴" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦" },
  { code: "uz", name: "Uzbek", nativeName: "Oʻzbekcha", flag: "🇺🇿" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "cy", name: "Welsh", nativeName: "Cymraeg", flag: "🇬🇧" },
  { code: "zu", name: "Zulu", nativeName: "isiZulu", flag: "🇿🇦" },
];

export function getCurrentLanguage(): string {
  if (typeof window === "undefined") return "en";
  try {
    return localStorage.getItem("userLanguage") || "en";
  } catch {
    return "en";
  }
}
