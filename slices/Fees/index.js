import React, { useState, useEffect } from 'react'
import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/react'
import { SelectForm } from '../../components/forms/SelectForm'
import { useAppContext } from '../../context/appContext'
import CurrencyInput from '../../components/forms/currencyInput'
import * as prismicH from '@prismicio/helpers'
import Icon from '../../components/icon'
import moment from 'moment';
import Loading from '../../components/loading'

const Fees = ({ slice }) => {
  const {title, transfer_step_title, buttonText, disclaimer, fairBackground, transferStepBackground, mobileBackground} = slice.primary
  const detail = {
     detailImage : slice.primary.detailImage,
     detailPercent : slice.primary.detailPercent,
     detailInfo : slice.primary.detailInfo,
     detailLink : slice.primary.detailLink,
     detailLinkText : slice.primary.detailLinkText,
  }
  const cards = slice.items

  const { countries } = useAppContext();

  const [activeView, setActiveView] = useState("INTRO")
  const [opacity, setOpacity] = useState(false)
  const [heightSection, setheightSection] = useState(null)

  const internationlData = slice.fees && slice.fees.INTERNATIONAL && slice.fees.INTERNATIONAL.data ? slice.fees.INTERNATIONAL.data : null
  const localTransferData = slice.fees && slice.fees.LOCAL && slice.fees.LOCAL.data ? slice.fees.LOCAL.data : null
  const srcFairBackground = prismicH.asImageSrc(fairBackground)
  const srcTransferStepBackground = prismicH.asImageSrc(transferStepBackground)
  const srcFairBackgroundMobile = prismicH.asImageSrc(mobileBackground)

  function handleClick(type){
      setOpacity(true)
      setTimeout(() => { setActiveView(type); setOpacity(false) }, 300)
  }

  useEffect(() => {
    let h = window.innerHeight < window.innerWidth * 0.5625 ? window.innerHeight : window.innerWidth * 0.5625
    h = h > 1080 ? 1080 : h
    setheightSection(h)
    window.addEventListener('resize', function() {
      let h = window.innerHeight < window.innerWidth * 0.5625 ? window.innerHeight : window.innerWidth * 0.5625
      h = h > 1080 ? 1080 : h
      setheightSection(h)
    }, true);
  }, [])
  

  return ( <section className='fees bg-jw-dark-blue relative px-9 md:px-12 lg:px-20 xl:px-24 3xl:px-46 pt-40 lg:pt-48 xl:pt-header 2xl:pt-[17rem] pb-18 xl:pb-28 2xl:pb-36 flex items-stretch' style={{minHeight : `${heightSection}px`}}>
    <div className={`absolute inset-0 bg-no-repeat bg-top xs:bg-cover fees__bg ${activeView !== "INTRO" ? 'transfer bg-cover' : 'bg-contain'}`}></div>
    <div className={`3xl:container relative md:mx-auto hero__richtext text-white font-neutrafaceText font-book my-4 xl:mb-10 xl:mt-20 xxl:mt-28 2xl:mt-12 3xl:mt-20` }>
      <div className={`transition-all duration-300 ${(opacity ? ' opacity-10 ' : ' opacity-100 ')}`}>
          {activeView === "INTRO" ? 
            <PrismicRichText field={title} />
            :
            <PrismicRichText field={transfer_step_title} />
          }
          {activeView === "INTRO" &&<div className={`mt-8 md:mt-12 xxl:mt-18 flex flex-col md:flex-row gap-12 md:gap-16 xl:gap-24 2xl:gap-36`}>
            <div className='grid xs:grid-cols-3 gap-12 md:gap-20 lg:gap-24 2xl:gap-46 w-3/4 xs:w-full mx-auto'>
              {cards.map((card, key) => {
                return <div key={key} className="flex flex-col justify-between items-center">
                  <PrismicImage field={card.image} className=" object-cover h-auto" />
                  <div className={`uppercase mt-8 xxl:mt-12 text-center font-lato font-bold text-xs xxl:text-base ${card.align === "Right" ? 'lg:pl-20' : card.align === "Left" ? 'lg:pr-20' : ''} `}>{card.title}</div>
                </div>
              })}
            </div>
            <div className='flex flex-col justify-end border-t-3 md:border-t-0 md:border-l-3 border-jw-blue-2 pt-6 md:pt-0 md:pl-6 lg:pl-8 2xl:pl-11'>
              <button type='button' className='text-left md:text-center w-max' onClick={() => handleClick('INTERNATIONAL')}>
                <PrismicRichText field={buttonText} />
              </button>
              {disclaimer && <div className='font-lato font-bold text-jw-blue-2 mt-6 text-xs xxl:text-base'>
                <span>{disclaimer}</span>
              </div>
              }
              
            </div>
          </div>}
          {activeView === "INTERNATIONAL" && 
          <InternationalTransfer internationlData={internationlData} localTransferData={localTransferData} detail={detail} activeView={activeView} countries={countries} setActiveView={setActiveView} />
          }
          {activeView === "LOCAL" && 
          <LocalTransfer internationlData={internationlData} localTransferData={localTransferData} detail={detail} activeView={activeView} countries={countries} setActiveView={setActiveView} />
          }
      </div>
      
    </div>
    <div className="hidden md:block absolute -bottom-px right-0 left-0 h-18 xl:h-28 2xl:h-36 bg-footer"></div>
    <style jsx>{`
        .fees__bg {
          background-image : url(${srcFairBackground});    
        }
        .fees__bg.transfer {
          background-image : url(${srcTransferStepBackground});    
        }
        @media (max-width: 767px) {
          .fees__bg, .fees__bg.transfer {
            background-image : url(${srcFairBackgroundMobile})
          }
        }
        @media (min-width: 640px) and (max-width: 767px){
          .fees__bg{
            background-position: center -4rem;
          }
        }
    `}</style>
  </section>
)}

export default Fees


const WrapperTransfer = ({type, inTitle, loTitle, detail, activeView, setView, children}) => {
  const [opacity, setOpacity] = useState(false)

  function handleClick(type){
      setOpacity(true)
      setTimeout(() => { setView(type); setOpacity(false) }, 300)
  }

  return (
    <div className='md:grid md:grid-cols-5 mt-7 md:mt-9'>
      <div className='md:col-span-4'>
        <div className='flex gap-3 md:gap-4 font-lato font-bold text-9 lg:text-xs'>
          <button className={`uppercase tracking-widest px-4 py-2 lg:py-3 transition-all border ${ activeView === "INTERNATIONAL" ? "text-jw-green-1 border-jw-green-1" : "border-transparent text-white/50" } `} onClick={() => handleClick("INTERNATIONAL")}>{inTitle}</button>
          <button className={`uppercase tracking-widest px-4 py-2 lg:py-3 transition-all border ${ activeView === "LOCAL" ? "text-jw-green-1 border-jw-green-1" : "border-transparent text-white/50" } `} onClick={() => handleClick("LOCAL")}>{loTitle}</button>
        </div>
        <div className={`mt-7 lg:mt-8 xxl:mt-10 transition-all duration-300 ${(opacity ? ' opacity-10 ' : ' opacity-100 ') }`}>
          {children}
        </div>
      </div>
      <div className='w-11/12 sm:w-1/2 md:w-full md:border-l-2 border-jw-green-1 md:pl-4 xxl:pl-8 mt-16 md:mt-0'>
        <div className='border-b-2 md:border-b-0 border-jw-green-1 pb-4 md:pb-0'>
          <PrismicImage field={detail.detailImage} className={'h-8 object-contain'} />
        </div>
        <div className='flex md:flex-col gap-5 md:gap-0'>
          <div className='mt-1 md:mt-8 xxl:mt-12'>
            <span className='font-bold text-jw-green-1 text-5xl xxl:text-[54px] leading-[4rem]'>{detail.detailPercent}</span>
          </div>
          <div className='mt-2 richtext'>
            <div className='text-xs lg:text-base'>
              <PrismicRichText field={detail.detailInfo} />
            </div>
            <div className='text-white mt-2 md:mt-8 xxl:mt-14 pb-8'>
              <PrismicLink field={detail.detailLink} className={'w-max pb-2 border-b border-white font-lato text-xxs font-black no-underline'}>
                <span className='text-white '>{detail.detailLinkText}</span>
              </PrismicLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}

const LocalTransfer = ({ internationlData, localTransferData, detail, activeView, setActiveView, countries }) => {
  const [localIsSended, setLocalIsSended] = useState(false)
  const [localIsSending, setLocalIsSending] = useState(false)
  const [localOpacity, setLocalOpacity] = useState(false)
  const [localCountry, setLocalCountry] = useState(null)
  const [inputAmount, setInputAmount] = useState("")
  const [amount, setAmount] = useState("")
  const [inputW, setInputW] = useState("5ch")
  const [isComplete, setIsComplete] = useState(false)
  const { changeCallQR, focused } = useAppContext();

  function changeWInput(v = null, c = null){
    let val = v ? v : inputAmount
    setInputW(`${val.length < 3 ? 5 : val.length + 1}ch`)
  }

  const changeCountry = (c) => {
    setLocalCountry(c);
    changeWInput(null, c)
  }

  function changeInput (ev) {
    let value = ev.target.value !== "" ? ev.target.value.replace("$", "").replace("FG", "").replace("F CFA", "").replace(/,/g, "") : ""
    setInputAmount(value)
    changeWInput(value)
    handleSubmit(ev)
    focused(true)
  }

  const handleSubmitForm = async (ev) => {
    ev.preventDefault();
    return false;
  }

  const handleSubmit = async (event) => {
    
    const data = {
      amount: inputAmount,
      currency: localCountry?.currencyCode,
      type: "LOCAL"
    }

    if((event.keyCode === 13 || event.charCode === 13 || event.type === "blur") 
      && data.amount !== "" 
      && data.currency
      && !Number.isNaN(Number(data.amount))){
      focused(false)
      document.activeElement.blur()
      setLocalIsSended(true)
      setLocalIsSending(true)

      const JSONdata = JSON.stringify(data)
      const endpoint = '/api/transfer'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      const response = await fetch(endpoint, options)
      const result = await response.json()

      setTimeout(() => {
        setAmount(result.data.amount)
        setLocalOpacity(true)
        changeCallQR(true)
        setLocalIsSending(false)
      }, 600)
            
    }
    
    return false;
  }

  useEffect(() => {
    handleSubmit({type : "blur"})
  }, [localCountry])

  useEffect(() => {
    setIsComplete(localCountry && inputAmount !== '');
  }, [localCountry, inputAmount])

  return (
    <div>
      <WrapperTransfer inTitle={internationlData.tabTitle} loTitle={localTransferData.tabTitle} detail={detail} activeView={activeView} setView={(v) => setActiveView(v)}>
        <form onSubmit={handleSubmitForm} className=''>
            <div className='flex flex-col gap-1 xs:flex-row xs:gap-0'>
              <span className='text-lg xs:text-xl lg:text-2xl xxl:text-4xl font-book mr-4 lg:mr-6 w-max whitespace-nowrap'>{localTransferData.countryLabel}</span>
              <div className='w-full xs:w-auto'>
                <SelectForm uniqueID={"local-country"} showSearch={false} values={countries} placeholder={localTransferData.placeholderCountryInput} 
                  onChange={(v) => { changeCountry(v) }} 
                  className={'w-auto text-jw-turquoise-2 text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-4xl'}
                  selectWrapperClass={'bg-jw-turquoise-2 border-jw-turquoise-2 text-white font-aeonik text-xs xs:text-base sm:text-lg md:text-2xl xs:min-w-max'}
                  inputClass={'bg-jw-turquoise-2'}
                  wrapperClass={'w-full'}
                  optionClass={'leading-6 lg:leading-8'}
                  minHeight={'h-auto max-h-24 xxl:max-h-28'}
                  leadingClass={'lg:leading-10'}
                >
                </SelectForm>
              </div>
            </div>
            <div className='flex flex-col xs:flex-row'>
              <div className='flex items-end mt-6'>
                <span className='text-lg xs:text-xl lg:text-2xl xxl:text-4xl font-book mr-2 xs:mr-4 lg:mr-6 w-max whitespace-nowrap'>{localTransferData.text}</span>
                <div className='w-20 md:w-24 lg:w-48 2xl:w-56 text-lg md:text-22 lg:text-3xl 2xl:text-[45px] jw-input' style={{ "width" : inputW}}>
                  <CurrencyInput onFocus={() => focused(true)} onKeyUp={changeInput} onBlur={handleSubmit} placeholder={"0.00"} type="text" className='bg-transparent outline-none w-full text-center lg:text-right h-full text-jw-green-8 font-aeonik text-lg md:text-22 lg:text-3xl 2xl:text-[45px] leading-10' maskOptions={{ prefix : ""}} />
                </div>
                <div className='flex items-end col-span-2 ml-2 xs:ml-4 lg:ml-6'>
                  <span className='text-center text-jw-green-8 text-base lg:text-xl 2xl:text-3xl '>{localCountry?.currencyCode || "USD"}</span>
                </div>
              </div>
              <div className={`xs:ml-10 relative mt-4 xs:mt-6 transition-all duration-300 ${localIsSending ? 'opacity-0' : 'opacity-100'}`}>
                    <button disabled={!isComplete} className={`w-12 h-12 xs:w-4 xs:h-4 lg:w-5 lg:h-5 xxl:w-7 xxl:h-7 xs:absolute bottom-[5px] xxl:bottom-1 ${isComplete ? 'text-white' : 'text-white/50'}`}>
                      <Icon icon="send"/>
                    </button>
              </div>
            </div>
            {localIsSending ? <Loading />
            : localIsSended &&
              <div className={`transition-all duration-500 ${localOpacity ? 'opacity-100' : 'opacity-0'}`}>
                <div id="localTransfer" className='mt-8 d:mt-12 xxl:mt-18'>
                  <PrismicRichText field={localTransferData.result} components={{
                    label: ({children, node}) => {
                      if(node && node.data && node.data.label && node.data.label.includes("Pay amount")){
                        return <span className={`text-jw-green-1 `}>{`${amount}`}</span>
                      }
                      return <span className={node.data.label}>{children}</span>}
                    }}/>
                </div>
                <div className='mt-3 text-jw-green-1'>
                  <PrismicRichText field={localTransferData.serviceInfo} />
                </div>
              </div>
            }
          </form>
      </WrapperTransfer>
    </div>
  )
}

const InternationalTransfer = ({ internationlData, localTransferData, detail, activeView, setActiveView, countries }) => {
  const [country, setCountry] = useState(null)
  const [countryTo, setCountryTo] = useState(null)
  const [isSended, setIsSended] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [opacity, setOpacity] = useState(false)
  const [inputAmount, setInputAmount] = useState("")
  const [inputW, setInputW] = useState("5ch")
  const [rate, setRate] = useState("")
  const [pay, setPay] = useState("")
  const [fee, setFee] = useState("")
  const [amount, setAmount] = useState("")
  const [amountTo, setAmountTo] = useState("")
  const [dateConvert, setDateConvert] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const { changeCallQR, focused } = useAppContext();

  const handleSubmitForm = async (ev) => {
    ev.preventDefault();
    return false;
  }

  const handleSubmit = async (event) => {
    
    if((event.keyCode === 13 || event.charCode === 13 || event.type === "blur" ) 
      && inputAmount !== "" 
      && country?.currencyCode
      && countryTo?.currencyCode
      && !Number.isNaN(Number(inputAmount))){
      focused(false)
      document.activeElement.blur()
      setIsSending(true)
      
      const data = {
        amount: inputAmount,
        currency: country.currencyCode,
        currencyTo: countryTo.currencyCode,
        type: "INTERNATIONAL"
      }

      setIsSended(true)

      const JSONdata = JSON.stringify(data)
      const endpoint = '/api/transfer'

      const options = {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      const response = await fetch(endpoint, options)
      const result = await response.json()

      if(result && result.status === "success"){
        setRate(result.data.rate)
        setPay(result.data.pay)
        setFee(result.data.fee)
        setAmount(result.data.amount)
        setAmountTo(result.data.amountTo)
        setOpacity(true)
        setDateConvert(moment(result.data.timestamp).format("MMMM Do, YYYY hh:mm a"))
        changeCallQR(true)
        setIsSending(false)
      }else{
        setOpacity(false)
        setIsSending(false)
      }    
    }
    
    return false;
  }

  function changeWInput(v = null, c = null){
    let val = v ? v : inputAmount
    setInputW(`${val.length < 3 ? 5 : val.length + 1}ch`)
  }

  function changeCountry(c){
    setCountry(c)
    changeWInput(null, c)
  }

  function changeInput (ev) {
    let value = ev.target.value !== "" ? ev.target.value.replace("$", "").replace("FG", "").replace("F CFA", "").replace(/,/g, "") : ""
    focused(true)
    changeWInput(value)
    setInputAmount(value)
    handleSubmit(ev)
  }

  useEffect(() => {
    handleSubmit({type : "blur"})
  }, [country, countryTo])

  useEffect(() => {
    setIsComplete(country && countryTo && inputAmount !== '');
  }, [country, countryTo, inputAmount])

  return (
    <div>
      {internationlData &&
        <WrapperTransfer inTitle={internationlData.tabTitle} loTitle={localTransferData.tabTitle} detail={detail} activeView={activeView} setView={(v) => setActiveView(v)}>
          <form onSubmit={handleSubmitForm} className='w-full lg:w-5/6'>
            <div className='flex flex-col lg:flex-row items-end lg:mt-6 xxl:mt-7 gap-6 lg:gap-0'>
              <div className='flex justify-start items-end w-full lg:w-auto'>
                <span className='text-lg xs:text-xl lg:text-2xl xxl:text-4xl font-book lg:mr-6 w-1/6 sm:w-2/12 lg:w-auto'>From</span>
                <div className='w-auto min-w-[70%] xs:min-w-[60%] lg:min-w-0'>
                  <SelectForm uniqueID={"international-country-from"} showSearch={false} values={countries} placeholder={"Select country"} 
                    onChange={(v) => { changeCountry(v) }} 
                    className={'w-auto border-white text-jw-turquoise-2 text-lg md:text-xl lg:text-2xl 2xl:text-4xl'}
                    selectWrapperClass={'bg-jw-turquoise-2 border-jw-turquoise-2 text-white text-xs xs:text-lg md:text-2xl min-w-max'}
                    inputClass={'bg-jw-turquoise-2'}
                    wrapperClass={'w-full'}
                    optionClass={''}
                    minHeight={'h-auto max-h-24 xxl:max-h-28'}
                    leadingClass={'lg:leading-10'}
                    except={countryTo?.currencyCode}
                  >
                  </SelectForm>
                </div>
              </div>
              <div className='flex justify-start items-end w-full lg:w-auto'>
                <span className='text-lg xs:text-xl lg:text-2xl xxl:text-4xl font-book lg:mx-6 w-1/6 sm:w-2/12 lg:w-auto'>to</span>
                <div className='flex justify-between items-end w-auto min-w-[70%] xs:min-w-[60%] lg:min-w-0'>
                  <SelectForm uniqueID={"international-country-to"} showSearch={false} values={countries} placeholder={"Select country"} 
                    onChange={(v) => { setCountryTo(v) }} 
                    className={'w-auto border-white text-jw-turquoise-2 text-lg md:text-xl lg:text-2xl 2xl:text-4xl '}
                    selectWrapperClass={'bg-jw-turquoise-2 border-jw-turquoise-2 text-white text-xs xs:text-lg md:text-2xl min-w-max'}
                    inputClass={'bg-jw-turquoise-2'}
                    wrapperClass={'w-full'}
                    optionClass={''}
                    minHeight={'h-auto max-h-24 xxl:max-h-28'}
                    leadingClass={'lg:leading-10'}
                    except={country?.currencyCode}
                  >
                  </SelectForm>
                </div>
              </div>
            </div>
            <div className='flex flex-col xs:flex-row'>
              <div className='flex items-end gap-0 mt-6'>
                <span className='block w-max whitespace-nowrap text-lg xs:text-xl lg:text-2xl xxl:text-4xl font-book mr-2 xs:mr-4 lg:mr-6'>{internationlData.text}</span>
                <div className='w-auto border-white text-lg md:text-22 lg:text-3xl 2xl:text-[45px] jw-input' style={{ "width" : inputW}}>
                  <CurrencyInput onFocus={() => focused(true)} onKeyUp={changeInput} onBlur={handleSubmit} placeholder={"0.00"} type="text" className='bg-transparent outline-none w-full text-right h-full text-jw-green-8 font-aeonik text-lg md:text-22 lg:text-3xl 2xl:text-[45px] leading-10' maskOptions={{ prefix : ""}} />
                </div>
                <div className='flex items-end col-span-2 ml-2 xs:ml-4 lg:ml-6'>
                  <span className='text-center text-jw-green-8 text-base lg:text-xl 2xl:text-3xl '>{country?.currencyCode || "USD"}</span>
                </div>
              </div>
              <div className={`xs:ml-10 relative mt-4 xs:mt-6 transition-all duration-300 ${isSending ? 'opacity-0' : 'opacity-100'}`}>
                  <button disabled={!isComplete} className={`w-12 h-12 xs:w-4 xs:h-4 lg:w-5 lg:h-5 xxl:w-7 xxl:h-7 xs:absolute bottom-[5px] md:bottom-1 ${isComplete ? 'text-white' : 'text-white/50'}`}>
                    <Icon icon="send"/>
                  </button>
              </div>
            </div>
            {isSending ? <Loading />
            : isSended &&
              <div className={`mt-8 d:mt-12 xxl:mt-18 transition-all duration-500 ${opacity ? 'opacity-100' : 'opacity-0'}`}>
                <div id="internationalRate" className='leading-8 flex gap-3 items-center'>
                  <Icon icon="rate" className={' flex-shrink-0 w-3 lg:w-5 2xl:w-6 h-auto text-jw-gray-4'} />
                  <PrismicRichText field={internationlData.result} components={{
                    label: ({children, node}) => {
                      if(node && node.data && node.data.label && node.data.label.includes("Rate")){
                        return <><span className={`${node.data.label} text-jw-green-8 block xs:inline `}>{`${country?.currencySymbol || "$"}1 = ${rate} ${countryTo?.currencySymbol || "$"}`}</span>
                        <span className='ml-1 lg:ml-2 text-jw-gray-5 text-xs'>as of {dateConvert}</span></>
                      }
                      return <span className={node.data.label}>{children}</span>}
                    }}/>
                </div>
                <div id="internationalPay" className='mt-4 leading-8 flex gap-3 items-center'>
                  <Icon icon="pay" className={' flex-shrink-0 w-3 lg:w-5 2xl:w-6 h-auto text-jw-gray-4'} />
                  <PrismicRichText field={internationlData.totalPay} components={{
                    label: ({children, node}) => {
                      if(node && node.data && node.data.label && node.data.label.includes("Pay amount")){
                        return <span className={`text-jw-green-1 `}>{`${pay}`}</span>
                      }else if(node && node.data && node.data.label && node.data.label.includes("Fee")){
                        return <span className={`text-jw-green-1 `}>{`${fee}`}</span>
                      }
                      return <span className={node.data.label}>{children}</span>}
                    }}/>
                </div>
                <div id="internationalGet" className='mt-4 leading-8 flex gap-3 items-center'>
                  <Icon icon="moneyGet" className={' flex-shrink-0 w-3 lg:w-5 2xl:w-6 h-auto text-jw-gray-4'} />
                  <PrismicRichText field={internationlData.recipientWill} components={{
                    label: ({children, node}) => {
                      if(node && node.data && node.data.label && node.data.label.includes("Get amount")){
                        return <span className={`text-jw-green-1 block xs:inline`}>{`${country?.currencyCode || "USD"} ${amount} / ${amountTo} ${countryTo?.currencyCode || "USD"}`}</span>
                      }
                      return <span className={node.data.label}>{children}</span>}
                    }}/>
                </div>
              </div>
            }
          </form>
        </WrapperTransfer>
      }
    </div>
  )
}