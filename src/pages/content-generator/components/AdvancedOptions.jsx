import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedOptions = ({ 
  tone, 
  onToneChange, 
  targetAudience, 
  onTargetAudienceChange,
  includeHashtags,
  onIncludeHashtagsChange,
  includeEmojis,
  onIncludeEmojisChange,
  includeCallToAction,
  onIncludeCallToActionChange
}) => {
  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal business tone' },
    { value: 'conversational', label: 'Conversational', description: 'Friendly and approachable' },
    { value: 'authoritative', label: 'Authoritative', description: 'Expert thought leadership' },
    { value: 'inspirational', label: 'Inspirational', description: 'Motivational and uplifting' },
    { value: 'educational', label: 'Educational', description: 'Informative and teaching-focused' }
  ];

  const audienceOptions = [
    { value: 'business-owners', label: 'Business Owners', description: 'Construction company executives' },
    { value: 'contractors', label: 'Contractors', description: 'General and specialty contractors' },
    { value: 'project-managers', label: 'Project Managers', description: 'Construction project leaders' },
    { value: 'architects', label: 'Architects & Engineers', description: 'Design professionals' },
    { value: 'investors', label: 'Investors', description: 'Construction industry investors' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground text-base md:text-lg">Advanced Options</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Customize your content style and audience</p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <Select
          label="Content Tone"
          description="Select the writing style for your post"
          options={toneOptions}
          value={tone}
          onChange={onToneChange}
          placeholder="Choose tone..."
          required
        />

        <Select
          label="Target Audience"
          description="Who should this content resonate with?"
          options={audienceOptions}
          value={targetAudience}
          onChange={onTargetAudienceChange}
          placeholder="Select audience..."
          required
        />

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Content Elements</p>
          
          <Checkbox
            label="Include Hashtags"
            description="Add relevant industry hashtags for better reach"
            checked={includeHashtags}
            onChange={(e) => onIncludeHashtagsChange(e?.target?.checked)}
          />

          <Checkbox
            label="Include Emojis"
            description="Add emojis to make content more engaging"
            checked={includeEmojis}
            onChange={(e) => onIncludeEmojisChange(e?.target?.checked)}
          />

          <Checkbox
            label="Include Call-to-Action"
            description="Add a clear next step for readers"
            checked={includeCallToAction}
            onChange={(e) => onIncludeCallToActionChange(e?.target?.checked)}
          />
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 md:p-4">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs md:text-sm font-medium text-foreground mb-1">Content Optimization</p>
              <p className="text-xs text-muted-foreground">
                Posts with hashtags see 30% more engagement. Including a call-to-action increases lead generation by 25%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptions;