import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Github, Sparkles } from 'lucide-react';
import GitHubUrlInput from '@/components/GitHubUrlInput';
import ProjectInfoForm from '@/components/ProjectInfoForm';
import TemplateSelector from '@/components/TemplateSelector';
import ReadmePreview from '@/components/ReadmePreview';
import { ProjectInfo } from '@/types';
import { generateReadme } from '@/utils/readmeTemplates';

export default function Index() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: '',
    description: '',
    purpose: '',
    technologies: [],
    features: [],
    installation: '',
    usage: '',
    contributing: '',
    license: 'MIT',
    author: '',
    email: '',
    github: '',
    demo: '',
    screenshots: [],
    prerequisites: [],
    deployment: '',
    api: '',
    roadmap: [],
    acknowledgments: '',
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [fetchedData, setFetchedData] = useState<Partial<ProjectInfo> | null>(null);

  const handleRepoFetched = (data: Partial<ProjectInfo>) => {
    setFetchedData(data);
    setProjectInfo(prev => ({ ...prev, ...data }));
  };

  const generatedReadme = generateReadme(projectInfo, selectedTemplate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  README Generator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create beautiful GitHub README files in minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>AI-powered templates</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Github className="h-5 w-5" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600 mb-4">
                  Get started by fetching data from a GitHub repository or filling out the form manually.
                </p>
                <Tabs defaultValue="github" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="github">From GitHub</TabsTrigger>
                    <TabsTrigger value="manual">Manual Input</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="github" className="mt-4">
                    <GitHubUrlInput onRepoFetched={handleRepoFetched} />
                  </TabsContent>
                  
                  <TabsContent value="manual" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground">
                          Fill out the project information form below to generate your README.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <TemplateSelector 
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />

            <ProjectInfoForm 
              initialData={fetchedData}
              onChange={setProjectInfo}
            />
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <ReadmePreview content={generatedReadme} />
          </div>
        </div>

        {/* Footer */}
        <Separator className="my-12" />
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
          <p className="mt-2">
            Generate professional README files for your GitHub repositories
          </p>
        </div>
      </div>
    </div>
  );
}