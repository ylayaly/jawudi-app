import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { PrismicRichText, PrismicImage } from '@prismicio/react'
import CoinIcon from '../../components/icons/coin'
import Info from '../../components/icons/info'
import PlayerVideo from '../../components/player'
import Icon from '../../components/icon'
import * as prismicH from '@prismicio/helpers'

const Tabs = ({ slice }) => {
  slice.items.map((item, i) => {
    item.id = i
    return item
  })
  const [active, setActive] = useState(0)
  const [activeTab, setActiveTab] = useState(slice.items.length > 0 ? slice.items[0] : null)
  const [showInfo, setShowInfo] = useState(false)
  const [animateInfo, setAnimateInfo] = useState("animate-show")
  const [changing, setChanging] = useState(false)
  const [showBgText, setShowBgText] = useState(false)


  useEffect(() => {
    setTimeout(function () {
      setShowBgText(true)
    }, 3000)
  }, [])

  function hideInfo() {
    setAnimateInfo("animate-hide")
    setTimeout(function () {
      setShowInfo(false)
      setAnimateInfo("animate-show")
    }, 900)
  }

  function changeTab(i) {
    setChanging(true);
    setShowBgText(false)
    // setShowVideo(false)
    // setVideoProgress(0)
    setTimeout(_ => {
      setChanging(false);
      setActiveTab(slice.items[i]);
      setActive(i);
      setTimeout(function () {
        setShowBgText(true)
      }, 3000)
    }, 500);
  }

  return (<section className='tabs-products relative' id={slice.primary.UID}>
    <div className='bg-jw-dark-blue tabs-products__bg bg-bottom-product-tabs pb-24 md:pb-32 lg:pb-64 px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46'>
      <div className='3xl:container mx-auto tabs-products__header flex w-full justify-center'>
        <div className='flex justify-between w-full gap-8'>
          <div className='flex items-end'>
            {slice.items.map((tab, i) => {
              const { Title } = tab
              return (
                Title && <h4 key={"tab-header-" + i} className={`uppercase text-2 lg:text-xs font-lato font-bold px-4 py-1 border-3 cursor-pointer ${active == i ? 'text-jw-green-1 border-jw-turquoise-2' : 'text-white/50 border-transparent'} `} onClick={() => changeTab(i)}>{Title}</h4>
              )
            })
            }
          </div>
          <div className='max-w-[50%]'>
            <div className='w-6 md:w-8 lg:w-12 h-auto mx-auto'>
              <CoinIcon />
            </div>
            <div className='text-jw-golden font-semibold mt-1 lg:mt-3 relative md:w-max mx-auto max-w-1/2 flex justify-center items-center gap-1 xs:gap-2'>
              <span className='text-center xs:text-left text-2 md:text-xs lg:text-sm xxl:text-base'>{activeTab.information}</span>
              <div className={`w-5 cursor-pointer inline-flex transition duration-500 ${showInfo ? 'opacity-0' : 'opacity-100'}`} onClick={() => setShowInfo(true)}><Info /></div>
              {showInfo && <div className={`absolute border border-jw-golden bg-jw-dark-blue z-20 rounded-xl py-5 pl-3 pr-7 top-[150%] xs:top-full -left-full w-auto xs:left-0 xs:w-full flex items-center gap-4 cursor-pointer transition duration-500 ${animateInfo}`} onClick={() => hideInfo()}>
                <Info />
                <span className='block w-full font-bold'>{activeTab.detail}</span>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
      {activeTab && <div className={`tabs-products__body transition-opacity duration-300 ${changing ? 'opacity-0' : 'opacity-100'} `}>
          {slice.items.map((tab, key) => {
              return (
                <Tab key={key} id={key} tab={tab} activeTab={activeTab} showBgText={showBgText} changing={changing} />
              )
            })}
      </div>}
    </div>
    <div className="hidden md:block absolute -bottom-px right-0 left-0 h-18 xl:h-28 2xl:h-36 bg-footer"></div>
  </section>
  )
}

export default Tabs

const PlayVideo = ({ setShowVideo, showVideo, videoProgress }) => {
  return (
    <button onClick={() => setShowVideo(!showVideo)} className='relative video border border-white/60 rounded-full w-16 xs:w-24 h-16 xs:h-24 sm:w-7 sm:h-7 md:w-12 md:h-12 xl:w-16 xl:h-16 flex items-center justify-center mt-7'>
      <div className='absolute inset-0 circle-progress flex w-full h-full rounded-full' style={{ "--progress": `${videoProgress}deg` }}></div>
      {!showVideo
        ? <Icon icon={'play-products'} className={'relative w-6 h-6 sm:w-2 sm:h-2 md:w-4 md:h-4 xl:w-5 xl:h-5 text-jw-green-1 pl-1 sm:pl-[1px] md:pl-[3px] xl:pl-[5px]'} />
        : <Icon icon={'pause-products'} className={'relative w-6 h-6 sm:w-2 sm:h-2 md:w-4 md:h-4 xl:w-5 xl:h-5 text-jw-green-1'} />
      }
    </button>
  )
}

const Tab = ({ id, tab, activeTab, showBgText, changing }) => {
  const [showVideo, setShowVideo] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)

  useEffect(() => {
    if (videoProgress === 360) {
      setShowVideo(false)
    }
  }, [videoProgress])

  return (
    <div key={id} className={`3xl:container mx-auto flex-col gap-12 sm:gap-0 sm:grid-cols-2 lg:grid-cols-tabs-products pt-12 lg:pt-26 w-full ${activeTab.id === tab.id ? 'flex sm:grid ' : 'hidden'}`}>
        <div className='hidden lg:block'></div>
        <div className='flex gap-8 w-full lg:w-3/5 xl:w-[55%] xxl:w-1/2 mx-auto order-3 sm:order-1'>
          {tab && tab.viedo && tab.viedo.url &&
            <div className='relative min-h-96'>
              {(tab.tabImage && tab.tabImage.url) &&
                <div className='absolute inset-0 w-full h-full rounded-3xl xs:rounded-[3rem] py-2 px-3 xs:py-3 xs:px-4'>
                  <PrismicImage field={tab.tabImage} className="object-cover h-full w-full rounded-3xl " />
                  </div>
              }
              <PlayerVideo parentClass="relative" className="rounded-3xl xs:rounded-[3rem] py-2 px-3 xs:py-3 xs:px-4" source={tab.viedo.url} id={id} showVideo={showVideo} setPercent={(p) => setVideoProgress(p)} />
              <div className='absolute inset-0 bg-video-mask bg-center bg-contain bg-no-repeat'></div>
            </div>}
          <div className='sm:hidden'>
            <PlayVideo setShowVideo={setShowVideo} showVideo={showVideo} videoProgress={videoProgress} />
          </div>
        </div>
        <div className='flex flex-col justify-center richtext__jw sm:pl-12 lg:pl-0 order-2'>
          {!changing && <div className='relative px-2 lg:px-4 opacity-90 text-jw-dark-blue inline-flex gap-2 lg:gap-3 items-center w-max lg:w-auto '>
            <span className='absolute inset-0 block transition-all animate-showFull bg-jw-green-1/40'></span>
            {showBgText && <span className='absolute inset-0 block transition-all animate-showFullDark bg-jw-green-1'></span>}
            <div className='relative'>
              <PrismicRichText field={tab.title} />
            </div>
          </div>}

          <div className='text-white mt-8 lg:mt-12 2xl:mt-14'>
            <PrismicRichText field={tab.description} />
          </div>
          <div className='hidden sm:block'>
            <PlayVideo setShowVideo={setShowVideo} showVideo={showVideo} videoProgress={videoProgress} />
          </div>
          <div>

          </div>
        </div>
    </div>
  )
}