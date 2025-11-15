import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-target gpu-accelerated',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-neon-blue to-neon-cyan text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] active:brightness-95 shadow-lg shadow-neon-blue/20',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98] shadow-md',
        outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:border-primary/80 hover:scale-[1.02] active:scale-[0.98] active:bg-primary/20',
        secondary: 'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] active:brightness-95 shadow-lg shadow-neon-purple/20',
        ghost: 'hover:bg-accent/10 hover:text-accent-foreground hover:scale-[1.02] active:scale-[0.98]',
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80',
        fab: 'fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-2xl shadow-neon-blue/50 hover:scale-110 active:scale-105 z-50',
      },
      size: {
        default: 'h-11 px-6 py-3 min-h-[44px]',
        sm: 'h-9 rounded-md px-4 py-2 min-h-[44px] text-xs',
        lg: 'h-14 rounded-xl px-12 py-4 min-h-[56px] text-base',
        icon: 'h-11 w-11 min-h-[44px] min-w-[44px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, loadingText, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {loading ? loadingText || children : children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
