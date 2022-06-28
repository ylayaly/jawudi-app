import React from 'react'
import Image from 'next/image'
import tikTok from '../../assets/img/tik-tok.png'

function TikTok() {
  return (
    <Image width={20} height={20} src={tikTok} alt="Tik Tok" />
  )
}

export default TikTok
