import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      post: 'FileText',
      lead: 'Users',
      chat: 'MessageSquare',
      video: 'Video',
      campaign: 'Target'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      post: 'primary',
      lead: 'success',
      chat: 'accent',
      video: 'secondary',
      campaign: 'warning'
    };
    return colorMap?.[type] || 'muted';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now - activityTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm">
      <div className="p-4 md:p-6 border-b border-border">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">Recent Activity</h2>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 md:p-6 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start gap-3 md:gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-${getActivityColor(activity?.type)}/10`}>
                <Icon name={getActivityIcon(activity?.type)} size={20} color={`var(--color-${getActivityColor(activity?.type)})`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-foreground font-medium mb-1">{activity?.title}</p>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">{activity?.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatTimestamp(activity?.timestamp)}</span>
                  {activity?.engagement && (
                    <span className="flex items-center gap-1">
                      <Icon name="Heart" size={12} />
                      {activity?.engagement}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;