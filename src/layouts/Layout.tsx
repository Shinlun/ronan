import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useLanguageStore, useThemeStore } from "@/hooks/useLocalStore";
import { cn } from "@/lib/utils";
import { BriefcaseBusiness, Globe, Mail, MoonStar, Sun } from "lucide-react";
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router";
import StackIcon from "tech-stack-icons";

export default function Layout() {
	const [theme, setTheme] = useThemeStore();
	const [, setStoreLanguage] = useLanguageStore();

	const {
		t,
		i18n: { language: i18nLanguage },
	} = useTranslation();

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: wrapperRef,
	});

	const opacity = useTransform(scrollYProgress, [0.1, 0.2, 1], [0, 1, 1]);
	const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

	const [hasScrolled, setHasScrolled] = useState(false);

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setHasScrolled(latest >= 0.1);
	});

	return (
		<div ref={wrapperRef}>
			<header
				className={cn(
					"z-999 sticky top-0 right-0 bg-background pl-1 pr-4 flex items-center justify-between gap-2 w-full",
					hasScrolled ? "border-b border-border" : "",
				)}
			>
				<motion.div
					className="absolute bottom-0 left-0 w-full h-px bg-pink-400 z-10"
					style={{ scaleX, originX: 0 }}
				/>

				<motion.p
					className="text-sm text-muted-foreground z-20"
					style={{ opacity }}
				>
					<a href="#">Ronan Letellier</a>
				</motion.p>

				<div className="flex items-center gap-2 z-20">
					<Select
						value={i18nLanguage}
						onValueChange={(value) =>
							setStoreLanguage(value as "en" | "fr" | "kr")
						}
					>
						<SelectTrigger className="hover:cursor-pointer">
							<Globe className="size-4" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel className="font-normal text-xs text-muted-foreground">
									{t("layout.language")}
								</SelectLabel>
								<SelectItem className="hover:cursor-pointer" value="fr">
									<span>Français</span>
								</SelectItem>

								<SelectItem className="hover:cursor-pointer" value="en">
									<span>English</span>
								</SelectItem>

								<SelectItem className="hover:cursor-pointer" value="kr">
									<span>한국어</span>
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					<Separator
						orientation="vertical"
						className="bg-muted-foreground h-4 my-auto"
					/>

					<div className="flex items-center gap-2">
						<Sun className="size-4" />
						<Switch
							checked={theme === "dark"}
							onCheckedChange={(checked) =>
								setTheme(checked ? "dark" : "light")
							}
							size="sm"
							className="hover:cursor-pointer"
						/>
						<MoonStar className="size-4" />
					</div>
				</div>
			</header>

			<Outlet />

			<footer className="flex items-center justify-between p-4 bg-linear-to-tr from-background to-foreground/5 backdrop-blur-xl max-w-[1200px] mx-auto border-t border-border text-muted-foreground mt-10">
				<div className="flex flex-col gap-2 flex-1">
					<Link
						to="mailto:ronan@proton.me"
						target="_blank"
						className="hover:underline hover:text-pink-400 flex gap-2 items-center"
					>
						<Mail className="size-4 text-foreground" />
						Contact
					</Link>

					<Link
						to="https://github.com/shinlun"
						target="_blank"
						className="hover:underline hover:text-pink-400 flex gap-2 items-center"
					>
						<StackIcon name="github" className="size-4" variant={theme} />
						Github
					</Link>
					<Link
						to="https://linkedin.com/in/ronan-letellier-3ab45029/"
						target="_blank"
						className="hover:underline hover:text-pink-400 flex gap-2 items-center"
					>
						<BriefcaseBusiness className="size-4 text-foreground" />
						LinkedIn
					</Link>
				</div>

				<p className="flex-1 text-center">
					Made with
					<span className="text-pink-400 mx-1">♡</span>
					by ronan
				</p>

				<div className="flex-1" />
			</footer>
		</div>
	);
}
