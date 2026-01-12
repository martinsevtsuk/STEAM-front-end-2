import { useEffect, useState } from 'react';
import './css/MainPage.css'
import BigDataBox from './elements/BigDataBox';
import Footer from './elements/Footer';
import Header from './elements/Header';
import SmallDataBox from './elements/SmallDataBox';
import SecurityPanel from './elements/SecurityPanel';

function MainPage(props){

    const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

    const [data, setData] = useState(null);
    const [roomSize, setRoomSize] = useState({"pikkus": 1, "laius": 1, "kõrgus": 1});

    // Security system state
    const [isArmed, setIsArmed] = useState(false);
    const [armingCountdown, setArmingCountdown] = useState(0);
    const [baselineDistance, setBaselineDistance] = useState(null);
    const [alertActive, setAlertActive] = useState(false);

    useEffect(() => {
    // Define the fetch function
        const fetchData = async () => {
        try {
             const url = new URL("/api/general/all", serverDomain);
            url.searchParams.append("number_limit", '10');
            const response = await fetch(url.toString(), {method:"get"});
            const result = await response.json();
            setData(result);
            console.log('API Response:', result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };

        // Fetch immediately
        fetchData();

        // Set interval for every 2.5 seconds
        const intervalId = setInterval(fetchData, 2500);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [serverDomain]);

    // Motion detection logic
    useEffect(() => {
        if (!isArmed || !data || !data.distance || !data.distance.length) return;
        
        const currentDistance = data.distance[0].distance;
        
        // On first armed state, set baseline
        if (baselineDistance === null) {
            console.log('Setting baseline distance:', currentDistance);
            setBaselineDistance(currentDistance);
            return;
        }

        // Check for motion (distance change > 10cm)
        const distanceChange = Math.abs(currentDistance - baselineDistance);
        console.log(`Distance change: ${distanceChange}cm (current: ${currentDistance}, baseline: ${baselineDistance})`);
        
        if (distanceChange > 10) {
            console.log('MOTION DETECTED! Triggering alert!');
            setAlertActive(true);
        }
    }, [data, isArmed, baselineDistance]);

    // Arming countdown logic
    useEffect(() => {
        if (armingCountdown > 0) {
            const timer = setTimeout(() => {
                setArmingCountdown(armingCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (armingCountdown === 0 && isArmed && baselineDistance === null) {
            // Countdown finished, system is now armed
            console.log('System armed!');
        }
    }, [armingCountdown, isArmed, baselineDistance]);

    // Handle security toggle button
    const handleSecurityToggle = () => {
        if (alertActive || isArmed) {
            // Disarm the system
            console.log('Disarming system');
            setIsArmed(false);
            setAlertActive(false);
            setBaselineDistance(null);
            setArmingCountdown(0);
        } else {
            // Start arming sequence
            console.log('Starting arming sequence');
            setIsArmed(true);
            setArmingCountdown(5);
            setBaselineDistance(null); // Will be set after countdown
        }
    };

    return (<>
    <Header />
    <div className={`main-page-container ${alertActive ? 'alert-active' : ''}`}>
        <div className='main-page-content-container'>
            
            <div className='data-container'>
                {data && <div className='data-left-container'>
                    <SmallDataBox showBar={true} roomSize={roomSize}  title="Kaameraga tuvastatud inimesed" data={data['camera']}/>
                    <SmallDataBox 
                        roomSize={roomSize} 
                        showBar={false} 
                        title="Kaugus (cm)" 
                        data={data['distance'] || [{number: 0}]}
                    />
                    <SecurityPanel
                        isArmed={isArmed}
                        armingCountdown={armingCountdown}
                        alertActive={alertActive}
                        onToggle={handleSecurityToggle}
                    />
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