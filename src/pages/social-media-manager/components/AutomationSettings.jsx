import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AutomationSettings = ({ settings, onSave }) => {
  const [formData, setFormData] = useState(settings);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave(formData);
  };

  const postingFrequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'twice-daily', label: 'Twice Daily' },
    { value: 'three-times-daily', label: '3 Times Daily' },
    { value: 'custom', label: 'Custom Schedule' }
  ];

  const timeZoneOptions = [
    { value: 'EST', label: 'Eastern Time (EST)' },
    { value: 'CST', label: 'Central Time (CST)' },
    { value: 'MST', label: 'Mountain Time (MST)' },
    { value: 'PST', label: 'Pacific Time (PST)' }
  ];

  const responseDelayOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: '5min', label: '5 Minutes' },
    { value: '15min', label: '15 Minutes' },
    { value: '30min', label: '30 Minutes' },
    { value: '1hour', label: '1 Hour' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Settings" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg md:text-xl text-foreground">
              Automation Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure automated posting and engagement
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-base text-foreground">
            Posting Automation
          </h3>
          
          <Checkbox
            label="Enable Automated Posting"
            description="Automatically publish scheduled content"
            checked={formData?.autoPostingEnabled}
            onChange={(e) => handleChange('autoPostingEnabled', e?.target?.checked)}
          />

          <Select
            label="Posting Frequency"
            description="How often to publish new content"
            options={postingFrequencyOptions}
            value={formData?.postingFrequency}
            onChange={(value) => handleChange('postingFrequency', value)}
          />

          <Select
            label="Time Zone"
            description="Schedule posts in your local time zone"
            options={timeZoneOptions}
            value={formData?.timeZone}
            onChange={(value) => handleChange('timeZone', value)}
          />

          <Input
            type="time"
            label="Preferred Posting Time"
            description="Best time to reach your audience"
            value={formData?.preferredTime}
            onChange={(e) => handleChange('preferredTime', e?.target?.value)}
          />
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="font-heading font-semibold text-base text-foreground">
            LinkedIn Chat Automation
          </h3>

          <Checkbox
            label="Enable Auto-Response"
            description="Automatically respond to LinkedIn messages"
            checked={formData?.autoResponseEnabled}
            onChange={(e) => handleChange('autoResponseEnabled', e?.target?.checked)}
          />

          <Select
            label="Response Delay"
            description="Time to wait before sending automated response"
            options={responseDelayOptions}
            value={formData?.responseDelay}
            onChange={(value) => handleChange('responseDelay', value)}
            disabled={!formData?.autoResponseEnabled}
          />

          <Input
            type="text"
            label="Greeting Message"
            description="Initial message sent to new connections"
            placeholder="Thank you for connecting! How can I help you today?"
            value={formData?.greetingMessage}
            onChange={(e) => handleChange('greetingMessage', e?.target?.value)}
            disabled={!formData?.autoResponseEnabled}
          />
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="font-heading font-semibold text-base text-foreground">
            Content Approval
          </h3>

          <Checkbox
            label="Require Manual Approval"
            description="Review all content before publishing"
            checked={formData?.requireApproval}
            onChange={(e) => handleChange('requireApproval', e?.target?.checked)}
          />

          <Checkbox
            label="Send Approval Notifications"
            description="Get notified when content needs review"
            checked={formData?.approvalNotifications}
            onChange={(e) => handleChange('approvalNotifications', e?.target?.checked)}
            disabled={!formData?.requireApproval}
          />
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="font-heading font-semibold text-base text-foreground">
            Cross-Platform Settings
          </h3>

          <Checkbox
            label="Cross-Post to All Platforms"
            description="Publish content to all connected accounts simultaneously"
            checked={formData?.crossPostEnabled}
            onChange={(e) => handleChange('crossPostEnabled', e?.target?.checked)}
          />

          <Checkbox
            label="Optimize Content Per Platform"
            description="Automatically adjust content format for each platform"
            checked={formData?.platformOptimization}
            onChange={(e) => handleChange('platformOptimization', e?.target?.checked)}
            disabled={!formData?.crossPostEnabled}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="default"
            iconName="Save"
            iconPosition="left"
            className="flex-1"
          >
            Save Settings
          </Button>
          <Button
            type="button"
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => setFormData(settings)}
            className="flex-1"
          >
            Reset to Default
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AutomationSettings;