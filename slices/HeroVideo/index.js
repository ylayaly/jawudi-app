import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import YouTube from 'react-youtube';
import { PrismicRichText } from '@prismicio/react'
import { PrismicLink } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'

import Logo from '../../assets/img/logo.svg'
import BgHeroVideo from '../../assets/background/bg_hero_video.png'
import Icon from '../../components/icon'
import PlayerVideo from '../../components/player';

const HeroVideo = ({ slice }) => {
  const {title, subtitle, subtitle_white, link, TextLink, QRcode, textQRCode, youtubeVideo, localVideo} = slice.primary;
  const src = prismicH.asImageSrc(QRcode)
  const hero_image = slice.primary.Image
  const srcImage = prismicH.asImageSrc(hero_image)
  const {width, height} = hero_image.dimensions

  const hero_image_mobile = slice.primary.Image.Mobile
  const srcImageMobile = prismicH.asImageSrc(hero_image_mobile)

  const [showVideo, setShowVideo] = useState(false)
  const [player, setplayer] = useState({})
  const [showBgText, setShowBgText] = useState(false)
  const [showPulse, setShowPulse] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [subtitleText, setSubtitleText] = useState("")
  const [heightSection, setheightSection] = useState(null)
  var i = 0;
  
  function onPlayerReady(event) {
    setplayer(event.target)
  }

  function addSubtitleChar(){
    setSubtitleText(subtitle_white.slice(0, i))
    setTimeout(function(){
      if(subtitle_white.length > i){
        i++;
        addSubtitleChar()
      }
    }, 160)
  }

  useEffect(() => {
    if(youtubeVideo && Object.keys(player).length > 0){
      if(showVideo){
        player.playVideo();
      }else{
        player.pauseVideo();
      }
    }
  }, [showVideo])

  useEffect(() => {
    addSubtitleChar()
    setTimeout(function(){
      setShowBgText(true)
    }, 3000)
    setTimeout(function(){
      setShowPulse(true)
    }, 1500)
    setTimeout(function(){
      setShowQR(true)
    }, 4000)
    var h = window.innerHeight < window.innerWidth * 0.5625 ? window.innerHeight : window.innerWidth * 0.5625
    h = h > 1080 ? "1080px" : h
    setheightSection(h)

    window.addEventListener('resize', function(event) {
      var h = window.innerHeight < window.innerWidth * 0.5625 ? window.innerHeight : window.innerWidth * 0.5625
      h = h > 1080 ? "1080px" : h
      setheightSection(h)
    }, true);
  }, [])

  return <section className='hero hero-video bg-jw-turquoise-1 relative' style={{minHeight: heightSection}}>
    <div className=' w-full h-full relative px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 pt-28 xs:pt-40 sm:pt-64 md:pt-20 xl:pt-32'>
      <div className='hero-video__background absolute inset-0 bottom-auto md:bottom-0 h-full' ></div>
      <div className='md:grid grid-cols-hero-video h-full gap-2 lg:gap-4 2xl::gap-8 3xl:container mx-auto 3xl:min-h-[59.5rem]' >
        <div className='relative'>
          <div className='relative flex flex-col justify-end md:justify-center lg:justify-end h-full items-start md:pb-12 lg:pb-0'>
              <div className='hero-video__richtext text-white w-full mt-14 xs:mt-18 md:mt-0 text-center md:text-left xs:w-3/4 md:w-full mx-auto lg:pb-32 xl:pb-48 xxl:pb-56 2xl:pb-72 text-clip font-neutrafaceText font-book'>
                {title &&
                  <PrismicRichText field={title}/>
                }
                <div className='block mt-3 font-neutrafaceDisplay font-medium'>
                  {subtitle &&
                    <div className='relative lg:-left-3 px-4 opacity-90 mt-2 lg:mt-3 xl:mt-8 text-jw-dark-blue inline-flex gap-2 lg:gap-3 items-center w-max lg:w-auto mx-auto lg:mx-0 '>
                      <span className='absolute inset-0 block transition-all animate-showFull bg-jw-green-1/40'></span>
                      {showBgText && <span className='absolute inset-0 block transition-all animate-showFullDark bg-jw-green-1'></span>}
                      <PrismicRichText field={subtitle}/>
                    </div>
                  }
                  {subtitle_white &&
                    <div className='relative opacity-90 mt-2 lg:mt-3 xl:mt-8 text-white gap-2 lg:inline-block lg:gap-3 items-center w-max md:w-auto mx-auto'>
                      <h3>{subtitleText}</h3>
                    </div>
                  }                  
                </div>

                <div className='hidden md:block mt-2 lg:mt-12 xl:mt-16 w-max max-w-full font-lato'>
                  {(link && link.link_type !== "Any") ?
                    <PrismicLink field={link}>
                      <span className='text-jw-green-1 font-medium text-9 lg:text-xs tracking-widest'>{TextLink}</span>
                    </PrismicLink>
                    :
                    <span className='text-jw-green-1 font-medium text-9 lg:text-xs tracking-widest'>{TextLink}</span>
                  }
                  <span className='block w-1/2 bg-jw-green-1 h-1 lg:mt-2'></span>
                </div>
                
              </div>
            </div>
            {showQR && <div className='absolute bottom-0 right-0 w-18 lg:w-28 xl:w-32 xxl:w-40 3xl:w-52 bg-white rounded-t-lg lg:rounded-t-xxl hidden md:block animate-upQR'>
              <div className='gap-4 lg:gap-8 items-center mb-12 xl:mb-16 xxl:mb-20 2xl:mb-24 3xl:mb-20 p-2 lg:p-4 3xl:p-6'>
                <div className='w-full h-auto rounded-lg mb-2 xxl:mb-5'>
                  <img src={src} alt={QRcode.alt} />
                </div>
                <span className='font-semibold text-2 lg:text-xs xl:text-sm 2xl:text-base leading-tight text-center font-lato text-jw-dark-blue uppercase block w-full mb-2 xxl:mb-6'>{textQRCode}</span>
                <Image src={Logo.src} width={Logo.width} height={Logo.height} alt=""/>
              </div>
            </div>}
        </div>
        <div className='hero-video__image mt-4 md:mt-0 flex items-end justify-center md:justify-end'>
          <div className='relative w-full h-full lg:pt-8'>
            <div className='hidden md:flex justify-end items-end h-full w-full'>
              <div className='relative img w-full h-[90%]'>
                <img className='ml-auto w-full h-full' alt="" src={BgHeroVideo.src} width={BgHeroVideo.width} height={BgHeroVideo.height}/>
                <div className='absolute inset-0 bg-contain xxl:bg-cover bg-no-repeat bg-bottom xxl:bg-top' style={{backgroundImage: `url(${srcImage})`}}></div>
                <div className='absolute inset-0 flex justify-center items-center z-10'>
                  <button type="button" onClick={() => setShowVideo(true)} className='block w-1/3 relative'>
                    <div className='absolute inset-0 w-full h-full flex justify-center items-center'>
                      <div className='block border border-jw-green-1 rounded-full animate-pulseBtn h-full w-full relative'></div>
                    </div>
                    {showPulse && <div className='absolute inset-0 w-full h-full flex justify-center items-center'>
                      <div className='block border border-jw-green-1 rounded-full animate-pulseBtn h-full w-full relative'></div>
                    </div>}
                    <Icon icon='play' />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex md:hidden relative'>
              <img className='ml-auto w-full h-full' src={BgHeroVideo.src} width={BgHeroVideo.width} height={BgHeroVideo.height} alt=""/>
              <div className='absolute inset-0 bg-contain bg-no-repeat bg-center md:bg-right-top' style={{backgroundImage: `url(${srcImageMobile})`}}></div>
              <div className='absolute inset-0 flex justify-center items-center z-10'>
                <button type="button" onClick={() => setShowVideo(true)} className='block w-1/3 relative'>
                  <div className='absolute inset-0 w-full h-full flex justify-center items-center'>
                    <div className='block border border-jw-green-1 rounded-full animate-pulseBtn h-full w-full relative'></div>
                  </div>
                  {showPulse && <div className='absolute inset-0 w-full h-full flex justify-center items-center'>
                    <div className='block border border-jw-green-1 rounded-full animate-pulseBtn h-full w-full relative'></div>
                  </div>}
                  <Icon icon='play' /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='hero-video__vision block md:hidden w-full h-56 xs:mt-24 pt-24'>
        <button type="button" onClick={() => setShowVideo(true)} className='flex justify-between text-white items-center border border-white rounded-full py-2 px-3 mx-auto text-xxs font-medium'>
            <span className='mr-2'>THE JAWUDI VISION </span>
            <span className='block w-3 h-3'><Icon icon='play' /></span>
        </button>
    </div>

    {
    (localVideo && localVideo.url) ? 
      <div className={'fixed inset-0 z-[102] transition-opacity flex justify-center items-center ' + (showVideo ? 'opacity-100' : 'opacity-0 hidden')}>
        <div onClick={() => setShowVideo(false)} className='absolute inset-0 bg-black opacity-80 w-full h-full cursor-pointer'></div>
        <div className='relative w-full max-w-4xl bg-black p-2'>
           {/* <PlayerControl source={localVideo.url} showVideo={showVideo} /> */}
           <PlayerVideo source={localVideo.url} showVideo={showVideo} />
        </div>
      </div>
    : youtubeVideo && 
      <div className={'fixed inset-0 z-[102] transition-opacity flex justify-center items-center ' + (showVideo ? 'opacity-100' : 'opacity-0 hidden')}>
          <div onClick={() => setShowVideo(false)} className='absolute inset-0 bg-black opacity-80 w-full h-full cursor-pointer'></div>
          <div className='relative w-full max-w-4xl bg-black p-2'>
            <YouTube
                videoId={youtubeVideo}                      
                className={'relative bottom-0 h-full left-0 right-0 top-0 w-full youtube-video'}         
                containerClassName={'w-full'}           
                onReady={onPlayerReady}
            />
            {/* <iframe className='w-full aspect-video aspect-h-9' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" webkitallowfullscreen="" mozallowfullscreen="" allowFullScreen="" frameBorder="0" src={srcVideo}></iframe> */}
          </div>
      </div>
    }
    <div className='hidden md:block absolute -bottom-px right-0 left-0 h-18 xl:h-28 2xl:h-32 4xl:h-40 bg-footer'>

    </div>
  </section>
}

export default HeroVideo