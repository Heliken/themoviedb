interface RatingBound {
  interval: [number, number];
  rgb: [number, number, number];
}

type RatingBounds = RatingBound[];

const bounds: RatingBounds = [
  {
    interval: [0, 4],
    rgb: [196, 69, 94],
  },
  {
    interval: [4, 6],
    rgb: [255, 206, 92],
  },
  {
    interval: [6, 10],
    rgb: [74, 203, 42],
  },
];

export function getBgColor(value: number): string {
  const fallbackBg = 'rgb(0,0,0)';
  const intervalIndex = bounds.findIndex(
    ({ interval }) => value >= interval[0] && value <= interval[1]
  );

  // fallback
  if (intervalIndex === -1) {
    return fallbackBg;
  }

  // first interval always return same red
  if (intervalIndex === 0) {
    return `rgb(${bounds[0].rgb.join(', ')})`;
  }

  const prevBound = bounds[intervalIndex - 1];
  const currentBound = bounds[intervalIndex];
  const {
    interval: [currentLow, currentHigh],
    rgb: currentRgb,
  } = currentBound;
  const ratio = (value - currentLow) / (currentHigh - currentLow);

  const rgb2 = currentRgb.map((val, i) =>
    Math.round((1 - ratio) * prevBound.rgb[i] + ratio * val)
  );

  return `rgb(${rgb2.join(', ')})`;
}
