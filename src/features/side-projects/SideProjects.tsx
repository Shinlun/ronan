import lifeGameImg from "@/assets/side-life-game.png";
import lonardImg from "@/assets/side-lonard.png";
import mermozImg from "@/assets/side-mermoz.png";
import vueGrillePainImg from "@/assets/side-vue-grille-pain.png";
import { Project } from "@/components/molecules/Project";
import { Separator } from "@/components/ui/separator";
import { FlaskConical } from "lucide-react";
import { useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function SideProjects() {
	const { t } = useTranslation();

	const wrapperRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={wrapperRef} className="h-full p-4">
			<h2 className="text-2xl font-bold flex items-center gap-2">
				<FlaskConical className="text-pink-400" />
				{t("side-projects.title")}
			</h2>

			<p className="text-muted-foreground mb-4">
				{t("side-projects.description")}
			</p>

			<Project
				title={t("side-projects.lonard.title")}
				description={
					<Trans
						t={t}
						i18nKey="side-projects.lonard.description"
						components={{
							strong: <span className="font-bold" />,
						}}
					/>
				}
				features={
					t("side-projects.lonard.features", {
						returnObjects: true,
					}) as string[]
				}
				image={lonardImg}
				stack={[
					"typescript",
					"nestjs",
					"react",
					"tailwindcss",
					"postgresql",
					"docker",
				]}
				link="https://demo.lonard.fr"
				github="https://github.com/Shinlun/lonard"
			/>

			<Separator orientation="horizontal" className="my-6" />

			<Project
				title={t("side-projects.mermoz.title")}
				description={
					<Trans
						t={t}
						i18nKey="side-projects.mermoz.description"
						components={{
							strong: <span className="font-bold" />,
						}}
					/>
				}
				features={
					t("side-projects.mermoz.features", {
						returnObjects: true,
					}) as string[]
				}
				image={mermozImg}
				stack={[
					"typescript",
					"nestjs",
					"graphql",
					"react",
					"postgresql",
					"docker",
				]}
				invertedLayout
				link="https://mermoz.webflow.io"
			/>

			<Separator orientation="horizontal" className="my-6" />

			<Project
				title={t("side-projects.vue-grille-pain.title")}
				description={
					<Trans
						t={t}
						i18nKey="side-projects.vue-grille-pain.description"
						components={{
							strong: <span className="font-bold" />,
						}}
					/>
				}
				features={
					t("side-projects.vue-grille-pain.features", {
						returnObjects: true,
					}) as string[]
				}
				image={vueGrillePainImg}
				stack={["typescript", "vuejs", "postcss", "netlify"]}
				link="https://vue-grille-pain-demo.netlify.app/"
				github="https://github.com/Shinlun/vue-grille-pain"
				npm="https://npmjs.com/package/vue-grille-pain"
			/>

			<Separator orientation="horizontal" className="my-6" />

			<Project
				title={t("side-projects.life-game.title")}
				description={
					<Trans
						t={t}
						i18nKey="side-projects.life-game.description"
						components={{
							a: (
								<Link
									to="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
									target="_blank"
									className="text-yellow-500 dark:text-yellow-200 font-bold"
								/>
							),
							strong: <span className="font-bold" />,
						}}
					/>
				}
				features={
					t("side-projects.life-game.features", {
						returnObjects: true,
					}) as string[]
				}
				image={lifeGameImg}
				stack={["typescript", "react", "render"]}
				invertedLayout
				link="https://conway.nomelie.fr/"
				github="https://github.com/Shinlun/life-game"
			/>
		</div>
	);
}
