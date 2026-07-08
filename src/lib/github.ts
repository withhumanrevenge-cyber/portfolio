export interface Project {
  id: string | number;
  title: string;
  category: string;
  image: string;
  color: string;
  href: string;
  github?: string;
  description: string;
  challenge: string;
  features: string[];
  tech: string[];
}

const GITHUB_USER = "withhumanrevenge-cyber";
const MAX_GITHUB = 12;

const FALLBACK_COLORS = [
  "from-zinc-900/40 to-slate-500/40",
  "from-blue-600/40 to-purple-600/40",
  "from-orange-600/40 to-red-600/40",
  "from-emerald-600/40 to-teal-600/40",
  "from-indigo-600/40 to-cyan-600/40",
];

const PLACEHOLDER_GRADIENTS: [string, string][] = [
  ["#1e293b", "#334155"],
  ["#1e3a8a", "#6d28d9"],
  ["#9a3412", "#b91c1c"],
  ["#065f46", "#0f766e"],
  ["#3730a3", "#0e7490"],
  ["#831843", "#7c3aed"],
];

interface GitHubRepo {
  id: number;
  name: string;
  fork: boolean;
  archived?: boolean;
  topics?: string[];
  homepage?: string;
  html_url: string;
  description?: string;
  language?: string;
  stargazers_count?: number;
}

const REVALIDATE = { next: { revalidate: 600 } };

export const normalizeRepo = (url?: string) =>
  (url || "").toLowerCase().replace(/\/+$/, "");

const titleCase = (name: string) =>
  name.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function placeholderImage(title: string, label: string, seed: number): string {
  const [from, to] = PLACEHOLDER_GRADIENTS[seed % PLACEHOLDER_GRADIENTS.length];
  const short = title.length > 22 ? `${title.slice(0, 21)}…` : title;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#g)"/>
  <g fill="#ffffff" fill-opacity="0.06">
    <circle cx="650" cy="90" r="140"/>
    <circle cx="120" cy="380" r="90"/>
  </g>
  <text x="60" y="240" font-family="Archivo, Arial, sans-serif" font-size="56" font-weight="800" fill="#ffffff">${escapeXml(short)}</text>
  <text x="62" y="285" font-family="Space Grotesk, Arial, sans-serif" font-size="22" fill="#ffffff" fill-opacity="0.7">${escapeXml(label)}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function isGeneratedImage(src: string): boolean {
  return src.startsWith("data:");
}

export interface GitHubResult {
  projects: Project[];
  repoUrls: Set<string> | null;
}

export async function fetchGitHubProjects(): Promise<GitHubResult> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      REVALIDATE
    );

    if (!res.ok) return { projects: [], repoUrls: null };

    const repos: GitHubRepo[] = await res.json();
    const repoUrls = new Set(repos.map((r) => normalizeRepo(r.html_url)));

    const candidates = repos
      .filter(
        (r) =>
          !r.fork &&
          !r.archived &&
          r.name.toLowerCase() !== "portfolio" &&
          Boolean(r.homepage || r.description || r.topics?.length || r.language)
      )
      .sort((a, b) => {
        const deployed = Number(!!b.homepage) - Number(!!a.homepage);
        if (deployed !== 0) return deployed;
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      })
      .slice(0, MAX_GITHUB);

    const projects = await Promise.all(
      candidates.map(async (repo, index): Promise<Project> => {
        let caseStudy: Partial<Project> = {};

        try {
          const csRes = await fetch(
            `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/main/case_study.json`,
            REVALIDATE
          );
          if (csRes.ok) caseStudy = await csRes.json();
        } catch {}

        const title = caseStudy.title || titleCase(repo.name);
        const tech =
          caseStudy.tech ||
          (repo.topics?.length
            ? repo.topics
            : [repo.language].filter((l): l is string => !!l)) ||
          [];
        const category =
          caseStudy.category ||
          (repo.topics?.length
            ? repo.topics.slice(0, 3).join(" / ")
            : repo.language || "Project");

        return {
          id: repo.id,
          title,
          category,
          image:
            caseStudy.image ||
            placeholderImage(title, repo.language || "Repository", repo.id),
          color: caseStudy.color || FALLBACK_COLORS[index % FALLBACK_COLORS.length],
          href: repo.homepage || repo.html_url,
          github: repo.html_url,
          description:
            caseStudy.description ||
            repo.description ||
            "A project built and shipped by Monu — focused on clean architecture and real, working software.",
          challenge:
            caseStudy.challenge ||
            "Architecting a modular system to ensure stability and optimized rendering cycles.",
          features: caseStudy.features || [
            "Modular Architecture",
            "Type-safe Implementation",
            "Performance-first",
            "Interaction Engineering",
          ],
          tech: (tech.length ? tech : ["Core Stack"]) as string[],
        };
      })
    );

    return { projects, repoUrls };
  } catch {
    return { projects: [], repoUrls: null };
  }
}
