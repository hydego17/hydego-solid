import querystring from "query-string";

import { config } from "@/config";

export async function getAboutPage() {
  "use server";

  const res: AboutMe = await fetch(
    `${config.CMS_URL}/api/collections/about_page/records/bb4vas6vjda5e7d`
  ).then((res) => res.json());

  return res;
}

export async function getProjects() {
  "use server";

  const params = querystring.stringify({
    sort: "-date",
    filter: `(published=true)`,
  });

  const res: CmsListResponse<Project[]> = await fetch(
    `${config.CMS_URL}/api/collections/projects/records?${params}`
  ).then((res) => res.json());

  return res;
}

export async function getProjectDetail(slug: string) {
  "use server";

  const params = querystring.stringify({
    filter: `(slug='${slug}')`,
  });

  const res: CmsListResponse<Project[]> = await fetch(
    `${config.CMS_URL}/api/collections/projects/records?${params}`
  ).then((res) => res.json());

  const post = res.items?.[0];

  return post;
}

export async function getArchives() {
  "use server";

  const params = querystring.stringify({
    sort: "-date",
  });

  const res: CmsListResponse<Archive[]> = await fetch(
    `${config.CMS_URL}/api/collections/archives/records?${params}`
  ).then((res) => res.json());

  return res;
}

export async function getArchivePost(slug: string) {
  "use server";

  const params = querystring.stringify({
    filter: `(slug='${slug}')`,
  });

  const res: CmsListResponse<Archive[]> = await fetch(
    `${config.CMS_URL}/api/collections/archives/records?${params}`
  ).then((res) => res.json());

  const post = res.items?.[0];

  return post;
}

export async function getSecretDetail(slug: string) {
  "use server";

  const params = querystring.stringify({
    filter: `(slug='${slug}')`,
  });

  const res: CmsListResponse<Secret[]> = await fetch(
    `${config.CMS_URL}/api/collections/secrets/records?${params}`
  ).then((res) => res.json());

  const post = res.items?.[0];

  return post;
}
