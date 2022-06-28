import React from 'react'
import Helmet from 'react-helmet'

const Seo = ({ data }) => {

  return (
    <Helmet
      title={data.title}
      titleTemplate={`Jawudi | ${data.title}`}>
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
    </Helmet>
  )
}

export default Seo
