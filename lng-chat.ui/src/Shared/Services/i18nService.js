export const i18nService = {
  get availableLocales() {
    return Object.keys(resources);
  },
};

export class i18n {
  #locale;
  constructor(locale) {
    this.#locale = locale;
  }

  get find() {
    return resources[this.#locale].find;
  }
  get chat() {
    return resources[this.#locale].chat;
  }
  get settings() {
    return resources[this.#locale].settings;
  }
  get profileSettings() {
    return resources[this.#locale].profileSettings;
  }
  get applicationSettings() {
    return resources[this.#locale].applicationSettings;
  }
  get firstName() {
    return resources[this.#locale].firstName;
  }
  get lastName() {
    return resources[this.#locale].lastName;
  }
  get languagesToLearn() {
    return resources[this.#locale].languagesToLearn;
  }
  get languagesToTeach() {
    return resources[this.#locale].languagesToTeach;
  }
  get save() {
    return resources[this.#locale].save;
  }
  get changesWillBeAppliedAfterPageReload() {
    return resources[this.#locale].changesWillBeAppliedAfterPageReload;
  }
  get colorScheme() {
    return resources[this.#locale].colorScheme;
  }
  get dark() {
    return resources[this.#locale].dark;
  }
  get light() {
    return resources[this.#locale].light;
  }
  get interfaceLanguage() {
    return resources[this.#locale].interfaceLanguage;
  }
  get signIn() {
    return resources[this.#locale].signIn;
  }
  get failedToSignIn() {
    return resources[this.#locale].failedToSignIn;
  }
  get isRequired() {
    return resources[this.#locale].isRequired;
  }
  get failedToSaveData() {
    return resources[this.#locale].failedToSaveData;
  }
  get singOut() {
    return resources[this.#locale].singOut;
  }
  get sayHello() {
    return resources[this.#locale].sayHello;
  }
  get aFewWordsAboutYou() {
    return resources[this.#locale].aFewWordsAboutYou;
  }
  get somethingWentWrong() {
    return resources[this.#locale].somethingWentWrong;
  }
}

const resources = {
  en: {
    find: "Find",
    chat: "Chat",
    settings: "Settings",
    profileSettings: "Profile Settings",
    applicationSettings: "Application Settings",
    firstName: "First Name",
    lastName: "Last Name",
    languagesToLearn: "Languages to Learn",
    languagesToTeach: "Languages to Teach",
    save: "Save",
    changesWillBeAppliedAfterPageReload:
      "Changes will be applied after page reload.",
    colorScheme: "Color Scheme",
    dark: "Dark",
    light: "Light",
    interfaceLanguage: "Interface Language",
    signIn: "Sign In",
    failedToSignIn: "Failed to Sign In",
    isRequired: "is required",
    failedToSaveData: "Failed to save data",
    singOut: "Sign Out",
    sayHello: "Say hello",
    aFewWordsAboutYou: "A few words about you",
    somethingWentWrong: "Something went wrong :("
  },
};
