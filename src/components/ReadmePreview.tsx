import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ReadmePreviewProps {
  content: string;
}

export default function ReadmePreview({ content }: ReadmePreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('README copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadReadme = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded!');
  };

  const renderMarkdownPreview = (markdown: string) => {
    return markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$1</code></pre>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>')
      .replace(/<p class="mb-4"><h/g, '<h')
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
      .replace(/<p class="mb-4"><li/g, '<li')
      .replace(/<\/li><\/p>/g, '</li>')
      .replace(/(<li.*<\/li>)/g, '<ul class="list-none mb-4">$1</ul>')
      .replace(/<\/ul>\s*<ul class="list-none mb-4">/g, '');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>README Preview</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button size="sm" onClick={downloadReadme}>
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-4">
            <div className="border rounded-lg p-6 bg-white min-h-[400px] max-h-[600px] overflow-y-auto">
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: renderMarkdownPreview(content)
                }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="markdown" className="mt-4">
            <div className="border rounded-lg">
              <pre className="p-4 text-sm overflow-x-auto max-h-[600px] overflow-y-auto">
                <code>{content}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {content.split('\n').length} lines
            </Badge>
            <Badge variant="outline">
              {content.length} characters
            </Badge>
          </div>
          
          {(content.includes('[![') || content.includes('img.shields.io')) && (
            <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
              💡 <strong>Note:</strong> GitHub badges and links will render properly on GitHub - the blue text you see here is just HTML that GitHub will display as colorful badges.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}