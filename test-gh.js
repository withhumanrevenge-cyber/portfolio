const GITHUB_USER = "withhumanrevenge-cyber";

async function test() {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`);
    if (!res.ok) {
        console.log("Failed", res.status);
        return;
    }
    const repos = await res.json();
    console.log("Found repos:", repos.length);
    for (const repo of repos) {
        if (!repo.fork && (repo.topics?.includes('portfolio') || repo.homepage)) {
            console.log(`- ${repo.name} (Homepage: ${repo.homepage}, Topics: ${repo.topics?.join(', ')})`);
        }
    }
}

test();
