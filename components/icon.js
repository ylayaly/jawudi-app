import React from 'react'
import Facebook from './social/facebook'
import Twitter from './social/twitter'
import Instagram from './social/instagram'
import TikTok from './social/tiktok'
import Play from './icons/play'
import Apple from './icons/iconApple'
import Android from './icons/iconAndroid'
import Close from './icons/close'

const Icon = ({ icon, className }) => {

    const icons = {
        'Instagram' : Instagram,
        'Facebook' : Facebook,
        'Twitter' : Twitter,
        'Tik Tok' : TikTok,
        'play' : Play,
        'apple' : Apple,
        'android' : Android,
        'close': Close
    }
    const Icon = icons[icon]
    
    return (
    <>
        {Icon && (
            <div className={className}>
                <Icon />
            </div>
        )}
    </>
    )

}

export default Icon
