import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Github, ExternalLink } from 'lucide-react';
import { useGitHubRepo } from '@/hooks/useGitHubRepo';
import { ProjectInfo, GitHubRepo } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GitHubUrlInputProps {
  onRepoFetched: (projectInfo: Partial<ProjectInfo>) => void;
}

export default function GitHubUrlInput({ onRepoFetched }: GitHubUrlInputProps) {
  const [url, setUrl] = useState('');
  const { fetchRepo, loading, error } = useGitHubRepo();

  const handleFetchRepo = async () => {
    if (!url.trim()) return;

    const repo = await fetchRepo(url);
    if (repo) {
      const repoWithLanguages = repo as typeof repo & { languages: string[] };
      const projectInfo: Partial<ProjectInfo> = {
        name: repo.name,
        description: repo.description || '',
        github: repo.html_url,
        demo: repo.homepage || '',
        author: repo.owner.login,
        technologies: repoWithLanguages.languages || [],
        license: repo.license?.name || 'MIT',
        purpose: repo.description ? `${repo.description} - A GitHub repository with ${repo.stargazers_count} stars and ${repo.forks_count} forks.` : '',
        features: repo.topics || []
      };

      onRepoFetched(projectInfo);
    }
  };

  const isValidGitHubUrl = (url: string) => {
    return /^https?:\/\/github\.com\/[^/]+\/[^/]+/.test(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          Fetch from GitHub Repository
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="github-url">GitHub Repository URL</Label>
          <div className="flex gap-2">
            <Input
              id="github-url"
              placeholder="https://github.com/username/repository"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleFetchRepo()}
            />
            <Button 
              onClick={handleFetchRepo} 
              disabled={loading || !isValidGitHubUrl(url)}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground">
          <p>Enter a public GitHub repository URL to automatically fetch project information.</p>
          <p className="mt-1">Example: https://github.com/microsoft/vscode</p>
        </div>
      </CardContent>
    </Card>
  );
}