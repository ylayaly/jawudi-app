import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import { PrismicLink } from '@prismicio/react'
import Icon from './icon'

export default function Socials({settings, className = ""}) {
    const socials = settings.data.SocialNetwork

    return (
        <div className={'flex gap-3 xl:gap-6 ' + className}>
            {socials.map((social, key) => {
                return (
                    <PrismicLink key={key} field={social.link} className='flex justify-center w-12 h-12 items-center rounded-2xl shadow-lg shadow-black/50'>
                        <Icon icon={social.type} />
                    </PrismicLink>
                );
            })}
        </div>
    )
}