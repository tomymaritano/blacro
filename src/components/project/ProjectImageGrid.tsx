"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Grid size types based on Figma design (total width ~1784px)
// small: 385px, medium: 980px, large: 1300px
export type GridSize = "small" | "medium" | "large" | "full";
export type GridType = "masonry" | "uniform" | "elegant" | "bold";

// Grid layout is an array of rows, each row is an array of sizes
// Example: [["large", "small", "small"], ["medium", "small"]]
export type GridLayout = GridSize[][];

interface GridImage {
  src: string;
  size: GridSize;
  alt?: string;
}

interface GridRowData {
  images: GridImage[];
}

interface ProjectImageGridProps {
  images: string[];
  gridType?: GridType;
  gridLayout?: GridLayout;
  customLayout?: GridRowData[];
  projectTitle?: string;
}

// DETERMINISTIC: Fixed flex values based on pixel widths from Figma
// small: 385px, medium: 980px, large: 1300px, full: 1784px
const SIZE_TO_FLEX: Record<GridSize, number> = {
  small: 385,
  medium: 980,
  large: 1300,
  full: 1784,
};

// DETERMINISTIC: Fixed sizes for Next/Image (avoid dynamic calculation)
const SIZE_TO_SIZES: Record<GridSize, string> = {
  small: "(max-width: 768px) 100vw, 25vw",
  medium: "(max-width: 768px) 100vw, 50vw",
  large: "(max-width: 768px) 100vw, 75vw",
  full: "100vw",
};

// Pre-computed flex percentages for common row patterns (deterministic)
// Key format: "size1-size2-size3" -> [flex1, flex2, flex3]
const ROW_FLEX_MAP: Record<string, number[]> = {
  // Single
  "full": [100],
  // Two items
  "small-large": [23, 77],
  "large-small": [77, 23],
  "small-medium": [29, 71],
  "medium-small": [71, 29],
  "medium-medium": [50, 50],
  "medium-large": [43, 57],
  "large-medium": [57, 43],
  "large-large": [50, 50],
  "small-small": [50, 50],
  // Three items
  "small-large-small": [19, 62, 19],
  "small-medium-small": [22, 56, 22],
  "large-small-small": [62, 19, 19],
  "small-small-large": [19, 19, 62],
  "medium-small-small": [56, 22, 22],
  "small-small-medium": [22, 22, 56],
  "small-small-small": [34, 33, 33],
};

const gridPatterns: Record<GridType, GridSize[][]> = {
  masonry: [
    ["small", "large"],
    ["large", "small"],
    ["medium", "medium"],
    ["small", "medium", "small"],
  ],
  uniform: [
    ["small", "small", "medium"],
    ["medium", "small", "small"],
    ["medium", "medium"],
  ],
  elegant: [
    ["large", "small"],
    ["small", "medium", "small"],
    ["medium", "medium"],
  ],
  bold: [
    ["full"],
    ["small", "large"],
    ["large", "small"],
    ["full"],
  ],
};

function generateLayoutFromGrid(images: string[], gridLayout: GridLayout): GridRowData[] {
  const rows: GridRowData[] = [];
  let imageIndex = 0;

  for (const rowSizes of gridLayout) {
    if (imageIndex >= images.length) break;

    const rowImages: GridImage[] = [];
    for (const size of rowSizes) {
      if (imageIndex >= images.length) break;
      rowImages.push({
        src: images[imageIndex],
        size,
        alt: `Image ${imageIndex + 1}`,
      });
      imageIndex++;
    }

    if (rowImages.length > 0) {
      rows.push({ images: rowImages });
    }
  }

  while (imageIndex < images.length) {
    const patternIndex = rows.length % gridLayout.length;
    const pattern = gridLayout[patternIndex];
    const rowImages: GridImage[] = [];

    for (const size of pattern) {
      if (imageIndex >= images.length) break;
      rowImages.push({
        src: images[imageIndex],
        size,
        alt: `Image ${imageIndex + 1}`,
      });
      imageIndex++;
    }

    if (rowImages.length > 0) {
      rows.push({ images: rowImages });
    }
  }

  return rows;
}

function generateLayout(images: string[], gridType: GridType): GridRowData[] {
  const patterns = gridPatterns[gridType];
  const rows: GridRowData[] = [];
  let imageIndex = 0;

  while (imageIndex < images.length) {
    const patternIndex = rows.length % patterns.length;
    const pattern = patterns[patternIndex];
    const rowImages: GridImage[] = [];

    for (const size of pattern) {
      if (imageIndex >= images.length) break;
      rowImages.push({
        src: images[imageIndex],
        size,
        alt: `Image ${imageIndex + 1}`,
      });
      imageIndex++;
    }

    if (rowImages.length > 0) {
      rows.push({ images: rowImages });
    }
  }

  return rows;
}

// DETERMINISTIC: Get pre-computed flex values or calculate with integer rounding
function getRowFlexValues(images: GridImage[]): number[] {
  const key = images.map(img => img.size).join("-");

  if (ROW_FLEX_MAP[key]) {
    return ROW_FLEX_MAP[key];
  }

  // Fallback: calculate with integer rounding (deterministic)
  const totalFlex = images.reduce((sum, img) => sum + SIZE_TO_FLEX[img.size], 0);
  const values = images.map((img) => Math.round((SIZE_TO_FLEX[img.size] / totalFlex) * 100));

  // Adjust last value to ensure sum is exactly 100
  const sum = values.reduce((a, b) => a + b, 0);
  if (sum !== 100 && values.length > 0) {
    values[values.length - 1] += (100 - sum);
  }

  return values;
}

export default function ProjectImageGrid({
  images,
  gridType = "masonry",
  gridLayout,
  customLayout,
  projectTitle = "Project",
}: ProjectImageGridProps) {
  if (!images || images.length === 0) {
    return null;
  }

  // Priority: customLayout > gridLayout > gridType patterns
  let layout: GridRowData[];
  if (customLayout) {
    layout = customLayout;
  } else if (gridLayout) {
    layout = generateLayoutFromGrid(images, gridLayout);
  } else {
    layout = generateLayout(images, gridType);
  }

  return (
    <section className="w-full pb-16 px-6 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col gap-4">
        {layout.map((row, rowIndex) => {
          // DETERMINISTIC: Use pre-computed or integer-rounded flex values
          const flexValues = getRowFlexValues(row.images);

          return (
            <motion.div
              key={rowIndex}
              className="flex flex-col md:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
            >
              {row.images.map((image, imageIndex) => (
                <div
                  key={`${rowIndex}-${imageIndex}`}
                  className="relative w-full overflow-hidden aspect-4/3 md:aspect-auto md:h-120"
                  style={{
                    flex: `${flexValues[imageIndex]} 1 0%`,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `${projectTitle} - Image ${rowIndex * row.images.length + imageIndex + 1}`}
                    fill
                    // DETERMINISTIC: Use fixed sizes based on GridSize, not calculated values
                    sizes={SIZE_TO_SIZES[image.size]}
                    quality={100}
                    className="object-cover"
                    loading={rowIndex < 2 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
