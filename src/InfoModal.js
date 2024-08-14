import React from 'react';
import { useState } from 'react';

function InfoModal({ setInfoModal }) {
    const [language, setLanguage] = useState(false);

    return (
    <div className='infoModalContainer'>
        <div className='infoButtonContainer'>
            <div className='infoBtn' onClick={() => setLanguage(!language)}>{language ? "English" : "Türkçe"}</div>
        </div>
        
        <h1>{language ? "Bilgilendirme" : "Information"}</h1>
        {language && <div className='infoText'><p>
        Eczaneler nöbet haricinde hafta içi ve cumartesi günleri 08:30 - 19.00 saatleri arasında açık olurlar. Nöbetçi eczaneler ise 24 saat açıktır.</p>
        <br />
        <p>Pazar ve bayram tatillerine denk gelen günlerde de nöbetçi eczaneler çalışmaktadır.</p>
        <br />
        <p>(Uygulama listelenen nöbetçi eczanelerin nöbet saati bitimine(Tüm eczanelerin açılış saati) kadar tıklanan iller için browser'a(localStorage) kaydedilir, böylece çevrim dışı durumda nöbet saati bitene kadar kullanılabilir. Nöbet saati geçtiğinde yapılan listelemelerde API'dan güncel liste istenir.)
        <br />
        <br />
        API Link: <a href="https://collectapi.com/tr/api/health/nobetci-eczane-api" rel='noreferrer' target='_blank'>https://collectapi.com/tr/api/health/nobetci-eczane-api</a>
        </p>
        </div>}
        {!language && <div className='infoText'>
        <p>Pharmacies are open on weekdays and Saturdays from 08:30 to 19:00, except for night shifts. Night shift pharmacies are open 24 hours.</p>
        <br />
        <p>On Sundays and public holidays, there are also pharmacies on duty.</p>
        <br />
        <p>The application saves the clicked cities for the listed duty pharmacies to the browser's localStorage until the end of the duty hours (openings of all pharmacies), allowing it to be used offline until the duty hours expire. Updated list fetch with API request, after end of the duty time passed
        <br />
        <br />
        API Link: <a href="https://collectapi.com/tr/api/health/nobetci-eczane-api" rel='noreferrer' target='_blank'>https://collectapi.com/tr/api/health/nobetci-eczane-api</a>
        </p>
        </div>}
        <div className='okBtnContainer'>
            <div className='infoBtn' onClick={() => setInfoModal(false)}>OK</div>
        </div>
    </div>
    )
}

export default InfoModal
