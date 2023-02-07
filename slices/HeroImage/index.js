import React, { useState, useEffect } from 'react'
import { PrismicRichText } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'
import FundWaitListForm from '../../components/forms/fundWaitList'

const HeroImage = ({ slice }) => {
  
  const { title, content, formText, showForm, heroImage, backgroundImage, background_image_mobile, successMessage, submitButtomText, closeFormButtonText, formID, descriptionForm, textBtn } = slice.primary
  const srcImage = prismicH.asImageSrc(heroImage)
  const srcBgImage = prismicH.asImageSrc(backgroundImage)
  const srcBgImageMobile = prismicH.asImageSrc(background_image_mobile)
  const [openForm, setOpenForm] = useState(false)
  const [heightSection, setheightSection] = useState(null)

  const formData = {
    formID : formID, 
    successMessage: successMessage, 
    submitButtonText: submitButtomText,
    closeButtonText: closeFormButtonText    
  }

  useEffect(() => {
    let h = window.innerHeight < window.innerWidth * 0.5625 ? window.innerHeight : window.innerWidth * 0.5625
    h = h > 1080 ? 1080 : h
    setheightSection(h)
    window.addEventListener('resize', function(event) {
      let h = window.innerHeight < window.innerWidth * 0.5625 ? window.innerHeight : window.innerWidth * 0.5625
      h = h > 1080 ? 1080 : h
      setheightSection(h)
    }, true);
    setTimeout(function(){
      document.getElementById("hero-image__info").classList.remove("animate-active")
    }, 3000)
    
  }, [])
  
  return <section id="hero-image" className='hero hero-image w-full max-h-[1600px] z-20 relative' style={{minHeight : `calc(${heightSection}px - 5rem)`}}>
    <div className={'relative h-full'}>
      <div className='h-full absolute w-full'>
        <img className={`w-full h-full hidden md:block`} src={srcBgImage} alt="" style={{minHeight: `calc(100% + 4rem)`}} />
        <img className={`w-full h-full md:hidden`} src={srcBgImageMobile} alt="" style={{minHeight: `calc(100% + 4rem)`}} />
      </div>
      <div className='pt-40 lg:pt-48 xl:pt-header 2xl:pt-[17rem] relative px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 h-full flex items-center' style={{minHeight : `calc(${heightSection}px - 5rem)`}}>
        <div className='absolute inset-0 grid grid-cols-hero-image-mobile xs:grid-cols-hero-image-mobile-text md:grid-cols-hero-image mx-auto'>
          <div className='w-full h-full'></div>
          <div className='w-full h-full pt-20 xs:pt-24 sm:pt-32 lg:pt-44 xl:pt-header 2xl:pt-[17rem] relative overflow-hidden'>
            <div className='h-full bg-150x bg-no-repeat bg-[left_top_1.5rem] md:bg-left lg:bg-left-bottom mt-4 sm:mt-0 sm:ml-[10%] md:ml-[5%] md:bg-contain md:left-4 relative'  style={{ backgroundImage: `url(${srcImage})` }} />
          </div>
        </div>
        <div className='relative grid grid-cols-hero-image-mobile-text md:grid-cols-hero-image 3xl:container mx-auto h-full'>
          <div id="hero-image__info" className='hero__richtext md:pt-20 xxl:mt-20 2xl:mt-0 flex flex-col justify-center text-white font-neutrafaceText font-book animate-active'>
            { title &&
                  <PrismicRichText field={title} components={{
                    label: ({children, node}) => {
                      if(node && node.data && node.data.label && node.data.label.includes("animate")){
                        return <label className={node.data.label}><span>{children}</span></label>
                      }
                      return <span className={node.data.label}>{children}</span>}
                    }}/>
            }
            { content &&
                  <div className='block mt-8 md:mt-6 xxl:mt-8 leading-5 w-11/12'>
                    <PrismicRichText field={content} />
                  </div>
            }
            {(showForm && formID) &&
            <>
              { (formText && prismicH.asText(formText) !== "") &&
                <div className='text-jw-dark-blue md:text-jw-turquoise-3 font-bold mt-2 xs:mt-4'>
                    <PrismicRichText field={formText}/>
                </div>
              }
              <div className='w-fit mt-2 xs:mt-5 font-lato'>
                  <div onClick={() => setOpenForm(true)} className='border xxl:border-2 border-white rounded-full py-2 xxl:py-3 px-4 xxl:px-10 flex gap-2 justify-between items-center cursor-pointer text-[5px] md:text-2 xxl:text-xs tracking-2lg'>
                    <span className='w-full bg-transparent border-none outline-0 text-white'>{textBtn}</span>
                    <span className=''>
                      {">"}
                    </span>
                  </div>
              </div>
              <div className={'fixed inset-0 z-form transition-opacity flex justify-center items-center ' + (openForm ? 'opacity-100' : 'opacity-0 hidden')}>
                  <div onClick={() => setOpenForm(false)} className='absolute inset-0 bg-black opacity-80 w-full h-full cursor-pointer'></div>
                  <div className='relative w-full xs:w-3/4 md:w-auto bg-jw-dark-blue p-14 lg:p-16 2xl:p-22'>
                    {openForm && <FundWaitListForm data={formData} description={descriptionForm} onClose={() => setOpenForm(false)} />}
                  </div>
              </div>
              
            </>}
            
          </div>
          <div className='w-full h-full'></div>
        </div>
      </div>
    </div>
  </section>
}

export default HeroImage