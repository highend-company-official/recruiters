import { PropsWithChildren } from "react";

const Kbd = ({ children }: PropsWithChildren) => {
  return (
    <kbd className="inline-flex items-center gap-1 bg-muted opacity-100 px-1.5 border rounded h-5 font-medium font-mono text-[10px] text-muted-foreground pointer-events-none select-none">
      <span className="text-xs">{children}</span>
    </kbd>
  );
};

export { Kbd };
