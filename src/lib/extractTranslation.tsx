export const extractTranslation = (
  TranslationKey: string,
  fallbackDefault: string
) => ({
  key: TranslationKey,
  translation: fallbackDefault,
});
