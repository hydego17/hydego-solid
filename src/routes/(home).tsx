import { A, cache, createAsync, RouteDefinition } from "@solidjs/router";
import { For } from "solid-js";

import { siteConfig } from "@/config/site";
import { getProjects } from "@/services/cms";
import { generateImageUrl } from "@/libs/pocketbase";
import { Icons } from "@/components/icons";
import MetaTags from "@/components/meta-tags";

const fetchProjects = cache(getProjects, "projects");

export const route = {
  load: () => fetchProjects(),
} satisfies RouteDefinition;

export default function Home() {
  const projects = createAsync(() => fetchProjects());

  return (
    <main class='flex-1'>
      <MetaTags title={siteConfig.name} description={siteConfig.description} />

      <section class='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
        <div class='flex max-w-[980px] flex-col items-start gap-2'>
          <h1 class='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>{`Hi, I'm Umma Ahimsha`}</h1>
          <p class='max-w-[700px] text-lg text-muted-foreground'>
            a web developer from Indonesia, dedicated to creating web apps and seamless digital
            experiences.
          </p>
        </div>

        <div class='mt-10'>
          <h2 class='text-2xl font-bold'>Projects</h2>

          <div class='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <For each={projects()?.items}>{(project) => <ProjectItem project={project} />}</For>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const imageUrl = generateImageUrl(project, project.cover_image);

  return (
    <div class='group flex flex-col gap-6 rounded-md border p-4 shadow-slate-200 transition-shadow hover:shadow-md dark:shadow-zinc-800 md:p-5'>
      <img
        src={imageUrl}
        alt={project.title}
        sizes='300px, (min-width: 768px) 300px'
        class='aspect-video h-auto w-full rounded border object-cover'
      />

      <div class='flex flex-1 flex-col justify-between gap-4 md:py-0.5'>
        <div>
          <A href={`/projects/${project.slug}`}>
            <h3 class='text-lg font-bold group-hover:underline'>{project.title}</h3>
          </A>
          <p class='mt-2 line-clamp-2 text-mini text-muted-foreground'>{project.subtitle}</p>
        </div>

        <div class='flex gap-3'>
          {project.link && (
            <A href={project.link} target='_blank' rel='noreferrer'>
              <div class='rounded-md border border-transparent bg-secondary p-2 text-secondary-foreground hover:border-primary/10'>
                <Icons.globe class='h-3.5 w-3.5' />
                <span class='sr-only'>Link</span>
              </div>
            </A>
          )}

          {project.repo && (
            <A href={project.repo} target='_blank' rel='noreferrer'>
              <div class='rounded-md border border-transparent bg-secondary p-2 text-secondary-foreground hover:border-primary/10'>
                <Icons.gitHub class='h-3.5 w-3.5' />
                <span class='sr-only'>Repo</span>
              </div>
            </A>
          )}
        </div>
      </div>
    </div>
  );
}
