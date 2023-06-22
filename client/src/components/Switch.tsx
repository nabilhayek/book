import React from 'react'
import { useToggle } from 'usehooks-ts'

type Props = {
    initial?: boolean,
    onChange?: (on: boolean) => void,
    label?: string
}

const Switch = ({initial, onChange, label}: Props) => {
    const [on, toggle] = useToggle(initial || false);
  return (
    <div className="flex items-center">
    <div onClick={() => {
        onChange && onChange(!on)
        toggle()
    }} className={`pointer-events-auto cursor-pointer h-6 w-10 rounded-full p-1 ring-1 ring-inset transition-all duration-300 ease-default ${on ? 'bg-blue-500 ring-black/20' : 'bg-slate-900/10 ring-slate-900/5'}`}>
        <div className={`h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition-all duration-300 ease-default ${on ? 'translate-x-4' : ''}`.trim()}></div>
    </div>
    {label && <label className="ml-2 text-sm font-medium leading-6 text-slate-700">{label}</label>}
    </div>
  )
}

export default Switch