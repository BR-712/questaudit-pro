import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <Construction size={28} className="text-primary" />
      </div>
      <h1 className="text-2xl font-display font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm mt-2 text-center max-w-md">{description}</p>
      <span className="mt-4 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Próximamente</span>
    </div>
  );
}
