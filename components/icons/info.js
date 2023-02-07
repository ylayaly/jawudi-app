import React from 'react'
import Image from 'next/image'
import info from '../../assets/img/info.png'

export default function Info() {
  return (
    <Image width={45} height={45} src={info} alt="More information" />
  )
}