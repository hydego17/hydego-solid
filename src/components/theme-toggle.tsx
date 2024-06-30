import { useColorMode } from "@kobalte/core";
import { MoonIcon, SunIcon } from "lucide-solid";

import { Button } from "./ui/button";

const ModeToggle = () => {
  const { setColorMode, colorMode } = useColorMode();

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setColorMode(colorMode() === "light" ? "dark" : "light")}
    >
      <SunIcon class='h-[1.5rem] w-[1.3prem] dark:hidden' />
      <MoonIcon class='hidden h-5 w-5 dark:block' />
      <span class='sr-only'>Toggle theme</span>
    </Button>
  );
};

export default ModeToggle;
