import { cn } from "@/libs/cn";

import "./block-content.css";

type Props = {
  content: string;
  classList?: string;
};

export default function BlockContent({ content, classList }: Props) {
  return <div class={cn("blockcontent", classList)} innerHTML={content} />;
}
