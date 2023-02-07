import React from 'react'
import { PrismicLink } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers';
import moment from 'moment';

const SuggestPost = ({ posts }) => {
  const n = 3;
  const suggest = posts
  .map(x => ({ x, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map(a => a.x)
  .slice(0, n);

  return <section className='richtext pb-2 md:pb-20 xl:pb-28 pt-6 md:pt-10 lg:pt-16 xxl:pt-22'>
    <div className='px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46'>
      <div className='3xl:container mx-auto w-full p-post'>
        <p className='py-6 text-jw-dark-blue tracking-xl font-lato font-bold border-t border-jw-green-4'>MORE IDEAS</p>
      </div>
    </div>
    <div className='px-0 md:px-12 lg:px-20 xl:px-24 3xl:px-46'>
      <div className='3xl:container mx-auto w-full mt-5 lg:mt-8 xxl:mt-16 p-post'>
        <div className='grid grid-cols-2 xl:grid-cols-3 gap-1 md:gap-6 lg:gap-10 2xl:gap-16  posts-suggestion'>
          {suggest.map((item, i) => {
              return (
                  <Post key={i} index={i} item={item} uid={item.uid} />
              )
          })}
        </div>
      </div>
    </div>
    
  </section>
}

export default SuggestPost

const Post = ({item, index}) => {
    const {title, publicationDate, postImage} = item.data
    var date = prismicH.asDate(publicationDate)
    var type = index % 2 == 0 ? "odd" : "even"
    switch (type) {
      case "odd":
        return (
        <React.Fragment key={'post-'+index}>
          <PrismicLink href={"/ideas/"+item.uid}  className={`flex flex-col relative text-jw-dark-blue h-52 sm:h-full sm:min-h-96`}>
            <div className='relative inset-0 w-full hero__richtext '>
              <div className="px-5 pt-1 md:pt-2 xl:pt-3 pb-2 md:pb-4 xl:pb-6 bg-white border border-jw-gray-2 border-b-0">
                <div className='font-semibold text-base md:text-xl lg:text-2xl '>
                  <div className='inline capitalize'>
                      { title &&
                        prismicH.asText(title)
                      }
                  </div>
                  <span className='inline font-medium text-base md:text-xl lg:text-2xl'>—</span>
                  <span className='inline font-medium text-base md:text-xl lg:text-2xl'>{moment(date).format("MMMM YYYY")}</span>
                </div>
              </div>
            </div>
            <div className='relative w-full h-full bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${postImage.url})` }}></div>
          </PrismicLink>
        </React.Fragment>
        )
     case "even":
        return (
        <React.Fragment key={'post-'+index}>
          <PrismicLink href={"/ideas/"+item.uid} key={'post-'+index} className={`flex flex-col justify-end relative text-jw-dark-blue  h-52 sm:h-full sm:min-h-96`}>
            <div className='absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${postImage.url})` }}></div>
            <div className='relative inset-0 w-full hero__richtext '>
            <div className="px-5 pt-1 md:pt-2 xl:pt-3 pb-2 md:pb-4 xl:pb-6 bg-black/60 text-white">
                <div className='font-medium text-base md:text-xl lg:text-2xl '>
                    <div className='inline capitalize'>
                      { title &&
                        prismicH.asText(title)
                      }
                    </div>
                    <span className='inline font-medium text-base md:text-xl lg:text-2xl'>—</span>
                    <span className='inline font-medium text-base md:text-xl lg:text-2xl'>{moment(date).format("MMMM YYYY")}</span>
                </div>
              </div>
            </div>
          </PrismicLink>
        </React.Fragment>
        ) 
      
      default:
        return (<></>)
    }
  }