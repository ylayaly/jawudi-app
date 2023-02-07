import React from 'react'
import Image from 'next/image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers';
import ArrowWhite from '../../assets/img/arrow-white.svg'
import ArrowBlue from '../../assets/img/arrow-blue.svg'
import moment from 'moment';

const PostsList = ({ slice }) => {
  var itemsFull = slice.items
  var index = -1

  function sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
          const chunk = arr.slice(i, i + chunkSize);
          res.push(chunk);
      }
      return res;
  }

  itemsFull = sliceIntoChunks(itemsFull, 4)

  return (
    <section id={slice.primary.sectionID} className='posts-list my-1 sm:my-3 xxl:my-4'>
        {itemsFull.map((items, k) => {
          return (
            <div key={k} className={`grid ${ items.length >= 3 ? 'xxl:grid-flow-col xxl:grid-rows-2' : '' } ${ items.length >= 2 ? 'grid-cols-8' : '' } gap-1 sm:gap-3 xxl:gap-4 ${ slice.primary.theme === "Theme I" || items.length >= 3 ? 'lg:min-h-[1025px]' : 'lg:min-h-[600px]' }`}>
              {items.map((item, key) => {
                index = index > 2 ? 0 : index + 1
                return (
                    <Post key={key} index={index} item={item} uid={item.post.uid} theme={slice.primary.theme} total={items.length}/>
                )
              })}
            </div>
          )
        })}
    </section>
  )}

export default PostsList

const Post = ({index, item, theme, total}) => {
  const {title, subtitle, shortDescription, publicationDate, postImage} = item.post.data
  var date = prismicH.asDate(publicationDate)
  var typePost = theme + " - " + index

  switch (typePost) {
    case "Theme I - 0":
    case "Theme II - 3":
      return (
        <PrismicLink href={"/ideas/"+item.post.uid} key={'post-'+index} className={`col-span-8 ${(total >= 4 ? (index === 0 ? 'lg:col-span-5' : 'lg:col-span-3') : total >= 3 ? 'lg:col-span-8' : 'lg:col-span-4')} flex flex-col text-jw-dark-blue ${(total >= 4 ? 'xxl:col-span-3 xxl:row-span-2' : total >= 3 ? 'xxl:col-span-5 xxl:row-span-2' : 'xxl:col-span-4')}`}>
          <div className='w-full bg-center bg-cover bg-no-repeat h-full min-h-72 sm:min-h-96' style={{ backgroundImage: `url(${postImage.url})` }}></div>
          <div className={'w-full hero__richtext lg:border-b lg:border-t border-jw-gray-2 h-[47%] ' + (index === 3 ? ' lg:border-l' : ' lg:border-r')}>
            <div className='px-5 py-4'>
              { shortDescription &&
                <PrismicRichText field={shortDescription}/>
              }
            </div>
            <div className="flex px-5 pt-3 md:pt-6 lg:pt-9 2xl:pt-11 pb-2 md:pb-5 lg:pb-10 2xl:pb-16">
              <div className='font-bold uppercase text-2 sm:text-xs lg:text-base xxl:text-lg 2xl:text-22 font-lato tracking-xl w-3/4'>
                  { subtitle &&
                    prismicH.asText(subtitle)
                  }
              </div>
              <div className='w-1/4'>
                  <div className='block w-3 h-3 md:w-6 md:h-6 lg:w-10 lg:h-10 xxl:w-max xxl:h-max ml-auto'>
                    <Image src={ArrowBlue} alt="" />
                  </div>
              </div>
            </div>
          </div>
        </PrismicLink>
      )
    case "Theme I - 1":
    case "Theme II - 0":
      return (
        <PrismicLink href={"/ideas/"+item.post.uid} key={'post-'+index} className={`${(total >= 3 || index === 0 ? 'col-span-4' : 'col-span-8')} ${(total >= 4 ? (index === 1 ? 'lg:col-span-3' : 'lg:col-span-4') : 'lg:col-span-4')} flex flex-col relative text-jw-dark-blue h-52 sm:h-full sm:min-h-72 md:min-h-96 ${(total >= 4 ? 'xxl:col-span-2 ' : total >= 3 ? 'xxl:col-span-3' : 'xxl:col-span-4')}`}>
          <div className='relative inset-0 w-full hero__richtext '>
            <div className="px-5 pt-1 lg:pt-2 xl:pt-3 pb-2 lg:pb-4 xl:pb-6 bg-white border border-jw-gray-2 border-b-0">
              <div className='font-semibold text-base md:text-xl lg:text-2xl 2xl:text-5xl '>
                <div className='inline'>
                    { title &&
                      prismicH.asText(title)
                    }
                </div>
                <span className='inline font-medium text-base md:text-xl lg:text-2xl 2xl:text-4xl'>—</span>
                <span className='inline font-medium text-base md:text-xl lg:text-2xl 2xl:text-4xl'>{moment(date).format("MMMM YYYY")}</span>
              </div>
            </div>
          </div>
          <div className='relative w-full h-full bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${postImage.url})` }}></div>
        </PrismicLink>
      )
    case "Theme I - 2":
    case "Theme II - 1":
      return (
        <PrismicLink href={"/ideas/"+item.post.uid} key={'post-'+index} className={`col-span-4 ${(total >= 4 ? (index === 2 ? 'lg:col-span-3' : 'lg:col-span-4') : 'lg:col-span-4')} ${(total >= 4 ? 'xxl:col-span-2 ' : total >= 3 ? 'xxl:col-span-3' : 'xxl:col-span-4')} flex flex-col justify-end relative text-jw-dark-blue h-52 sm:h-full sm:min-h-72 md:min-h-96`}>
          <div className='absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${postImage.url})` }}></div>
          <div className='relative inset-0 w-full hero__richtext '>
          <div className="px-5 pt-1 lg:pt-2 xl:pt-3 pb-2 lg:pb-4 xl:pb-6 bg-black/60 text-white">
              <div className='font-medium text-base md:text-xl lg:text-2xl 2xl:text-11 lg:leading-6 xxl:leading-9 '>
                  <div className='inline'>
                    { title &&
                      prismicH.asText(title)
                    }
                  </div>
                  <span className='inline font-medium text-base md:text-xl lg:text-2xl 2xl:text-4xl'>—</span>
                  <span className='inline font-medium text-base md:text-xl lg:text-2xl 2xl:text-4xl'>{moment(date).format("MMMM YYYY")}</span>
              </div>
            </div>
          </div>
        </PrismicLink>
      ) 
    case "Theme I - 3":
    case "Theme II - 2":
      return (
        <PrismicLink href={"/ideas/"+item.post.uid} key={'post-'+index} className={`col-span-8 ${(total >= 4 ? (index === 3 ? 'lg:col-span-5' : 'lg:col-span-5') : 'lg:col-span-4 lg:row-span-2')} ${total >= 4 ? 'xxl:col-span-3' : 'xxl:col-span-5'} xxl:row-span-2 flex flex-col justify-end relative text-jw-dark-blue h-full min-h-72 sm:min-h-96  ${index === 3 ? 'lg:min-h-160' : ''} `}>
          <div className='absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${postImage.url})` }}></div>
          <div className='relative inset-0 w-full hero__richtext '>
            <div className="px-6 pt-6 lg:pt-10 xxl:pt-14 pb-4 lg:pb-5 xxl:pb-6 bg-black/60 text-white flex">
              <div className='font-bold font-lato text-sm md:text-base lg:text-xl xxl:text-2xl w-3/4 tracking-lg 2xl:pr-11'>
                { subtitle &&
                    prismicH.asText(subtitle)
                }
              </div>
              <div className='w-1/4 flex justify-end items-center'>
                <div className='w-max h-max ml-auto transform rotate-180'>
                  <Image src={ArrowWhite} alt="" />
                </div>
              </div>
            </div>
          </div>
        </PrismicLink>
      )  
    default:
      return (<></>)
  }
}