import { cache, createAsync, RouteDefinition, useParams } from "@solidjs/router";
import { Show } from "solid-js";

import { getArchivePost } from "@/services/cms";
import dayjs from "@/libs/dayjs";
import BlockContent from "@/components/block-content/block-content";
import MetaTags from "@/components/meta-tags";

const fetchArchiveDetail = cache(getArchivePost, "archivePost");

export const route = {
  load: ({ params }) => fetchArchiveDetail(params.slug),
} satisfies RouteDefinition;

export default function ProjectDetailPage() {
  const params = useParams();

  const post = createAsync(() => fetchArchiveDetail(params.slug));

  return (
    <main class='flex-1'>
      {!!post() && (
        <MetaTags
          title={post()?.title!}
          description='An archive of a collection of writings, including poetry and prose, that I have written.'
          path={`/archives/${post()?.slug}`}
        />
      )}

      <Show when={!!post()}>
        <section class='container pb-8 pt-6 md:py-10'>
          <div class='flex max-w-[980px] flex-col items-start gap-2'>
            <h1 class='text-3xl font-bold leading-tight tracking-tight md:text-4xl'>
              {post()?.title}
            </h1>
            <p class='text-sm text-muted-foreground'>{dayjs(post()?.date).format("LL")}</p>
          </div>

          <div class='md:max-w-[650px]'>
            <hr class='my-6' />

            <BlockContent content={post()?.content!} />
          </div>
        </section>
      </Show>
    </main>
  );
}
