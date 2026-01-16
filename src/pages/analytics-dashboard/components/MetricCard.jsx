import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm hover:shadow-elevation-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-${iconColor}/10`}>
          <Icon name={icon} size={20} color={`var(--color-${iconColor})`} />
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
            <span className={`text-xs md:text-sm font-medium ${getChangeColor()}`}>
              {change}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-xs md:text-sm text-muted-foreground mb-1">{title}</h3>
      <p className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
        {value}
      </p>
    </div>
  );
};

export default MetricCard;