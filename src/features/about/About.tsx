import ronanImg from "@/assets/ronan.webp";
import { cn } from "@/lib/utils";
import { FileUser } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Trans, useTranslation } from "react-i18next";

export default function About() {
	const { t } = useTranslation();

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: wrapperRef,
		offset: ["start end", "start start"],
	});

	const opacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

	return (
		<div
			ref={wrapperRef}
			className="h-full relative min-h-[400px] flex justify-between"
		>
			<div className="p-4 flex-3">
				<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
					<FileUser className="text-pink-400" />
					{t("about.title")}
				</h2>

				<motion.div
					style={{ opacity }}
					className="text-foreground text-justify"
				>
					<div className="md:hidden rounded-full overflow-hidden border border-muted-foreground w-[150px] h-[150px] mx-auto mb-4">
						<img
							src={ronanImg}
							alt="About"
							className="w-[150px] h-full object-cover"
						/>
					</div>
					<Trans
						i18nKey="about.description"
						components={{
							br: <br />,
							strong: <strong className="font-bold" />,
							lonestone: (
								<a
									href="https://lonestone.io"
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										"font-bold text-yellow-500 dark:text-yellow-200",
									)}
								/>
							),
						}}
					/>
				</motion.div>
			</div>

			<div className="flex-1 hidden md:block">
				<motion.div style={{ opacity }}>
					<img
						src={ronanImg}
						alt="About"
						className="h-[400px] absolute bottom-0 right-0 opacity-50 dark:opacity-80"
					/>
				</motion.div>
			</div>
		</div>
	);
}
