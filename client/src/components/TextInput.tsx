import React from 'react';
import { generateRandomId } from '../lib/functions';

type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string,
  placeholder?: string,
  error?: string,
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl',
  name?: string,
};

const fontSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

const TextInput = ({ onChange, label, placeholder, error, type = 'text', size = 'base', name }: Props) => {
  const id = generateRandomId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className={`block text-sm font-medium leading-6 ${error ? 'text-red-500' : ''}`.trim()}>
        {label}
      </label>}
      <div className='mt-1'>
        <input
          id={id}
          name={name}
          className={`w-full px-3 py-2 ${fontSizes[size]} rounded-md focus:ring-2 ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-default bg-white text-slate-700 border shadow-sm ring-offset-slate-50 outline-none ${error ? 'text-red-500 border-red-500' : 'border-slate-300'}`.trim()}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
    </div>
  ); 
};

export default TextInput;
