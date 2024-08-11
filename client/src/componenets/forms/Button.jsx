import { forwardRef } from "react";
import clsx from 'clsx';

const Button = forwardRef(({className, childern, ...props}, ref) => {
  return <button className={clsx('bg-dark hover:bg-dark/80 transition text-white font-medium rounded-lg h-11 flex items-center justify-center',className)} {...props} ref={ref}/>;
})

Button.displayName = 'Button';

export default Button;