import React, { ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-1 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoItem = forwardRef<HTMLDivElement, {
  children?: ReactNode;
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  icon?: ReactNode;
  header?: ReactNode;
  delay?: number;
  onClick?: () => void;
}>(({
  children,
  className,
  title,
  description,
  icon,
  header,
  delay = 0,
  onClick,
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
    >
      {header && <div className="relative w-full h-full">{header}</div>}
      <div className="flex flex-col gap-2 p-6 transition-transform duration-300 group-hover:translate-x-1">
        {icon && <div className="text-primary">{icon}</div>}
        {title && (
          <div className="font-outfit text-xl font-bold tracking-tight text-foreground">
            {title}
          </div>
        )}
        {description && (
          <div className="font-sans text-sm text-muted-foreground line-clamp-2">
            {description}
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
});
