import React from 'react'
// eslint-disable-next-line
import { i18n } from './Services/i18nService'

const i18nContext = React.createContext()
/**
 * Gets the internationalization object
 * @returns {i18n}
 */
export const useI18n = () => React.useContext(i18nContext)

export default i18nContext