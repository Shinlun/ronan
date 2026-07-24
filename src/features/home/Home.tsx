import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BadgeCheck, FileUser, FlaskConical, Wrench } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef } from "react";
import { useTranslation } from "react-i18next";
import About from "../about/About";
import SideProjects from "../side-projects/SideProjects";
import { Skills } from "../skills/Skills";
import Work from "../work/Work";

const SECTIONS = ["about", "work", "side-projects", "skills"] as const;

const SECTIONS_ICONS: Map<(typeof SECTIONS)[number], React.ReactNode> = new Map(
	[
		["about", <FileUser className="size-6" />],
		["work", <Wrench className="size-5" />],
		["side-projects", <FlaskConical className="size-5" />],
		["skills", <BadgeCheck className="size-5" />],
	],
);

const SECTIONS_COMPONENTS: Map<(typeof SECTIONS)[number], React.ReactNode> =
	new Map([
		["about", <About />],
		["work", <Work />],
		["side-projects", <SideProjects />],
		["skills", <Skills />],
	]);

export default function Home() {
	const { t } = useTranslation();

	const heroRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	});

	const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
	const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
	const color = useTransform(
		scrollYProgress,
		[0, 0.1, 0.2, 0.3, 0.4],
		["#A1A1A1", "#FC64B6", "#00B8DB", "#04DF72", "#A3004C"],
	);

	const scrollToSection = (section: (typeof SECTIONS)[number]) => {
		const sectionElement = document.getElementById(section);
		if (sectionElement) {
			sectionElement.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<div ref={heroRef} className="relative h-[calc(100dvh-45px)]">
				<motion.div
					style={{ scale, opacity }}
					className="sticky top-0 h-full m-4 mt-0 overflow-hidden rounded-2xl border border-slate-800 bg-linear-to-tr from-mist-800 to-mist-950 backdrop-blur-xl"
				>
					<div className="flex h-[calc(100%-3rem)] flex-col items-center justify-center">
						<div className="font-black">
							<motion.h1
								className="text-muted-foreground text-5xl md:text-7xl"
								style={{ color }}
							>
								{t("home.title")}
							</motion.h1>
							<p className="text-pink-400 text-3xl md:text-4xl flex items-center gap-2">
								<span>{t("home.subtitle")}</span>
								<span className="animate-caret-blink">_</span>
							</p>
						</div>
					</div>

					<menu className="items-center gap-2 p-4 w-full justify-center hidden md:flex">
						{SECTIONS.map((section, i) => (
							<Fragment key={section}>
								<a
									onClick={() => scrollToSection(section)}
									className="hover:cursor-pointer text-gray-300 hover:text-pink-400"
								>
									{t(`home.${section}`)}
								</a>
								{i < SECTIONS.length - 1 && (
									<Separator
										orientation="vertical"
										className="bg-gray-500 h-4 my-auto mx-2"
									/>
								)}
							</Fragment>
						))}
					</menu>

					<menu className="md:hidden flex items-center gap-10 w-full justify-center">
						{SECTIONS.map((section) => (
							<Fragment key={section}>
								<a
									onClick={() => scrollToSection(section)}
									className="hover:cursor-pointer text-gray-300 hover:text-pink-400"
								>
									{SECTIONS_ICONS.get(section)}
								</a>
							</Fragment>
						))}
					</menu>
				</motion.div>
			</div>

			<div className="relative z-10 bg-background m-4 min-h-[calc(100dvh-50px)]">
				{SECTIONS.map((section, i) => (
					<Fragment key={section}>
						<section
							id={section}
							className={cn(
								"rounded-xl mx-auto max-w-[1200px]",
								i % 2 === 0 && "bg-foreground/5",
								i < SECTIONS.length - 1 && "my-8 md:my-20",
							)}
						>
							{SECTIONS_COMPONENTS.get(section)}
						</section>
					</Fragment>
				))}
			</div>
		</>
	);
}
