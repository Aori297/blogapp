import { forwardRef } from "react";
import clsx from 'clsx';

const Input = forwardRef(({ type = 'text', className, ...props}, ref) => {
  return <input type={type} className={clsx('p-3 border border-gray-700 text-sm text-gray-800 focus:border-dark focus-visible:outline-none rounded-lg',className)} {...props} ref={ref}/>;
})

Input.displayName = 'Input';

export default Input;