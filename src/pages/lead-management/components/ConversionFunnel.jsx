import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversionFunnel = ({ data }) => {
  const stages = [
    { key: 'new', label: 'New Leads', icon: 'UserPlus', color: 'primary' },
    { key: 'contacted', label: 'Contacted', icon: 'MessageSquare', color: 'accent' },
    { key: 'qualified', label: 'Qualified', icon: 'CheckCircle', color: 'success' },
    { key: 'proposal', label: 'Proposal', icon: 'FileText', color: 'warning' },
    { key: 'closed', label: 'Closed Won', icon: 'Trophy', color: 'success' }
  ];

  const getConversionRate = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return Math.round((current / previous) * 100);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
        <h3 className="font-heading font-semibold text-foreground text-base md:text-lg">
          Conversion Funnel
        </h3>
      </div>
      <div className="space-y-4">
        {stages?.map((stage, index) => {
          const count = data?.[stage?.key] || 0;
          const previousCount = index > 0 ? data?.[stages?.[index - 1]?.key] : null;
          const conversionRate = getConversionRate(count, previousCount);
          const maxCount = Math.max(...Object.values(data));
          const widthPercentage = (count / maxCount) * 100;

          return (
            <div key={stage?.key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-${stage?.color}/10 flex items-center justify-center`}>
                    <Icon name={stage?.icon} size={16} color={`var(--color-${stage?.color})`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {stage?.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {index > 0 && (
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {conversionRate}% conversion
                    </span>
                  )}
                  <span className="text-sm font-semibold text-foreground">
                    {count}
                  </span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-${stage?.color} transition-smooth`}
                  style={{ width: `${widthPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Total Leads</p>
          <p className="text-lg md:text-xl font-bold text-foreground">
            {Object.values(data)?.reduce((a, b) => a + b, 0)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Conversion Rate</p>
          <p className="text-lg md:text-xl font-bold text-success">
            {getConversionRate(data?.closed, data?.new)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Avg. Time</p>
          <p className="text-lg md:text-xl font-bold text-foreground">14 days</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
          <p className="text-lg md:text-xl font-bold text-accent">68%</p>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnel;