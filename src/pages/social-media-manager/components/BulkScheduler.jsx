import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const BulkScheduler = ({ onSchedule, onCancel }) => {
  const [posts, setPosts] = useState(['']);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [timeSlots, setTimeSlots] = useState(['09:00']);

  const platformOptions = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter/X' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'twice-daily', label: 'Twice Daily' },
    { value: 'three-times-daily', label: '3 Times Daily' },
    { value: 'weekly', label: 'Weekly' }
  ];

  const addPost = () => {
    setPosts([...posts, '']);
  };

  const removePost = (index) => {
    setPosts(posts?.filter((_, i) => i !== index));
  };

  const updatePost = (index, value) => {
    const newPosts = [...posts];
    newPosts[index] = value;
    setPosts(newPosts);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, '09:00']);
  };

  const removeTimeSlot = (index) => {
    setTimeSlots(timeSlots?.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index, value) => {
    const newSlots = [...timeSlots];
    newSlots[index] = value;
    setTimeSlots(newSlots);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSchedule({
      posts: posts?.filter(p => p?.trim()),
      platforms: selectedPlatforms,
      startDate,
      frequency,
      timeSlots
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="CalendarPlus" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-lg md:text-xl text-foreground">
                Bulk Content Scheduler
              </h2>
              <p className="text-sm text-muted-foreground">
                Schedule multiple posts across platforms
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onCancel}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-base text-foreground">
              Content Posts ({posts?.length})
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={addPost}
            >
              Add Post
            </Button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {posts?.map((post, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  placeholder={`Post content ${index + 1}...`}
                  value={post}
                  onChange={(e) => updatePost(index, e?.target?.value)}
                  className="flex-1"
                />
                {posts?.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    iconName="Trash2"
                    onClick={() => removePost(index)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="font-heading font-semibold text-base text-foreground">
            Target Platforms
          </h3>
          <CheckboxGroup>
            {platformOptions?.map((platform) => (
              <Checkbox
                key={platform?.value}
                label={platform?.label}
                checked={selectedPlatforms?.includes(platform?.value)}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    setSelectedPlatforms([...selectedPlatforms, platform?.value]);
                  } else {
                    setSelectedPlatforms(selectedPlatforms?.filter(p => p !== platform?.value));
                  }
                }}
              />
            ))}
          </CheckboxGroup>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="font-heading font-semibold text-base text-foreground">
            Schedule Settings
          </h3>

          <Input
            type="date"
            label="Start Date"
            description="When to begin posting"
            value={startDate}
            onChange={(e) => setStartDate(e?.target?.value)}
            required
          />

          <Select
            label="Posting Frequency"
            description="How often to publish posts"
            options={frequencyOptions}
            value={frequency}
            onChange={setFrequency}
          />

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">
                Time Slots
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={addTimeSlot}
              >
                Add Time
              </Button>
            </div>
            <div className="space-y-2">
              {timeSlots?.map((slot, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="time"
                    value={slot}
                    onChange={(e) => updateTimeSlot(index, e?.target?.value)}
                    className="flex-1"
                  />
                  {timeSlots?.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      iconName="Trash2"
                      onClick={() => removeTimeSlot(index)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            type="submit"
            variant="default"
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
            disabled={posts?.filter(p => p?.trim())?.length === 0 || selectedPlatforms?.length === 0 || !startDate}
          >
            Schedule {posts?.filter(p => p?.trim())?.length} Posts
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BulkScheduler;