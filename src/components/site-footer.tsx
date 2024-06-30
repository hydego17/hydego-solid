import { A } from "@solidjs/router";

import { siteConfig } from "@/config/site";

import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";

export default function SiteFooter() {
  return (
    <footer class='mt-10 w-full bg-background'>
      <div class='container flex flex-col items-center py-8'>
        <div>
          <A href={siteConfig.social.twitter} target='_blank' rel='noreferrer' aria-label='twitter'>
            <div
              class={buttonVariants({
                size: "icon",
                variant: "ghost",
                class: "text-muted-foreground",
              })}
            >
              <Icons.twitter class='h-5 w-5' />
              <span class='sr-only'>Twitter</span>
            </div>
          </A>
          <A href={siteConfig.social.github} target='_blank' rel='noreferrer' aria-label='github'>
            <div
              class={buttonVariants({
                size: "icon",
                variant: "ghost",
                class: "text-muted-foreground",
              })}
            >
              <Icons.gitHub class='h-5 w-5' />
              <span class='sr-only'>GitHub</span>
            </div>
          </A>
          <A
            href={siteConfig.social.linkedin}
            target='_blank'
            rel='noreferrer'
            aria-label='linkedin'
          >
            <div
              class={buttonVariants({
                size: "icon",
                variant: "ghost",
                class: "text-muted-foreground",
              })}
            >
              <Icons.linkedin class='h-5 w-5' />
              <span class='sr-only'>LinkedIn</span>
            </div>
          </A>
        </div>
        <div>
          <div class='copyright text-muted-foreground'>
            <small> Copyright © {new Date().getFullYear()} Umma Ahimsha</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
