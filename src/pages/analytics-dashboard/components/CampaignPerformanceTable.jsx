import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampaignPerformanceTable = ({ campaigns }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCampaigns = [...campaigns]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue?.localeCompare(bValue)
        : bValue?.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success';
      case 'Paused':
        return 'bg-warning/10 text-warning';
      case 'Completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <h3 className="font-heading font-semibold text-base md:text-lg text-foreground">
          Campaign Performance
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 md:p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Campaign Name
                  <Icon name={sortField === 'name' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={16} />
                </button>
              </th>
              <th className="text-left p-3 md:p-4">
                <button
                  onClick={() => handleSort('platform')}
                  className="flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Platform
                  <Icon name={sortField === 'platform' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={16} />
                </button>
              </th>
              <th className="text-right p-3 md:p-4">
                <button
                  onClick={() => handleSort('leads')}
                  className="flex items-center justify-end gap-2 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth ml-auto"
                >
                  Leads
                  <Icon name={sortField === 'leads' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={16} />
                </button>
              </th>
              <th className="text-right p-3 md:p-4">
                <button
                  onClick={() => handleSort('conversions')}
                  className="flex items-center justify-end gap-2 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth ml-auto"
                >
                  Conversions
                  <Icon name={sortField === 'conversions' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={16} />
                </button>
              </th>
              <th className="text-right p-3 md:p-4">
                <button
                  onClick={() => handleSort('roi')}
                  className="flex items-center justify-end gap-2 text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth ml-auto"
                >
                  ROI
                  <Icon name={sortField === 'roi' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={16} />
                </button>
              </th>
              <th className="text-center p-3 md:p-4">
                <span className="text-xs md:text-sm font-medium text-muted-foreground">Status</span>
              </th>
              <th className="text-center p-3 md:p-4">
                <span className="text-xs md:text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCampaigns?.map((campaign) => (
              <tr key={campaign?.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                <td className="p-3 md:p-4">
                  <span className="text-sm md:text-base text-foreground font-medium">
                    {campaign?.name}
                  </span>
                </td>
                <td className="p-3 md:p-4">
                  <div className="flex items-center gap-2">
                    <Icon name={campaign?.platformIcon} size={16} color="var(--color-muted-foreground)" />
                    <span className="text-sm text-muted-foreground">{campaign?.platform}</span>
                  </div>
                </td>
                <td className="p-3 md:p-4 text-right">
                  <span className="text-sm md:text-base text-foreground font-medium data-text">
                    {campaign?.leads?.toLocaleString()}
                  </span>
                </td>
                <td className="p-3 md:p-4 text-right">
                  <span className="text-sm md:text-base text-foreground font-medium data-text">
                    {campaign?.conversions}
                  </span>
                </td>
                <td className="p-3 md:p-4 text-right">
                  <span className="text-sm md:text-base text-success font-medium data-text">
                    {campaign?.roi}
                  </span>
                </td>
                <td className="p-3 md:p-4">
                  <div className="flex justify-center">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign?.status)}`}>
                      {campaign?.status}
                    </span>
                  </div>
                </td>
                <td className="p-3 md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignPerformanceTable;