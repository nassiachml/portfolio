"use client";

import { motion } from "framer-motion";

interface PriceSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  pricePerUnit?: number;
  onChange: (value: number) => void;
}

export default function PriceSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  pricePerUnit,
  onChange,
}: PriceSliderProps) {
  const totalPrice = pricePerUnit ? value * pricePerUnit : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-bordeaux-400">
            {value} {unit}
          </span>
          {pricePerUnit && (
            <span className="text-sm text-gray-400">
              (+{totalPrice.toLocaleString("fr-FR")} €)
            </span>
          )}
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, rgb(139, 74, 74) 0%, rgb(139, 74, 74) ${
              ((value - min) / (max - min)) * 100
            }%, rgb(42, 42, 42) ${
              ((value - min) / (max - min)) * 100
            }%, rgb(42, 42, 42) 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
}
