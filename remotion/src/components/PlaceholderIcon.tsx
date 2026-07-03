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
