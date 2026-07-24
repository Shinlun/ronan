import { SkillSet } from "@/components/molecules/SkillSet";
import { BadgeCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export function Skills() {
	const { t } = useTranslation();

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: wrapperRef,
		offset: ["start end", "start start"],
	});

	const translateY = useTransform(scrollYProgress, [0, 0.6], [200, 0]);
	const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

	return (
		<div className="h-full p-4 overflow-y-clip" ref={wrapperRef}>
			<h2 className="text-2xl font-bold flex items-center gap-2">
				<BadgeCheck className="text-pink-400" />
				{t("skills.title")}
			</h2>

			<p className="text-muted-foreground mb-4">{t("skills.description")}</p>

			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 gap-4"
				style={{ translateY, opacity }}
			>
				<SkillSet
					title={t("skills.core")}
					skills={t("skills.core-skills", { returnObjects: true }) as string[]}
					colorOffset={0}
				/>

				<SkillSet
					title={t("skills.languages")}
					skills={
						t("skills.languages-skills", { returnObjects: true }) as string[]
					}
					colorOffset={1}
				/>

				<SkillSet
					title={t("skills.data")}
					skills={t("skills.data-skills", { returnObjects: true }) as string[]}
					colorOffset={2}
				/>

				<SkillSet
					title={t("skills.infrastructure")}
					skills={
						t("skills.infrastructure-skills", {
							returnObjects: true,
						}) as string[]
					}
					colorOffset={3}
				/>

				<SkillSet
					title={t("skills.apis")}
					skills={t("skills.apis-skills", { returnObjects: true }) as string[]}
					colorOffset={4}
				/>

				<SkillSet
					title={t("skills.auth")}
					skills={t("skills.auth-skills", { returnObjects: true }) as string[]}
					colorOffset={5}
				/>

				<SkillSet
					title={t("skills.product-management")}
					skills={
						t("skills.product-management-skills", {
							returnObjects: true,
						}) as string[]
					}
					colorOffset={6}
				/>

				<SkillSet
					title={t("skills.tooling")}
					skills={
						t("skills.tooling-skills", { returnObjects: true }) as string[]
					}
					colorOffset={7}
				/>
			</motion.div>
		</div>
	);
}
