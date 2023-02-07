import React from 'react'
import Image from 'next/image'
import coin from '../../assets/img/CoinIcon.png'

export default function CoinIcon() {
  return (
    <Image width={48} height={46} src={coin} alt="Coins" />
  )
}