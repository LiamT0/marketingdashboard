import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TopicSelector = ({ selectedTopic, onTopicChange, selectedSubtopic, onSubtopicChange }) => {
  const topicOptions = [
    { value: 'ai-adoption', label: 'AI vs Electricity Adoption Analogy' },
    { value: 'revenue-case', label: 'Revenue Growth Case Studies' },
    { value: 'cost-saving', label: 'Cost-Saving Examples' },
    { value: 'efficiency', label: 'Efficiency Improvements' },
    { value: 'safety', label: 'Safety Enhancements' }
  ];

  const subtopicMap = {
    'ai-adoption': [
      { value: 'early-adopters', label: 'Early Adopters Advantage' },
      { value: 'market-leaders', label: 'Market Leaders Strategy' },
      { value: 'competitive-edge', label: 'Competitive Edge Analysis' },
      { value: 'industry-transformation', label: 'Industry Transformation' }
    ],
    'revenue-case': [
      { value: 'project-efficiency', label: 'Project Efficiency Gains' },
      { value: 'client-acquisition', label: 'Client Acquisition Growth' },
      { value: 'profit-margins', label: 'Profit Margin Improvements' },
      { value: 'market-expansion', label: 'Market Expansion Success' }
    ],
    'cost-saving': [
      { value: 'labor-optimization', label: 'Labor Cost Optimization' },
      { value: 'material-waste', label: 'Material Waste Reduction' },
      { value: 'equipment-efficiency', label: 'Equipment Efficiency' },
      { value: 'project-delays', label: 'Project Delay Prevention' }
    ],
    'efficiency': [
      { value: 'scheduling', label: 'Scheduling Optimization' },
      { value: 'resource-allocation', label: 'Resource Allocation' },
      { value: 'quality-control', label: 'Quality Control Automation' },
      { value: 'documentation', label: 'Documentation Streamlining' }
    ],
    'safety': [
      { value: 'hazard-detection', label: 'Hazard Detection Systems' },
      { value: 'compliance', label: 'Compliance Monitoring' },
      { value: 'training', label: 'Safety Training Enhancement' },
      { value: 'incident-prevention', label: 'Incident Prevention' }
    ]
  };

  const subtopicOptions = selectedTopic ? subtopicMap?.[selectedTopic] || [] : [];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Target" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground text-base md:text-lg">Topic Selection</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Choose your content focus area</p>
        </div>
      </div>

      <div className="space-y-4">
        <Select
          label="Primary Topic"
          description="Select the main theme for your LinkedIn post"
          options={topicOptions}
          value={selectedTopic}
          onChange={onTopicChange}
          placeholder="Choose a topic..."
          required
        />

        {selectedTopic && (
          <Select
            label="Subtopic"
            description="Narrow down your content focus"
            options={subtopicOptions}
            value={selectedSubtopic}
            onChange={onSubtopicChange}
            placeholder="Select a subtopic..."
            required
          />
        )}

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 md:p-4">
          <div className="flex items-start gap-2">
            <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
            <p className="text-xs md:text-sm text-foreground">
              <span className="font-medium">Pro Tip:</span> AI adoption analogies perform 45% better in engagement compared to direct feature descriptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicSelector;