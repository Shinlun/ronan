import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
type Language = "fr" | "en" | "kr" | "system";

const THEME_STORAGE_KEY = "app-theme";
const LANGUAGE_STORAGE_KEY = "app-language";

function getThemeFromLocalStorage(): Theme {
	return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || "dark";
}

function getLanguageFromLocalStorage(): Language {
	return (localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language) || "fr";
}

function subscribe(callback: () => void): () => void {
	window.addEventListener("storage", callback);
	return () => {
		window.removeEventListener("storage", callback);
	};
}

function useThemeStore(): [Theme, (newTheme: Theme) => void] {
	const theme = useSyncExternalStore(
		subscribe,
		getThemeFromLocalStorage,
		() => "dark" as Theme,
	);

	const setTheme = (newTheme: Theme) => {
		localStorage.setItem(THEME_STORAGE_KEY, newTheme);
		window.dispatchEvent(new Event("storage"));
	};

	return [theme, setTheme];
}

function useLanguageStore(): [Language, (newLanguage: Language) => void] {
	const language = useSyncExternalStore(
		subscribe,
		getLanguageFromLocalStorage,
		() => "fr" as Language,
	);

	const setLanguage = (newLanguage: Language) => {
		localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
		window.dispatchEvent(new Event("storage"));
	};

	return [language, setLanguage];
}

export { useLanguageStore, useThemeStore };
