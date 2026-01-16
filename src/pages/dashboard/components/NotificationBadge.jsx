import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationBadge = ({ notifications }) => {
  const getNotificationIcon = (type) => {
    const iconMap = {
      lead: 'UserPlus',
      alert: 'AlertTriangle',
      success: 'CheckCircle2',
      info: 'Info'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      lead: 'success',
      alert: 'warning',
      success: 'success',
      info: 'primary'
    };
    return colorMap?.[type] || 'muted';
  };

  if (!notifications || notifications?.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">Notifications</h3>
        <span className="w-6 h-6 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
          {notifications?.length}
        </span>
      </div>
      <div className="space-y-3">
        {notifications?.slice(0, 3)?.map((notification) => (
          <div key={notification?.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-${getNotificationColor(notification?.type)}/10`}>
              <Icon name={getNotificationIcon(notification?.type)} size={16} color={`var(--color-${getNotificationColor(notification?.type)})`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium line-clamp-2">{notification?.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBadge;