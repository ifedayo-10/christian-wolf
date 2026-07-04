import React from "react";

export const PhotoIcon: React.FC<{ size?: number; color: string }> = ({
  size = 32,
  color,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.4}
  >
    <rect x="3" y="6" width="18" height="13" rx="1.5" />
    <circle cx="12" cy="12.5" r="3.6" />
    <path d="M8 6l1.5-2.5h5L16 6" />
  </svg>
);

export const ChartIcon: React.FC<{ size?: number; color: string }> = ({
  size = 32,
  color,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.4}
  >
    <path d="M4 19V9M11 19V5M18 19v-7" />
    <path d="M2 19h20" />
  </svg>
);

export const ClockIcon: React.FC<{ size?: number; color: string }> = ({
  size = 32,
  color,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.6}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.2 2" strokeLinecap="round" />
  </svg>
);

export const ServingsIcon: React.FC<{ size?: number; color: string }> = ({
  size = 32,
  color,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.6}
  >
    <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 3c-1.5 0-2.5 2-2.5 4.5S16 11 17 11v10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FlameIcon: React.FC<{ size?: number; color: string }> = ({
  size = 32,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c1.2 1 2 2.6 2 4.3A5.3 5.3 0 0 1 6.4 17c-.8-3 .6-5 1.6-6.5C9 8.8 9.6 6.2 12 2z" />
  </svg>
);
