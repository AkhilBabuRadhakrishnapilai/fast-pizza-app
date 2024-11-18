import { Link } from "react-router-dom"


const Button = ({children, disabled, to, type}) => {
  
  
  const base="bg-yellow-400 uppercase font-semibold text-stone-800 text-sm tracking-wide rounded-full hover:bg-yellow-300 transition-colors focus:ring focus:ring-yellow-300 disabled:cursor-not-allowed"
  
  const styles ={
    primary : base + 'px-4 py-3 md:px-6 md:py-4 sm:px-2 sm:py-1.5',
    small: base + 'px-4 py-2 sm:px-2 sm:py-1 md:px-5 md:py-205 text-xs',
    secondary: " text-sm px-4 py-2.5 md:px-6 md:py-3.5 border-2 border-stone-200 uppercase font-semibold text-stone-400  tracking-wide rounded-full hover:bg-stone-300 transition-colors focus:ring focus:ring-stone-300 hover:text-stone-800 disabled:cursor-not-allowed"
  }
  
  
  if(to)
        return <Link className={styles[type]} to={to}>{children}</Link>
  
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  )
}

export default Button
