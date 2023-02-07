import { useState } from 'react'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import ContactForm from '../../components/forms/contact'
import Icon from '../../components/icon'
import ArrowWhite from '../../assets/img/arrow-white.svg'
import Image from 'next/image'

const CardsWithForm = ({ slice }) => {
  const { info } = slice.primary
  const cards = slice.items
  const [card, setCard] = useState({})

  return (<section>
    <div className='bg-jw-dark-blue'>
      <div className='3xl:container mx-auto px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-0 text-white pt-8 md:pt-12 lg:pt-24 2xl:pt-32 pb-10 md:pb-14 lg:pb-18 xl:pb-22 2xl:pb-26'>
        <div className="title leading-8 tracking-wider mb-12 richtext hidden lg:block">
          {
            info &&
            <PrismicRichText field={info}/>
          }
        </div>
        {card && Object.keys(card).length === 0 ?
          <div className='lg:mt-22 2xl:mt-28'>
            <div className='grid lg:grid-cols-3 gap-4 lg:gap-8 2xl:gap-12'>
              { cards.map( (card, key) => {
                  return <WrapperCard key={key} card={card} onClick={() => setCard(card)}>
                    <div className='h-full border-2 border-white rounded-3xl pt-5 lg:pt-6 2xl:pt-8 pb-7 md:pb-12 2xl:pb-22 px-10 2xl:px-12'>
                      <div className='w-11 lg:w-16 2xl:w-24 h-11 lg:h-16 2xl:h-24'><Icon icon={card.cardIcon.replace(/ /g, '').toLowerCase()} /></div>
                      <h3 className='font-bold text-base md:text-xl 2xl:text-3xl my-3 2xl:my-5'>{card.title}</h3>
                      {
                        card.description &&
                        <div className='lg:w-5/6 richtext'><PrismicRichText field={card.description}/></div>
                      }
                    </div>
                  </WrapperCard>
              }) 
              }
            </div>
          </div>
          : card.formID ?
          <div className='pb-4'>
            <h3 className='font-bold text-3xl my-5'>{card.title}</h3>
            {
              card.description &&
              <div className='richtext'><PrismicRichText field={card.description}/></div>
            }
            <div className='mt-7 md:mt-10 lg:mt-14 2xl:mt-20'>
              <ContactForm data={{
                formID : card.formID,
                submitButtonText : card.submitButtonText,
                successMessage : card.description
              }} />
            </div>
          </div>
          :
          <div>
            <button onClick={() => setCard({})}>
              <Image src={ArrowWhite} alt="" />
            </button>
          </div>
        }
      </div>
    </div>
  </section>
)}

export default CardsWithForm

const WrapperCard = ({card, onClick, children}) => {
  const { cardLink, formID } = card
  
  if(cardLink && cardLink.link_type !== "Any"){
    return (
      <PrismicLink field={cardLink}>
        {children}
      </PrismicLink>
    )
  }else if(formID){
    return (
      <button className='text-left' onClick={onClick}>
        {children}
      </button>
    )
  }else{
    return (
      <>
        {children}
      </>
    )
  }
}