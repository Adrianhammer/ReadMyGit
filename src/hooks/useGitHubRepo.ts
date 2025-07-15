import { useState } from 'react';
import { GitHubRepo } from '@/types';

export const useGitHubRepo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepo = async (url: string): Promise<GitHubRepo | null> => {
    setLoading(true);
    setError(null);

    try {
      // Extract owner and repo name from GitHub URL
      const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!match) {
        throw new Error('Invalid GitHub URL format');
      }

      const [, owner, repo] = match;
      const repoName = repo.replace(/\.git$/, '');

      // Fetch repository information
      const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Repository not found or is private');
        }
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const repoData: GitHubRepo = await response.json();

      // Fetch languages
      const languagesResponse = await fetch(repoData.languages_url);
      const languages = await languagesResponse.json();
      
      return {
        ...repoData,
        languages: Object.keys(languages)
      } as GitHubRepo & { languages: string[] };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch repository';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchRepo, loading, error };
};