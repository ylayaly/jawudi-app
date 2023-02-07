import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../prismicio'
import '../styles/globals.scss'
import { ContextProvider } from '../context/appContext'

function InternalLink({ href, children, ...props }){
  if(href.includes("/legal/")){
    return <a href={"#"} data-href={href.split("/")[2]} {...props} > 
            {children}
        </a>
  }
  return <Link href={href}>
  <a {...props}>
    {children}
  </a>
</Link>
}

export default function App({ Component, pageProps }) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={InternalLink}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <ContextProvider>
            <Component {...pageProps} />
        </ContextProvider>
      </PrismicPreview>
    </PrismicProvider>
  )
}
