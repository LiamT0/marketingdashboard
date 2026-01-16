import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceMetrics = ({ metrics, platformComparison, engagementTrends }) => {
  const COLORS = ['#1E3A5F', '#2D5A87', '#F59E0B', '#10B981'];

  const MetricCard = ({ title, value, change, icon, color }) => (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-${color}/10`}>
          <Icon name={icon} size={20} color={`var(--color-${color})`} />
        </div>
        {change && (
          <span className={`text-xs md:text-sm font-medium ${change >= 0 ? 'text-success' : 'text-error'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <h3 className="text-xs md:text-sm text-muted-foreground mb-1">{title}</h3>
      <p className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
        {typeof value === 'number' ? value?.toLocaleString() : value}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics?.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
          <h3 className="font-heading font-semibold text-base md:text-lg text-foreground mb-4">
            Platform Performance Comparison
          </h3>
          <div className="w-full h-64 md:h-80" aria-label="Platform Performance Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="platform" 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="engagement" fill="#1E3A5F" name="Engagement" />
                <Bar dataKey="reach" fill="#F59E0B" name="Reach" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
          <h3 className="font-heading font-semibold text-base md:text-lg text-foreground mb-4">
            Engagement Trends (Last 30 Days)
          </h3>
          <div className="w-full h-64 md:h-80" aria-label="Engagement Trends Line Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="likes" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Likes"
                />
                <Line 
                  type="monotone" 
                  dataKey="comments" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Comments"
                />
                <Line 
                  type="monotone" 
                  dataKey="shares" 
                  stroke="#1E3A5F" 
                  strokeWidth={2}
                  name="Shares"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;