import { PrismicImage, PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.CardsSlice} CardsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardsSlice>} CardsProps
 * @param { CardsProps }
 */
const Cards = ({ slice }) => {
  const { top_color, background_color } = slice.primary
  const cards = slice.items
  const { variation } = slice

  return (<section className='relative pt-20 lg:pt-32 font-neutrafaceText font-book' style={{ backgroundColor: top_color }}>
    <div className={`cards__top-bg absolute top-2 md:top-0 left-0 w-full h-24 lg:h-39 ${variation}`} style={{ backgroundColor: background_color }}></div>
    <div className={`px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-0 pb-14 text-white`} style={{ backgroundColor: background_color }} >
      <div className={`3xl:container mx-auto relative grid gap-10 lg:gap-12 2xl:gap-20 ${(variation === "default") ? "" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
      {cards.map((card, index) => {
        return (<div key={index}>
          <div className='flex items-center gap-6'>
            <div>
              <PrismicImage field={card.icon} className="w-auto h-20 lg:h-24 2xl:h-32 object-contain" />
            </div>
            <h5 className='text-jw-green-1 text-lg lg:text-2xl 2xl:text-3xl'>
              {card.title}
            </h5>
          </div>
          <div className='mt-10 lg:mt-12 2xl:mt-14 text-lg'>
            <PrismicRichText field={card.description} />
          </div>
          <div className='mt-10 lg:mt-12 2xl:mt-14 text-jw-green-1 text-h3 leading-8 xl:leading-10'>
            <PrismicRichText field={card.hilight_description} />
          </div>

        </div>)
      })
      }
      </div>
    </div>
    <svg width={0} height={0}>
      <clipPath id="cards__trazado" clipPathUnits="objectBoundingBox" >
        <path id="Trazado_272" data-name="Trazado 272" d="M.312,2.606s.117-.5.242-.564.212.386.339.511.327-.1.419.09c0,0,0,.388,0,.393h-1Z" transform="translate(-0.312 -2.037)" fill="#051834"/>
      </clipPath>
    </svg>
    <svg width={0} height={0}>
      <clipPath id="cards__trazado_m" clipPathUnits="objectBoundingBox" >
        <path id="Trazado_273" data-name="Trazado 273" d="M.553,2.04c.125-.039.211.238.337.315s.332-.063.422.063v.619h-1v-.49S.428,2.079.553,2.04Z" transform="translate(-0.312 -2.037)" fill="#051834"/>
      </clipPath>
    </svg>
    <svg width={0} height={0}>
      <clipPath id="cards__trazado_default" clipPathUnits="objectBoundingBox" >
        <path id="Trazado_274" data-name="Trazado 274" d="M5.012,2.708a2.053,2.053,0,0,1,.708-.443.316.316,0,0,1,.292.11v.881h-1Z" transform="translate(-5.012 -2.256)" fill="#247f8c"/>
      </clipPath>
    </svg>

    <style jsx>{`
        .cards__top-bg {  
          clip-path: url(#cards__trazado);
        }
        @media (max-width: 767px) {
          .cards__top-bg {
            clip-path: url(#cards__trazado_m);
          }
          .cards__top-bg.default {
            clip-path: url(#cards__trazado_default);
          }
        }
    `}</style>
  </section>
)}

export default Cards