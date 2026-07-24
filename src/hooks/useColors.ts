import { useMemo } from "react";

export default function useColors(colorsCount: number): string[] {
	return useMemo(() => {
		return Array.from({ length: colorsCount }, (_, index) => {
			return `oklch(0.73 0.18 ${75 * (index + 2)}.0)`;
		});
	}, [colorsCount]);
}
