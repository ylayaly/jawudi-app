import { PrismicLink } from '@prismicio/react'
import React from 'react'
import Icon from '../../components/icon'


const StoreButtonsCta = ({ slice }) => {
  const {title, subtitle} = slice.primary
  const { appStore, playStore } = slice.settings.data

  return (<div className='store-products relative'>
    <div className='relative store-products__bg bg-jw-dark-blue'>
      <div className='store-products__container 3xl:container mx-auto pt-10 md:pt-16 lg:pt-20 2xl:pt-28 pb-8 md:pb-32 lg:pb-44 2xl:pb-54 3xl:pb-72 xxl:min-h-220 flex flex-col justify-center'>
        <div className='w-10 md:w-12 lg:w-18 xxl:w-26 mx-auto'>
          <Icon icon="icon-blue" className={"text-jw-green-1"} />
        </div>
        <div className='text-center mt-3'>
          <h3 className='text-jw-green-1 font-medium text-lg md:text-xl lg:text-2xl 2xl:text-5xl'>{title}</h3>
          <p className='text-white font-medium text-2 xs:text-xs lg:text-base 2xl:text-22 mt-7 w-1/2 mx-auto'>
            {subtitle}
          </p>
          <div className={'store-products__btn flex justify-center gap-4 text-white px-12 mt-12'}>
              <div className='w-32 md:w-40 lg:w-48 2xl:w-56 h-auto'>
                <PrismicLink field={appStore}><Icon icon={'apple'} /></PrismicLink></div>
              <div className='w-32 md:w-40 lg:w-48 2xl:w-56 h-auto'>
                <PrismicLink field={playStore}><Icon icon={'android'} /></PrismicLink>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div className="hidden md:block absolute -bottom-px right-0 left-0 h-18 xl:h-28 2xl:h-36 bg-footer"></div>
  </div>
)}

export default StoreButtonsCta