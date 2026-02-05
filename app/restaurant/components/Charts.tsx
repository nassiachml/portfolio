"use client";

import { motion } from "framer-motion";

interface SimpleChartData {
  name: string;
  value: number;
}

interface ChartData {
  labels: string[];
  values: number[];
  colors?: string[];
}

type ChartDataInput = SimpleChartData[] | ChartData;

export function BarChart({ data, title }: { data: ChartDataInput; title?: string }) {
  // Normaliser les données
  let normalizedData: { labels: string[]; values: number[] };
  
  if (Array.isArray(data)) {
    if (data.length > 0 && 'name' in data[0] && 'value' in data[0]) {
      // Format simple: { name, value }[]
      normalizedData = {
        labels: (data as SimpleChartData[]).map(d => d.name),
        values: (data as SimpleChartData[]).map(d => d.value),
      };
    } else {
      // Tableau vide ou format inconnu
      normalizedData = { labels: [], values: [] };
    }
  } else {
    // Format ChartData: { labels, values }
    normalizedData = data as ChartData;
  }
  
  // S'assurer que values est un tableau
  if (!Array.isArray(normalizedData.values)) {
    normalizedData.values = [];
  }
  if (!Array.isArray(normalizedData.labels)) {
    normalizedData.labels = [];
  }
  
  const maxValue = normalizedData.values.length > 0 ? Math.max(...normalizedData.values, 1) : 1;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
      {title && <h3 className="text-xl font-bold text-red-900 mb-4">{title}</h3>}
      <div className="space-y-3">
        {normalizedData.labels.map((label, index) => {
          const percentage = (normalizedData.values[index] / maxValue) * 100;
          const color = "bg-red-600";
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="font-bold text-red-800">{normalizedData.values[index]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-full ${color} rounded-full`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LineChart({ data, title }: { data: ChartDataInput; title?: string }) {
  // Normaliser les données
  let normalizedData: { labels: string[]; values: number[] };
  
  if (Array.isArray(data)) {
    if (data.length > 0 && 'name' in data[0] && 'value' in data[0]) {
      // Format simple: { name, value }[]
      normalizedData = {
        labels: (data as SimpleChartData[]).map(d => d.name),
        values: (data as SimpleChartData[]).map(d => d.value),
      };
    } else {
      // Tableau vide ou format inconnu
      normalizedData = { labels: [], values: [] };
    }
  } else {
    // Format ChartData: { labels, values }
    normalizedData = data as ChartData;
  }
  
  // S'assurer que values est un tableau
  if (!Array.isArray(normalizedData.values)) {
    normalizedData.values = [];
  }
  if (!Array.isArray(normalizedData.labels)) {
    normalizedData.labels = [];
  }
  
  if (normalizedData.values.length < 2) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
        {title && <h3 className="text-xl font-bold text-red-900 mb-4">{title}</h3>}
        <p className="text-center text-gray-500">Pas assez de données pour un graphique linéaire.</p>
      </div>
    );
  }
  
  const maxValue = Math.max(...normalizedData.values, 1);
  const points = normalizedData.values.map((value, index) => ({
    x: (index / (normalizedData.values.length - 1 || 1)) * 100,
    y: 100 - (value / maxValue) * 100,
    value,
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
      {title && <h3 className="text-xl font-bold text-red-900 mb-4">{title}</h3>}
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points.map(p => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
          />
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#dc2626"
            />
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
          {normalizedData.labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PieChart({ data, title }: { data: ChartDataInput; title?: string }) {
  // Normaliser les données
  let normalizedData: { labels: string[]; values: number[]; colors?: string[] };
  
  if (Array.isArray(data)) {
    if (data.length > 0 && 'name' in data[0] && 'value' in data[0]) {
      // Format simple: { name, value }[]
      normalizedData = {
        labels: (data as SimpleChartData[]).map(d => d.name),
        values: (data as SimpleChartData[]).map(d => d.value),
      };
    } else {
      // Tableau vide ou format inconnu
      normalizedData = { labels: [], values: [] };
    }
  } else {
    // Format ChartData: { labels, values }
    normalizedData = data as ChartData;
  }
  
  // S'assurer que values est un tableau
  if (!Array.isArray(normalizedData.values)) {
    normalizedData.values = [];
  }
  if (!Array.isArray(normalizedData.labels)) {
    normalizedData.labels = [];
  }
  
  const total = normalizedData.values.reduce((sum, val) => sum + val, 0);
  if (total === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
        {title && <h3 className="text-xl font-bold text-red-900 mb-4">{title}</h3>}
        <p className="text-center text-gray-500">Aucune donnée disponible.</p>
      </div>
    );
  }
  
  let currentAngle = 0;
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"];
  
  const segments = normalizedData.values.map((value, index) => {
    const percentage = (value / total) * 100;
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    const x1 = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180));
    const y1 = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180));
    const x2 = 50 + 40 * Math.cos((currentAngle - 90) * (Math.PI / 180));
    const y2 = 50 + 40 * Math.sin((currentAngle - 90) * (Math.PI / 180));
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return {
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: normalizedData.colors?.[index] || colors[index % colors.length],
      label: normalizedData.labels[index],
      value,
      percentage,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-100">
      {title && <h3 className="text-xl font-bold text-red-900 mb-4">{title}</h3>}
      <div className="flex items-center justify-center">
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {segments.map((segment, index) => (
              <motion.path
                key={index}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                d={segment.path}
                fill={segment.color}
                stroke="white"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>
        <div className="ml-8 space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-gray-700">{segment.label}</span>
              <span className="text-sm font-bold text-red-800">
                {segment.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

