import React from 'react'
import Image from 'next/image'
import apple from '../../assets/img/apple-btn.png'

export default function IconApple() {
  return (
    <Image width={130} height={43} src={apple} alt="Apple Store" />
  )
}