import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SchedulingPanel = ({ onSchedule, onPostNow }) => {
  const [scheduleType, setScheduleType] = useState('optimal');
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [autoRepost, setAutoRepost] = useState(false);

  const scheduleOptions = [
    { value: 'optimal', label: 'Optimal Time', description: 'AI-recommended best posting time' },
    { value: 'custom', label: 'Custom Schedule', description: 'Choose your own date and time' },
    { value: 'immediate', label: 'Post Immediately', description: 'Publish right now' }
  ];

  const optimalTimes = [
    { day: 'Tuesday', time: '9:00 AM EST', engagement: 'High', reason: 'Peak professional browsing time' },
    { day: 'Wednesday', time: '11:00 AM EST', engagement: 'High', reason: 'Mid-week engagement peak' },
    { day: 'Thursday', time: '2:00 PM EST', engagement: 'Medium', reason: 'Afternoon activity window' }
  ];

  const handleSchedule = () => {
    if (scheduleType === 'immediate') {
      onPostNow();
    } else if (scheduleType === 'optimal') {
      onSchedule({ type: 'optimal', time: optimalTimes?.[0] });
    } else if (scheduleType === 'custom' && customDate && customTime) {
      onSchedule({ type: 'custom', date: customDate, time: customTime });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground text-base md:text-lg">Schedule Post</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Choose when to publish your content</p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <Select
          label="Scheduling Option"
          description="Select how you want to schedule this post"
          options={scheduleOptions}
          value={scheduleType}
          onChange={setScheduleType}
          required
        />

        {scheduleType === 'optimal' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Recommended Times</p>
            {optimalTimes?.map((time, index) => (
              <div
                key={index}
                className={`bg-muted/50 rounded-lg p-3 border-2 transition-smooth cursor-pointer ${
                  index === 0 ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{time?.day}, {time?.time}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        time?.engagement === 'High' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
                      }`}>
                        {time?.engagement}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{time?.reason}</p>
                  </div>
                  {index === 0 && (
                    <Icon name="CheckCircle2" size={20} color="var(--color-primary)" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {scheduleType === 'custom' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e?.target?.value)}
              required
            />
            <Input
              label="Time"
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e?.target?.value)}
              required
            />
          </div>
        )}

        {scheduleType === 'immediate' && (
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 md:p-4">
            <div className="flex items-start gap-2">
              <Icon name="AlertCircle" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs md:text-sm font-medium text-foreground mb-1">Immediate Posting</p>
                <p className="text-xs text-muted-foreground">
                  Your post will be published immediately. Current time may not be optimal for engagement.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <Checkbox
            label="Enable Auto-Repost"
            description="Automatically repost this content after 30 days for extended reach"
            checked={autoRepost}
            onChange={(e) => setAutoRepost(e?.target?.checked)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="default"
            size="default"
            iconName="Send"
            onClick={handleSchedule}
            disabled={scheduleType === 'custom' && (!customDate || !customTime)}
            fullWidth
          >
            {scheduleType === 'immediate' ? 'Post Now' : 'Schedule Post'}
          </Button>
          <Button
            variant="outline"
            size="default"
            iconName="Save"
            fullWidth
          >
            Save as Draft
          </Button>
        </div>

        <div className="bg-success/5 border border-success/20 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs md:text-sm font-medium text-foreground mb-1">Scheduling Benefits</p>
              <p className="text-xs text-muted-foreground">
                Posts scheduled at optimal times see 45% higher engagement and 30% more lead generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingPanel;