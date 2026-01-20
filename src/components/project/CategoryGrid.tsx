import { CategoryProject } from "@/data/categories";
import CategoryCard from "./cards/CategoryCard";

interface CategoryGridProps {
  projects: CategoryProject[];
  category: string;
}

/**
 * CategoryGrid - 2-column grid layout for category projects
 *
 * Layout:
 * - Desktop: 2 columns
 * - Mobile: 1 column
 * - Consistent gap between items
 */
export default function CategoryGrid({ projects, category }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[174px] gap-y-[87px]">
      {projects.map((project) => (
        <CategoryCard
          key={project.slug}
          project={project}
          category={category}
        />
      ))}
    </div>
  );
}
