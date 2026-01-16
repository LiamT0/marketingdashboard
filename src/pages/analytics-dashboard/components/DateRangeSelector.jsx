import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangeSelector = ({ onRangeChange }) => {
  const [selectedRange, setSelectedRange] = useState('30days');
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const ranges = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleRangeSelect = (value) => {
    setSelectedRange(value);
    if (value === 'custom') {
      setIsCustomOpen(true);
    } else {
      setIsCustomOpen(false);
      onRangeChange?.(value);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2">
        {ranges?.map((range) => (
          <Button
            key={range?.value}
            variant={selectedRange === range?.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleRangeSelect(range?.value)}
            iconName={range?.value === 'custom' ? 'Calendar' : undefined}
            iconPosition="left"
          >
            {range?.label}
          </Button>
        ))}
      </div>
      {isCustomOpen && (
        <>
          <div
            className="fixed inset-0 z-dropdown"
            onClick={() => setIsCustomOpen(false)}
          />
          <div className="absolute right-0 top-12 z-dropdown bg-popover border border-border rounded-lg shadow-elevation-lg p-4 w-80">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading font-semibold text-foreground">Custom Date Range</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCustomOpen(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" fullWidth onClick={() => setIsCustomOpen(false)}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" fullWidth>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangeSelector;