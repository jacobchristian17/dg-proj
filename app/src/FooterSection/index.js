import React from 'react'
import './style.css'
import Elsevier from "../_imgsrc/elsevier-logo.png"
function FooterSection() {
  return (
    <>
    <div className='footer-container'>
        <div className='footer-img-container'>
            <img src={Elsevier} alt='elsevier-logo' height='100'/>
        </div>
        <div className='tr-1'>
            <div className='school'>Mapua University</div>
            <div className='dep'>School of Electronics, Communication, and Computer Engineering</div>
        </div>
        <div className='tr-2'>
            <div>Dino, Arvin</div>
            <div>Gagante, Miguel</div>
        </div>
    </div>
    </>
  )
}

export default FooterSection