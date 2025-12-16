import '../css/BigDataBox.css'
function BigDataBox(props){
        
    const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;



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


    return (
        <div className="big-data-box-container">
            <div className='reset-button-container'>
                <button className='reset-button' onClick={()=>props.setData(null)}>Reset</button>
            </div>
            <div className='big-data-content'>
                <div className='people-data-container'>
                    <p className='people-data-title'>Inimesi toas:</p>
                    <div className='people-data'>
                        <p className='people-data-number'>6-7</p>
                        <p className='people-data-recommendation'>Rekomendeeritud arv inimesi: 4</p>
                    </div>
                </div>
                <div className='music-file-drop-container'>
                    <p className='people-data-title'>Music file:</p>
                    <input type='file'  id="fileInput"   accept=".mp3,audio/mpeg"></input>
                    <button onClick={()=>uploadFile()}>Upload file</button>
                </div>
            </div>
        </div>
    )
}
export default BigDataBox;