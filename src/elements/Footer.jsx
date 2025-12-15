import '../css/Footer.css'
function Footer(){

    let creators = ['Kaarel Kruusement', 'Nikita Slavinski', "Martin Ševtšuk",  'Illimar Luukas Õim', "Mike Hideo Kahar"]

    return (
        <div className='footer-container'>
            {creators.map((creator) => <p>{creator}</p>)}
        </div>
    )
}
export default Footer;