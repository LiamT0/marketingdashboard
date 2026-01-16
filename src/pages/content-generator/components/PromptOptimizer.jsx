import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PromptOptimizer = ({ onPromptSelect, selectedPrompt }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const promptLibrary = [
    {
      value: 'analogy-focused',
      label: 'Analogy-Focused Approach',
      description: 'Compare AI adoption to electricity adoption in construction',
      template: 'Create a LinkedIn post comparing AI adoption in construction to electricity adoption in the early 1900s. Focus on: early adopter advantages, market transformation timeline, competitive positioning, and ROI projections for 2025-2026.',
      performance: 92
    },
    {
      value: 'data-driven',
      label: 'Data-Driven Case Study',
      description: 'Highlight specific revenue and cost-saving metrics',
      template: 'Generate a LinkedIn post showcasing construction company success with AI implementation. Include: specific revenue increase percentages, cost reduction metrics, project timeline improvements, and client satisfaction scores for 2025-2026.',
      performance: 88
    },
    {
      value: 'storytelling',
      label: 'Storytelling Narrative',
      description: 'Engage through relatable construction scenarios',
      template: 'Write a LinkedIn post telling the story of a construction project transformed by AI. Emphasize: initial challenges, AI solution implementation, measurable outcomes, and lessons learned. Target construction business owners.',
      performance: 85
    },
    {
      value: 'thought-leadership',
      label: 'Thought Leadership',
      description: 'Position as industry expert on AI trends',
      template: 'Create a thought leadership LinkedIn post about AI trends in construction for 2025-2026. Cover: emerging technologies, industry predictions, adoption strategies, and competitive advantages for early movers.',
      performance: 90
    }
  ];

  const handlePromptSelect = (value) => {
    const selected = promptLibrary?.find(p => p?.value === value);
    if (selected) {
      onPromptSelect(selected?.template);
      setShowCustom(false);
    }
  };

  const handleCustomPromptSubmit = () => {
    if (customPrompt?.trim()) {
      onPromptSelect(customPrompt);
      setShowCustom(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-base md:text-lg">AI Prompt Optimizer</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Select or customize your content prompt</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName={showCustom ? "Library" : "Edit"}
          onClick={() => setShowCustom(!showCustom)}
        >
          {showCustom ? "Library" : "Custom"}
        </Button>
      </div>
      {!showCustom ? (
        <div className="space-y-4">
          <Select
            label="Prompt Template"
            description="Choose from our best-performing prompts"
            options={promptLibrary?.map(p => ({
              value: p?.value,
              label: p?.label,
              description: p?.description
            }))}
            value={selectedPrompt}
            onChange={handlePromptSelect}
            placeholder="Select a prompt template..."
            searchable
          />

          {selectedPrompt && (
            <div className="space-y-3">
              {promptLibrary?.filter(p => p?.value === selectedPrompt)?.map(prompt => (
                <div key={prompt?.value} className="bg-muted/50 rounded-lg p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium text-foreground">Template Preview</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Icon name="TrendingUp" size={14} color="var(--color-success)" />
                        <span className="text-xs font-medium text-success">{prompt?.performance}% Performance</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{prompt?.template}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            label="Custom Prompt"
            type="text"
            placeholder="Enter your custom AI prompt..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e?.target?.value)}
            description="Create a tailored prompt for your specific content needs"
          />
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              iconName="Check"
              onClick={handleCustomPromptSubmit}
              disabled={!customPrompt?.trim()}
            >
              Apply Prompt
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCustomPrompt('');
                setShowCustom(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-primary/5 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Target" size={14} color="var(--color-primary)" />
            <span className="text-xs font-medium text-foreground">Engagement</span>
          </div>
          <p className="text-xs text-muted-foreground">Optimized for likes & comments</p>
        </div>
        <div className="bg-accent/5 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Users" size={14} color="var(--color-accent)" />
            <span className="text-xs font-medium text-foreground">Reach</span>
          </div>
          <p className="text-xs text-muted-foreground">Maximized audience visibility</p>
        </div>
        <div className="bg-success/5 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="TrendingUp" size={14} color="var(--color-success)" />
            <span className="text-xs font-medium text-foreground">Conversion</span>
          </div>
          <p className="text-xs text-muted-foreground">Lead generation focused</p>
        </div>
      </div>
    </div>
  );
};

export default PromptOptimizer;