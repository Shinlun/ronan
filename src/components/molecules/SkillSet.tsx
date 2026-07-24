import useColors from "@/hooks/useColors";
import { ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";

type SkillSetProps = {
	title: string;
	description?: string;
	skills: string[];
	colorOffset?: number;
};

export function SkillSet({
	title,
	description,
	skills,
	colorOffset = 0,
}: SkillSetProps) {
	const colors = useColors(skills.length);

	return (
		<div className="flex flex-col gap-2 p-2 rounded-md border border-border">
			<h3 className="flex gap-2 items-center">
				<ChevronRight />
				{title}
			</h3>

			{description && (
				<p className="text-muted-foreground text-xs">{description}</p>
			)}

			<div className="flex gap-2 items-center flex-wrap p-2">
				{skills.map((skill, index) => (
					<Badge
						key={skill}
						className="text-sm rounded-full text-foreground"
						style={{
							backgroundColor: colors[(index + colorOffset) % colors.length],
						}}
					>
						{skill}
					</Badge>
				))}
			</div>
		</div>
	);
}
