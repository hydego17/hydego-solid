import { A, cache, createAsync, RouteDefinition } from "@solidjs/router";
import dayjs from "dayjs";
import { For } from "solid-js";

import { getArchives } from "@/services/cms";
import MetaTags from "@/components/meta-tags";

const fetchArchives = cache(getArchives, "archives");

export const route = {
  load: () => fetchArchives(),
} satisfies RouteDefinition;

export default function ArchivesPage() {
  const archives = createAsync(() => fetchArchives());

  return (
    <main class='flex-1'>
      <MetaTags
        title='Archives'
        description='A collection of writings, poetry and proses that I have ever written.'
      />

      <section class='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
        <div class='flex max-w-[980px] flex-col items-start gap-2'>
          <h1 class='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>Archives</h1>
        </div>

        <div></div>

        <ul class='divide-y'>
          <For each={archives()?.items}>
            {(archive) => (
              <li class='space-y-1 py-3'>
                <p class='text-sm tracking-tight text-muted-foreground md:text-sm'>
                  {dayjs(archive.date).format("ll")}
                </p>

                <A
                  href={`/archives/${archive.slug}`}
                  class='inline-block font-semibold text-gray-700 hover:underline dark:text-gray-300 md:text-lg'
                >
                  {archive.title}
                </A>
              </li>
            )}
          </For>
        </ul>
      </section>
    </main>
  );
}
