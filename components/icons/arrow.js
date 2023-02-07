import React from 'react'
import Image from 'next/image'
import img from '../../assets/img/arrow.png'

function Arrow() {
  return (
    <Image width={30} height={30} src={img} alt="more" />
  )
}

export default Arrow
