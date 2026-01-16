import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceChart = ({ data, type = 'line', title, dataKey1, dataKey2, label1, label2 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-md">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              <span style={{ color: entry?.color }}>{entry?.name}: </span>
              <span className="font-medium">{entry?.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">{title}</h2>
      <div className="w-full h-64 md:h-80" aria-label={title}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)" 
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey={dataKey1} 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name={label1}
                dot={{ fill: 'var(--color-primary)', r: 4 }}
                activeDot={{ r: 6 }}
              />
              {dataKey2 && (
                <Line 
                  type="monotone" 
                  dataKey={dataKey2} 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  name={label2}
                  dot={{ fill: 'var(--color-accent)', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)" 
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="square"
              />
              <Bar 
                dataKey={dataKey1} 
                fill="var(--color-primary)" 
                name={label1}
                radius={[4, 4, 0, 0]}
              />
              {dataKey2 && (
                <Bar 
                  dataKey={dataKey2} 
                  fill="var(--color-accent)" 
                  name={label2}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;