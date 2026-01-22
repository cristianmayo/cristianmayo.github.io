const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
    try {
        // Get the GitHub username from profile.json
        const profile = require("./profile.json");
        const username = profile.githubUsername;
        
        // Fetch user's repositories from GitHub API
        const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
        
        const repos = await EleventyFetch(url, {
            duration: "1h", // Cache for 1 hour
            type: "json",
            fetchOptions: {
                headers: {
                    "User-Agent": "Eleventy-Static-Site"
                }
            }
        });

        // Transform the data to include only what we need
        return repos
            .filter(repo => !repo.fork) // Exclude forked repositories
            .map(repo => ({
                name: repo.name,
                description: repo.description || "No description provided",
                link: repo.html_url,
                homepage: repo.homepage,
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                created: repo.created_at,
                updated: repo.updated_at,
                topics: repo.topics || [],
                isArchived: repo.archived,
                defaultBranch: repo.default_branch
            }))
            .sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by most recently updated
    } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
        // Return empty array on error to prevent build failure
        return [];
    }
};
