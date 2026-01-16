import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LeadFilters = ({ filters, onFilterChange, onClearFilters, resultCount }) => {
  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'chatbot', label: 'Chatbot' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'website', label: 'Website' }
  ];

  const qualificationOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'hot', label: 'Hot Lead' },
    { value: 'warm', label: 'Warm Lead' },
    { value: 'cold', label: 'Cold Lead' },
    { value: 'unqualified', label: 'Unqualified' }
  ];

  const stageOptions = [
    { value: 'all', label: 'All Stages' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal Sent' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed-won', label: 'Closed Won' },
    { value: 'closed-lost', label: 'Closed Lost' }
  ];

  const tagOptions = [
    { value: 'ai-adoption', label: 'AI Adoption' },
    { value: 'cost-saving', label: 'Cost Saving' },
    { value: 'efficiency', label: 'Efficiency' },
    { value: 'technology', label: 'Technology' },
    { value: 'consultation', label: 'Consultation' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-foreground text-base md:text-lg">
            Filter Leads
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {resultCount} results
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearFilters}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search by name, email, company..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        <Select
          placeholder="Lead Source"
          options={sourceOptions}
          value={filters?.source}
          onChange={(value) => onFilterChange('source', value)}
        />

        <Select
          placeholder="Qualification Level"
          options={qualificationOptions}
          value={filters?.qualification}
          onChange={(value) => onFilterChange('qualification', value)}
        />

        <Select
          placeholder="Nurturing Stage"
          options={stageOptions}
          value={filters?.stage}
          onChange={(value) => onFilterChange('stage', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          type="date"
          label="From Date"
          value={filters?.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
        />

        <Input
          type="date"
          label="To Date"
          value={filters?.dateTo}
          onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
        />
      </div>
      <div className="mt-4">
        <Select
          placeholder="Filter by tags"
          options={tagOptions}
          value={filters?.tags}
          onChange={(value) => onFilterChange('tags', value)}
          multiple
          searchable
          clearable
        />
      </div>
    </div>
  );
};

export default LeadFilters;