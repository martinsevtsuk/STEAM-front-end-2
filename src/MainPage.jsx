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


    useEffect(() => {
    // Define the fetch function
        const fetchData = async () => {
        try {
            const response = await fetch(serverDomain + "/api/general/all", {method:"get"});
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
                    <SmallDataBox title="Temperature" data={data['temp']}/>
                    <SmallDataBox title="Humidity" data={data['hum']}/>
                    <SmallDataBox title="Camera detected people" data={data['camera']}/>

                </div>}
                 <div className='data-right-container'>
                    <BigDataBox setData={setData}/>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>)
}

export default MainPage;