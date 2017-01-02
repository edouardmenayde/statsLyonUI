export default {
  title: 'StatsLyon',

  endpoints: [
    {
      name    : 'api',
      endpoint: 'http://127.0.0.1:1337/',
      default : true
    }
  ],

  defaultLocale: {
    language: 'fr',   // Used for translations from i18n.
    locale  : 'fr-FR' // Used by validator.
  }
}
