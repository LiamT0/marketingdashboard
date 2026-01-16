import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LeadTableRow = ({ lead, onStatusUpdate, onSendEmail, onScheduleMeeting }) => {
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
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <tr className="border-b border-border hover:bg-muted/50 transition-smooth">
        <td className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8"
          >
            <Icon name={expanded ? 'ChevronDown' : 'ChevronRight'} size={16} />
          </Button>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <Image
              src={lead?.avatar}
              alt={lead?.avatarAlt}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-foreground text-sm md:text-base">
                {lead?.name}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {lead?.company}
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 hidden lg:table-cell">
          <p className="text-sm text-foreground">{lead?.email}</p>
          <p className="text-xs text-muted-foreground">{lead?.phone}</p>
        </td>
        <td className="p-4 hidden md:table-cell">
          <div className="flex items-center gap-2">
            <Icon name={lead?.sourceIcon} size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{lead?.source}</span>
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <div className={`w-12 h-12 rounded-lg bg-${getQualificationColor(lead?.qualification)}/10 flex items-center justify-center`}>
              <span className={`text-lg font-bold text-${getQualificationColor(lead?.qualification)}`}>
                {lead?.score}
              </span>
            </div>
            <span className={`text-xs font-medium text-${getQualificationColor(lead?.qualification)} hidden sm:inline`}>
              {lead?.qualification?.charAt(0)?.toUpperCase() + lead?.qualification?.slice(1)}
            </span>
          </div>
        </td>
        <td className="p-4 hidden xl:table-cell">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-${getStageColor(lead?.stage)}/10 text-xs font-medium text-${getStageColor(lead?.stage)}`}>
            <div className={`w-1.5 h-1.5 rounded-full bg-${getStageColor(lead?.stage)}`} />
            {lead?.stage?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ')}
          </span>
        </td>
        <td className="p-4 hidden lg:table-cell">
          <p className="text-sm text-foreground">{formatDate(lead?.lastContact)}</p>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSendEmail(lead?.id)}
              className="w-8 h-8"
            >
              <Icon name="Mail" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onScheduleMeeting(lead?.id)}
              className="w-8 h-8"
            >
              <Icon name="Calendar" size={16} />
            </Button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-border bg-muted/30">
          <td colSpan="8" className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm text-foreground">{lead?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <p className="text-sm text-foreground">{lead?.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Source</p>
                  <p className="text-sm text-foreground">{lead?.source}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Interaction History</p>
                <div className="space-y-2">
                  {lead?.interactions?.map((interaction, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-card rounded-lg">
                      <div className={`w-8 h-8 rounded-full bg-${interaction?.type === 'email' ? 'primary' : interaction?.type === 'call' ? 'success' : 'accent'}/10 flex items-center justify-center flex-shrink-0`}>
                        <Icon 
                          name={interaction?.type === 'email' ? 'Mail' : interaction?.type === 'call' ? 'Phone' : 'MessageSquare'} 
                          size={14} 
                          color={`var(--color-${interaction?.type === 'email' ? 'primary' : interaction?.type === 'call' ? 'success' : 'accent'})`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{interaction?.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(interaction?.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">AI Recommendations</p>
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Sparkles" size={20} color="var(--color-accent)" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Next Best Action
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lead?.aiRecommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {lead?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary"
                  >
                    <Icon name="Tag" size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default LeadTableRow;