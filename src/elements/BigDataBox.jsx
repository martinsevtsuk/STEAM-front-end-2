import '../css/BigDataBox.css'
function BigDataBox(props){


    return (
        <div className="big-data-box-container">
            <div className='reset-button-container'>
                <button className='reset-button' onClick={()=>props.setData(null)}>Reset</button>
            </div>
            <div className='big-data-content'></div>
        </div>
    )
}
export default BigDataBox;