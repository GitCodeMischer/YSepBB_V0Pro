"use client"

import { motion } from "framer-motion"

interface TresorIconProps {
  className?: string
  size?: number | string
  animated?: boolean
  darkMode?: boolean
}

export default function TresorIcon({ 
  className = "", 
  size = 200,
  animated = true,
  darkMode = true
}: TresorIconProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]"
      >
        {/* Base shadow */}
        <ellipse cx="100" cy="180" rx="70" ry="10" fill="rgba(0,0,0,0.3)" />
        
        {/* Main safe body */}
        <motion.g
          initial={{ rotateY: 0 }}
          animate={animated ? { rotateY: [-5, 5, -5] } : undefined}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
          style={{ transformOrigin: "center", transformStyle: "preserve-3d" }}
        >
          {/* Back face */}
          <rect x="30" y="30" width="140" height="140" rx="10" fill={darkMode ? "#333" : "#555"} />
          
          {/* Main body */}
          <rect x="30" y="30" width="140" height="140" rx="10" fill={darkMode ? "#444" : "#666"} />
          
          {/* Front face with beveled edge */}
          <rect x="35" y="35" width="130" height="130" rx="8" fill={darkMode ? "#333" : "#555"} />
          
          {/* Door panel */}
          <rect x="40" y="40" width="120" height="120" rx="6" fill={darkMode ? "#222" : "#444"} />
          
          {/* Door face */}
          <rect x="45" y="45" width="110" height="110" rx="5" fill={darkMode ? "#2a2a2a" : "#4a4a4a"} />
          
          {/* Dial housing */}
          <circle cx="100" cy="100" r="30" fill={darkMode ? "#1a1a1a" : "#2a2a2a"} stroke={darkMode ? "#333" : "#555"} strokeWidth="2" />
          
          {/* Dial */}
          <motion.g 
            animate={animated ? { rotate: 360 } : undefined}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          >
            <circle cx="100" cy="100" r="25" fill={darkMode ? "#202020" : "#3a3a3a"} stroke={darkMode ? "#444" : "#666"} strokeWidth="1" />
            
            {/* Dial markings */}
            <line x1="100" y1="80" x2="100" y2="75" stroke={darkMode ? "#555" : "#777"} strokeWidth="2" strokeLinecap="round" />
            <line x1="120" y1="100" x2="125" y2="100" stroke={darkMode ? "#555" : "#777"} strokeWidth="2" strokeLinecap="round" />
            <line x1="100" y1="120" x2="100" y2="125" stroke={darkMode ? "#555" : "#777"} strokeWidth="2" strokeLinecap="round" />
            <line x1="80" y1="100" x2="75" y2="100" stroke={darkMode ? "#555" : "#777"} strokeWidth="2" strokeLinecap="round" />
            
            {/* Dial indicator */}
            <circle cx="100" cy="100" r="3" fill={darkMode ? "#555" : "#777"} />
            <line x1="100" y1="100" x2="100" y2="85" stroke={darkMode ? "#555" : "#777"} strokeWidth="2" strokeLinecap="round" />
          </motion.g>
          
          {/* Door handle */}
          <rect x="150" y="95" width="15" height="10" rx="2" fill={darkMode ? "#2a2a2a" : "#4a4a4a"} stroke={darkMode ? "#222" : "#444"} strokeWidth="1" />
          
          {/* Hinges */}
          <rect x="45" y="50" width="10" height="4" rx="1" fill={darkMode ? "#1a1a1a" : "#333"} />
          <rect x="45" y="140" width="10" height="4" rx="1" fill={darkMode ? "#1a1a1a" : "#333"} />
          
          {/* Bottom feet */}
          <circle cx="45" cy="170" r="5" fill={darkMode ? "#1a1a1a" : "#333"} />
          <circle cx="155" cy="170" r="5" fill={darkMode ? "#1a1a1a" : "#333"} />
          <circle cx="45" cy="30" r="5" fill={darkMode ? "#1a1a1a" : "#333"} />
          <circle cx="155" cy="30" r="5" fill={darkMode ? "#1a1a1a" : "#333"} />
          
          {/* Highlight reflection */}
          <path 
            d="M40 40 L160 40 L155 50 L45 50 Z" 
            fill="rgba(255,255,255,0.1)" 
          />
          
          {/* Soft sheen on the safe */}
          <motion.rect
            x="35" y="35" width="130" height="130" rx="8"
            fill="url(#sheen)"
            opacity="0.1"
            animate={animated ? { opacity: [0.05, 0.2, 0.05] } : undefined}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </motion.g>
        
        {/* Definitions for filters and gradients */}
        <defs>
          <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            {animated && (
              <>
                <animate attributeName="x1" from="-100%" to="200%" dur="5s" repeatCount="indefinite" />
                <animate attributeName="y1" from="-100%" to="200%" dur="5s" repeatCount="indefinite" />
              </>
            )}
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
      
      {/* Glow behind the safe */}
      <div className="absolute inset-0 -z-10 blur-2xl opacity-30 rounded-full">
        <div className="absolute inset-10 bg-gradient-to-r from-blue-500 to-primary rounded-full" />
      </div>
    </div>
  )
} 