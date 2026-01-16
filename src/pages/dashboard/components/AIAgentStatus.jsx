import React from 'react';
import Icon from '../../../components/AppIcon';

const AIAgentStatus = ({ agents }) => {
  const getStatusColor = (status) => {
    const colorMap = {
      active: 'success',
      idle: 'warning',
      error: 'error',
      processing: 'accent'
    };
    return colorMap?.[status] || 'muted';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      active: 'CheckCircle2',
      idle: 'Clock',
      error: 'AlertCircle',
      processing: 'Loader2'
    };
    return iconMap?.[status] || 'Circle';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm">
      <div className="p-4 md:p-6 border-b border-border">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">AI Agent Status</h2>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        {agents?.map((agent) => (
          <div key={agent?.id} className="flex items-center justify-between p-3 md:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-${getStatusColor(agent?.status)}/10`}>
                <Icon 
                  name={getStatusIcon(agent?.status)} 
                  size={18} 
                  color={`var(--color-${getStatusColor(agent?.status)})`}
                  className={agent?.status === 'processing' ? 'animate-spin' : ''}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium text-foreground truncate">{agent?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{agent?.task}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className={`text-xs font-medium capitalize text-${getStatusColor(agent?.status)}`}>
                {agent?.status}
              </span>
              {agent?.progress !== undefined && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {agent?.progress}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIAgentStatus;