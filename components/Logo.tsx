
import React from 'react';

const Logo: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer Pin Shape */}
    <path 
      d="M50 95C50 95 85 65 85 40C85 20.67 69.33 5 50 5C30.67 5 15 20.67 15 40C15 65 50 95 50 95Z" 
      fill="url(#logo_grad)"
    />
    {/* Inner Sparkle / AI Element */}
    <path 
      d="M50 25L54 36H65L56 43L60 55L50 48L40 55L44 43L35 36H46L50 25Z" 
      fill="white"
    />
    <defs>
      <linearGradient id="logo_grad" x1="15" y1="5" x2="85" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#14B8A6" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
