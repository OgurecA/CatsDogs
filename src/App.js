import './App.css';
import React, { useState, useEffect } from 'react';
import Button from "./Components/Button/Button"
import ImageContainer from './Components/ImageContainer/ImageContainer';
import BGcontainer from './Components/BGcontainer/BGcontainer';
import Stats from './Components/Stats/Stats';
import AddContainer from './Components/AddContainer/AddContainer';

import { HarrisImg, TrumpImg, TrumpBG, HarrisBG, TrumpP, HarrisP, bybit } from './Components/Pictures/Pictures';


function App() {
    const [isActive, setIsActive] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [contentVisible, setContentVisible] = useState('both');

    const [harrisCount, setHarrisCount] = useState(0);
    const [trumpCount, setTrumpCount] = useState(0);

    const [personalHarrisCount, setPersonalHarrisCount] = useState(0);
    const [personalTrumpCount, setPersonalTrumpCount] = useState(0);

    const personalHarrisPercentage = harrisCount > 0 ? (personalHarrisCount / harrisCount * 100).toFixed(1) : 0;
    const personalTrumpPercentage = trumpCount > 0 ? (personalTrumpCount / trumpCount * 100).toFixed(1) : 0;

    
    const [isSelectedHarris, setIsSelectedHarris] = useState(false);
    const [isSelectedTrump, setIsSelectedTrump] = useState(false);

    const [votes, setVotes] = useState({ Trump: 0, Harris: 0 });

    useEffect(() => {
        const ws = new WebSocket('wss://btc24news.online/ws');
        ws.onmessage = event => {
            const votes = JSON.parse(event.data);
            setVotes(votes);
        };
        return () => ws.close();
    }, []);
    

    const totalVotes = votes.Trump + votes.Harris;
    const harrisPercentage = totalVotes > 0 ? (votes.Harris / totalVotes * 100).toFixed(1) : 0;
    const trumpPercentage = totalVotes > 0 ? (votes.Trump / totalVotes * 100).toFixed(1) : 0;

    
    
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
            setTrumpCount(trumpCount + 1);
            setPersonalTrumpCount(personalTrumpCount + 1);
            console.log(personalTrumpPercentage);
            handleVote('Trump');
        }
    }
    function incrementHarrisCount() {
        if (isSelectedHarris) {
            setHarrisCount(harrisCount + 1);
            setPersonalHarrisCount(personalHarrisCount + 1);
            console.log(personalHarrisPercentage);
            handleVote('Harris');
        }
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
        </>

  );
}

export default App;
