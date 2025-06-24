// components/project/ProjectMetaItem.tsx
interface ProjectMetaItemProps {
  label: string;
  children: React.ReactNode;
}

export default function ProjectMetaItem({ label, children }: ProjectMetaItemProps) {
  return (
    <div className="text-sm opacity-80">
      <span className="font-semibold uppercase block mb-1">({label})</span>
      {children}
    </div>
  );
}