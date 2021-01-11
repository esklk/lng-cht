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
  get nothingCouldBeFound() {
    return resources[this.#locale].nothingCouldBeFound;
  }
  get iNeedHelpToRecognizeMyLevel() {
    return resources[this.#locale].iNeedHelpToRecognizeMyLevel;
  }
  get wikipediaCefrLevelsUrl() {
    return resources[this.#locale].wikipediaCefrLevelsUrl;
  }
  get hereAreNoMessagesYet() {
    return resources[this.#locale].hereAreNoMessagesYet;
  }
  get typeAMessage() {
    return resources[this.#locale].typeAMessage;
  }
  get pleaseSelectAChat() {
    return resources[this.#locale].pleaseSelectAChat;
  }
  get numberOfSelectedImagesExceedsAllowed() {
    return resources[this.#locale].numberOfSelectedImagesExceedsAllowed;
  }
  get selectedImageSizeExceedsAllowed() {
    return resources[this.#locale].selectedImageSizeExceedsAllowed;
  }
  get pleaseWait() {
    return resources[this.#locale].pleaseWait;
  }
  get speakPlease() {
    return resources[this.#locale].speakPlease;
  }
  get newMessage() {
    return resources[this.#locale].newMessage;
  }
  get voiceMessage() {
    return resources[this.#locale].voiceMessage;
  }
  get picture() {
    return resources[this.#locale].picture;
  }
  get notifications() {
    return resources[this.#locale].notifications;
  }
  get youWillRecieveNotificationsAboutNewMessages() {
    return resources[this.#locale].youWillRecieveNotificationsAboutNewMessages;
  }
  get youWillNotRecieveNotificationsAboutNewMessages() {
    return resources[this.#locale].youWillNotRecieveNotificationsAboutNewMessages;
  }
  get hello() {
    return resources[this.#locale].hello;
  }
  get ok() {
    return resources[this.#locale].ok;
  }
  get cancel() {
    return resources[this.#locale].cancel;
  }
  get noLanguageSelected() {
    return resources[this.#locale].noLanguageSelected;
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
    somethingWentWrong: "Something went wrong :(",
    nothingCouldBeFound: "Nothing could be found :(",
    iNeedHelpToRecognizeMyLevel: "I need help to recognize my level",
    wikipediaCefrLevelsUrl:
      "https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages#Common_reference_levels",
    hereAreNoMessagesYet: "Here are no messages yet",
    typeAMessage: "Type a message...",
    pleaseSelectAChat: "Please select a chat",
    numberOfSelectedImagesExceedsAllowed:
      "Number of selected images exceeds allowed",
    selectedImageSizeExceedsAllowed: "Selected image size exceeds allowed",
    pleaseWait: "Please wait ...",
    speakPlease: "Speak please ...",
    newMessage: "New message",
    voiceMessage: "Voice message",
    picture: "Picture",
    notifications: "Notifications",
    youWillRecieveNotificationsAboutNewMessages: "You will recieve push-notifications about new messages",
    youWillNotRecieveNotificationsAboutNewMessages: "You will not recieve push-notifications about new messages",
    hello: "Hello!",
    ok: "OK",
    cancel: "Cancel",
    noLanguageSelected: "No language selected"
  },
  ru: {
    find: "Найти",
    chat: "Чат",
    settings: "Настройки",
    profileSettings: "Настройки профиля",
    applicationSettings: "Настройки приложения",
    firstName: "Имя",
    lastName: "Фамилия",
    languagesToLearn: "Языки для изучения",
    languagesToTeach: "Языки для обучения",
    save: "Сохранить",
    changesWillBeAppliedAfterPageReload:
      "Изменения будут применены после перезагрузки страницы.",
    colorScheme: "Цветовой режим",
    dark: "Темный",
    light: "Светлый",
    interfaceLanguage: "Язык интерфейса",
    signIn: "Войти",
    failedToSignIn: "Не удалось войти",
    isRequired: "обязательно",
    failedToSaveData: "Не удалось сохранить данные",
    singOut: "Выйти",
    sayHello: "Сказать привет",
    aFewWordsAboutYou: "Несколько слов о себе",
    somethingWentWrong: "Что-то пошло не так :(",
    nothingCouldBeFound: "Здесь пока ничего нет :(",
    iNeedHelpToRecognizeMyLevel: "Мне нужна помощь в определении уровня",
    wikipediaCefrLevelsUrl:
      "https://ru.wikipedia.org/wiki/Общеевропейские_компетенции_владения_иностранным_языком#Уровни",
    hereAreNoMessagesYet: "Здесь пока нет сообщений",
    typeAMessage: "Сообщение...",
    pleaseSelectAChat: "Выберете чат пожалуйста",
    numberOfSelectedImagesExceedsAllowed:
      "Максимальное число картинок для загрузки",
    selectedImageSizeExceedsAllowed: "Максимальный размер картинок для загрузки",
    pleaseWait: "ПОжалуйста подождите ...",
    speakPlease: "Говорите пожалуйста ...",
    newMessage: "Новое сообщение",
    voiceMessage: "Голосовое сообщение",
    picture: "Картинка",
    notifications: "Уведомления",
    youWillRecieveNotificationsAboutNewMessages: "Вы будете получать увдомления о новых сообщениях",
    youWillNotRecieveNotificationsAboutNewMessages: "Вы не будете получать увдомления о новых сообщениях",
    hello: "Привет!",
    ok: "OK",
    cancel: "Отмена",
    noLanguageSelected: "Ничего не выбрано"
  },
};
