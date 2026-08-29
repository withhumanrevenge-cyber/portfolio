import React from "react";
import WorldGate from "@/components/WorldGate";
import { fetchGitHubProjects } from "@/lib/github";

export const revalidate = 600;

export default async function Home() {
  const { projects } = await fetchGitHubProjects();

  return <WorldGate projects={projects} />;
}
