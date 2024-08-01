import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from "./Components/Button/Button"
import ImageContainer from './Components/ImageContainer/ImageContainer';
import BGcontainer from './Components/BGcontainer/BGcontainer';
import Stats from './Components/Stats/Stats';
import AddContainer from './Components/AddContainer/AddContainer';
import WebApp from "@twa-dev/sdk";

import { HarrisImg, TrumpImg, TrumpBG, HarrisBG, TrumpP, HarrisP, bybit } from './Components/Pictures/Pictures';


function App() {
    const [isActive, setIsActive] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [contentVisible, setContentVisible] = useState('both');

    const [personalHarrisCount, setPersonalHarrisCount] = useState(0);
    const [personalTrumpCount, setPersonalTrumpCount] = useState(0);

    const [isSelectedHarris, setIsSelectedHarris] = useState(false);
    const [isSelectedTrump, setIsSelectedTrump] = useState(false);

    const [votes, setVotes] = useState({ Trump: 0, Harris: 0 });

    const [userData, setUserData] = useState(null);


    const [clicks, setClicks] = useState([]);


    useEffect(() => {
        updateBar();
        const intervalId = setInterval(updateBar, 10000);
            if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
                setUserData(WebApp.initDataUnsafe.user);
    
                const data = {
                    id: WebApp.initDataUnsafe.user.id,
                    first_name: WebApp.initDataUnsafe.user.first_name,
                    last_name: WebApp.initDataUnsafe.user.last_name,
                    username: WebApp.initDataUnsafe.user.username,
                    language_code: WebApp.initDataUnsafe.user.language_code,
                    is_premium: WebApp.initDataUnsafe.user.is_premium ? 'Yes' : 'No'
                };
    
                // Fetch to submit user data
                fetch('https://btc24news.online/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
            return () => clearInterval(intervalId);
        }, []);

    const totalVotes = votes.Trump + votes.Harris;
    const harrisPercentage = totalVotes > 0 ? (votes.Harris / totalVotes * 100).toFixed(1) : 0;
    const trumpPercentage = totalVotes > 0 ? (votes.Trump / totalVotes * 100).toFixed(1) : 0;

    const personalHarrisPercentage = votes.Harris > 0 ? (personalHarrisCount / votes.Harris * 100).toFixed(1) : 0;
    const personalTrumpPercentage = votes.Trump > 0 ? (personalTrumpCount / votes.Trump * 100).toFixed(1) : 0;
   
    function updateBar() {
        fetch('https://btc24news.online/votes')
            .then(response => response.json())
            .then(data => setVotes(data.votes))
    }

    function handleClickHarrisB() {
        document.documentElement.style.setProperty('--harris-left', '25vw');
        document.documentElement.style.setProperty('--trump-left', '-60vw'); 
        setIsActive(!isActive);
        setTimeout(() => {
            setContentVisible('harris');
            setIsSelectedHarris(true);
            setIsSelectedTrump(false);
        }, 1200);
        changeBackgroundImage(HarrisBG);
        console.log("Harris was elected");
    }
    
    function handleClickTrumpB() {
        document.documentElement.style.setProperty('--trump-left', '25vw');
        document.documentElement.style.setProperty('--harris-left', '-60vw');
        setIsActive(!isActive);
            setTimeout(() => {
            setIsSelectedTrump(true);
            setIsSelectedHarris(false);
            setContentVisible('trump');
        }, 1200);
        changeBackgroundImage(TrumpBG);
        console.log("Trump was elected");
    }

    function changeBackgroundImage(imageUrl) {
        console.log("Changing background to:", imageUrl);
        setBackgroundImage(imageUrl);
    }

    function incrementTrumpCount() {
        if (isSelectedTrump) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setClicks([...clicks, { id: Date.now(), x, y }]);

            setPersonalTrumpCount(personalTrumpCount + 1);
            console.log(personalTrumpPercentage);
            handleVote('Trump');
        }
    }
    function incrementHarrisCount() {
        if (isSelectedHarris) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setClicks([...clicks, { id: Date.now(), x, y }]);
            
            setPersonalHarrisCount(personalHarrisCount + 1);
            console.log(personalHarrisPercentage);
            handleVote('Harris');
        }
    }

    function handleAnimationEnd(id) {
        setClicks(clicks.filter(click => click.id !== id));
    }

    function handleVote(candidate) {
        fetch(`https://btc24news.online/vote/${candidate}`, {
          method: 'POST'
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Error:', error));
      }

  return (
    <>
            <BGcontainer src={backgroundImage} />

            <main className="p-4">
        {
          userData ?
          (
            <>
              <h1 className="text-2xl font-bold mb-4">User Data</h1>
              <ul>
                <li>ID: {userData.id}</li>
                <li>First Name: {userData.first_name}</li>
                <li>Last Name: {userData.last_name}</li>
                <li>Username: {userData.username}</li>
                <li>Language Code: {userData.language_code}</li>
                <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
              </ul>
            </>
          ) :
          (
            <>
              <div>Loading...</div>
            </>
          )
        }
      </main>

            <AddContainer
                ads={[
                  { src: TrumpP, link: 'https://www.youtube.com/watch?v=44pt8w67S8I' },
                  { src: HarrisP, link: 'https://www.youtube.com/watch?v=KYhv9h8gAuM' },
                  { src: bybit, link: 'https://www.bybit.com/en/sign-up?affiliate_id=GBWZXLN&group_id=143394&group_type=1&ref_code=GBWZXLN&gad_source=1&gclid=CjwKCAjwqf20BhBwEiwAt7dtdSGtqp0Q1eYrFcZGDAS5Zjo3iXFMyCcBln_mJ03yS3FYsuiTaoKsdhoC82wQAvD_BwE' },
                  
                ]}
                className="add-container"
            />

            <Stats
                trumpPercentage={trumpPercentage}
                harrisPercentage={harrisPercentage}
            />

            {contentVisible === 'both' && (
                <>
                    <Button
                        title={'Choose Harris'}
                        disable={false}
                        className={`HarrisButton ${isSelectedHarris ? 'selected' : ''}`}
                        isActive={isActive}
                        onClick={handleClickHarrisB}
                    />
                    <Button
                        title={'Choose Trump'}
                        disable={false}
                        className={`TrumpButton ${isSelectedTrump ? 'selected' : ''}`}
                        isActive={isActive}
                        onClick={handleClickTrumpB}
                    />
                </>
            )}
            {(contentVisible === 'harris' || contentVisible === 'both') && (
                <ImageContainer
                    src={HarrisImg}
                    className={`image-container harris-image ${isSelectedHarris ? 'selected' : ''}`}
                    disable={false}
                    onClick={incrementHarrisCount}
                />
            )}
            {(contentVisible === 'trump' || contentVisible === 'both') && (
                <ImageContainer
                    src={TrumpImg}
                    className={`image-container trump-image ${isSelectedTrump ? 'selected' : ''}`}
                    disable={false}
                    onClick={incrementTrumpCount}
                />
            )}
            {clicks.map((click) => (
                <div
                    key={click.id}
                    className="absolute"
                    style={{
                        top: `${click.y}px`,
                        left: `${click.x}px`,
                        animation: 'float 1s ease-out'
                    }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                    <img src={HarrisImg} alt="Small Harris" style={{ width: '50px', height: '50px' }} />
                </div>
            ))}
        </>

  );
}
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
