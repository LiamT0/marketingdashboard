import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightCard = ({ title, description, type, priority, actionLabel, onAction }) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'optimization':
        return {
          icon: 'Lightbulb',
          color: 'accent',
          bgColor: 'bg-accent/10'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          color: 'warning',
          bgColor: 'bg-warning/10'
        };
      case 'success':
        return {
          icon: 'CheckCircle',
          color: 'success',
          bgColor: 'bg-success/10'
        };
      default:
        return {
          icon: 'Info',
          color: 'primary',
          bgColor: 'bg-primary/10'
        };
    }
  };

  const getPriorityBadge = () => {
    const colors = {
      high: 'bg-error/10 text-error',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-muted text-muted-foreground'
    };
    return colors?.[priority] || colors?.low;
  };

  const config = getTypeConfig();

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm hover:shadow-elevation-md transition-smooth">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${config?.bgColor}`}>
          <Icon name={config?.icon} size={20} color={`var(--color-${config?.color})`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-heading font-semibold text-sm md:text-base text-foreground">
              {title}
            </h4>
            {priority && (
              <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${getPriorityBadge()}`}>
                {priority?.charAt(0)?.toUpperCase() + priority?.slice(1)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>
          {actionLabel && (
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;