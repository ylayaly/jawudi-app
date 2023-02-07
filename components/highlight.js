import { useState, useEffect } from "react"

const HilightText = ({children}) => {
    const [showBgText, setShowBgText] = useState(false)
  
    useEffect(() => {
      setTimeout(function(){
        setShowBgText(true)
      }, 3000)
    }, [])
  
    return (
      <div className='relative px-2 lg:px-4 opacity-90 text-jw-dark-blue inline-flex gap-2 lg:gap-3 items-center w-max lg:w-auto '>
        <span className='absolute inset-0 block transition-all animate-showFull bg-jw-green-1/40'></span>
        {showBgText && <span className='absolute inset-0 block transition-all animate-showFullDark bg-jw-green-1'></span> }
          <span className='relative'>{children}</span>
      </div>
    )
  }

  export default HilightText