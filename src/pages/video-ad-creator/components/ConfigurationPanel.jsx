import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConfigurationPanel = ({ config, onConfigChange, onGenerate, isGenerating }) => {
  const voiceoverOptions = [
    { value: 'professional-male', label: 'Professional Male Voice' },
    { value: 'professional-female', label: 'Professional Female Voice' },
    { value: 'energetic-male', label: 'Energetic Male Voice' },
    { value: 'energetic-female', label: 'Energetic Female Voice' },
    { value: 'authoritative', label: 'Authoritative Voice' },
    { value: 'friendly', label: 'Friendly Voice' }
  ];

  const musicOptions = [
    { value: 'corporate-upbeat', label: 'Corporate Upbeat' },
    { value: 'tech-innovation', label: 'Tech Innovation' },
    { value: 'inspiring-growth', label: 'Inspiring Growth' },
    { value: 'modern-minimal', label: 'Modern Minimal' },
    { value: 'energetic-drive', label: 'Energetic Drive' },
    { value: 'none', label: 'No Background Music' }
  ];

  const styleOptions = [
    { value: 'modern-professional', label: 'Modern Professional' },
    { value: 'bold-dynamic', label: 'Bold & Dynamic' },
    { value: 'clean-minimal', label: 'Clean Minimal' },
    { value: 'industrial-tech', label: 'Industrial Tech' },
    { value: 'premium-luxury', label: 'Premium Luxury' }
  ];

  const durationOptions = [
    { value: '15', label: '15 seconds' },
    { value: '30', label: '30 seconds' },
    { value: '45', label: '45 seconds' },
    { value: '60', label: '60 seconds' },
    { value: '90', label: '90 seconds' }
  ];

  const handleInputChange = (field, value) => {
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm">
      <div className="p-4 md:p-6 border-b border-border">
        <h3 className="font-heading font-semibold text-foreground text-lg md:text-xl flex items-center gap-2">
          <Icon name="Settings" size={24} />
          Video Configuration
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your construction AI advertisement
        </p>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="space-y-4">
          <h4 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <Icon name="Building2" size={20} />
            Company Branding
          </h4>

          <Input
            label="Company Name"
            type="text"
            placeholder="Enter your company name"
            value={config?.companyName}
            onChange={(e) => handleInputChange('companyName', e?.target?.value)}
            required
          />

          <Input
            label="Tagline"
            type="text"
            placeholder="Your company tagline or slogan"
            value={config?.tagline}
            onChange={(e) => handleInputChange('tagline', e?.target?.value)}
            description="Optional: Appears at the end of the video"
          />

          <Input
            label="Website URL"
            type="url"
            placeholder="https://yourcompany.com"
            value={config?.website}
            onChange={(e) => handleInputChange('website', e?.target?.value)}
          />
        </div>

        <div className="border-t border-border pt-4 md:pt-6 space-y-4">
          <h4 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <Icon name="MessageSquare" size={20} />
            Key Messaging
          </h4>

          <Input
            label="Main Message"
            type="text"
            placeholder="e.g., Transform your construction business with AI"
            value={config?.mainMessage}
            onChange={(e) => handleInputChange('mainMessage', e?.target?.value)}
            required
            description="Primary value proposition (max 80 characters)"
            maxLength={80}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Key Benefits (Select up to 3)
            </label>
            <div className="space-y-2">
              <Checkbox
                label="50% faster project completion"
                checked={config?.benefits?.includes('faster')}
                onChange={(e) => {
                  const benefits = config?.benefits || [];
                  handleInputChange(
                    'benefits',
                    e?.target?.checked
                      ? [...benefits, 'faster']
                      : benefits?.filter((b) => b !== 'faster')
                  );
                }}
              />
              <Checkbox
                label="30% cost reduction"
                checked={config?.benefits?.includes('cost')}
                onChange={(e) => {
                  const benefits = config?.benefits || [];
                  handleInputChange(
                    'benefits',
                    e?.target?.checked
                      ? [...benefits, 'cost']
                      : benefits?.filter((b) => b !== 'cost')
                  );
                }}
              />
              <Checkbox
                label="Real-time project insights"
                checked={config?.benefits?.includes('insights')}
                onChange={(e) => {
                  const benefits = config?.benefits || [];
                  handleInputChange(
                    'benefits',
                    e?.target?.checked
                      ? [...benefits, 'insights']
                      : benefits?.filter((b) => b !== 'insights')
                  );
                }}
              />
              <Checkbox
                label="Automated workflow optimization"
                checked={config?.benefits?.includes('automation')}
                onChange={(e) => {
                  const benefits = config?.benefits || [];
                  handleInputChange(
                    'benefits',
                    e?.target?.checked
                      ? [...benefits, 'automation']
                      : benefits?.filter((b) => b !== 'automation')
                  );
                }}
              />
            </div>
          </div>

          <Input
            label="Call-to-Action"
            type="text"
            placeholder="e.g., Schedule a Free Demo Today"
            value={config?.cta}
            onChange={(e) => handleInputChange('cta', e?.target?.value)}
            required
          />
        </div>

        <div className="border-t border-border pt-4 md:pt-6 space-y-4">
          <h4 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <Icon name="Palette" size={20} />
            Audio & Visual Style
          </h4>

          <Select
            label="Voiceover"
            options={voiceoverOptions}
            value={config?.voiceover}
            onChange={(value) => handleInputChange('voiceover', value)}
            placeholder="Select voiceover style"
          />

          <Select
            label="Background Music"
            options={musicOptions}
            value={config?.music}
            onChange={(value) => handleInputChange('music', value)}
            placeholder="Select background music"
          />

          <Select
            label="Visual Style"
            options={styleOptions}
            value={config?.style}
            onChange={(value) => handleInputChange('style', value)}
            placeholder="Select visual style"
          />

          <Select
            label="Video Duration"
            options={durationOptions}
            value={config?.duration}
            onChange={(value) => handleInputChange('duration', value)}
            placeholder="Select duration"
          />
        </div>

        <div className="border-t border-border pt-4 md:pt-6 space-y-4">
          <h4 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <Icon name="Target" size={20} />
            Advanced Options
          </h4>

          <Checkbox
            label="Include ROI Calculator Overlay"
            description="Shows potential savings and revenue increase"
            checked={config?.includeROI}
            onChange={(e) => handleInputChange('includeROI', e?.target?.checked)}
          />

          <Checkbox
            label="Add Customer Testimonials"
            description="Features real construction company success stories"
            checked={config?.includeTestimonials}
            onChange={(e) => handleInputChange('includeTestimonials', e?.target?.checked)}
          />

          <Checkbox
            label="Show Before/After Comparison"
            description="Demonstrates transformation with AI adoption"
            checked={config?.includeComparison}
            onChange={(e) => handleInputChange('includeComparison', e?.target?.checked)}
          />

          <Checkbox
            label="Add Competitor Analysis"
            description="Highlights competitive advantages"
            checked={config?.includeCompetitor}
            onChange={(e) => handleInputChange('includeCompetitor', e?.target?.checked)}
          />
        </div>

        <div className="border-t border-border pt-4 md:pt-6">
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="Sparkles"
            iconPosition="left"
            onClick={onGenerate}
            loading={isGenerating}
            disabled={!config?.companyName || !config?.mainMessage || !config?.cta}
          >
            {isGenerating ? 'Generating Video...' : 'Generate Video'}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Estimated generation time: 3-5 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;