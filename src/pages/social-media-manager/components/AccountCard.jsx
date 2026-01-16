import React from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const AccountCard = ({ account, onConnect, onDisconnect, onSettings }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'bg-success/10 text-success border-success/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle2';
      case 'error':
        return 'AlertCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'linkedin':
        return 'Linkedin';
      case 'facebook':
        return 'Facebook';
      case 'twitter':
        return 'Twitter';
      default:
        return 'Share2';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm hover:shadow-elevation-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center ${account?.status === 'connected' ? 'bg-primary/10' : 'bg-muted'}`}>
            <Icon 
              name={getPlatformIcon(account?.platform)} 
              size={24} 
              color={account?.status === 'connected' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base md:text-lg text-foreground">
              {account?.platform}
            </h3>
            <p className="text-sm text-muted-foreground">{account?.accountName || 'Not connected'}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border text-xs md:text-sm font-medium ${getStatusColor(account?.status)}`}>
          <div className="flex items-center gap-1.5">
            <Icon name={getStatusIcon(account?.status)} size={14} />
            <span className="capitalize">{account?.status}</span>
          </div>
        </div>
      </div>
      {account?.status === 'connected' && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Followers</span>
            <span className="font-medium text-foreground">{account?.followers?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Posts This Month</span>
            <span className="font-medium text-foreground">{account?.postsThisMonth}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Engagement Rate</span>
            <span className="font-medium text-success">{account?.engagementRate}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Post</span>
            <span className="font-medium text-foreground">{account?.lastPost}</span>
          </div>
        </div>
      )}
      {account?.status === 'error' && (
        <div className="mb-4 p-3 bg-error/5 border border-error/20 rounded-lg">
          <p className="text-sm text-error">{account?.errorMessage}</p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        {account?.status === 'connected' ? (
          <>
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              onClick={() => onSettings(account)}
              className="flex-1"
            >
              Settings
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Unplug"
              iconPosition="left"
              onClick={() => onDisconnect(account)}
              className="flex-1"
            >
              Disconnect
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            iconName="Link"
            iconPosition="left"
            onClick={() => onConnect(account)}
            fullWidth
          >
            Connect Account
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountCard;