import React from 'react'
import Facebook from './social/facebook'
import Twitter from './social/twitter'
import Instagram from './social/instagram'
import TikTok from './social/tiktok'
import Play from './icons/play'
import Apple from './icons/iconApple'
import Android from './icons/iconAndroid'
import Close from './icons/close'
import IconBlue from './icons/iconBlue'
import Linkedin from './social/linkedin'
import LinkedinBlack from './social/linkedinBlack'
import Arrow from './icons/arrow'
import Chat from './icons/chat'
import EmailUs from './icons/emailUs'
import HelpCenter from './icons/helpCenter'
import LogoGreen from './icons/logoGreen'
import Rate from './icons/rate'
import Pay from './icons/pay'
import MoneyGet from './icons/moneyGet'
import Send from './icons/send'
import Email from './icons/email'
import ArrowBtn from './icons/arrowBtn'
import PlayProducts from './icons/playProducts'
import PauseProducts from './icons/pauseProducts'
import LogoJawudi from './icons/logoJawudi'

const Icon = ({ icon, className }) => {

    const icons = {
        'Instagram' : Instagram,
        'Facebook' : Facebook,
        'Twitter' : Twitter,
        'Tik Tok' : TikTok,
        'play' : Play,
        'apple' : Apple,
        'android' : Android,
        'close': Close,
        'icon-blue' : IconBlue,
        'linkedin' : Linkedin,
        'linkedinBlack' : LinkedinBlack,
        'arrow' : Arrow,
        'chat' : Chat,
        'email' : EmailUs,
        'helpcenter' : HelpCenter,
        'logoGreen' : LogoGreen,
        'rate' : Rate,
        'pay' : Pay,
        'moneyGet' : MoneyGet,
        'send' : Send,
        'email' : Email,
        'arrow-btn' : ArrowBtn,
        'play-products' : PlayProducts,
        'pause-products' : PauseProducts,
        'logo-jawudi' : LogoJawudi
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
