import { Link, Meta, Title } from "@solidjs/meta";

import { siteConfig } from "@/config/site";

function titleModifier(title: string) {
  if (title?.toLowerCase().includes(siteConfig.name.toLowerCase())) {
    return title;
  }
  return `${title} | ${siteConfig.title}`;
}

interface MetaTagsProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}

export default function MetaTags(props: MetaTagsProps) {
  const meta = {
    ...props,
    domain: siteConfig.url,
    title: titleModifier(props.title),
    description: props.description ?? siteConfig.description,
    image: props.image || `${siteConfig.url}/og.png`,
    path: props.path || "/",
  };

  return (
    <>
      <Title>{meta.title}</Title>
      <Meta name='description' content={meta.description} />
      <Meta name='author' content={siteConfig.name} />
      <Link rel='canonical' href={`${meta.domain}${meta.path}`} />
      <Meta name='theme-color' media='(prefers-color-scheme: dark)' content='#000000' />
      <Meta name='theme-color' media='(prefers-color-scheme: light)' content='#ffffff' />

      {/* Open graph Tags */}
      <Meta property='og:type' content='website' />
      <Meta property='og:locale' content='en' />
      <Meta property='og:site_name' content='Antarkata' />
      <Meta property='og:title' content={meta.title} />
      <Meta property='og:url' content={`${meta.domain}${meta.path}`} />
      <Meta property='og:description' content={meta.description} />
      <Meta property='og:image' content={meta.image} />
      {/* Twitter Tags */}
      <Meta name='twitter:card' content='summary_large_image' />
      <Meta name='twitter:site' content='@antarkata' />
      <Meta name='twitter:title' content={meta.title} />
      <Meta name='twitter:description' content={meta.description} />
      <Meta name='twitter:url' content={`${meta.domain}${meta.path}`} />
      <Meta name='twitter:image' content={meta.image} />
    </>
  );
}
