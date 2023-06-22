import React from 'react'

type Props = {
    onClick?: () => void,
    variant: 'outline' | 'solid' | 'text' | 'dashed' | 'link' | 'colored',
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl',
    disabled?: boolean,
    className?: string,
    children?: React.ReactNode
}

const Button = ({onClick, variant, size = 'base', disabled, className, children}: Props) => {
  const fontSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  
  const baseClasses = `px-4 py-2 ${fontSizes[size]} rounded-md focus:ring-2 ring-offset-2 focus:ring-blue-500 transition-all`
  let extraClasses;

  if(variant === 'text') {
    extraClasses = "bg-transparent text-slate-700 hover:bg-slate-700/10"
  } else if (variant === 'outline') {
    extraClasses = "bg-white text-slate-700 border border-slate-300 shadow-sm ring-offset-slate-50 hover:text-blue-400 hover:border-blue-400"
  } else if (variant === 'dashed') {
    extraClasses = "bg-white text-slate-700 border border-dashed border-slate-300 shadow-sm ring-offset-slate-50 hover:text-blue-400 hover:border-blue-400"
  } else if (variant === 'link') {
    extraClasses = "bg-transparent text-blue-500 hover:text-blue-400"
  } else if (variant === 'colored') {
    extraClasses = "bg-blue-500 text-white/50 hover:bg-blue-400 focus:ring-blue-500 shadow-sm ring-offset-slate-50"
  } else {
    extraClasses = "bg-blue-500 text-white hover:bg-blue-400 focus:ring-blue-500 shadow-sm ring-offset-slate-50"
  }
  return (
    <button disabled={disabled} className={`${baseClasses} ${extraClasses} ${disabled ? 'pointer-events-none opacity-50' : ''} ${className}`.trim()} onClick={onClick}>
        {children}
</button>

  )
}

export default Button