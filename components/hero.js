import React, { useEffect, useState } from 'react'

const Hero = ({className, children}) => {
    const [heightSection, setheightSection] = useState(null)

    useEffect(() => {
        let h = window.innerHeight < window.innerWidth * 0.5625 ? window.innerHeight : window.innerWidth * 0.5625
        h = h > 1080 ? 1080 : h
        setheightSection(h)
        window.addEventListener('resize', function() {
          let h = window.innerHeight < window.innerWidth * 0.5625 ? window.innerHeight : window.innerWidth * 0.5625
          h = h > 1080 ? 1080 : h
          setheightSection(h)
        }, true);
    }, [])

    return <section className={className}  style={{minHeight : `${heightSection}px`}}>
        {children}
    </section>
}

export default Hero;