import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark';
  theme?: 'dark' | 'light';
  className?: string;
}

export const KaradibayuSchoolLogo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  theme = 'dark',
  className = '',
}) => {
  const iconDimensions = {
    sm: 32,
    md: 40,
    lg: 52,
    xl: 68,
  }[size];

  const textColorClass = theme === 'dark' ? 'text-white' : 'text-brand-900';
  const subtextColorClass = theme === 'dark' ? 'text-surface-300' : 'text-surface-600';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Heraldic SVG Crest */}
      <svg
        width={iconDimensions}
        height={iconDimensions}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200"
      >
        {/* Shield / Institutional Emblem Base */}
        <path
          d="M50 8 C68 8 86 16 86 32 C86 62 50 88 50 88 C50 88 14 62 14 32 C14 16 32 8 50 8 Z"
          fill="#0f294a"
          stroke="#b45309"
          strokeWidth="2.5"
        />

        {/* Rising Sun Rays (Enlightenment / Youth) */}
        <g stroke="#d97706" strokeWidth="2.5" strokeLinecap="round">
          <line x1="50" y1="20" x2="50" y2="13" />
          <line x1="39" y1="23" x2="34" y2="17" />
          <line x1="61" y1="23" x2="66" y2="17" />
          <line x1="29" y1="30" x2="22" y2="27" />
          <line x1="71" y1="30" x2="78" y2="27" />
        </g>

        {/* Radiant Core */}
        <circle cx="50" cy="33" r="8" fill="#d97706" />

        {/* Open Book of Knowledge */}
        <path
          d="M50 42 C43 37 28 38 24 42 L24 63 C29 59 42 58 50 63 C58 58 71 59 76 63 L76 42 C72 38 57 37 50 42 Z"
          fill="#ffffff"
          stroke="#0f766e"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Spine */}
        <line x1="50" y1="42" x2="50" y2="63" stroke="#0f766e" strokeWidth="2.2" />

        {/* Laurel / Olive Branch Accents */}
        <path
          d="M32 74 C38 78 45 79 50 79 C55 79 62 78 68 74"
          stroke="#d97706"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Typography: School Name & Motto */}
      {variant === 'full' && (
        <div className="flex flex-col leading-tight">
          <span className={`font-serif tracking-wide font-bold uppercase text-xs md:text-sm ${textColorClass}`}>
            Karadibayu
          </span>
          <span className={`font-sans text-[10px] md:text-xs tracking-wider uppercase font-medium ${subtextColorClass}`}>
            Primary School
          </span>
        </div>
      )}
    </div>
  );
};
