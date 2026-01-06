import { useEffect, useState } from 'react';
import './css/MainPage.css'
import BigDataBox from './elements/BigDataBox';
import Footer from './elements/Footer';
import Header from './elements/Header';
import SmallDataBox from './elements/SmallDataBox';
function MainPage(props){


    const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;
    const localhost = "http://localhost:13869"

    const [data, setData] = useState(null);


    const [roomSize, setRoomSize] = useState({"pikkus": 1, "laius": 1, "kõrgus": 1})



    useEffect(() => {
    // Define the fetch function
        const fetchData = async () => {
        try {
             const url = new URL("/api/general/all", serverDomain);
            url.searchParams.append("number_limit", '10');
            const response = await fetch(url.toString(), {method:"get"});
            const result = await response.json();
            setData(result);
            console.log(result['camera'])
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };

        // Fetch immediately
        fetchData();

        // Set interval for every 5 seconds
        const intervalId = setInterval(fetchData, 2500);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

  


    return (<>
    <Header />
    <div className='main-page-container'>
        <div className='main-page-content-container'>
            

            <div className='data-container'>
                {data && <div className='data-left-container'>
                    <SmallDataBox showBar={true} roomSize={roomSize}  title="Camera detected people" data={data['camera']}/>
                    <SmallDataBox roomSize={roomSize}  showBar={false} title="Distance" data={[{"number": 1.7}]}/>

                </div>}
                 <div className='data-right-container'>
                    {data && data['camera'] && <BigDataBox cameraData={data['camera']} roomSize={roomSize} setRoomSize={setRoomSize} setData={setData}/>}
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>)
}

export default MainPage;