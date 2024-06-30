import { A } from "@solidjs/router";
import { For } from "solid-js";

import { siteConfig } from "@/config/site";
import { cn } from "@/libs/cn";
import ThemeToggle from "@/components/theme-toggle";

export default function SiteNavbar() {
  return (
    <header class='sticky top-0 z-40 mt-8 w-full [backdrop-filter:saturate(100%)_blur(20px)]'>
      <div class='container flex items-center space-x-4 py-8 sm:justify-between sm:space-x-0'>
        <div class='flex gap-6 md:gap-10'>
          <nav class='flex gap-6'>
            <For each={siteConfig.navLinks}>
              {(link) => (
                <A
                  href={link.href}
                  class={cn(
                    "flex items-center font-medium text-muted-foreground hover:text-primary"
                  )}
                  aria-label='Home'
                >
                  {link.title}
                </A>
              )}
            </For>
          </nav>
        </div>

        <div class='flex flex-1 items-center justify-end space-x-4'>
          <nav class='flex items-center space-x-1'>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
