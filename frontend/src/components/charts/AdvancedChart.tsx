import React from 'react';

// Advanced Chart Data Types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: any;
}

export interface TimeSeriesDataPoint {
  date: Date;
  value: number;
  label?: string;
}

export interface MultiSeriesDataPoint {
  label: string;
  values: { [key: string]: number };
}

// Line Chart Component
interface LineChartProps {
  data: TimeSeriesDataPoint[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  showDots?: boolean;
  showGrid?: boolean;
  animated?: boolean;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 400,
  height = 200,
  color = '#3b82f6',
  strokeWidth = 2,
  showDots = true,
  showGrid = true,
  animated = true,
  className = ''
}) => {
  if (!data.length) return null;

  const padding = 20;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  // Calculate min/max values
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;

  // Generate path
  const pathData = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + ((maxValue - point.value) / valueRange) * chartHeight;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className={`inline-block ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {showGrid && (
          <g className="opacity-20">
            {/* Horizontal lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padding + ratio * chartHeight;
              return (
                <line
                  key={`h-${i}`}
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={0.5}
                />
              );
            })}
            {/* Vertical lines */}
            {data.map((_, i) => {
              if (i % Math.ceil(data.length / 5) !== 0) return null;
              const x = padding + (i / (data.length - 1)) * chartWidth;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1={padding}
                  x2={x}
                  y2={height - padding}
                  stroke="currentColor"
                  strokeWidth={0.5}
                />
              );
            })}
          </g>
        )}

        {/* Line path */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-draw-line' : ''}
        />

        {/* Data points */}
        {showDots && data.map((point, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          const y = padding + ((maxValue - point.value) / valueRange) * chartHeight;
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={3}
              fill={color}
              className="hover:r-4 transition-all cursor-pointer"
            >
              <title>{`${point.label || point.date.toLocaleDateString()}: ${point.value}`}</title>
            </circle>
          );
        })}
      </svg>
    </div>
  );
};

// Bar Chart Component
interface BarChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  color?: string;
  showValues?: boolean;
  animated?: boolean;
  horizontal?: boolean;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 400,
  height = 200,
  color = '#3b82f6',
  showValues = true,
  animated = true,
  horizontal = false,
  className = ''
}) => {
  if (!data.length) return null;

  const padding = 20;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  const maxValue = Math.max(...data.map(d => d.value));
  const barSpacing = 4;
  const barWidth = horizontal 
    ? chartHeight / data.length - barSpacing
    : chartWidth / data.length - barSpacing;

  return (
    <div className={`inline-block ${className}`}>
      <svg width={width} height={height}>
        {data.map((item, index) => {
          const barLength = horizontal
            ? (item.value / maxValue) * chartWidth
            : (item.value / maxValue) * chartHeight;
          
          const x = horizontal 
            ? padding 
            : padding + index * (barWidth + barSpacing);
          const y = horizontal 
            ? padding + index * (barWidth + barSpacing)
            : padding + chartHeight - barLength;
          
          const barColor = item.color || color;

          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={horizontal ? barLength : barWidth}
                height={horizontal ? barWidth : barLength}
                fill={barColor}
                className={`${animated ? 'animate-scale-in' : ''} hover:opacity-80 transition-opacity cursor-pointer`}
                style={{
                  animationDelay: animated ? `${index * 0.1}s` : '0s'
                }}
              >
                <title>{`${item.label}: ${item.value}`}</title>
              </rect>
              
              {/* Value labels */}
              {showValues && (
                <text
                  x={horizontal ? x + barLength + 5 : x + barWidth / 2}
                  y={horizontal ? y + barWidth / 2 + 4 : y - 5}
                  textAnchor={horizontal ? 'start' : 'middle'}
                  className="text-xs fill-gray-600 font-medium"
                >
                  {item.value}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Donut Chart Component
interface DonutChartProps {
  data: ChartDataPoint[];
  size?: number;
  innerRadius?: number;
  showLabels?: boolean;
  showLegend?: boolean;
  animated?: boolean;
  className?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  innerRadius = 0.6,
  showLabels = true,
  showLegend = true,
  animated = true,
  className = ''
}) => {
  if (!data.length) return null;

  const radius = size / 2;
  const innerR = radius * innerRadius;
  const center = size / 2;
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start from top

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1'
  ];

  return (
    <div className={`inline-flex items-center space-x-4 ${className}`}>
      <div className="relative">
        <svg width={size} height={size}>
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (item.value / total) * 360;
            const color = item.color || colors[index % colors.length];
            
            // Calculate path for donut segment
            const startAngle = (currentAngle * Math.PI) / 180;
            const endAngle = ((currentAngle + angle) * Math.PI) / 180;
            
            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);
            
            const x3 = center + innerR * Math.cos(endAngle);
            const y3 = center + innerR * Math.sin(endAngle);
            const x4 = center + innerR * Math.cos(startAngle);
            const y4 = center + innerR * Math.sin(startAngle);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `L ${x3} ${y3}`,
              `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={color}
                className={`${animated ? 'animate-scale-in' : ''} hover:opacity-80 transition-opacity cursor-pointer`}
                style={{
                  animationDelay: animated ? `${index * 0.1}s` : '0s'
                }}
              >
                <title>{`${item.label}: ${item.value} (${percentage.toFixed(1)}%)`}</title>
              </path>
            );
          })}
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      {showLegend && (
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-700">{item.label}</span>
              {showLabels && (
                <span className="text-sm text-gray-500">({item.value})</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Heatmap Component
interface HeatmapProps {
  data: Array<{ x: string; y: string; value: number }>;
  width?: number;
  height?: number;
  cellSize?: number;
  colorScale?: [string, string];
  showValues?: boolean;
  className?: string;
}

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  width = 400,
  height = 200,
  cellSize = 20,
  colorScale = ['#f3f4f6', '#3b82f6'],
  showValues = false,
  className = ''
}) => {
  if (!data.length) return null;

  const xLabels = [...new Set(data.map(d => d.x))];
  const yLabels = [...new Set(data.map(d => d.y))];
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));

  const getColor = (value: number) => {
    const intensity = (value - minValue) / (maxValue - minValue);
    // Simple linear interpolation between two colors
    const r1 = parseInt(colorScale[0].slice(1, 3), 16);
    const g1 = parseInt(colorScale[0].slice(3, 5), 16);
    const b1 = parseInt(colorScale[0].slice(5, 7), 16);
    const r2 = parseInt(colorScale[1].slice(1, 3), 16);
    const g2 = parseInt(colorScale[1].slice(3, 5), 16);
    const b2 = parseInt(colorScale[1].slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * intensity);
    const g = Math.round(g1 + (g2 - g1) * intensity);
    const b = Math.round(b1 + (b2 - b1) * intensity);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getValue = (x: string, y: string) => {
    const point = data.find(d => d.x === x && d.y === y);
    return point ? point.value : 0;
  };

  return (
    <div className={`inline-block ${className}`}>
      <svg width={xLabels.length * cellSize + 80} height={yLabels.length * cellSize + 60}>
        {/* Y-axis labels */}
        {yLabels.map((label, yIndex) => (
          <text
            key={`y-${yIndex}`}
            x={70}
            y={yIndex * cellSize + cellSize / 2 + 15}
            textAnchor="end"
            dominantBaseline="middle"
            className="text-xs fill-gray-600"
          >
            {label}
          </text>
        ))}
        
        {/* X-axis labels */}
        {xLabels.map((label, xIndex) => (
          <text
            key={`x-${xIndex}`}
            x={80 + xIndex * cellSize + cellSize / 2}
            y={yLabels.length * cellSize + 25}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-gray-600"
          >
            {label}
          </text>
        ))}
        
        {/* Heatmap cells */}
        {yLabels.map((yLabel, yIndex) =>
          xLabels.map((xLabel, xIndex) => {
            const value = getValue(xLabel, yLabel);
            const color = getColor(value);
            
            return (
              <g key={`${xIndex}-${yIndex}`}>
                <rect
                  x={80 + xIndex * cellSize}
                  y={10 + yIndex * cellSize}
                  width={cellSize - 1}
                  height={cellSize - 1}
                  fill={color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <title>{`${xLabel} - ${yLabel}: ${value}`}</title>
                </rect>
                {showValues && value > 0 && (
                  <text
                    x={80 + xIndex * cellSize + cellSize / 2}
                    y={10 + yIndex * cellSize + cellSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-white font-medium"
                  >
                    {value}
                  </text>
                )}
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
};

export default LineChart;