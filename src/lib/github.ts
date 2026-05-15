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
const FALLBACK_COLORS = [
  "from-zinc-900/40 to-slate-500/40",
  "from-blue-600/40 to-purple-600/40",
  "from-orange-600/40 to-red-600/40",
  "from-emerald-600/40 to-teal-600/40",
  "from-indigo-600/40 to-cyan-600/40"
];

interface GitHubRepo {
  id: number;
  name: string;
  fork: boolean;
  topics?: string[];
  homepage?: string;
  html_url: string;
  description?: string;
  language?: string;
}

export async function fetchGitHubProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const repos: GitHubRepo[] = await res.json();
    const filtered = repos.filter((r) => 
      !r.fork && 
      r.name.toLowerCase() !== 'portfolio' && 
      (r.topics?.includes('portfolio') || r.homepage)
    );

    const projects = await Promise.all(
      filtered.map(async (repo: GitHubRepo): Promise<Project | null> => {
        let caseStudy: Partial<Project> = {};
        let hasScreenshot = false;

        try {
          const csRes = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/main/case_study.json`);
          if (csRes.ok) caseStudy = await csRes.json();
          
          if (!caseStudy.image) {
            const screenRes = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/contents/screenshot.png`);
            if (screenRes.ok) hasScreenshot = true;
          }
        } catch (e) {}

        const isFenrir = repo.name.toLowerCase() === 'fenrir-dashboard';
        if (!caseStudy.image && !hasScreenshot && !isFenrir) return null;

        const color = FALLBACK_COLORS[Math.floor(Math.random() * FALLBACK_COLORS.length)];

        return {
          id: repo.id,
          title: caseStudy.title || repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          category: caseStudy.category || (repo.topics?.length ? repo.topics.slice(0, 3).join(' / ') : repo.language || "Production"),
          image: caseStudy.image || (isFenrir 
            ? "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070"
            : hasScreenshot 
              ? `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/main/screenshot.png`
              : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"),
          color: caseStudy.color || color,
          href: repo.homepage || repo.html_url,
          github: repo.html_url,
          description: caseStudy.description || repo.description || "Production-grade implementation focused on technical resilience and performance.",
          challenge: caseStudy.challenge || "Architecting a modular system to ensure high-concurrency stability and optimized rendering cycles.",
          features: caseStudy.features || [
             "Modular Architecture",
             "Performance Benchmarking",
             "Type-safe Implementation",
             "Interaction Engineering"
          ],
          tech: (caseStudy.tech || (repo.topics?.length ? repo.topics : [repo.language].filter((l): l is string => !!l)) || ["Core Stack"]) as string[]
        };
      })
    );

    return projects.filter((p): p is Project => p !== null);
  } catch (err) {
    console.error(err);
    return [];
  }
}
