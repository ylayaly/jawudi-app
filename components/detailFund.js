import { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import { PrismicRichText } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'

const DetailFundComponent = (() => {
    const { detailFund, changeDetailFund, goals } = useAppContext();
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const [closing, setClosing] = useState(false)

    function close() {
        setClosing(true)
        setTimeout(() => {
            setClosing(false)
            changeDetailFund(null)
            setNext(null)
        }, 950)
    }

    function changeGoal(goal) {
        const c = document.getElementById("current-goal")
        const n = document.getElementById("next-goal")
        c.classList.add("opacity-0")
        document.getElementById("current-goal-actions").classList.add("opacity-0")
        document.getElementById("next-goal-actions").classList.add("opacity-0")
        setTimeout(() => {
            n.classList.remove("opacity-70")
            n.classList.remove("lg:translate-x-32")
            n.classList.remove("xxl:translate-x-48")
            n.classList.remove("2xl:translate-x-56")
        }, 480)
        setTimeout(() => {
            changeDetailFund(goal)
            c.classList.remove("opacity-0")
        }, 960)
        setTimeout(() => {
            n.classList.add("opacity-70")
            n.classList.add("lg:translate-x-32")
            n.classList.add("xxl:translate-x-48")
            n.classList.add("2xl:translate-x-56")
            document.getElementById("current-goal-actions").classList.remove("opacity-0")
            document.getElementById("next-goal-actions").classList.remove("opacity-0")
        }, 1440)
        
    }

    useEffect(() => {
        setTimeout(() => {
            setGoals()
        }, 500)
    }, [detailFund]) 

    
    function setGoals(){
        if(detailFund){
            const current = goals.findIndex(g => g.id == detailFund.id)
            
            if(goals.length > (current + 1)){
                setNext(goals[current + 1])
            }else if(current !== 0){
                setNext(goals[0])
            }else{
                setNext(null)
            }

            if(current == 0 && goals.length > 1){
                setPrev(goals[goals.length - 1])
            }else if(current > 0 && goals.length > 1){
                setPrev(goals[current - 1])
            }else{
                setPrev(null)
            }
        }
    }


    if (!detailFund)
        return <></>

    return  <div id="detail-fund" className={`detail-fund fixed overflow-auto inset-0 w-full h-full z-form text-white animate-show ${closing ? 'animate-hide' : ''}`}>
                <div className='fixed bg-black/70 inset-0' onClick={close}></div>
                <div className={`flex justify-center my-20 relative`}>
                    <div className='absolute inset-0 cursor-pointer' onClick={close}></div>
                    {next && <DetailGoal id="next-goal" data={next.data} className='absolute z-10 opacity-70 translate-x-0 lg:translate-x-32 xxl:translate-x-48 2xl:translate-x-56 max-h-full h-full overflow-hidden transition-all duration-500 cursor-pointer animate-showNext' close={() => close()} next={next} prev={prev} changeGoal={(g) => changeGoal(g)} />}
                    <DetailGoal id="current-goal" data={detailFund.data} className='relative z-20 transition-all duration-500' close={() => close()}  next={next} prev={prev} changeGoal={(g) => changeGoal(g)} />
                </div>
            </div>
})

export default DetailFundComponent

const DetailGoal = ((data) => {
    const { title, image, description, items } = data.data
    const { next, prev, className, close, changeGoal, id } = data

    const goNext = _ => {
        if(id == "next-goal"){
            changeGoal(next)
        }
    }

    const hasImage = items.filter(it => it.image && it.image.url).length

    return (
            <div id={id} onClick={goNext} className={`${className} rounded-4xl border border-white w-11/12 md:w-3/4 xxl:w-3/5 bg-jw-dark-blue`}>
                <div className='absolute -right-[2px] -top-[2px] z-30'>
                    <button className='close w-11 h-11 lg:w-24 lg:h-24 xxl:w-32 xxl:h-32' onClick={close}></button>
                </div>
                <div className='relative z-20'>
                    <svg width={0} height={0}>
                        <clipPath id="trazado" clipPathUnits="objectBoundingBox" >
                            <path d="M621.554-418.7a.161.161,0,0,0-.1-.077.181.181,0,0,0-.082,0,1.5,1.5,0,0,0-.144.053.683.683,0,0,1-.316.024.98.98,0,0,1-.278-.077c-.023-.01-.078-.026-.08-.035s0-.881,0-.881h1Z" transform="translate(-620.554 419.688)" fill="#4df299"/>
                        </clipPath>
                    </svg>
                    <img style={{ "clipPath": "url(#trazado)" }} className='object-cover bg-center w-full h-full rounded-t-4xl' src={prismicH.asImageSrc(image)} alt="" width={image?.dimensions.width} height={image?.dimensions.height} />
                    <div className='absolute inset-0 w-full h-full overflow-hidden flex md:hidden justify-center items-center'>
                        <div className='border border-jw-green-1 text-jw-green-1 text-2xl lg:text-3xl xxl:text-11 p-5 bg-jw-dark-blue/50'>
                            <h3 className='mb-0 uppercase font-neutrafaceText font-book'>{title}</h3>
                        </div>
                    </div>
                </div>
                <div className='relative p-8 md:p-12 xl:p-18 2xl:p-26 pb-12 2xl:pb-16 richtext__jw'>
                    <div className='absolute -top-60 right-12 lg:right-20 overflow-hidden hidden md:block'>
                        <div className='border border-jw-green-1 text-jw-green-1 text-11 p-2 xl:p-6 pt-60 xl:pt-56'>
                            <h3 className='mb-0 uppercase font-neutrafaceText font-book'>{title}</h3>
                        </div>
                    </div>
                    <div className='font-neutrafaceText font-book text-center md:text-left'>
                        <PrismicRichText field={description} />
                    </div>
                    <div className='grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xxl:gap-24 2xl:gap-32 mt-5 md:mt-8 lg:mt-12 2xl:mt-20'>
                        {
                          items.map((item, key) => {
                            return (
                              <div key={'fund-detail-' + key} className='mx-auto flex flex-col gap-8 md:gap-10 lg:gap-12 2xl:gap-20 h-full'>
                                {(item.image && item.image.url) &&
                                    <div className={`max-h-32 h-auto md:h-32`}>
                                        <img className='object-contain bg-center w-full h-full' src={prismicH.asImageSrc(item.image)} alt="" width={item.image.dimensions.width} height={item.image.dimensions.height} />
                                    </div>
                                }
                                {(item && item.value || item.valueDetail) &&
                                    <div className={`flex flex-col justify-center items-center w-full ${hasImage ? 'h-auto md:min-h-32' : 'min-h-14'}`}>
                                        <span className='font-medium text-6xl md:text-4xl xl:text-6xl font-neutrafaceDisplay'>{item.value}</span>
                                        {item.valueDetail && <p>{item.valueDetail}</p>}
                                    </div>
                                }
                                <div className='font-aeonik font-medium text-center md:text-left'>
                                  <PrismicRichText field={item.information} />
                                </div>
                              </div>
                            )
                          })
                        }
                    </div>
                    <div id={id+"-actions"} className='flex justify-center items-center gap-3 md:gap-6 uppercase text-jw-green-1 font-neutrafaceDisplayTitling mt-10 md:mt-14 xl:mt-16 2xl:mt-20 transition-all duration-500 text-xs lg:text-base'>
                        {(prev && prev.data && prev.data.title) && <button onClick={() => changeGoal(prev)}>
                            <span className='md:tracking-xl'>{'<'} {prev.data.title}</span>
                        </button>}
                        <span className='w-[5px] h-[5px] bg-jw-green-1 rounded-full'></span>
                        {(next && next.data && next.data.title) && <button onClick={() => changeGoal(next)}>
                            <span className='md:tracking-xl'>{next.data.title} {'>'}</span>
                        </button>}
                    </div>
                </div>
                
            </div>
        )
})

