import imieImg from "@/assets/project-imie.webp";
import momentImg from "@/assets/project-moment.webp";
import liveImg from "@/assets/project-sct.webp";
import sportallImg from "@/assets/project-sportall.webp";
import ProjectCard from "@/components/molecules/ProjectCard";
import { ChevronRight, Cloud, Database, Wrench } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function About() {
	const { t } = useTranslation();

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: wrapperRef,
		offset: ["start end", "start start"],
	});

	const opacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
	const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.4, 1]);

	return (
		<div ref={wrapperRef} className="h-full p-4">
			<h2 className="text-2xl font-bold flex items-center gap-2">
				<Wrench className="text-pink-400" />
				{t("work.title")}
			</h2>

			<p className="text-muted-foreground mb-4">{t("work.description")}</p>

			<div className="mb-4 gap-6 grid grid-cols-1 md:grid-cols-2">
				<motion.div className="flex" style={{ opacity, scale }}>
					<ProjectCard
						title={t("work.live.title")}
						role={t("work.live.role")}
						description={t("work.live.description")}
						image={liveImg}
						stack={[
							"typescript",
							"nodejs2",
							"react",
							"c++",
							"aws",
							"microsoft",
						]}
					/>
				</motion.div>

				<motion.div className="flex" style={{ opacity, scale }}>
					<ProjectCard
						title={t("work.moment.title")}
						role={t("work.moment.role")}
						description={t("work.moment.description")}
						image={momentImg}
						stack={[
							"typescript",
							"nestjs",
							"react",
							"postgresql",
							"vercel",
							"langfuse",
							"redis",
							"docker",
						]}
						link="https://mom3nt.ai"
					/>
				</motion.div>

				<motion.div className="flex" style={{ opacity, scale }}>
					<ProjectCard
						title={t("work.sportall.title")}
						role={t("work.sportall.role")}
						description={t("work.sportall.description")}
						image={sportallImg}
						stack={[
							"typescript",
							"expressjs",
							"react",
							"graphql",
							"mongodb",
							"aws",
						]}
						link="https://app.sportall.tv"
					/>
				</motion.div>

				<motion.div className="flex" style={{ opacity, scale }}>
					<ProjectCard
						title={t("work.imie.title")}
						role={t("work.imie.role")}
						description={t("work.imie.description")}
						image={imieImg}
						stack={["js", "nodejs2", "git"]}
					>
						<Database />
						<Cloud />
					</ProjectCard>
				</motion.div>
			</div>

			<p className="flex gap-2 items-center text-sm text-foreground p-4 bg-muted-foreground/10 backdrop-blur-xl border">
				<ChevronRight className="hidden md:block" />
				{t("work.more")}
			</p>
		</div>
	);
}
