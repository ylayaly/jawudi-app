import React from 'react'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers';
import moment from 'moment';


const HeroComponent = ({ data }) => {
    const { postImage, title, author, publicationDate } = data
    var date = prismicH.asDate(publicationDate)
    return (
        <div className='hero-post'>
            <div className={'relative min-h-112 flex items-end transition-all duration-300 md:min-h-200 2xl:min-h-220 3xl:min-h-280 px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46'}>
                <div className='absolute inset-0 bg-cover bg-center ' style={{ backgroundImage : `url(${postImage.url})` }}></div>
                <div className='absolute inset-0 bg-black/50'></div>
                <div className='relative 3xl:container 3xl:mx-auto py-32 xl:py-48 xxl:py-64 hidden md:block'>
                {title &&
                    <h1 className='text-white font-semibold md:text-4xl xl:text-6xl mb-14'>{prismicH.asText(title)}</h1>
                }
                {(author && author.data && author.data.name) &&
                    <div className='font-lato font-bold uppercase text-white text-bace xl:text-lg tracking-xl'>
                        <span>BY </span>
                        <span className='text-jw-green-4'>{author.data.name}</span>
                    </div>
                }
                {publicationDate && 
                    <span className='font-semibold text-xs text-jw-gray-3 mt-2 block uppercase'>{moment.utc(date).format("MMMM DD, YYYY")}</span>
                }
                </div>
            </div>
            <div className='block md:hidden px-9 md:px-12 pt-6'>
                {title &&
                    <h1 className='text-jw-dark-blue font-semibold text-lg sm:text-22 mb-3 w-3/4'>{prismicH.asText(title)}</h1>
                }
                {(author && author.data && author.data.name) &&
                    <div className='font-lato font-bold uppercase text-jw-dark-blue text-2 sm:text-xs tracking-xl'>
                        <span>BY </span>
                        <span className='text-jw-green-4'>{author.data.name}</span>
                    </div>
                }
                {publicationDate && 
                    <span className='font-semibold text-1.5 sm:text-2 text-jw-gray-3 mt-2 block uppercase'>{moment.utc(date).format("MMMM DD, YYYY")}</span>
                }
            </div>
       </div>
    )
}

export default HeroComponent