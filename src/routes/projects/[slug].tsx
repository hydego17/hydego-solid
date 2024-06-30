import { cache, createAsync, RouteDefinition, useParams } from "@solidjs/router";
import { Accessor, Show } from "solid-js";

import { getProjectDetail } from "@/services/cms";
import { generateImageUrl } from "@/libs/pocketbase";
import BlockContent from "@/components/block-content/block-content";
import { Icons } from "@/components/icons";
import MetaTags from "@/components/meta-tags";

const fetchProjectDetail = cache(getProjectDetail, "projectDetail");

export const route = {
  load: ({ params }) => fetchProjectDetail(params.slug),
} satisfies RouteDefinition;

export default function ProjectDetailPage() {
  const params = useParams();

  const project = createAsync(() => fetchProjectDetail(params.slug)) as Accessor<Project>;

  return (
    <main class='flex-1'>
      <MetaTags title={project().title} description={project().subtitle} />

      <Show when={!!project()}>
        <section class='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
          <div class='flex max-w-[980px] flex-col items-start gap-2'>
            <h1 class='text-2xl font-bold leading-tight tracking-tight md:text-3xl'>
              {project().title}
            </h1>
          </div>

          <hr />

          <section class='space-y-10'>
            <div class='space-y-4'>
              <h2 class='text-lg font-bold'>Case Study</h2>
              <BlockContent content={project().description as string} />
            </div>

            <Show when={!!project().techs}>
              <div class='space-y-2'>
                <h2 class='text-lg font-bold'>Tools</h2>
                <p>{project().techs}</p>
              </div>
            </Show>

            <div class='space-y-2'>
              <h2 class='text-lg font-bold'>Links</h2>
              <div class='flex items-center gap-4'>
                <Show when={project().link}>
                  <div>
                    <a href={project().link!} target='_blank' rel='noreferrer'>
                      <div class='flex items-center gap-2 rounded-md border border-transparent bg-secondary p-2.5 text-secondary-foreground hover:border-primary/10'>
                        <Icons.globe class='h-4 w-4' />
                        <span class='sr-only'>Link</span>
                      </div>
                    </a>
                  </div>
                </Show>

                <Show when={!!project().repo}>
                  <a href={project().repo!} target='_blank' rel='noreferrer'>
                    <div class='rounded-md border border-transparent bg-secondary p-2.5 text-secondary-foreground hover:border-primary/10'>
                      <Icons.gitHub class='h-4 w-4' />
                      <span class='sr-only'>Repo</span>
                    </div>
                  </a>
                </Show>
              </div>
            </div>

            <div class='space-y-2'>
              <h2 class='text-lg font-bold'>Preview</h2>

              <div class='mt-3 grid grid-cols-2 gap-2 rounded bg-muted p-2 sm:grid-cols-3 md:gap-4 md:p-4'>
                {project().images.map((image, idx) => (
                  <div class='relative aspect-video bg-black'>
                    <img
                      src={generateImageUrl(project()!, image)}
                      alt=''
                      sizes='(max-width: 640px) 200px, 300px'
                      class='w-full h-full border object-cover'
                    />
                  </div>
                ))}

                <div class='relative aspect-video bg-black'>
                  <img
                    src={generateImageUrl(project()!, project().cover_image!)}
                    alt=''
                    sizes='(max-width: 640px) 200px, 300px'
                    class='w-full h-full border object-contain'
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </Show>
    </main>
  );
}
