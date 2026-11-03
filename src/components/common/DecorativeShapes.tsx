import React from 'react';

/**
 * 5-petal flower icon decoration in the pastel design system
 */
export function FlowerIcon({
  className = 'w-6 h-6',
  petalColor = '#F7A8C8',
  centerColor = '#E9F2B9',
}: {
  className?: string;
  petalColor?: string;
  centerColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="24" r="18" fill={petalColor} />
      <circle cx="75" cy="42" r="18" fill={petalColor} />
      <circle cx="65" cy="73" r="18" fill={petalColor} />
      <circle cx="35" cy="73" r="18" fill={petalColor} />
      <circle cx="25" cy="42" r="18" fill={petalColor} />
      <circle cx="50" cy="50" r="14" fill={centerColor} stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

/**
 * Cute fluffy cloud decoration
 */
export function CloudIcon({
  className = 'w-8 h-8',
  color = '#BFD4F7',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 58C13.9543 58 5 49.0457 5 38C5 28.0264 12.2882 19.7547 21.8492 18.238C24.7734 9.17173 33.284 2.5 43.5 2.5C54.1132 2.5 62.9096 9.69796 65.4173 19.3242C68.3249 17.5186 71.7885 16.5 75.5 16.5C85.7173 16.5 94 24.7827 94 35C94 35.808 93.9482 36.6034 93.8477 37.3828C99.7891 39.4674 104 45.1326 104 52C104 60.8366 96.8366 68 88 68L25 68L25 58Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Pastel 4-point sparkle star
 */
export function SparkleStar({
  className = 'w-5 h-5',
  color = '#F08C75',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}
