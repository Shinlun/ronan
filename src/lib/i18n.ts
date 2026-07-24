import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import kr from "../locales/kr.json";

export const supportedLanguages = ["fr", "en", "kr"];
export const browserLanguage = navigator.language.slice(0, 2) || "en";

i18n.use(initReactI18next).init({
	lng: supportedLanguages.includes(browserLanguage) ? browserLanguage : "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	detection: {
		order: ["localStorage", "navigator"],
		caches: ["localStorage"],
	},
	resources: {
		fr: {
			translation: fr,
		},
		en: {
			translation: en,
		},
		kr: {
			translation: kr,
		},
	},
});
