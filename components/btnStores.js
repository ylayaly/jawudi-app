import React from 'react'
import { PrismicLink } from '@prismicio/react'
import Icon from './icon'

export default function BtnStores({settings, className = ""}) {
    const { appStore, playStore } = settings.data

    return (
        <div className={'store-products__btn flex justify-center gap-4 text-white'}>
            <div className='w-16 md:w-24 lg:w-32 2xl:w-40 h-auto'>
                <PrismicLink field={appStore} className='flex justify-center w-full h-full items-center'>
                    <Icon icon={'apple'} />
                </PrismicLink>
            </div>
            <div className='w-16 md:w-24 lg:w-32 2xl:w-40 h-auto'>
                <PrismicLink field={playStore} className='flex justify-center w-full h-full items-center'>
                    <Icon icon={'android'} />
                </PrismicLink>
            </div>

        </div>
    )
}