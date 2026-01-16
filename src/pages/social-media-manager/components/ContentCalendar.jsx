import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentCalendar = ({ scheduledPosts, onReschedule, onEdit, onDelete }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'linkedin':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'facebook':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'twitter':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Clock';
      case 'published':
        return 'CheckCircle2';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const groupPostsByDate = () => {
    const grouped = {};
    scheduledPosts?.forEach(post => {
      const date = new Date(post.scheduledTime)?.toDateString();
      if (!grouped?.[date]) {
        grouped[date] = [];
      }
      grouped?.[date]?.push(post);
    });
    return grouped;
  };

  const groupedPosts = groupPostsByDate();

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-semibold text-lg md:text-xl text-foreground">
              Content Calendar
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {scheduledPosts?.length} posts scheduled
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="space-y-6">
          {Object.entries(groupedPosts)?.map(([date, posts]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <h3 className="font-heading font-semibold text-sm md:text-base text-foreground">
                  {new Date(date)?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
              </div>
              <div className="space-y-3">
                {posts?.map((post) => (
                  <div
                    key={post?.id}
                    className="bg-muted/30 border border-border rounded-lg p-4 hover:shadow-elevation-sm transition-smooth"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {post?.platforms?.map((platform) => (
                          <span
                            key={platform}
                            className={`px-2 py-1 rounded text-xs font-medium border ${getPlatformColor(platform)}`}
                          >
                            {platform}
                          </span>
                        ))}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Icon name={getStatusIcon(post?.status)} size={14} />
                          {post?.status}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(post?.scheduledTime)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2 mb-3">
                      {post?.content}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Edit"
                        iconPosition="left"
                        onClick={() => onEdit(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Calendar"
                        iconPosition="left"
                        onClick={() => onReschedule(post)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Trash2"
                        iconPosition="left"
                        onClick={() => onDelete(post)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;