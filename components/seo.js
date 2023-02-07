import React from 'react'
import Head from 'next/head'

const Seo = ({ data }) => {

  return (
    <Head>
      <title>{`${data.title} | Jawudi`}</title>
      <meta name='description' content={data.description} />
      <meta property='og:title' content={data.title} />
      <meta property='og:image' content={data.image} />
      <meta property='og:description' content={data.description} />
      <meta name='twitter:title' content={data.title} />
      <meta name='twitter:description' content={data.description} />
      <meta name='twitter:image' content={data.image} />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='favicon.png'
      />
      <link href="https://use.typekit.net/pjo6tun.css" rel="stylesheet" type="text/css"></link>
    </Head>
  )
}

export default Seo
