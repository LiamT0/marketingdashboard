import React from 'react';
import Icon from '../../../components/AppIcon';

const LeadScoreCard = ({ score, trend, description }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Hot Lead';
    if (score >= 60) return 'Warm Lead';
    if (score >= 40) return 'Cold Lead';
    return 'Unqualified';
  };

  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Lead Score</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl md:text-4xl font-bold text-${scoreColor}`}>
              {score}
            </span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full bg-${scoreColor}/10`}>
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
            size={14} 
            color={`var(--color-${scoreColor})`}
          />
          <span className={`text-xs font-medium text-${scoreColor}`}>
            {trend === 'up' ? '+5' : trend === 'down' ? '-3' : '0'}
          </span>
        </div>
      </div>

      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${scoreColor}/10 mb-3`}>
        <div className={`w-2 h-2 rounded-full bg-${scoreColor}`} />
        <span className={`text-sm font-medium text-${scoreColor}`}>
          {scoreLabel}
        </span>
      </div>

      <p className="text-sm text-muted-foreground">
        {description}
      </p>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Engagement</span>
            <span className="font-medium text-foreground">High</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Response Rate</span>
            <span className="font-medium text-foreground">85%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Activity</span>
            <span className="font-medium text-foreground">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadScoreCard;