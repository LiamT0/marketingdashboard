import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduledPosts = ({ posts }) => {
  const formatScheduleTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    const timeStr = date?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    if (date?.toDateString() === today?.toDateString()) {
      return `Today at ${timeStr}`;
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return `Tomorrow at ${timeStr}`;
    } else {
      return `${date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${timeStr}`;
    }
  };

  const getPlatformIcon = (platform) => {
    const iconMap = {
      linkedin: 'Linkedin',
      facebook: 'Facebook',
      twitter: 'Twitter'
    };
    return iconMap?.[platform] || 'Share2';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm">
      <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">Scheduled Posts</h2>
        <Button variant="ghost" size="sm" iconName="Calendar">
          View All
        </Button>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {posts?.map((post) => (
          <div key={post?.id} className="p-4 md:p-6 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10">
                <Icon name={getPlatformIcon(post?.platform)} size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-foreground font-medium mb-1 line-clamp-2">{post?.content}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    {formatScheduleTime(post?.scheduledTime)}
                  </span>
                  <span className="capitalize">{post?.platform}</span>
                </div>
                {post?.status === 'pending' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                    <Icon name="Clock" size={12} />
                    Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledPosts;