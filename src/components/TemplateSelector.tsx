import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { readmeTemplates } from '@/utils/readmeTemplates';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

export default function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose a Template</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedTemplate} onValueChange={onTemplateChange}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readmeTemplates.map((template) => (
              <div key={template.id} className="flex items-start space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                <RadioGroupItem value={template.id} id={template.id} className="mt-1" />
                <div className="flex-1 space-y-2">
                  <Label htmlFor={template.id} className="text-sm font-medium cursor-pointer">
                    {template.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                  <div className="text-xs font-mono bg-muted p-2 rounded border">
                    <pre className="whitespace-pre-wrap">{template.preview}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}