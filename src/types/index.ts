export interface ProjectInfo {
  name: string;
  description: string;
  purpose: string;
  technologies: string[];
  features: string[];
  installation: string;
  usage: string;
  contributing: string;
  license: string;
  author: string;
  email: string;
  github: string;
  demo: string;
  screenshots: string[];
  prerequisites: string[];
  deployment: string;
  api: string;
  roadmap: string[];
  acknowledgments: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  license: {
    name: string;
  } | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface ReadmeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}