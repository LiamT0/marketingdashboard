import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportReportModal = ({ isOpen, onClose }) => {
  const [selectedMetrics, setSelectedMetrics] = useState([
    'leads',
    'conversions',
    'roi',
    'engagement'
  ]);
  const [format, setFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);

  const metrics = [
    { id: 'leads', label: 'Lead Generation Metrics' },
    { id: 'conversions', label: 'Conversion Rates' },
    { id: 'roi', label: 'ROI Analysis' },
    { id: 'engagement', label: 'Social Media Engagement' },
    { id: 'video', label: 'Video Ad Performance' },
    { id: 'chatbot', label: 'Chatbot Interactions' },
    { id: 'campaigns', label: 'Campaign Performance' },
    { id: 'competitors', label: 'Competitor Benchmarking' }
  ];

  const handleMetricToggle = (metricId) => {
    setSelectedMetrics(prev =>
      prev?.includes(metricId)
        ? prev?.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleExport = () => {
    console.log('Exporting report:', { selectedMetrics, format, includeCharts });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal" onClick={onClose} />
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg shadow-elevation-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Download" size={20} color="var(--color-primary)" />
              </div>
              <h2 className="font-heading font-semibold text-lg md:text-xl text-foreground">
                Export Analytics Report
              </h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-base text-foreground mb-3">
                  Select Metrics to Include
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {metrics?.map((metric) => (
                    <Checkbox
                      key={metric?.id}
                      label={metric?.label}
                      checked={selectedMetrics?.includes(metric?.id)}
                      onChange={() => handleMetricToggle(metric?.id)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-base text-foreground mb-3">
                  Export Format
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['pdf', 'excel', 'csv']?.map((formatOption) => (
                    <button
                      key={formatOption}
                      onClick={() => setFormat(formatOption)}
                      className={`p-4 rounded-lg border-2 transition-smooth ${
                        format === formatOption
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon
                        name={formatOption === 'pdf' ? 'FileText' : formatOption === 'excel' ? 'Table' : 'FileSpreadsheet'}
                        size={24}
                        color={format === formatOption ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                        className="mx-auto mb-2"
                      />
                      <span className={`text-sm font-medium ${
                        format === formatOption ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {formatOption?.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-base text-foreground mb-3">
                  Additional Options
                </h3>
                <div className="space-y-3">
                  <Checkbox
                    label="Include charts and visualizations"
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e?.target?.checked)}
                  />
                  <Checkbox
                    label="Include raw data tables"
                    checked
                    onChange={() => {}}
                  />
                  <Checkbox
                    label="Include executive summary"
                    checked
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 p-4 md:p-6 border-t border-border">
            <Button variant="outline" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              fullWidth
              iconName="Download"
              iconPosition="left"
              onClick={handleExport}
              disabled={selectedMetrics?.length === 0}
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportReportModal;