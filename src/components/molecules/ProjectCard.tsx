import { useThemeStore } from "@/hooks/useLocalStore";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router";
import StackIcon from "tech-stack-icons";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface ProjectCardProps {
	title: string;
	role?: string;
	description: string;
	image: string;
	stack?: string[];
	link?: string;
	children?: React.ReactNode;
}

export default function ProjectCard({
	title,
	role,
	description,
	image,
	stack,
	link,
	children,
}: ProjectCardProps) {
	const [theme] = useThemeStore();

	return (
		<Card className="p-0">
			<CardHeader className="p-0 m-0 overflow-hidden">
				<div
					className="bg-cover bg-center w-full h-48 border-b"
					style={{ backgroundImage: `url(${image})` }}
				/>
			</CardHeader>

			<CardTitle className="px-2 flex gap-1">
				<span className="text-xl">{title}</span>
				{role && (
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<span>·</span>
						<span>{role}</span>
					</div>
				)}
			</CardTitle>

			<CardContent className="px-2 text-base text-foreground flex-1 whitespace-pre-line text-justify">
				{description}
			</CardContent>

			<CardFooter className="p-2 flex gap-2 items-center justify-between">
				<div className="flex gap-2">
					{stack?.map((icon) => (
						<StackIcon key={icon} name={icon} className="w-6" variant={theme} />
					))}
					{children}
				</div>
				{link && (
					<Link to={link} target="_blank" className="hover:text-blue-500">
						<SquareArrowOutUpRight />
					</Link>
				)}
			</CardFooter>
		</Card>
	);
}
