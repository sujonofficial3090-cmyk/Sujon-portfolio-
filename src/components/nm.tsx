import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

const surfaceVariants = cva("bg-surface", {
  variants: {
    depth: {
      sm: "nm-raised-sm",
      md: "nm-raised",
      lg: "nm-raised-lg",
      inset: "nm-inset",
    },
    radius: {
      sm: "rounded-[10px]",
      md: "rounded-[14px]",
      lg: "rounded-[18px]",
    },
    interactive: {
      true: "nm-interactive",
      false: "",
    },
  },
  defaultVariants: { depth: "md", radius: "md", interactive: false },
});

type SurfaceProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof surfaceVariants> & { children?: ReactNode };

export function NeumorphicCard({
  className,
  depth,
  radius,
  interactive,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(surfaceVariants({ depth, radius, interactive }), className)}
      {...props}
    />
  );
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[10px] bg-surface font-extrabold uppercase tracking-[0.08em] transition-[box-shadow,transform,color] duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      tone: {
        default: "text-foreground/80 hover:text-brand-deep",
        brand: "text-brand-deep border border-brand/20 dark:border-brand/30",
      },
      size: {
        sm: "px-4 py-2 text-[11px]",
        md: "px-6 py-2.5 text-[12px]",
        lg: "px-8 py-3.5 text-[13px]",
      },
    },
    defaultVariants: { tone: "default", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { as?: "button" };

export function NeumorphicButton({ className, tone, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ tone, size }), "nm-raised-sm nm-interactive", className)}
      {...props}
    />
  );
}

export function NeumorphicLinkButton({
  className,
  tone,
  size,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>) {
  return (
    <a
      className={cn(buttonVariants({ tone, size }), "nm-raised-sm nm-interactive", className)}
      {...props}
    />
  );
}

export function SectionShell({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <NeumorphicCard
        depth="md"
        radius="lg"
        className={cn("px-5 py-10 sm:px-8 sm:py-12 lg:px-10", className)}
      >
        {children}
      </NeumorphicCard>
    </section>
  );
}
