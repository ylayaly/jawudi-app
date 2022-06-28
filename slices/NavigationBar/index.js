import React from 'react'
import { PrismicText, PrismicLink } from '@prismicio/react'

const NavigationBar = ({ slice }) => {
  const links = slice.items.filter(l => l.Type === "Desktop" || l.Type === "Desktop & Mobile")

  return (
    <section className='header-navigation px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46'>
      <div className='3xl:container mx-auto hidden md:flex justify-between py-10 xl:py-14 2xl:py-24'>
        {links.map((link, i) => {
          return (
            (link.Link && link.Link.link_type !== "Any") ?
            <PrismicLink field={link.Link}>
              <span key={i} className={'uppercase font-lato text-xs xl:text-xl font-bold tracking-xl ' + ( i === 0 ? 'active' : '' )}>{link.LinkText}</span>
            </PrismicLink>
            :
            <span key={i} className={'uppercase font-lato text-xs xl:text-xl font-bold tracking-xl ' + ( i === 0 ? 'active' : '' )}>{link.LinkText}</span>
          )
        })}
      </div>
    </section>
)}

export default NavigationBar