import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onExport, onAssignWorkflow, onUpdateStatus, onClearSelection }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-modal">
      <div className="bg-primary text-primary-foreground rounded-lg shadow-elevation-xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-sm font-bold">{selectedCount}</span>
          </div>
          <span className="text-sm font-medium hidden sm:inline">
            {selectedCount === 1 ? 'lead selected' : 'leads selected'}
          </span>
        </div>

        <div className="h-6 w-px bg-primary-foreground/20" />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            onClick={onExport}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <span className="hidden md:inline">Export</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Workflow"
            onClick={onAssignWorkflow}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <span className="hidden md:inline">Assign Workflow</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={onUpdateStatus}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <span className="hidden md:inline">Update Status</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            className="text-primary-foreground hover:bg-primary-foreground/20 w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;