import React, { useState, useEffect } from 'react'
import * as prismicH from '@prismicio/helpers'
import { useAppContext } from '../../context/appContext'

const FundGrid = ({ slice }) => {
  const [minH, setMinH] = useState(0)
  const { changeDetailFund, addGoals } = useAppContext();

  function OpenDetailGoal(ev, item) {
    changeDetailFund(item)
  }

  useEffect(() => {
    slice.items.map(it => {
      const g = slice.goals.find(goal => goal.uid === it.relation.uid)
      if(g) it.relation = g
      return it
    })
    
    addGoals(slice.items.map(it => it.relation))    
  }, [])

  

  return (
    <section id="grid-sectio-parent" className='grid-section relative z-10' style={{ minHeight: minH }}>
      <div className={'grid md:grid-cols-2 lg:grid-cols-3 z-10'}>
        {slice.items.map((item, key) => {
          const goalItem = item.relation.data
          const img = goalItem.image
          const title = goalItem.title
          const srcImage = prismicH.asImageSrc(img)
          const { width, height } = img.dimensions

          return (
            <React.Fragment key={"init-" + key}>
              <div key={"fund-img-" + key} className='relative cursor-pointer mt-2 sm:mt-0 xl:last:mb-4 3xl:last:mb-8' onClick={(ev) => OpenDetailGoal(ev, item.relation)}>
                <div className='relative z-10'><img className='object-cover bg-center' src={srcImage} alt="" width={width} height={height} /></div>
                <div className='absolute inset-0 bg-black opacity-30 z-20'></div>
                <div className='absolute inset-0 w-full h-full flex items-center z-30 p-6 xl:p-10'>
                  <span className='text-white font-book text-xl md:text-3xl 2xl:text-5xl font-neutrafaceText'>{title}</span>
                </div>
              </div>
            </React.Fragment>
          )
        })
        }
      </div>
      <div className="hidden md:block absolute -bottom-px right-0 left-0 h-18 xl:h-28 2xl:h-32 3xl:h-44 4xl:h-52 bg-footer z-20"></div>
    </section>
  )
}

export default FundGrid