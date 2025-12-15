import '../css/SmallDataBox.css'
function SmallDataBox(props){

    return (
        <div className="small-data-box-container">
            <div className='data-box-title-container'>
                <p className='data-box-title'>{props.title}</p>
            </div>
            <div className='data-box-content-container'>
                <div className='data-box-text-data-container'>
                    <div className='data-box-sensor-data-container'>
                       {props.data && <p className='data-box-sensor-data'>{props.data[0]['number']}</p>}
                    </div>
                     <div className='data-box-sensor-interpretation-container'>
                        <div className='data-box-sensor-text-level'>
                            <p className='data-box-sensor-text'>Moderate</p>
                        </div>
                        <div className='data-box-sensor-color-level'>
                            <div className='data-box-sensor-color'></div>
                        </div>

                    </div>
                </div>
                <div className='data-box-graph-container'>
                    <p className='data-box-graph-title'>Viimase aja muutus</p>
                    <div className='data-box-graph'></div>
                </div>
            </div>
        </div>
    )
}
export default SmallDataBox;