import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LeadMobileCard = ({ lead, onStatusUpdate, onSendEmail, onScheduleMeeting }) => {
  const [expanded, setExpanded] = useState(false);

  const getQualificationColor = (level) => {
    const colors = {
      hot: 'error',
      warm: 'warning',
      cold: 'primary',
      unqualified: 'muted'
    };
    return colors?.[level] || 'muted';
  };

  const getStageColor = (stage) => {
    const colors = {
      new: 'primary',
      contacted: 'accent',
      qualified: 'success',
      proposal: 'warning',
      negotiation: 'accent',
      'closed-won': 'success',
      'closed-lost': 'error'
    };
    return colors?.[stage] || 'muted';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Image
            src={lead?.avatar}
            alt={lead?.avatarAlt}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground text-sm truncate">
              {lead?.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {lead?.company}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Icon name={lead?.sourceIcon} size={12} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground">{lead?.source}</span>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-lg bg-${getQualificationColor(lead?.qualification)}/10 flex items-center justify-center flex-shrink-0`}>
            <span className={`text-sm font-bold text-${getQualificationColor(lead?.qualification)}`}>
              {lead?.score}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-${getStageColor(lead?.stage)}/10 text-xs font-medium text-${getStageColor(lead?.stage)}`}>
            <div className={`w-1.5 h-1.5 rounded-full bg-${getStageColor(lead?.stage)}`} />
            {lead?.stage?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ')}
          </span>
          <span className="text-xs text-muted-foreground">
            Last contact: {formatDate(lead?.lastContact)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            onClick={() => onSendEmail(lead?.id)}
            fullWidth
          >
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            onClick={() => onScheduleMeeting(lead?.id)}
            fullWidth
          >
            Schedule
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 flex-shrink-0"
          >
            <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-border p-4 bg-muted/30 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Contact</p>
            <p className="text-sm text-foreground">{lead?.email}</p>
            <p className="text-sm text-foreground">{lead?.phone}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Recent Interactions</p>
            <div className="space-y-2">
              {lead?.interactions?.slice(0, 2)?.map((interaction, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-card rounded">
                  <Icon 
                    name={interaction?.type === 'email' ? 'Mail' : interaction?.type === 'call' ? 'Phone' : 'MessageSquare'} 
                    size={14} 
                    color="var(--color-muted-foreground)"
                    className="flex-shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground line-clamp-2">
                      {interaction?.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(interaction?.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">AI Recommendation</p>
            <div className="bg-accent/10 border border-accent/20 rounded p-3">
              <div className="flex items-start gap-2">
                <Icon name="Sparkles" size={16} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
                <p className="text-xs text-foreground">
                  {lead?.aiRecommendation}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {lead?.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-xs font-medium text-primary"
              >
                <Icon name="Tag" size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadMobileCard;