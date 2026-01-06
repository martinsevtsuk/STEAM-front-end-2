import { useState } from 'react';
import '../css/BigDataBox.css'
function BigDataBox(props){
        
    const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;
    const [showDialog, setShowDialog] = useState(false)

    
    function onChangeButtonClick(){
        if (showDialog){
            let newData = {
                "pikkus": (!document.getElementById("length").value || document.getElementById("length").value == 0) ? 1 : document.getElementById("length").value,
                "laius": (!document.getElementById("width").value || document.getElementById("width").value == 0) ? 1 : document.getElementById("width").value,
                "kõrgus": (!document.getElementById("height").value || document.getElementById("height").value == 0) ? 1 :  document.getElementById("height").value
            }
            props.setRoomSize(newData)
        }
        else{
            
        }
        setShowDialog(!showDialog)
    }



    function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file");
        return;
    }

    // Check MIME type
    if (file.type !== "audio/mpeg") {
        alert("Only MP3 files are allowed");
        return;
    }

    // Optional: check extension
    if (!file.name.toLowerCase().endsWith(".mp3")) {
        alert("Invalid file extension");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch(serverDomain + "/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    
}
  function calculateRecommendation(){
        return Math.round((props.roomSize['laius'] * props.roomSize['pikkus'] * props.roomSize['kõrgus']) / 9);
    }


    return (
        <div className="big-data-box-container">
            <div className='reset-button-container'>
                <button className='reset-button' onClick={()=>{
                    props.setData({"camera": [{"number": 0}]})
                    props.setRoomSize({"pikkus": 1, "laius": 1, "kõrgus": 1})
                }}>Lähtesta</button>
            </div>
            <div className='big-data-content'>
                <div className='people-data-container'>
                    <p className='people-data-title'>Inimesi toas:</p>
                    <div className='people-data'>
                        {props.cameraData && props.cameraData.length > 0 && <p className='people-data-number'>{props.cameraData[0].number}</p>}
                        <p className='people-data-recommendation'>Soovitatud maksimaalne arv inimesi: {calculateRecommendation()}</p>
                    </div>
                </div>
                <div className='music-file-drop-container'>
                    <p className='music-file-title'>Upload file</p>
                    <input type='file'  className='upload-file-input' id="fileInput"   accept=".mp3,audio/mpeg"></input>
                    <button className='upload-file-button' onClick={()=>uploadFile()}>Lae file üles</button>
                </div>
                <div className='room-size-container'>
                    <p className='room-size-title'>Toa mõõtmed</p>
                    <div className='room-size-settings-container'>
                        <div className='room-size-info-container'>
                            {Object.keys(props.roomSize).map((key) => <p>{key.charAt(0).toUpperCase() + key.slice(1) + ": " + props.roomSize[key] + "m"}</p>)}
                        </div>
                        <div className='room-size-button-container'>
                            <button onClick={()=>onChangeButtonClick()} className='room-size-button'>{showDialog ? "Salvesta" : "Muuda"}</button>
                        </div>
                    </div>
                </div>
                {showDialog && <div className='room-size-dialog'>
                     <p className='room-size-dialog-title'>Sisesta uued toa mõõtmed</p>
                     <div className='room-size-new-container'>
                        <input placeholder='Pikkus' id='length' type='number'></input>
                         <input placeholder='Laius' id='width' type='number'></input>
                        <input placeholder='Kõrgus' id='height' type='number'></input>

                     </div>
                </div>}
            </div>
        </div>
    )
}
export default BigDataBox;