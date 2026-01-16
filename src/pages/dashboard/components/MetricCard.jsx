import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor, trend }) => {
  const getTrendIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm hover:shadow-elevation-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-${iconColor}/10`}>
          <Icon name={icon} size={20} color={`var(--color-${iconColor})`} className="md:w-6 md:h-6" />
        </div>
        <div className={`flex items-center gap-1 ${getChangeColor()}`}>
          <Icon name={getTrendIcon()} size={16} />
          <span className="text-xs md:text-sm font-medium">{change}</span>
        </div>
      </div>
      <h3 className="text-xs md:text-sm text-muted-foreground mb-1">{title}</h3>
      <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">{value}</p>
      {trend && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;