import { cache, createAsync, RouteDefinition } from "@solidjs/router";
import { Show } from "solid-js";

import { getAboutPage } from "@/services/cms";
import BlockContent from "@/components/block-content";
import MetaTags from "@/components/meta-tags";

const fetchAboutPage = cache(getAboutPage, "aboutPage");

export const route = {
  load: () => fetchAboutPage(),
} satisfies RouteDefinition;

export default function AboutPage() {
  const aboutPage = createAsync(() => fetchAboutPage());

  return (
    <main class='flex-1'>
      <MetaTags title='About' path='/about' />

      <section class='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
        <div class='flex max-w-[980px] flex-col items-start gap-2'>
          <h1 class='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>
            {aboutPage()?.title}
          </h1>
        </div>

        <hr />

        <div class='flex gap-4'>
          <Show when={!!aboutPage()?.description}>
            <BlockContent content={aboutPage()?.description as string} />
          </Show>
        </div>
      </section>
    </main>
  );
}
