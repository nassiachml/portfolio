"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BrandStyle, generateBrandNames, STYLE_INFO } from "@/lib/nameGenerator";
import KeywordInput from "@/components/brand-generator/KeywordInput";
import StyleSelector from "@/components/brand-generator/StyleSelector";
import ResultsGrid from "@/components/brand-generator/ResultsGrid";

export default function BrandNameGeneratorPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [keyword, setKeyword] = useState("");
  const [style, setStyle] = useState<BrandStyle>("tech");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    if (!keyword.trim()) return;
    const names = generateBrandNames(keyword, style);
    setGeneratedNames(names);
    setHasGenerated(true);
  };

  return (
    <div className="min-h-screen bg-black py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-white tracking-tight">
            Générateur de Nom
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-6" />
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light tracking-wide uppercase letter-spacing-wider">
            Créez des noms de marque élégants et distinctifs
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-b border-white/10 pb-12"
          >
            <KeywordInput
              value={keyword}
              onChange={setKeyword}
              onGenerate={handleGenerate}
            />
          </motion.div>

          {/* Style Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="border-b border-white/10 pb-12"
          >
            <StyleSelector
              selectedStyle={style}
              onStyleChange={(newStyle) => {
                setStyle(newStyle);
                if (hasGenerated) {
                  const names = generateBrandNames(keyword, newStyle);
                  setGeneratedNames(names);
                }
              }}
            />
          </motion.div>

          {/* Results */}
          {hasGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ResultsGrid 
                names={generatedNames} 
                style={style}
                onRegenerate={handleGenerate}
              />
            </motion.div>
          )}

          {/* Empty State */}
          {!hasGenerated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-16 h-px bg-white/20 mx-auto mb-8" />
              <p className="text-gray-500 text-sm font-light tracking-wide uppercase">
                Entrez un mot-clé et sélectionnez un style
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
