import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./features/home/Home";

import "@/index.css";
import Layout from "@/layouts/Layout";
import { changeLanguage } from "i18next";
import { useEffect } from "react";
import { useLanguageStore, useThemeStore } from "./hooks/useLocalStore";
import "./lib/i18n";
import { browserLanguage, supportedLanguages } from "./lib/i18n";

function App() {
	const [storeTheme] = useThemeStore();
	const [storeLanguage] = useLanguageStore();

	useEffect(() => {
		if (storeLanguage) {
			const lng =
				storeLanguage === "system"
					? supportedLanguages.includes(browserLanguage)
						? browserLanguage
						: "fr"
					: storeLanguage;
			changeLanguage(lng);
		}
	}, [storeLanguage]);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(storeTheme);
	}, [storeTheme]);

	return (
		<div className="min-h-screen bg-background">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
