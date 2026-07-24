import { useThemeStore } from "@/hooks/useLocalStore";
import { cn } from "@/lib/utils";
import { CheckIcon, Link as LinkIcon } from "lucide-react";
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import StackIcon from "tech-stack-icons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

type ProjectProps = {
	title: string;
	description: string | React.ReactNode;
	features?: string[];
	image: string;
	stack?: string[];
	link?: string;
	github?: string;
	npm?: string;
	children?: React.ReactNode;
	invertedLayout?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function Project({
	title,
	description,
	features,
	image,
	stack,
	link,
	github,
	npm,
	children,
	className,
	invertedLayout,
	...props
}: ProjectProps) {
	const { t } = useTranslation();
	const [theme] = useThemeStore();

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: wrapperRef,
		offset: ["start end", "start start"],
	});

	const [isZoomedIn, setIsZoomedIn] = useState(false);
	const [slideFinished, setSlideFinished] = useState(false);

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setSlideFinished(latest >= 0.4);
	});

	const slideRight = useTransform(scrollYProgress, [0, 0.4], [200, 0]);
	const slideLeft = useTransform(scrollYProgress, [0, 0.4], [-200, 0]);
	const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

	return (
		<div
			ref={wrapperRef}
			className={cn("flex flex-col gap-2", className)}
			{...props}
		>
			<div className="flex flex-col gap-1">
				<h3 className="text-2xl font-bold flex gap-4 justify-between">
					{title}
					<div className="flex gap-3 items-center px-2 bg-foreground/10 rounded-full">
						<TooltipProvider>
							{link && (
								<Tooltip>
									<TooltipTrigger>
										<Link to={link} target="_blank">
											<LinkIcon className="w-4" />
										</Link>
									</TooltipTrigger>
									<TooltipContent>
										<p>{t("misc.website")}</p>
									</TooltipContent>
								</Tooltip>
							)}
							{github && (
								<Tooltip>
									<TooltipTrigger>
										<Link to={github} target="_blank">
											<StackIcon
												name="github"
												className="w-4"
												variant={theme}
											/>
										</Link>
									</TooltipTrigger>
									<TooltipContent>
										<p>{t("misc.github")}</p>
									</TooltipContent>
								</Tooltip>
							)}
							{npm && (
								<Tooltip>
									<TooltipTrigger>
										<Link to={npm} target="_blank">
											<StackIcon name="npm" className="w-4" variant={theme} />
										</Link>
									</TooltipTrigger>
									<TooltipContent>
										<p>{t("misc.npm")}</p>
									</TooltipContent>
								</Tooltip>
							)}
						</TooltipProvider>
					</div>
				</h3>

				<div className="flex gap-2">
					{stack?.map((item) => (
						<StackIcon key={item} name={item} className="w-4" variant={theme} />
					))}
				</div>
			</div>

			<div
				className={cn(
					"grid grid-cols-1 md:flex gap-4 my-2 overflow-x-clip",
					invertedLayout ? "md:flex-row-reverse" : "md:flex-row",
				)}
			>
				<motion.div
					style={{
						x: invertedLayout ? slideRight : slideLeft,
						opacity,
					}}
					className="text-sm text-foreground flex-1 text-justify flex flex-col gap-2"
				>
					<p className="mb-2">{description}</p>

					{features && (
						<>
							<h4 className="text-sm font-bold">{t("misc.features")}</h4>
							{features.map((feature) => (
								<p key={feature} className="ml-2 flex gap-2 items-center">
									<CheckIcon className="w-4" />
									<span className="first-letter:uppercase">{feature}</span>
								</p>
							))}
						</>
					)}
				</motion.div>
				<motion.img
					style={{
						x: invertedLayout ? slideLeft : slideRight,
						opacity,
					}}
					src={image}
					alt={title}
					className={cn(
						"flex-1 rounded-md w-full md:w-1/2",
						isZoomedIn && invertedLayout && "translate-x-1/2",
						isZoomedIn && !invertedLayout && "-translate-x-1/2",
						isZoomedIn && "scale-170",
						isZoomedIn && "-translate-y-1/2",
						slideFinished && "transition-scale duration-200",
						isZoomedIn ? "cursor-zoom-out" : "cursor-zoom-in",
					)}
					onClick={() => setIsZoomedIn((prev) => !prev)}
				/>
			</div>
		</div>
	);
}
