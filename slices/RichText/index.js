import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import LinkWrapper from '../../components/LinkWrapper'

const RichText = ({ slice }) => {
  
  return <section className='richtext px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 p-richtext'>
    <div className='3xl:container mx-auto text-black text-xs md:text-lg p-post'>
      { slice.primary.Content &&
        <PrismicRichText 
          field={slice.primary.Content}
          components={{
            hyperlink: ({ node, children }) => {
              return <LinkWrapper link={node.data}>{children}</LinkWrapper>
            },
          }}
        />
      }
    </div>
  </section>
}

export default RichText