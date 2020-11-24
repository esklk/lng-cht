export const languageService = {
  getLanguageMetadata,
  getLanguagesMetadata,
  getLanguageLevels
};

export class LanguageMetadata {
  #languageCode;
  #name;
  #nativeName;
  #countryCode;
  /**
   * @param {string} languageCode The ISO639-1 language code
   * @param {string} name The ISO639-1 language name
   * @param {string} nativeName The ISO639-1 language native name
   * @param {string} countryCode The ISO 3166-1 Alpha-2 country code
   */
  constructor(languageCode, name, nativeName, countryCode) {
    this.#languageCode = languageCode;
    this.#name = name;
    this.#nativeName = nativeName;
    this.#countryCode = countryCode;
  }
  /**
   * @returns {string} The ISO639-1 language code
   */
  get languageCode() {
    return this.#languageCode;
  }
  /**
   * @returns {string} The ISO 639-1 language name
   */
  get name() {
    return this.#name;
  }
  /**
   * @returns {string} The ISO 639-1 language native name
   */
  get nativeName() {
    return this.#nativeName;
  }
  /**
   * @returns {string} The ISO 3166-1 Alpha-2 country code
   */
  get countryCode() {
    return this.#countryCode;
  }
  /**
   * @returns {string} The url for country svg flag
   */
  get flag() {
    return `http://purecatamphetamine.github.io/country-flag-icons/1x1/${
      this.#countryCode
    }.svg`;
  }
}

export class LanguageLevel {
  #index;
  #shortName;
  /**
   * @param {int} index The index of the level
   * @param {string} shortName The CEFR name of the level
   */
  constructor(index, shortName) {
    this.#index = index;
    this.#shortName = shortName;
  }
  /**
   * @returns {int} index The index of the level
   */
  get index() {
    return this.#index;
  }
  /**
   * @returns {string} shortName The CEFR name of the level
   */
  get shortName() {
    return this.#shortName;
  }
}

/**
 * @returns {LanguageLevel[]}
 */
function getLanguageLevels() {
  return [
    new LanguageLevel(0, "A1"),
    new LanguageLevel(1, "A2"),
    new LanguageLevel(2, "B1"),
    new LanguageLevel(3, "B2"),
    new LanguageLevel(4, "C1"),
    new LanguageLevel(5, "C2"),
  ];
}

/**
 * @param {string} code The ISO639-1 language code
 * @returns {LanguageMetadata}
 */
function getLanguageMetadata(code) {
  let data = languagesMetadataDatasource.find((x) => x.languageCode === code);
  if (!data) {
    return null;
  }
  return data
    ? new LanguageMetadata(
        data.languageCode,
        data.languageName,
        data.languageNativeName,
        data.countryCode
      )
    : null;
}

/**
 * @returns {LanguageMetadata[]}
 */
function getLanguagesMetadata() {
  return languagesMetadataDatasource.map(
    (data) =>
      new LanguageMetadata(
        data.languageCode,
        data.languageName,
        data.languageNativeName,
        data.countryCode
      )
  );
}

const languagesMetadataDatasource = [
  {
    languageCode: "aa",
    languageName: "Afar",
    languageNativeName: "Afaraf",
    countryCode: "DJ",
  },
  {
    languageCode: "af",
    languageName: "Afrikaans",
    languageNativeName: "Afrikaans",
    countryCode: "ZA",
  },
  {
    languageCode: "ak",
    languageName: "Akan",
    languageNativeName: "Akan",
    countryCode: "GH",
  },
  {
    languageCode: "am",
    languageName: "Amharic",
    languageNativeName: "አማርኛ",
    countryCode: "ET",
  },
  {
    languageCode: "ar",
    languageName: "Arabic",
    languageNativeName: "اللغة العربية",
    countryCode: "SA",
  },
  {
    languageCode: "ay",
    languageName: "Aymara",
    languageNativeName: "aymar aru",
    countryCode: "PE",
  },
  {
    languageCode: "az",
    languageName: "Azerbaijani",
    languageNativeName: "azərbaycan dili",
    countryCode: "AZ",
  },
  {
    languageCode: "be",
    languageName: "Belarusian",
    languageNativeName: "беларуская мова",
    countryCode: "BY",
  },
  {
    languageCode: "bg",
    languageName: "Bulgarian",
    languageNativeName: "български език",
    countryCode: "BG",
  },
  {
    languageCode: "bi",
    languageName: "Bislama",
    languageNativeName: "Bislama",
    countryCode: "VU",
  },
  {
    languageCode: "bm",
    languageName: "Bambara",
    languageNativeName: "bamanankan",
    countryCode: "ML",
  },
  {
    languageCode: "bn",
    languageName: "Bengali",
    languageNativeName: "বাংলা",
    countryCode: "BD",
  },
  {
    languageCode: "bs",
    languageName: "Bosnian",
    languageNativeName: "bosanski jezik",
    countryCode: "BA",
  },
  {
    languageCode: "ca",
    languageName: "Catalan",
    languageNativeName: "Català",
    countryCode: "AD",
  },
  {
    languageCode: "cs",
    languageName: "Czech",
    languageNativeName: "čeština",
    countryCode: "CZ",
  },
  {
    languageCode: "cy",
    languageName: "Welsh",
    languageNativeName: "Cymraeg",
    countryCode: "GB",
  },
  {
    languageCode: "da",
    languageName: "Danish",
    languageNativeName: "dansk",
    countryCode: "DK",
  },
  {
    languageCode: "de",
    languageName: "German",
    languageNativeName: "Deutsch",
    countryCode: "DE",
  },
  {
    languageCode: "dv",
    languageName: "Divehi",
    languageNativeName: "Dhivehi",
    countryCode: "MV",
  },
  {
    languageCode: "dz",
    languageName: "Dzongkha",
    languageNativeName: "རྫོང་ཁ",
    countryCode: "BT",
  },
  {
    languageCode: "ee",
    languageName: "Ewe",
    languageNativeName: "Eʋegbe",
    countryCode: "TG",
  },
  {
    languageCode: "el",
    languageName: "Greek",
    languageNativeName: "Ελληνικά",
    countryCode: "GR",
  },
  {
    languageCode: "en",
    languageName: "English",
    languageNativeName: "English",
    countryCode: "GB",
  },
  {
    languageCode: "es",
    languageName: "Spanish",
    languageNativeName: "Español",
    countryCode: "ES",
  },
  {
    languageCode: "et",
    languageName: "Estonian",
    languageNativeName: "eesti",
    countryCode: "EE",
  },
  {
    languageCode: "fa",
    languageName: "Persian",
    languageNativeName: "فارسی",
    countryCode: "IR",
  },
  {
    languageCode: "ff",
    languageName: "Fula",
    languageNativeName: "Fulfulde",
    countryCode: "BF",
  },
  {
    languageCode: "fi",
    languageName: "Finnish",
    languageNativeName: "suomi",
    countryCode: "FI",
  },
  {
    languageCode: "fj",
    languageName: "Fijian",
    languageNativeName: "Vakaviti",
    countryCode: "FJ",
  },
  {
    languageCode: "fr",
    languageName: "French",
    languageNativeName: "Français",
    countryCode: "FR",
  },
  {
    languageCode: "ga",
    languageName: "Irish",
    languageNativeName: "Gaeilge",
    countryCode: "IE",
  },
  {
    languageCode: "gn",
    languageName: "Guaraní",
    languageNativeName: "Avañe'ẽ",
    countryCode: "PY",
  },
  {
    languageCode: "gu",
    languageName: "Gujarati",
    languageNativeName: "ગુજરાતી",
    countryCode: "IN",
  },
  {
    languageCode: "ha",
    languageName: "Hausa",
    languageNativeName: "هَوُسَ",
    countryCode: "NG",
  },
  {
    languageCode: "he",
    languageName: "Hebrew",
    languageNativeName: "עברית",
    countryCode: "IL",
  },
  {
    languageCode: "hi",
    languageName: "Hindi",
    languageNativeName: "हिन्दी",
    countryCode: "FJ",
  },
  {
    languageCode: "ho",
    languageName: "Hiri Motu",
    languageNativeName: "Hiri Motu",
    countryCode: "PG",
  },
  {
    languageCode: "hr",
    languageName: "Croatian",
    languageNativeName: "hrvatski jezik",
    countryCode: "HR",
  },
  {
    languageCode: "ht",
    languageName: "Haitian",
    languageNativeName: "Kreyòl ayisyen",
    countryCode: "HT",
  },
  {
    languageCode: "hu",
    languageName: "Hungarian",
    languageNativeName: "magyar",
    countryCode: "HU",
  },
  {
    languageCode: "hy",
    languageName: "Armenian",
    languageNativeName: "Հայերեն",
    countryCode: "AM",
  },
  {
    languageCode: "id",
    languageName: "Indonesian",
    languageNativeName: "Bahasa Indonesia",
    countryCode: "ID",
  },
  {
    languageCode: "ig",
    languageName: "Igbo",
    languageNativeName: "Asụsụ Igbo",
    countryCode: "NG",
  },
  {
    languageCode: "is",
    languageName: "Icelandic",
    languageNativeName: "Íslenska",
    countryCode: "IS",
  },
  {
    languageCode: "it",
    languageName: "Italian",
    languageNativeName: "Italiano",
    countryCode: "IT",
  },
  {
    languageCode: "ja",
    languageName: "Japanese",
    languageNativeName: "日本語",
    countryCode: "JP",
  },
  {
    languageCode: "ka",
    languageName: "Georgian",
    languageNativeName: "ქართული",
    countryCode: "GE",
  },
  {
    languageCode: "kg",
    languageName: "Kongo",
    languageNativeName: "Kikongo",
    countryCode: "CG",
  },
  {
    languageCode: "kj",
    languageName: "Kwanyama",
    languageNativeName: "Kuanyama",
    countryCode: "AO",
  },
  {
    languageCode: "kk",
    languageName: "Kazakh",
    languageNativeName: "қазақ тілі",
    countryCode: "KZ",
  },
  {
    languageCode: "km",
    languageName: "Khmer",
    languageNativeName: "ខេមរភាសា",
    countryCode: "KH",
  },
  {
    languageCode: "ko",
    languageName: "Korean",
    languageNativeName: "한국어",
    countryCode: "KR",
  },
  {
    languageCode: "kr",
    languageName: "Kanuri",
    languageNativeName: "Kanuri",
    countryCode: "NE",
  },
  {
    languageCode: "ku",
    languageName: "Kurdish",
    languageNativeName: "Kurdî",
    countryCode: "IQ",
  },
  {
    languageCode: "ky",
    languageName: "Kyrgyz",
    languageNativeName: "Кыргызча",
    countryCode: "KG",
  },
  {
    languageCode: "la",
    languageName: "Latin",
    languageNativeName: "latine",
    countryCode: "VA",
  },
  {
    languageCode: "lb",
    languageName: "Luxembourgish",
    languageNativeName: "Lëtzebuergesch",
    countryCode: "LU",
  },
  {
    languageCode: "ln",
    languageName: "Lingala",
    languageNativeName: "Lingála",
    countryCode: "CD",
  },
  {
    languageCode: "lo",
    languageName: "Lao",
    languageNativeName: "ພາສາ",
    countryCode: "LA",
  },
  {
    languageCode: "lt",
    languageName: "Lithuanian",
    languageNativeName: "lietuvių kalba",
    countryCode: "LT",
  },
  {
    languageCode: "lu",
    languageName: "Luba-Katanga",
    languageNativeName: "Tshiluba",
    countryCode: "CD",
  },
  {
    languageCode: "lv",
    languageName: "Latvian",
    languageNativeName: "latviešu valoda",
    countryCode: "LV",
  },
  {
    languageCode: "mg",
    languageName: "Malagasy",
    languageNativeName: "fiteny malagasy",
    countryCode: "MG",
  },
  {
    languageCode: "mh",
    languageName: "Marshallese",
    languageNativeName: "Kajin M̧ajeļ",
    countryCode: "MH",
  },
  {
    languageCode: "mi",
    languageName: "Māori",
    languageNativeName: "te reo Māori",
    countryCode: "NZ",
  },
  {
    languageCode: "mk",
    languageName: "Macedonian",
    languageNativeName: "македонски јазик",
    countryCode: "MK",
  },
  {
    languageCode: "mn",
    languageName: "Mongolian",
    languageNativeName: "Монгол хэл",
    countryCode: "MN",
  },
  {
    languageCode: "ms",
    languageName: "Malay",
    languageNativeName: "Bahasa Malaysia",
    countryCode: "MY",
  },
  {
    languageCode: "mt",
    languageName: "Maltese",
    languageNativeName: "Malti",
    countryCode: "MT",
  },
  {
    languageCode: "my",
    languageName: "Burmese",
    languageNativeName: "ဗမာစာ",
    countryCode: "MM",
  },
  {
    languageCode: "nb",
    languageName: "Norwegian Bokmål",
    languageNativeName: "Norsk bokmål",
    countryCode: "NO",
  },
  {
    languageCode: "nd",
    languageName: "Northern Ndebele",
    languageNativeName: "isiNdebele",
    countryCode: "ZW",
  },
  {
    languageCode: "ne",
    languageName: "Nepali",
    languageNativeName: "नेपाली",
    countryCode: "NP",
  },
  {
    languageCode: "nl",
    languageName: "Dutch",
    languageNativeName: "Nederlands",
    countryCode: "NL",
  },
  {
    languageCode: "nn",
    languageName: "Norwegian Nynorsk",
    languageNativeName: "Norsk nynorsk",
    countryCode: "NO",
  },
  {
    languageCode: "no",
    languageName: "Norwegian",
    languageNativeName: "Norsk",
    countryCode: "NO",
  },
  {
    languageCode: "nr",
    languageName: "Southern Ndebele",
    languageNativeName: "isiNdebele",
    countryCode: "ZA",
  },
  {
    languageCode: "ny",
    languageName: "Chichewa",
    languageNativeName: "chiCheŵa",
    countryCode: "MW",
  },
  {
    languageCode: "pa",
    languageName: "Panjabi",
    languageNativeName: "ਪੰਜਾਬੀ",
    countryCode: "IN",
  },
  {
    languageCode: "pl",
    languageName: "Polish",
    languageNativeName: "język polski",
    countryCode: "PL",
  },
  {
    languageCode: "ps",
    languageName: "Pashto",
    languageNativeName: "پښتو",
    countryCode: "AF",
  },
  {
    languageCode: "pt",
    languageName: "Portuguese",
    languageNativeName: "Português",
    countryCode: "PT",
  },
  {
    languageCode: "rm",
    languageName: "Romansh",
    languageNativeName: "rumantsch grischun",
    countryCode: "CH",
  },
  {
    languageCode: "rn",
    languageName: "Kirundi",
    languageNativeName: "Ikirundi",
    countryCode: "BI",
  },
  {
    languageCode: "ro",
    languageName: "Romanian",
    languageNativeName: "Română",
    countryCode: "RO",
  },
  {
    languageCode: "ru",
    languageName: "Russian",
    languageNativeName: "Русский",
    countryCode: "RU",
  },
  {
    languageCode: "rw",
    languageName: "Kinyarwanda",
    languageNativeName: "Ikinyarwanda",
    countryCode: "RW",
  },
  {
    languageCode: "sg",
    languageName: "Sango",
    languageNativeName: "yângâ tî sängö",
    countryCode: "CF",
  },
  {
    languageCode: "si",
    languageName: "Sinhala",
    languageNativeName: "සිංහල",
    countryCode: "LK",
  },
  {
    languageCode: "sk",
    languageName: "Slovak",
    languageNativeName: "slovenčina",
    countryCode: "SK",
  },
  {
    languageCode: "sl",
    languageName: "Slovene",
    languageNativeName: "slovenski jezik",
    countryCode: "SI",
  },
  {
    languageCode: "sn",
    languageName: "Shona",
    languageNativeName: "chiShona",
    countryCode: "ZW",
  },
  {
    languageCode: "so",
    languageName: "Somali",
    languageNativeName: "Soomaaliga",
    countryCode: "SO",
  },
  {
    languageCode: "sq",
    languageName: "Albanian",
    languageNativeName: "Shqip",
    countryCode: "AL",
  },
  {
    languageCode: "sr",
    languageName: "Serbian",
    languageNativeName: "српски језик",
    countryCode: "RS",
  },
  {
    languageCode: "ss",
    languageName: "Swati",
    languageNativeName: "SiSwati",
    countryCode: "SZ",
  },
  {
    languageCode: "st",
    languageName: "Southern Sotho",
    languageNativeName: "Sesotho",
    countryCode: "LS",
  },
  {
    languageCode: "sv",
    languageName: "Swedish",
    languageNativeName: "Svenska",
    countryCode: "SE",
  },
  {
    languageCode: "sw",
    languageName: "Swahili",
    languageNativeName: "Kiswahili",
    countryCode: "KE",
  },
  {
    languageCode: "te",
    languageName: "Telugu",
    languageNativeName: "తెలుగు",
    countryCode: "IN",
  },
  {
    languageCode: "tg",
    languageName: "Tajik",
    languageNativeName: "тоҷикӣ",
    countryCode: "TJ",
  },
  {
    languageCode: "th",
    languageName: "Thai",
    languageNativeName: "ไทย",
    countryCode: "TH",
  },
  {
    languageCode: "ti",
    languageName: "Tigrinya",
    languageNativeName: "ትግርኛ",
    countryCode: "ER",
  },
  {
    languageCode: "tk",
    languageName: "Turkmen",
    languageNativeName: "Türkmen",
    countryCode: "TM",
  },
  {
    languageCode: "tl",
    languageName: "Tagalog",
    languageNativeName: "Wikang Tagalog",
    countryCode: "PH",
  },
  {
    languageCode: "tn",
    languageName: "Tswana",
    languageNativeName: "Setswana",
    countryCode: "BW",
  },
  {
    languageCode: "tr",
    languageName: "Turkish",
    languageNativeName: "Türkçe",
    countryCode: "TR",
  },
  {
    languageCode: "ts",
    languageName: "Tsonga",
    languageNativeName: "Xitsonga",
    countryCode: "ZA",
  },
  {
    languageCode: "uk",
    languageName: "Ukrainian",
    languageNativeName: "Українська",
    countryCode: "UA",
  },
  {
    languageCode: "ur",
    languageName: "Urdu",
    languageNativeName: "اردو",
    countryCode: "PK",
  },
  {
    languageCode: "uz",
    languageName: "Uzbek",
    languageNativeName: "Ўзбек",
    countryCode: "UZ",
  },
  {
    languageCode: "ve",
    languageName: "Venda",
    languageNativeName: "Tshivenḓa",
    countryCode: "ZA",
  },
  {
    languageCode: "vi",
    languageName: "Vietnamese",
    languageNativeName: "Tiếng Việt",
    countryCode: "VN",
  },
  {
    languageCode: "wo",
    languageName: "Wolof",
    languageNativeName: "Wollof",
    countryCode: "SN",
  },
  {
    languageCode: "xh",
    languageName: "Xhosa",
    languageNativeName: "isiXhosa",
    countryCode: "ZA",
  },
  {
    languageCode: "yo",
    languageName: "Yoruba",
    languageNativeName: "Yorùbá",
    countryCode: "NG",
  },
  {
    languageCode: "zh",
    languageName: "Chinese",
    languageNativeName: "中文",
    countryCode: "CN",
  },
  {
    languageCode: "zu",
    languageName: "Zulu",
    languageNativeName: "isiZulu",
    countryCode: "ZA",
  },
];
