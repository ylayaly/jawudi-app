import React, { useState, useEffect } from 'react'
import * as prismicH from '@prismicio/helpers'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import Link from 'next/link'
import Icon from '../../components/icon'
import Arrow from '../../components/icons/arrow'

const PeopleSlider = ({ slice }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [people, setPeople] = useState(slice.items[0])
  const [peoples, setPeoples] = useState(slice.items.concat(slice.items))
  const [openDetail, setOpenDetail] = useState(false)
  const [nextSlide, setNextSlide] = useState(false)
  const [opacity, setOpacity] = useState(false)

  useEffect(() => {
    setIsMobile(document.body.clientWidth < 768)
    const handleResize = () => {
        setIsMobile(document.body.clientWidth < 768)
    }
    window.addEventListener('resize', handleResize, true)
    return () => {
      window.addEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if(openDetail && !isMobile){
      setTimeout(function(){
        window.scrollTo({
          top: document.getElementById("detail").offsetTop - 60,
          behavior: 'smooth',
        });
      }, 500)
    }

  }, [openDetail])

  

  function handleClick(p, index = 0){
    if(!isMobile) {
      setOpenDetail(false)
      setOpacity(true)
      setTimeout(() => { setPeople(p); setOpacity(false) }, 300)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }else{
      setOpenDetail(!openDetail)
      setTimeout(() => {
        document.getElementById("people-"+index).scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400)
      
    }
  }

  function changeSlide(){
    if(peoples.length > 0 && !nextSlide){
      setNextSlide(true)
      setTimeout(function(){
        var t = peoples[0].name === people.name ? 2 : 1
        var p = peoples.splice(0, t)
        var ps = peoples.concat(p)
        setPeoples(ps)
        setNextSlide(false)
      }, 500)
  }
  }

  return (
    <section className='people-section'>
     <div className='bg-jw-dark-blue/50 '>
      <div className={'relative min-h-112 flex items-end cursor-pointer transition-all duration-300 md:min-h-160 xl:min-h-220 ' + (opacity ? ' opacity-10 ' : ' opacity-100 ') } onClick={() => setOpenDetail(!openDetail)}>
          <div className='absolute inset-0 bg-cover bg-center ' style={{ backgroundImage : `url(${people.image.url})` }}></div>
          <div className='absolute inset-0 bg-jw-dark-blue/20'></div>
          <div className='absolute bg-white people-section__image -top-1 left-0 w-full h-16 md:hidden'></div>
          <div className='relative h-full grid md:grid-cols-5 xl:grid-cols-3 items-end'>
            <div className={'md:col-start-4 md:col-span-2 xl:col-start-3 xl:col-span-1 text-white md:text-jw-dark-blue flex-col justify-end py-14 md:py-24 xl:py-32 2xl:py-46 px-8 md:pl-0 md:pr-20 xl:pr-28 2xl:pr-39 ' + (openDetail ? ' md:animate-hide md:opacity-0' : ' md:animate-show opacity-100' )}>
                {people.name &&
                  <div className='font-bold text-xs md:text-xl xl:text-22'><PrismicRichText field={people.name}/></div>
                }
                <p className='font-medium text-xs md:text-lg xl:text-lg mb-4'>{people.position}</p>
                <div className='richtext hidden md:block font-aeonik'>
                  {people.shortDescription &&
                    <PrismicRichText field={people.shortDescription}/>
                  }
                </div>
                <div className='flex items-center xs:items-start md:items-center gap-4 mt-4'>
                  {(people.linkedin && people.linkedin.link_type !== "Any") &&
                      <div><PrismicLink field={people.linkedin}>
                        <Icon className={'inline-block md:hidden'} icon={'linkedin'} />
                        <Icon className={'hidden md:inline-block'} icon={'linkedinBlack'} />
                      </PrismicLink></div>
                  }
                  {(people.email) &&
                      <div>
                        <a href={"mailto:"+people.email} target="_blank">
                          <Icon className={'inline-block w-6 md:w-7 md:h-7'} icon={'email'} />
                        </a>
                      </div>
                  }
                </div>
                <div className='w-max md:mt-8'>
                  <span className='uppercase font-lato text-xxs md:text-sm xxl:text-base'>LEARN MORE</span>
                  <span className='border-b border-white lg:border-jw-dark-blue block w-full'></span>
                </div>
            </div>
          </div>
      </div>
     </div>
     <span id="detail"></span>
      {openDetail && <_DetailPeople p={people} openDetail={openDetail} />}

      <div className={'flex ' + (!openDetail && 'mt-2 md:mt-3')}>
        <div className='w-full md:w-slide overflow-hidden'>
          <div className={'grid md:flex gap-1 md:gap-3  '+ (openDetail ? '' : 'grid-cols-2') + (nextSlide ? " transition-all duration-500 -translate-x-slide-t xl:-translate-x-slide-w " : "")}>
            {!isMobile && peoples.map((p, key) => {
              return (
                p.name !== people.name && 
                <React.Fragment key={'people-'+key}><div className='relative md:w-[30vw] xl:w-109 flex-shrink-0 ' onClick={() => {handleClick(p)}}>
                  <div className={'h-full ' + (openDetail ? "min-h-74 max-h-74" : "min-h-36 lg:min-h-76 lg:h-76")}>
                    <img className='object-cover object-center h-full w-full' src={prismicH.asImageSrc(p.image)} />
                    <div className='absolute inset-0 people-section__item cursor-pointer'>
                      <div className={'people-section__bg md:bg-transparent absolute inset-0 opacity-75 ' + (openDetail ? 'bg-black/20' : '')}></div>
                      <div className={'people-section__info absolute inset-0 p-6 md:p-8 flex-col justify-end text-white font-bold text-2 md:text-sm ' + (openDetail ? 'flex md:hidden' : 'hidden')}>
                        {p.name &&
                          <PrismicRichText field={p.name}/>
                        }
                        <p className='font-medium'>{p.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {openDetail && <_DetailPeople p={people} className={" md:hidden"} openDetail={openDetail} />}
                </React.Fragment>
              )
            })
            }
            {isMobile && slice.items.map((p, key) => {
              return (
                p.name !== people.name && 
                <React.Fragment key={'people-m-'+key}><div id={'people-'+key} className='relative md:w-109 flex-shrink-0 ' onClick={() => {handleClick(p, key)}}>
                  <div className={'h-full ' + (openDetail ? "min-h-74 max-h-74" : "min-h-36 lg:min-h-76 lg:h-76")}>
                    <img className='object-cover object-center h-full w-full' src={prismicH.asImageSrc(p.image)} />
                    <div className='absolute inset-0 people-section__item cursor-pointer'>
                      <div className={'people-section__bg md:bg-transparent absolute inset-0 opacity-75 ' + (openDetail ? 'bg-black/20' : '')}></div>
                      <div className={'people-section__info absolute inset-0 p-6 md:p-8 flex-col justify-end text-white font-bold text-2 md:text-sm ' + (openDetail ? 'flex md:hidden' : 'hidden')}>
                        {p.name &&
                          <PrismicRichText field={p.name}/>
                        }
                        <p className='font-medium'>{p.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {openDetail && <_DetailPeople p={people} className={" md:hidden"} openDetail={openDetail} />}
                </React.Fragment>
              )
            })
            }
          </div>
        </div>
        <div className='hidden md:flex items-center justify-center pl-6 lg:pl-8 xxl:pl-16 pr-4 lg:pr-6 xxl:pr-10 cursor-pointer' onClick={() => changeSlide()}>
            <Arrow />
        </div>
      </div>
      <svg width={0} height={0}>
        <clipPath id="people__mobile_top" clipPathUnits="objectBoundingBox" >
          <path id="Trazado_194" data-name="Trazado 194" d="M-5995.223,5985.833v.423c-.1-.126-.2,1.067-.643.342-.144-.234-.263-.23-.357-.109v-.656Z" transform="translate(5996.223 -5985.833)" fill="#3bbcc4"/>
        </clipPath>
      </svg>
    </section>
  )}

export default PeopleSlider

const _DetailPeople = ({ p, openDetail, className = '' }) => {
  
  return (
    <div className={'people-section__long-detail overflow-hidden animate-showMobile ' + (!openDetail ? 'animate-hideMobile max-h-0 ' : '') + className}>
        <div className='md:bg-jw-gray/20 p-8 md:py-16 xl:py-20 2xl:py-26 md:px-22 lg:px-32 xl:px-44 2xl:px-56 text-jw-dark-blue md:m-4'>
            {p.name &&
              <div className='font-bold text-xs md:text-xl xl:text-22 hidden md:block'><PrismicRichText field={p.name}/></div>
            }
            <p className='font-medium text-xs md:text-lg xl:text-lg mb-4 hidden md:block'>{p.position}</p>
            <div className='gap-4 mt-4 hidden md:flex items-center'>
              {(p.linkedin && p.linkedin.link_type !== "Any") &&
                  <PrismicLink field={p.linkedin}>
                    <Icon className={''} icon={'linkedinBlack'} />
                  </PrismicLink>
              }
              {(p.email) &&
                <div>
                  <a href={"mailto:"+p.email} target="_blank">
                    <Icon className={'inline-block w-6 md:w-7 md:h-7'} icon={'email'} />
                  </a>
                </div>
              }
            </div>
            {p.shortDescription &&
              <div className='richtext font-aeonik md:mt-4 lg:mt-8 xl:mt-12 2xl:mt-18'>
                <PrismicRichText field={p.description}/>
              </div>
            }
            
        </div>
      </div>
  )
}


