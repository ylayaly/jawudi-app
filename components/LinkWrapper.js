import Link from "next/link"
import { PrismicLink } from "@prismicio/react"

const LinkWrapper = (data) => {

  const onBtnClick = (e, uid) => {
    e.preventDefault();
    setTimeout(() => {
      if(document.getElementById(uid)){
        window.scrollTo({
          top: document.getElementById(uid).offsetTop - 60,
          behavior: 'smooth',
        });
      }
    }, 100);
    
  }

    if(!data.link || data.link.link_type === "Any")
      return <div className={data.className}>{data.children}</div>

    if(data.link.link_type === "Web"){
      var url = data.link.url.replace("https://#", "#")

      return (
        (data.link.url.includes("https://#")) ?
          <button onClick={(e) => onBtnClick(e, data.link.url.replace("https://#", ""))} className={data.className ? data.className : "mt-4 lg:mt-5 xxl:mt-7"}>
            {data.children ? data.children : 
              <div className=' w-3 md:w-6 h-max'>
                <span className='btn btn__more block'></span>
              </div>
            }
          </button >
        : <Link href={url} >
            <a target={data.link.target} className={data.className}>{data.children}</a>
          </Link>
      )
    } else {
      return (<PrismicLink field={data.link} className={data.className}>
        {data.children}
      </PrismicLink>)
    } 
}

export default LinkWrapper