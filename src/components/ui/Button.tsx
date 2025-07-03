import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils" // Importamos nossa função utilitária

// Aqui definimos todas as variantes de estilo do nosso botão usando cva.
const buttonVariants = cva(
  // Estilos base, aplicados a todas as variantes
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
  {
    variants: {
      // Nossas variantes de cor, baseadas no tailwind.config.ts
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/50",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/50",
        accent: "bg-accent text-accent-foreground hover:bg-accent-hover",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      // Nossas variantes de tamanho
      size: {
        default: "h-12 py-3 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    // Valores padrão se nenhuma variante for especificada
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Definimos as propriedades que nosso componente de botão pode receber
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// Criamos o componente React
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Exportamos o componente para ser usado em outros lugares
export { Button, buttonVariants }
