import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NurturingWorkflows = ({ workflows, onAssignWorkflow }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      paused: 'warning',
      completed: 'primary',
      draft: 'muted'
    };
    return colors?.[status] || 'muted';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Workflow" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-foreground text-base md:text-lg">
            Automated Workflows
          </h3>
        </div>
        <Button variant="outline" size="sm" iconName="Plus">
          New Workflow
        </Button>
      </div>
      <div className="space-y-4">
        {workflows?.map((workflow) => (
          <div
            key={workflow?.id}
            className="border border-border rounded-lg p-4 hover:shadow-elevation-sm transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-foreground text-sm md:text-base">
                    {workflow?.name}
                  </h4>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-${getStatusColor(workflow?.status)}/10 text-xs font-medium text-${getStatusColor(workflow?.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-${getStatusColor(workflow?.status)}`} />
                    {workflow?.status?.charAt(0)?.toUpperCase() + workflow?.status?.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {workflow?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Enrolled</p>
                <p className="text-sm font-semibold text-foreground">
                  {workflow?.enrolled}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Completed</p>
                <p className="text-sm font-semibold text-success">
                  {workflow?.completed}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Conversion</p>
                <p className="text-sm font-semibold text-accent">
                  {workflow?.conversionRate}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg. Duration</p>
                <p className="text-sm font-semibold text-foreground">
                  {workflow?.avgDuration}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="UserPlus"
                onClick={() => onAssignWorkflow(workflow?.id)}
              >
                Assign Leads
              </Button>
              <Button variant="ghost" size="sm" iconName="Settings">
                Configure
              </Button>
              <Button variant="ghost" size="sm" iconName="BarChart3">
                Analytics
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NurturingWorkflows;