'use client'

import * as React from 'react'
// Import the IMaskInput component from the new library
import { IMaskInput } from 'react-imask';
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // FIX: Renamed the prop to `inputMask` to avoid conflicts with the underlying
  // component's props. This is a safer and cleaner approach.
  inputMask?: string; 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputMask, ...props }, ref) => {
    // Define the common styling for all inputs
    const commonClasses = "w-full h-12 px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground";

    // If a mask is provided, render the IMaskInput component
    if (inputMask) {
      return (
        <IMaskInput
          // Use the renamed prop here
          mask={inputMask} 
          {...props} 
          // The `react-imask` library correctly uses `inputRef` to pass the ref down
          // to the underlying HTML input element.
          inputRef={ref as React.Ref<HTMLInputElement>}
          className={cn(commonClasses, className)}
        />
      );
    }

    // Otherwise, render a standard input element
    return (
      <input
        type={type}
        className={cn(commonClasses, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
