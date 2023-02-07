import React from 'react'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'
import LinkWrapper from '../../components/LinkWrapper'
import Bull from '../../assets/img/bull.png'

const PostCta = ({ slice }) => {
  const { text, sliceLink, textLink } = slice.primary

  return (<section className='post-cta'>
    <div className='relative bg-jw-dark-blue text-white font-semibold flex flex-col md:flex-row overflow-hidden my-1 sm:my-3 xxl:my-4'>
      <div className='absolute -top-2 md:-top-4 lg:-top-6 xxl:-top-8 2xl:-top-12 right-0 pr-8 md:pr-16 xl:pr-22 2xl:pr-28'>
          <div className='w-14 md:w-22 lg:w-32 xxl:w-40 2xl:w-60'>
            <Image src={Bull} alt="" />
          </div>
      </div>
      <div className='hero__richtext w-4/5 md:w-3/5 py-8 sm:py-16 md:py-22 xl:py-32 2xl:py-46 pl-8 md:pl-16 xl:pl-24 2xl:pl-32'>
        { text &&
          <PrismicRichText field={text} />
        }
      </div>
      <div className='relative md:w-2/5 flex flex-col md:items-end justify-end pr-14 md:pr-18 xl:pr-22 2xl:pr-28 pl-8 md:pl-16 lg:pl-24 xl:pl-30 2xl:pl-40 pb-6 md:pb-12 xl:pb-20'>
        <div className='font-bold font-lato text-2 xs:text-xs md:text-base lg:text-lg xxl:text-22'>
            { (sliceLink && sliceLink.link_type !== "Any") ?
              <LinkWrapper link={sliceLink} className="">
                <div className=''>
                  <span>{textLink}</span>
                </div>
              </LinkWrapper>
              :
              <div className=''>
                <span>{textLink}</span>
              </div>
            }
        </div>
      </div>
    </div>
  </section>
)}

export default PostCta

// const LinkWrapper = (data) => {
//   if(data.link.link_type === "Web"){
//     var url = data.link.url.replace("https://#", "#")
//     return (
//     <Link href={url} >
//       <a className={data.className}>{data.children}</a>
//     </Link>
//   )}else{
//     return (<PrismicLink field={data.link} className={data.className}>
//       {data.children}
//     </PrismicLink>)
//   } 
// }