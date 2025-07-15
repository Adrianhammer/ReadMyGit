import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { ProjectInfo } from '@/types';

interface ProjectInfoFormProps {
  initialData?: Partial<ProjectInfo>;
  onChange: (projectInfo: ProjectInfo) => void;
}

export default function ProjectInfoForm({ initialData, onChange }: ProjectInfoFormProps) {
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
    ...initialData
  });

  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newPrereq, setNewPrereq] = useState('');
  const [newRoadmapItem, setNewRoadmapItem] = useState('');

  useEffect(() => {
    if (initialData) {
      setProjectInfo(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  useEffect(() => {
    onChange(projectInfo);
  }, [projectInfo, onChange]);

  const updateField = (field: keyof ProjectInfo, value: string | string[]) => {
    setProjectInfo(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: keyof ProjectInfo, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      const currentArray = projectInfo[field] as string[];
      updateField(field, [...currentArray, value.trim()]);
      setter('');
    }
  };

  const removeArrayItem = (field: keyof ProjectInfo, index: number) => {
    const currentArray = projectInfo[field] as string[];
    updateField(field, currentArray.filter((_, i) => i !== index));
  };

  const renderArrayInput = (
    field: keyof ProjectInfo,
    label: string,
    placeholder: string,
    value: string,
    setValue: (value: string) => void
  ) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addArrayItem(field, value, setValue)}
        />
        <Button 
          type="button" 
          variant="outline" 
          size="icon"
          onClick={() => addArrayItem(field, value, setValue)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(projectInfo[field] as string[]).map((item, index) => (
          <Badge key={index} variant="secondary" className="gap-1">
            {item}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => removeArrayItem(field, index)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="My Awesome Project"
              value={projectInfo.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              placeholder="Your Name"
              value={projectInfo.author}
              onChange={(e) => updateField('author', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="A brief description of your project..."
            value={projectInfo.description}
            onChange={(e) => updateField('description', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose</Label>
          <Textarea
            id="purpose"
            placeholder="What problem does this project solve? What is its main goal?"
            value={projectInfo.purpose}
            onChange={(e) => updateField('purpose', e.target.value)}
          />
        </div>

        {renderArrayInput('technologies', 'Technologies', 'React, Node.js, MongoDB...', newTech, setNewTech)}
        {renderArrayInput('features', 'Features', 'User authentication, Real-time updates...', newFeature, setNewFeature)}
        {renderArrayInput('prerequisites', 'Prerequisites', 'Node.js 16+, Git...', newPrereq, setNewPrereq)}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              placeholder="https://github.com/username/repo"
              value={projectInfo.github}
              onChange={(e) => updateField('github', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo">Demo URL</Label>
            <Input
              id="demo"
              placeholder="https://myproject.demo.com"
              value={projectInfo.demo}
              onChange={(e) => updateField('demo', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={projectInfo.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="license">License</Label>
            <Input
              id="license"
              placeholder="MIT"
              value={projectInfo.license}
              onChange={(e) => updateField('license', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="installation">Installation Instructions</Label>
          <Textarea
            id="installation"
            placeholder="git clone https://github.com/username/repo.git&#10;cd repo&#10;npm install&#10;npm start"
            value={projectInfo.installation}
            onChange={(e) => updateField('installation', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="usage">Usage Instructions</Label>
          <Textarea
            id="usage"
            placeholder="How to use your project..."
            value={projectInfo.usage}
            onChange={(e) => updateField('usage', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deployment">Deployment</Label>
          <Textarea
            id="deployment"
            placeholder="How to deploy your project..."
            value={projectInfo.deployment}
            onChange={(e) => updateField('deployment', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="api">API Documentation</Label>
          <Textarea
            id="api"
            placeholder="API endpoints and usage..."
            value={projectInfo.api}
            onChange={(e) => updateField('api', e.target.value)}
          />
        </div>

        {renderArrayInput('roadmap', 'Roadmap', 'Add user profiles, Implement dark mode...', newRoadmapItem, setNewRoadmapItem)}

        <div className="space-y-2">
          <Label htmlFor="contributing">Contributing Guidelines</Label>
          <Textarea
            id="contributing"
            placeholder="How others can contribute to your project..."
            value={projectInfo.contributing}
            onChange={(e) => updateField('contributing', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="acknowledgments">Acknowledgments</Label>
          <Textarea
            id="acknowledgments"
            placeholder="Credits, inspirations, special thanks..."
            value={projectInfo.acknowledgments}
            onChange={(e) => updateField('acknowledgments', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}