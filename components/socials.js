import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import { PrismicLink } from '@prismicio/react'
import Icon from './icon'

export default function Socials({settings, className = ""}) {
    const socials = settings.data.SocialNetwork

    return (
        <div className={'flex gap-3 ' + className}>
            {socials.map((social, key) => {
                return (
                    <PrismicLink key={key} field={social.link} className='flex justify-center w-8 lg:w-12 h-8 lg:h-12 items-center rounded-lg p-2 lg:p-3 lg:rounded-2xl shadow-lg shadow-black/50'>
                        <Icon icon={social.type} />
                    </PrismicLink>
                );
            })}
        </div>
    )
}