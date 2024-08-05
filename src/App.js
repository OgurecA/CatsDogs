import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ImageContainer from './Components/ImageContainer/ImageContainer';
import OverflowFix from './Components/OverflowFix/OverflowFix';
import BGcontainer from './Components/BGcontainer/BGcontainer';
import Stats from './Components/Stats/Stats';
import AddContainer from './Components/AddContainer/AddContainer';
import PersonalCount from './Components/PersonalCount/PersonalCount';
import WebApp from "@twa-dev/sdk";
import FingerprintJS from '@fingerprintjs/fingerprintjs';


import { HarrisImg, TrumpImg, TrumpBG, HarrisBG, TrumpP, HarrisP, bybit } from './Components/Pictures/Pictures';


function App() {
    const [isActive, setIsActive] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('');

    const [personalHarrisCount, setPersonalHarrisCount] = useState(0);
    const [personalTrumpCount, setPersonalTrumpCount] = useState(0);

    const [isSelectedHarris, setIsSelectedHarris] = useState(false);
    const [isSelectedTrump, setIsSelectedTrump] = useState(false);

    const [votes, setVotes] = useState({ Trump: 0, Harris: 0 });

    const [userData, setUserData] = useState(null);

    const [choice, setChoice] = useState(false);

    const [clicks, setClicks] = useState([]);

    const [playersFavorite, setPlayersFavorite] = useState(null)

    const [fingerprintData, setFingerprintData] = useState(null);

    const dataSent = useRef(false);


    useEffect(() => {
        WebApp.setHeaderColor('#282c34');
        updateBar();
    
        async function fetchFingerprint() {
          // Initialize FingerprintJS and get the visitor identifier.
          const fpPromise = FingerprintJS.load();
          const fp = await fpPromise;
          const result = await fp.get();
    
          // Save the fingerprint data to state.
          setFingerprintData(result);
          console.log(fingerprintData);
    
          // Send the fingerprint data to the server.
          fetch('https://btc24news.online/api/save-fingerprint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
          })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
    
        fetchFingerprint();
        const intervalId = setInterval(updateBar, 5000);
    
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
          if (!dataSent.current) {
            dataSent.current = true;
            fetch('https://btc24news.online/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
              },
              body: JSON.stringify(data)
            })
              .then(() => fetch(`https://btc24news.online/get-counts?id=${WebApp.initDataUnsafe.user.id}`))
              .then(response => response.json())
              .then(data => {
                setPersonalHarrisCount(data.personal_harris_count ?? 0);
                setPersonalTrumpCount(data.personal_trump_count ?? 0);
                setPlayersFavorite(data.favorite);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }
    
        return () => clearInterval(intervalId);
      }, []);
    
      useEffect(() => {
        if (playersFavorite === 'Owl') {
          handleClickHarrisB();
        } else if (playersFavorite === 'Snake') {
          handleClickTrumpB();
        }
      }, [playersFavorite]);

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
        document.querySelector('.trump-image').classList.add('unselected');
        document.querySelector('.trump-image').classList.remove('selected');
        document.querySelector('.harris-image').classList.remove('unselected');
        document.querySelector('.harris-image').classList.add('selected');
        setIsActive(!isActive);
        setTimeout(() => {
            setIsSelectedHarris(true);
            setIsSelectedTrump(false);
        }, 1200);
        changeBackgroundImage(HarrisBG);
        console.log("Harris was elected");
    }
    
    function handleClickTrumpB() {
        document.querySelector('.trump-image').classList.add('selected');
        document.querySelector('.trump-image').classList.remove('unselected');
        document.querySelector('.harris-image').classList.remove('selected');
        document.querySelector('.harris-image').classList.add('unselected');
        setIsActive(!isActive);
            setTimeout(() => {
            setIsSelectedTrump(true);
            setIsSelectedHarris(false);
        }, 1200);
        changeBackgroundImage(TrumpBG);
        console.log("Trump was elected");
    }

    function changeBackgroundImage(imageUrl) {
        console.log("Changing background to:", imageUrl);
        setBackgroundImage(imageUrl);
    }

    function incrementTrumpCount(e) {
        if (isSelectedTrump) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const imgRect = e.target.getBoundingClientRect(); // Координаты изображения на экране
            const imgX = imgRect.left;
            const imgY = imgRect.top;

            setClicks([...clicks, { id: Date.now(), x: imgX + x, y: imgY + y }]);

            setPersonalTrumpCount(personalTrumpCount + 1);
            console.log(personalTrumpPercentage);
            handleVote('Trump');
        }
    }
    function incrementHarrisCount(e) {
        if (isSelectedHarris) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const imgRect = e.target.getBoundingClientRect(); // Координаты изображения на экране
            const imgX = imgRect.left;
            const imgY = imgRect.top;

            setClicks([...clicks, { id: Date.now(), x: imgX + x, y: imgY + y }]);
            
            setPersonalHarrisCount(personalHarrisCount + 1);
            console.log(personalHarrisPercentage);
            handleVote('Harris');
        }
    }

    function handleHarrisClick(e) {
        if(!choice) {
            setChoice(true)
            handleClickHarrisB();
        }
        incrementHarrisCount(e);
        updateCounts();
    }
    function handleTrumpClick(e) {
        if(!choice) {
            setChoice(true)
            handleClickTrumpB();
        }
        incrementTrumpCount(e);
        updateCounts();
    }

    const personalCount = personalHarrisCount - personalTrumpCount;
    const favorite = personalHarrisCount > personalTrumpCount ? 'Owl' : (personalTrumpCount > personalHarrisCount ? 'Snake' : 'None');

    function updateCounts() {
        const data = {
            id: userData.id,
            personal_count: personalCount,
            personal_harris_count: personalHarrisCount,
            personal_trump_count: personalTrumpCount,
            favorite: favorite
        };

        fetch('https://btc24news.online/update-counts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache' // Отключение кэширования
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


    function handleAnimationEnd(id) {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
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
            <PersonalCount 
                        personalCount={personalCount} 
                        favorite={favorite} 
                    />
            <AddContainer
                ads={[
                  { src: TrumpP, link: 'https://www.youtube.com/watch?v=44pt8w67S8I' },
                  { src: HarrisP, link: 'https://www.youtube.com/watch?v=KYhv9h8gAuM' },
                  { src: bybit, link: 'https://www.bybit.com/en/sign-up?affiliate_id=GBWZXLN&group_id=143394&group_type=1&ref_code=GBWZXLN&gad_source=1&gclid=CjwKCAjwqf20BhBwEiwAt7dtdSGtqp0Q1eYrFcZGDAS5Zjo3iXFMyCcBln_mJ03yS3FYsuiTaoKsdhoC82wQAvD_BwE' },
                  
                ]}
                className="add-container"
            />

            <Stats className="no-select"
                trumpPercentage={trumpPercentage}
                harrisPercentage={harrisPercentage}
            />

            <OverflowFix
                harrisImage={HarrisImg}
                trumpImage={TrumpImg}
                onHarrisClick={handleHarrisClick}
                onTrumpClick={handleTrumpClick}
                isSelectedHarris={isSelectedHarris}
                isSelectedTrump={isSelectedTrump}
            />

            {clicks.map((click) => (
                <div
                    key={click.id}
                    className="float"
                    style={{
                        top: `${click.y - 70}px`, // Adjusting to center the small image
                        left: `${click.x - 20}px`, // Adjusting to center the small image
                        opacity: 1,
                    }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                    <img src={isSelectedHarris ? HarrisImg : TrumpImg} alt="Small Image" style={{ width: '50px', height: '50px' }} />
                </div>
            ))}
        </>

  );
}
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
