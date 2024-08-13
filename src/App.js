import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import OverflowFix from './Components/OverflowFix/OverflowFix';
import BGcontainer from './Components/BGcontainer/BGcontainer';
import Stats from './Components/Stats/Stats';
import AddContainer from './Components/AddContainer/AddContainer';
import PersonalCount from './Components/PersonalCount/PersonalCount';
import Energy from './Components/Energy/Energy';
import WebApp from "@twa-dev/sdk";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import LoadScreenContainer from './Components/LoadScreenContainer/LoadScreenContainer';

import ButtonBar from './Components/ButtonBar/ButtonBar';
import PageSocial from './Components/PageSocial/PageSocial';
import PageShop from './Components/PageShop/PageShop';
import PageInventory from './Components/PageInventory/PageInventory';
import PageExchange from './Components/PageExchange/PageExchange';


import { HarrisImg, TrumpImg, TrumpBG, HarrisBG, TrumpP, HarrisP, bybit, CatBack, Snake, Gorilla, Tiger, Elephant, Croc } from './Components/Pictures/Pictures';


function App() {



   // useEffect(() => {
        // Очищаем локальное хранилище при закрытии/перезагрузке страницы
    //    const handleUnload = () => {
    //        localStorage.clear(); // Очищаем все данные из локального хранилища
    //    };

    //    window.addEventListener('beforeunload', handleUnload);

    //    return () => {
    //        window.removeEventListener('beforeunload', handleUnload);
    //    };
 //   }, []);




    const [backgroundImage, setBackgroundImage] = useState('');

    const [personalHarrisCount, setPersonalHarrisCount] = useState(0);
    const [personalTrumpCount, setPersonalTrumpCount] = useState(0);

    const [isSelectedHarris, setIsSelectedHarris] = useState(false);
    const [isSelectedTrump, setIsSelectedTrump] = useState(false);

    const [votes, setVotes] = useState({ Trump: 0, Harris: 0 });

    const [energy, setEnergy] = useState(100);
    const [maxEnergy, setMaxEnergy] = useState(100);
    const [energyRecovery, setEnergyRecovery] = useState(1);
    const [energyTake, setEnergyTake] = useState(1);
    const [personalDMG, setPersonalDMG] = useState(1);
    const [teamDMG, setTeamDMG] = useState(1);

    const [name, setName] = useState("none");

    const [userData, setUserData] = useState(null);

    const [choice, setChoice] = useState(false);

    const [clicks, setClicks] = useState([]);

    const [playersFavorite, setPlayersFavorite] = useState(null);

    const [fingerprintData, setFingerprintData] = useState(null);
    
    const [isSocialPageVisible, setIsSocialPageVisible] = useState(false);
    const [isShopPageVisible, setIsShopPageVisible] = useState(false);
    const [isInventoryPageVisible, setIsInventoryPageVisible] = useState(false);
    const [isExchangePageVisible, setIsExchangePageVisible] = useState(false);

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [displayedImageA, setDisplayedImageA] = useState(HarrisImg);
    const [displayedImageB, setDisplayedImageB] = useState(TrumpImg);

    // Восстанавливаем данные из локального хранилища при загрузке приложения
    useEffect(() => {
        const savedIndex = localStorage.getItem('selectedCardIndex');
        const savedImage = localStorage.getItem('selectedCardImage');
        if (savedIndex !== null && savedImage !== null) {
            setSelectedCardIndex(Number(savedIndex));
            setDisplayedImageA(savedImage);
            setDisplayedImageB(savedImage);
        }
    }, []);

    const handleCardSelect = (index) => {
        setSelectedCardIndex(index);

        let image;
        let newMaxEnergy;
        let newEnergyRecovery;
        let newEnergyTake;
        let newTeamDMG;
        let newPersonalDMG;

        let newName;

        switch (index) {
            case 0:
                image = Snake;
                newMaxEnergy = 100;
                newEnergyRecovery = 4;
                newEnergyTake = 1;
                newTeamDMG = 1;
                newPersonalDMG = 1;
                newName = "Snake";
                break;
            case 1:
                image = Gorilla;
                newMaxEnergy = 100;
                newEnergyRecovery = 1;
                newEnergyTake = 1;
                newTeamDMG = 5;
                newPersonalDMG = 1;
                newName = "Gorilla";
                break;
            case 2:
                image = Croc;
                newMaxEnergy = 100;
                newEnergyRecovery = 1;
                newEnergyTake = 10;
                newTeamDMG = 1;
                newPersonalDMG = 1;
                newName = "Croc";
                break;
            case 3:
                image = Elephant;
                newMaxEnergy = 300;
                newEnergyRecovery = 1;
                newEnergyTake = 1;
                newTeamDMG = 1;
                newPersonalDMG = 1;
                newName = "Elephant";
                break;
            case 4:
                image = Tiger;
                newMaxEnergy = 100;
                newEnergyRecovery = 1;
                newEnergyTake = 1;
                newTeamDMG = 1;
                newPersonalDMG = 5;
                newName = "Tiger";
                break;
            default:
                image = null;
        }

        setMaxEnergy(newMaxEnergy);

        setEnergyRecovery(newEnergyRecovery);
        setEnergyTake(newEnergyTake);
        setTeamDMG(newTeamDMG);
        setPersonalDMG(newPersonalDMG);
        setName(newName);

        setDisplayedImageA(image);
        setDisplayedImageB(image);

        localStorage.setItem('selectedCardIndex', index);
        localStorage.setItem('selectedCardImage', image);


    };

    const handleSocialPage = () => {
        if (isSocialPageVisible) {
            setIsSocialPageVisible(false);
            setIsShopPageVisible(false);
            setIsInventoryPageVisible(false);
            setIsExchangePageVisible(false);
          } else {
            setIsSocialPageVisible(true);
            setIsShopPageVisible(false);
            setIsInventoryPageVisible(false);
            setIsExchangePageVisible(false);
          }
    };
    const handleShopPage = () => {
        if (isShopPageVisible) {
            setIsSocialPageVisible(false);
            setIsShopPageVisible(false);
            setIsInventoryPageVisible(false);
            setIsExchangePageVisible(false);
          } else {
            setIsSocialPageVisible(false);
            setIsShopPageVisible(true);
            setIsInventoryPageVisible(false);
            setIsExchangePageVisible(false);
          }
    };
    const handleInventoryPage = () => {
        if (isInventoryPageVisible) {
            setIsSocialPageVisible(false);
            setIsShopPageVisible(false);
            setIsInventoryPageVisible(false);
            setIsExchangePageVisible(false);
          } else {
            setIsInventoryPageVisible(true);
            setIsSocialPageVisible(false);
            setIsShopPageVisible(false);
            setIsExchangePageVisible(false);
          }
    };
    const handleExchangePage = () => {
        if (isExchangePageVisible) {
            setIsSocialPageVisible(false);
            setIsShopPageVisible(false);
            setIsInventoryPageVisible(false);
            setIsExchangePageVisible(false);
          } else {
            setIsSocialPageVisible(false);
            setIsShopPageVisible(false);
            setIsInventoryPageVisible(false);
            setIsExchangePageVisible(true);
          }
    };


    useEffect(() => {
        WebApp.setHeaderColor('#282c34');
        updateBar();
    
        async function fetchFingerprint() {
          // Initialize FingerprintJS and get the visitor identifier.
          const fpPromise = FingerprintJS.load();
          const fp = await fpPromise;
          const result = await fp.get();
          
          if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
            result.userId = WebApp.initDataUnsafe.user.id;
          }

          // Save the fingerprint data to state.
          setFingerprintData(result);
    
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
            
          fetch('https://btc24news.online/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login request failed');
            }
            console.log('Login successful');
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        fetch(`https://btc24news.online/get-counts?id=${WebApp.initDataUnsafe.user.id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Get counts request failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched counts:', data); // Логирование полученных данных
            setPersonalHarrisCount(data.personal_harris_count ?? 0);
            setPersonalTrumpCount(data.personal_trump_count ?? 0);
            setPlayersFavorite(data.favorite ?? 'none');
        })
        .catch((error) => {
            console.error('Error:', error);
        });


        }
    
        return () => clearInterval(intervalId);
      }, []);
    
      useEffect(() => {
        if (playersFavorite === 'Dire Warriors') {
          handleClickHarrisB();
          setChoice(true);
        } else if (playersFavorite === 'Wild Hearts') {
          handleClickTrumpB();
          setChoice(true);
        }
      }, [playersFavorite]);

      useEffect(() => {
        const loadEnergy = () => {
            const savedEnergy = parseInt(localStorage.getItem('energy'), 10);
            const lastActiveTime = parseInt(localStorage.getItem('lastActiveTime'), 10);
    
            if (!isNaN(savedEnergy) && !isNaN(lastActiveTime)) {
                const currentTime = Date.now();
                const timeElapsed = currentTime - lastActiveTime;
    
                console.log("Time elapsed since last active (ms):", timeElapsed);
    
                const energyRecovered = Math.floor(timeElapsed / 1000) * energyRecovery;
    
                let newEnergy = savedEnergy;
                if (savedEnergy < maxEnergy) {
                    newEnergy = Math.min(savedEnergy + energyRecovered, maxEnergy);
                    console.log("New energy after recovery:", newEnergy);
                } else {
                    console.log("Energy is already at or above max, no recovery applied.");
                }
    
                // Устанавливаем новое значение энергии
                setEnergy(newEnergy);
            } else {
                // Если данных нет, устанавливаем начальное значение энергии, но не выше maxEnergy
                setEnergy(prevEnergy => Math.min(prevEnergy, maxEnergy));
            }
        };
    
        const updateEnergy = () => {
            setEnergy(prevEnergy => {
                if (prevEnergy >= maxEnergy) {
                    localStorage.setItem('lastActiveTime', Date.now());
                    return prevEnergy; // Если энергия уже больше или равна maxEnergy, ничего не делаем
                }
    
                const newEnergy = Math.min(prevEnergy + energyRecovery, maxEnergy);
                localStorage.setItem('energy', newEnergy); // Сохраняем энергию в хранилище при обновлении
                localStorage.setItem('lastActiveTime', Date.now());
                return newEnergy;
            });
        };
    
        // Загружаем энергию и рассчитываем её восстановление только при запуске приложения
        loadEnergy();
    
        // Запускаем интервал восстановления энергии
        const energyRecoveryInterval = setInterval(updateEnergy, 1000);
    
        return () => clearInterval(energyRecoveryInterval);
    }, [maxEnergy, energyRecovery]);
    


    

    const totalVotes = votes.Trump + votes.Harris;
    const harrisPercentage = totalVotes > 0 ? (votes.Harris / totalVotes * 100).toFixed(1) : 0;
    const trumpPercentage = totalVotes > 0 ? (votes.Trump / totalVotes * 100).toFixed(1) : 0;


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
        setIsSelectedHarris(true);
        setIsSelectedTrump(false);
        changeBackgroundImage(HarrisBG);
        setDisplayedImageA(Snake);
        setSelectedCardIndex(0);
        console.log("Harris was elected");
    }
    
    function handleClickTrumpB() {
        document.querySelector('.trump-image').classList.add('selected');
        document.querySelector('.trump-image').classList.remove('unselected');
        document.querySelector('.harris-image').classList.remove('selected');
        document.querySelector('.harris-image').classList.add('unselected');
        setIsSelectedTrump(true);
        setIsSelectedHarris(false);
        changeBackgroundImage(TrumpBG);
        setDisplayedImageB(Snake);
        setSelectedCardIndex(0);
        console.log("Trump was elected");
    }

    function changeBackgroundImage(imageUrl) {
        console.log("Changing background to:", imageUrl);
        setBackgroundImage(imageUrl);
    }

    function incrementTrumpCount(e) {
        if (isSelectedTrump) {
            if (energy > energyTake || energy === energyTake) {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const imgRect = e.target.getBoundingClientRect();
                const imgX = imgRect.left;
                const imgY = imgRect.top;

                setClicks([...clicks, { id: Date.now(), x: imgX + x, y: imgY + y }]);

                setPersonalTrumpCount(personalTrumpCount + personalDMG);
                handleVote('Trump', teamDMG);
                setEnergy(energy - energyTake);
            } else {
                alert('Недостаточно энергии');
            }
        } 
    }

    function incrementHarrisCount(e) {
        if (isSelectedHarris) {
            if (energy > energyTake || energy === energyTake) {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const imgRect = e.target.getBoundingClientRect();
                const imgX = imgRect.left;
                const imgY = imgRect.top;

                setClicks([...clicks, { id: Date.now(), x: imgX + x, y: imgY + y }]);
            
                setPersonalHarrisCount(personalHarrisCount + personalDMG);
                handleVote('Harris', teamDMG);
                setEnergy(energy - energyTake);
            } else {
                alert('Недостаточно энергии');
        }
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
    const favorite = personalHarrisCount > personalTrumpCount ? 'Dire Warriors' : (personalTrumpCount > personalHarrisCount ? 'Wild Hearts' : 'None');

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

    function handleVote(candidate, teamDMG) {
        fetch(`https://btc24news.online/vote/${candidate}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teamDMG }) // Передаем значение teamDMG в запросе
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Error:', error));
    }

  return (
    <>
            <LoadScreenContainer />
            
            <ButtonBar onShowSocialPage={handleSocialPage} onShowExchangePage={handleExchangePage} onShowInventoryPage={handleInventoryPage} onOpenShop={handleShopPage} isDisabled={!choice}/>
            
            <PageSocial className={isSocialPageVisible ? 'page-social' : 'page-social hidden'} />
            <PageInventory className={isInventoryPageVisible ? 'page-inventory' : 'page-inventory hidden'} onCardSelect={handleCardSelect} />
            <PageExchange className={isExchangePageVisible ? 'page-exchange' : 'page-exchange hidden'} />
            <PageShop className={isShopPageVisible ? 'page-shop' : 'page-shop hidden'} title={favorite} votesA={votes.Harris} votesB={votes.Trump}/>

            <BGcontainer src={backgroundImage} />
            <PersonalCount 
                        personalCount={personalCount} 
                        name={name} 
                    />
            <Energy
                        energy={energy}
                        maxEnergy={maxEnergy}
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
                harrisImage={displayedImageA}
                trumpImage={displayedImageB}
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
                    <img src={isSelectedHarris ? displayedImageA : displayedImageB} alt="Small Image" style={{ width: '50px', height: '50px' }} />
                </div>
            ))}
        </>

  );
}
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
