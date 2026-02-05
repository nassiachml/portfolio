"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeftRight, 
  Calculator,
  Ruler,
  Weight,
  Thermometer,
  Clock,
  Zap,
  Globe
} from "lucide-react";

type ConversionCategory = "length" | "weight" | "temperature" | "time" | "energy" | "volume";

interface ConversionUnit {
  name: string;
  symbol: string;
  toBase: number; // Conversion factor to base unit
}

const conversions: Record<ConversionCategory, { units: ConversionUnit[]; baseUnit: string }> = {
  length: {
    baseUnit: "meter",
    units: [
      { name: "Millimeter", symbol: "mm", toBase: 0.001 },
      { name: "Centimeter", symbol: "cm", toBase: 0.01 },
      { name: "Meter", symbol: "m", toBase: 1 },
      { name: "Kilometer", symbol: "km", toBase: 1000 },
      { name: "Inch", symbol: "in", toBase: 0.0254 },
      { name: "Foot", symbol: "ft", toBase: 0.3048 },
      { name: "Yard", symbol: "yd", toBase: 0.9144 },
      { name: "Mile", symbol: "mi", toBase: 1609.34 },
    ],
  },
  weight: {
    baseUnit: "kilogram",
    units: [
      { name: "Milligram", symbol: "mg", toBase: 0.000001 },
      { name: "Gram", symbol: "g", toBase: 0.001 },
      { name: "Kilogram", symbol: "kg", toBase: 1 },
      { name: "Ton", symbol: "t", toBase: 1000 },
      { name: "Ounce", symbol: "oz", toBase: 0.0283495 },
      { name: "Pound", symbol: "lb", toBase: 0.453592 },
    ],
  },
  temperature: {
    baseUnit: "celsius",
    units: [
      { name: "Celsius", symbol: "°C", toBase: 1 },
      { name: "Fahrenheit", symbol: "°F", toBase: 1 },
      { name: "Kelvin", symbol: "K", toBase: 1 },
    ],
  },
  time: {
    baseUnit: "second",
    units: [
      { name: "Millisecond", symbol: "ms", toBase: 0.001 },
      { name: "Second", symbol: "s", toBase: 1 },
      { name: "Minute", symbol: "min", toBase: 60 },
      { name: "Hour", symbol: "h", toBase: 3600 },
      { name: "Day", symbol: "d", toBase: 86400 },
      { name: "Week", symbol: "wk", toBase: 604800 },
      { name: "Month", symbol: "mo", toBase: 2592000 },
      { name: "Year", symbol: "yr", toBase: 31536000 },
    ],
  },
  energy: {
    baseUnit: "joule",
    units: [
      { name: "Joule", symbol: "J", toBase: 1 },
      { name: "Kilojoule", symbol: "kJ", toBase: 1000 },
      { name: "Calorie", symbol: "cal", toBase: 4.184 },
      { name: "Kilocalorie", symbol: "kcal", toBase: 4184 },
      { name: "Watt-hour", symbol: "Wh", toBase: 3600 },
      { name: "Kilowatt-hour", symbol: "kWh", toBase: 3600000 },
    ],
  },
  volume: {
    baseUnit: "liter",
    units: [
      { name: "Milliliter", symbol: "mL", toBase: 0.001 },
      { name: "Liter", symbol: "L", toBase: 1 },
      { name: "Gallon (US)", symbol: "gal", toBase: 3.78541 },
      { name: "Quart (US)", symbol: "qt", toBase: 0.946353 },
      { name: "Pint (US)", symbol: "pt", toBase: 0.473176 },
      { name: "Cup (US)", symbol: "cup", toBase: 0.236588 },
      { name: "Fluid Ounce (US)", symbol: "fl oz", toBase: 0.0295735 },
    ],
  },
};

const categoryIcons = {
  length: Ruler,
  weight: Weight,
  temperature: Thermometer,
  time: Clock,
  energy: Zap,
  volume: Globe,
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<ConversionCategory>("length");
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [value, setValue] = useState("1");
  const [result, setResult] = useState<number | null>(null);

  const currentUnits = conversions[category].units;

  useEffect(() => {
    calculateConversion();
  }, [category, fromUnit, toUnit, value]);

  const calculateConversion = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || value === "") {
      setResult(null);
      return;
    }

    if (category === "temperature") {
      // Special handling for temperature
      const temp = numValue;
      let result: number;

      if (fromUnit === 0 && toUnit === 0) result = temp; // Celsius to Celsius
      else if (fromUnit === 0 && toUnit === 1) result = (temp * 9/5) + 32; // Celsius to Fahrenheit
      else if (fromUnit === 0 && toUnit === 2) result = temp + 273.15; // Celsius to Kelvin
      else if (fromUnit === 1 && toUnit === 0) result = (temp - 32) * 5/9; // Fahrenheit to Celsius
      else if (fromUnit === 1 && toUnit === 1) result = temp; // Fahrenheit to Fahrenheit
      else if (fromUnit === 1 && toUnit === 2) result = ((temp - 32) * 5/9) + 273.15; // Fahrenheit to Kelvin
      else if (fromUnit === 2 && toUnit === 0) result = temp - 273.15; // Kelvin to Celsius
      else if (fromUnit === 2 && toUnit === 1) result = ((temp - 273.15) * 9/5) + 32; // Kelvin to Fahrenheit
      else result = temp; // Kelvin to Kelvin

      setResult(result);
    } else {
      // Standard conversion
      const baseValue = numValue * currentUnits[fromUnit].toBase;
      const convertedValue = baseValue / currentUnits[toUnit].toBase;
      setResult(convertedValue);
    }
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";
    if (Math.abs(num) < 0.0001) return num.toExponential(4);
    if (Math.abs(num) > 1000000) return num.toExponential(4);
    return num.toLocaleString("fr-FR", { maximumFractionDigits: 10 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Convertisseur d'Unités</h1>
          </div>
          <Link
            href="/#portfolio"
            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            ← Retour
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {(Object.keys(conversions) as ConversionCategory[]).map((cat) => {
              const Icon = categoryIcons[cat];
              return (
                <motion.button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setFromUnit(0);
                    setToUnit(1);
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    category === cat
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-emerald-50 border-2 border-emerald-100"
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-xs capitalize">{cat === "length" ? "Longueur" : cat === "weight" ? "Masse" : cat === "temperature" ? "Température" : cat === "time" ? "Temps" : cat === "energy" ? "Énergie" : "Volume"}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Converter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-100"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* From */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-600 uppercase tracking-wide">
                De
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(Number(e.target.value))}
                className="w-full px-4 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {currentUnits.map((unit, index) => (
                  <option key={index} value={index}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0"
                className="w-full px-6 py-4 text-4xl font-bold text-gray-900 bg-emerald-50 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              />
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center md:justify-center">
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <ArrowLeftRight className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            {/* To */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Vers
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(Number(e.target.value))}
                className="w-full px-4 py-3 bg-teal-50 border-2 border-teal-200 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-teal-500 transition-colors"
              >
                {currentUnits.map((unit, index) => (
                  <option key={index} value={index}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
              <div className="w-full px-6 py-4 text-4xl font-bold text-emerald-600 bg-teal-50 border-2 border-teal-200 rounded-xl min-h-[80px] flex items-center">
                {result !== null ? formatNumber(result) : "—"}
              </div>
            </div>
          </div>

          {/* Quick Swap */}
          <div className="mt-8 flex justify-center">
            <motion.button
              onClick={() => {
                const temp = fromUnit;
                setFromUnit(toUnit);
                setToUnit(temp);
                const tempValue = value;
                setValue(result !== null ? formatNumber(result) : "1");
                setResult(tempValue ? parseFloat(tempValue) : null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <ArrowLeftRight className="w-5 h-5" />
              Inverser
            </motion.button>
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-emerald-100 shadow-lg"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Précis</h3>
            <p className="text-sm text-gray-600">Conversions exactes avec jusqu'à 10 décimales</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 border border-emerald-100 shadow-lg"
          >
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Complet</h3>
            <p className="text-sm text-gray-600">6 catégories avec de nombreuses unités</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 border border-emerald-100 shadow-lg"
          >
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Rapide</h3>
            <p className="text-sm text-gray-600">Conversions en temps réel instantanées</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

