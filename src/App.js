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


import { TrumpP, HarrisP, bybit, Gorilla, Bik, Krisa, FonTap1 } from './Components/Pictures/Pictures';


function App() {


    const [isFavoriteSet, setIsFavoriteSet] = useState(false);

    const [contribution, setContribution] = useState(0);

    const [userId, setUserId] = useState('');

    const [backgroundImage, setBackgroundImage] = useState('');

    const [personalHarrisCount, setPersonalHarrisCount] = useState(0);
    const [personalTrumpCount, setPersonalTrumpCount] = useState(0);
    const [personalCount, setPersonalCount] = useState(0);

    const [isSelectedHarris, setIsSelectedHarris] = useState(false);
    const [isSelectedTrump, setIsSelectedTrump] = useState(false);

    const [votes, setVotes] = useState({ Trump: 0, Harris: 0 });

    const [energy, setEnergy] = useState(100);
    const [maxEnergy, setMaxEnergy] = useState(1000);
    const [energyRecovery, setEnergyRecovery] = useState(1);
    const [energyTake, setEnergyTake] = useState(1);
    const [personalDMG, setPersonalDMG] = useState(1);
    const [teamDMG, setTeamDMG] = useState(1);

    const [lang, setLang] = useState("none")

    const [name, setName] = useState("");
    const [topPlayerUserName, setTopPlayerUserName] = useState("none");
    const [topPlayerName, setTopPlayerName] = useState("none");

    const [playerUserName, setPlayerUserName] = useState("none");
    const [playerName, setPlayerName] = useState("none");

    const [userData, setUserData] = useState(null);

    const [choice, setChoice] = useState(false);

    const [checkedCount, setCheckedCount] = useState(0);

    const [clicks, setClicks] = useState([]);

    const [playersFavorite, setPlayersFavorite] = useState(null);
    const [favorite, setFavorite] = useState("none");

    const [fingerprintData, setFingerprintData] = useState(null);
    
    const [isSocialPageVisible, setIsSocialPageVisible] = useState(false);
    const [isShopPageVisible, setIsShopPageVisible] = useState(false);
    const [isInventoryPageVisible, setIsInventoryPageVisible] = useState(false);
    const [isExchangePageVisible, setIsExchangePageVisible] = useState(false);

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [displayedImageA, setDisplayedImageA] = useState(Gorilla);
    const [displayedImageB, setDisplayedImageB] = useState(Gorilla);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [AddImage, setAddImage] = useState(Gorilla);


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

        let background;
        let newName;

        switch (index) {
            case 0:
                image = Gorilla;
                newMaxEnergy = 1000;
                newEnergyRecovery = 1;
                newEnergyTake = 15;
                newTeamDMG = 5;
                newPersonalDMG = 5;
                newName = "Monke";
                background = FonTap1;
                break;
            case 1:
                image = Krisa;
                newMaxEnergy = 1000;
                newEnergyRecovery = 1;
                newEnergyTake = 10;
                newTeamDMG = -10;
                newPersonalDMG = 10;
                newName = "Oliv";
                background = FonTap1;
                break;
            case 2:
                image = Bik;
                newMaxEnergy = 1000;
                newEnergyRecovery = 1;
                newEnergyTake = 10;
                newTeamDMG = 10;
                newPersonalDMG = 0;
                newName = "Bernard";
                background = FonTap1;
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

        setAddImage(image);
        setBackgroundImage(background);
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

    function modalAdd() {
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }
        

    useEffect(() => {
        WebApp.setHeaderColor('#0C0C0C');
        WebApp.expand();
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
          setUserId(WebApp.initDataUnsafe.user.id);
          setLang(WebApp.initDataUnsafe.user.language_code);
          setPlayerName(WebApp.initDataUnsafe.user.first_name);
          setPlayerUserName(WebApp.initDataUnsafe.user.username);
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

    setTimeout(() => {
        fetch(`https://btc24news.online/get-counts?id=${WebApp.initDataUnsafe.user.id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Get counts request failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched counts:', data); // Логирование полученных данных
            const updatedPoints = personalCount;
            const updatedContribution = contribution;
            setPersonalHarrisCount(data.personal_harris_count ?? 0);
            setPersonalTrumpCount(data.personal_trump_count ?? 0);
            setPersonalCount(data.personal_count ?? 0);
            setContribution(data.contribution ?? 0)
            setPlayersFavorite(data.favorite ?? 'none');
            updateCounts(updatedPoints, playersFavorite, updatedContribution)
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, 5000);

        }
    
        return () => clearInterval(intervalId);
      }, []);

      const updateAnimalStatus = (animalIndex, status) => {
        const data = {
            id: userId, // Уникальный ID пользователя
            animalIndex, // Передаем animalIndex как значение, а не как строку
            status: status ? 1 : 0 // Передаем статус
        };
    
        fetch('/update-animal-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Animal status updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating animal status:', error);
        });
    };
    
      useEffect(() => {
        if (playersFavorite === 'Dire Warriors') {
          const updatedPoints = personalCount;
          const updatedContribution = contribution;
          handleClickHarrisB();
          setChoice(true);
          updateCounts(updatedPoints, playersFavorite, updatedContribution);

          const intervalId = setInterval(() => {
          getTopPlayer('Dire Warriors');
          }, 3000); // Интервал в миллисекундах (5 секунд)
          return () => clearInterval(intervalId);

        } else if (playersFavorite === 'Wild Hearts') {
          const updatedPoints = personalCount;
          const updatedContribution = contribution;
          handleClickTrumpB();
          setChoice(true);
          updateCounts(updatedPoints, playersFavorite, updatedContribution);

          const intervalId = setInterval(() => {
          getTopPlayer('Wild Hearts');
          }, 3000); // Интервал в миллисекундах (5 секунд)
          return () => clearInterval(intervalId);
        }
      }, [playersFavorite]);


      useEffect(() => {
        if (playersFavorite !== null) {
            setIsFavoriteSet(true);
        }
    }, [playersFavorite]);

      useEffect(() => {
        if (isFavoriteSet && playersFavorite === 'none') {
            console.log("Handling none case");
            if (userId % 2 === 0) {
                setPlayersFavorite('Dire Warriors');
                setFavorite('Dire Warriors');
            } else {
                setPlayersFavorite('Wild Hearts');
                setFavorite('Wild Hearts');
            }
        }
    }, [isFavoriteSet]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (playersFavorite === undefined || playersFavorite === null) {
                console.log("playersFavorite is undefined or null, reloading the page...");
                window.location.reload();
            }
        }, 6000); // 6000 миллисекунд = 6 секунд
    
        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timer);
    }, [playersFavorite]);
    
    

      useEffect(() => {
        const loadEnergy = () => {
            const savedEnergy = localStorage.getItem('energy');
            const lastActiveTime = localStorage.getItem('lastActiveTime');
    
            if (savedEnergy !== null && lastActiveTime !== null) {
                const currentTime = Date.now();
                const timeElapsed = currentTime - parseInt(lastActiveTime, 10);
    
                console.log("Time elapsed since last active (ms):", timeElapsed);
    
                const energyRecovered = Math.floor(timeElapsed / 10000) * 1;
    
                console.log("Energy recovered:", energyRecovered);
    
                // Рассчитываем новую энергию только если текущая энергия меньше максимальной
                const currentEnergy = parseInt(savedEnergy, 10);
                if (currentEnergy < 1000) {
                    const newEnergy = Math.min(currentEnergy + energyRecovered, 1000);
                    setEnergy(newEnergy);
                    console.log("New energy after recovery:", newEnergy);
                } else {
                    setEnergy(currentEnergy); // Оставляем текущую энергию как есть
                    console.log("Energy is already at or above max, no recovery applied.");
                }
            } else {
                setEnergy(0); // Если данных нет, устанавливаем начальное значение энергии в maxEnergy
            }
        };
    
        const updateEnergy = () => {
            setEnergy(prevEnergy => {
                if (prevEnergy < 1000) {
                    const newEnergy = Math.min(prevEnergy + 1, 1000);
                    localStorage.setItem('lastActiveTime', Date.now()); // Сохранение времени последнего обновления энергии отдельно
                    return newEnergy;
                }
                localStorage.setItem('lastActiveTime', Date.now());
                return prevEnergy; // Если энергия уже выше или равна maxEnergy, ничего не делаем
            });
        };
        
        const saveEnergyToLocalStorage = () => {
            setEnergy(prevEnergy => {
                localStorage.setItem('energy', prevEnergy); // Сохранение энергии в локальное хранилище каждые 5 секунд
                return prevEnergy;
            });
        };
    
        loadEnergy();
    
        const energyRecoveryInterval = setInterval(updateEnergy, 10000);
        const saveEnergyInterval = setInterval(saveEnergyToLocalStorage, 500); 
    
        return () => {
            clearInterval(energyRecoveryInterval); // Очистка интервала обновления энергии
            clearInterval(saveEnergyInterval); // Очистка интервала сохранения энергии
        };
    }, []);
    

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
        document.querySelector('.harris-image').classList.remove('unselected');
        setIsSelectedHarris(true);
        setIsSelectedTrump(false);
        setDisplayedImageA(Gorilla);
        setSelectedCardIndex(0);
        setFavorite("Dire Warriors");
        console.log("Harris was elected");
    }
    
    function handleClickTrumpB() {
        document.querySelector('.trump-image').classList.remove('unselected');
        document.querySelector('.harris-image').classList.add('unselected');
        setIsSelectedTrump(true);
        setIsSelectedHarris(false);
        setDisplayedImageB(Gorilla);
        setSelectedCardIndex(0);
        setFavorite("Wild Hearts");
        console.log("Trump was elected");
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
                setContribution(contribution + teamDMG);
                
                setPersonalCount(personalCount + personalDMG);
                const updatedPoints = (personalCount + personalDMG);
                const updatedContribution = (contribution + teamDMG);

                handleVote('Trump', teamDMG);
                setEnergy(energy - energyTake);
                updateCounts(updatedPoints, playersFavorite, updatedContribution);
            }
            else {
                // Если условия не выполняются, вызываем modalAdd
                modalAdd(); // Вызов вашей функции для отображения модального окна
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
                setContribution(contribution + teamDMG);

                setPersonalCount(personalCount + personalDMG);
                const updatedPoints = (personalCount + personalDMG);
                const updatedContribution = (contribution + teamDMG);

                handleVote('Harris', teamDMG);
                setEnergy(energy - energyTake);
                updateCounts(updatedPoints, playersFavorite, updatedContribution);
            }
            else {
                // Если условия не выполняются, вызываем modalAdd
                modalAdd(); // Вызов вашей функции для отображения модального окна
            }
        }
    }

    function handleHarrisClick(e) {
        if(!choice) {
            setChoice(true)
            handleClickHarrisB();
        }
        incrementHarrisCount(e);
    }
    function handleTrumpClick(e) {
        if(!choice) {
            setChoice(true)
            handleClickTrumpB();
        }
        incrementTrumpCount(e);
    }

    const updatePersonalPoints = (personalPoints) => {
        setPersonalCount(personalPoints);
    };


    function updateCounts(updatedPoints, playersFavorite, updatedContribution) {
        const data = {
            id: userData.id,
            personal_count: updatedPoints,
            personal_harris_count: personalHarrisCount,
            personal_trump_count: personalTrumpCount,
            favorite: playersFavorite,
            contribution: updatedContribution
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


    // Функция для получения самого сильного игрока
const getTopPlayer = (favorite) => {
    fetch(`https://btc24news.online/get-top-player?favorite=${favorite}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch top player');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === 'Игрок не найден') {
                console.log('Player not found');
            } else {
                // Пример: обновление элемента на странице
                setTopPlayerName(data.first_name);
                setTopPlayerUserName(data.username);
            }
        })
        .catch(error => {
            console.error('Error fetching top player:', error);
        });
};

const links = [
    "https://t.me/direanimalsnews",
    "https://x.com/dominator24news?s=21",
    "https://dominators.website"
];

const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleClickAdd = (event) => {
        // Отключаем кнопку
        event.preventDefault();

        const randomLink = links[Math.floor(Math.random() * links.length)];

        window.open(randomLink, '_blank', 'noopener,noreferrer');


        setIsButtonDisabled(true);
        // Запускаем таймер на 30 секунд
        setTimeout(() => {
            setIsButtonDisabled(false);
            setEnergy(energy + 100);
            closeModal();
        }, 10000);
    };
    

  return (
    <>
            <LoadScreenContainer />
            
            <ButtonBar onShowSocialPage={handleSocialPage} onShowExchangePage={handleExchangePage} onShowInventoryPage={handleInventoryPage} onOpenShop={handleShopPage} isDisabled={!choice}/>
            
            <PageSocial className={isSocialPageVisible ? 'page-social' : 'page-social hidden'} updateCheckedCount={setCheckedCount} />
            <PageInventory className={isInventoryPageVisible ? 'page-inventory' : 'page-inventory hidden'} playersFavorite={playersFavorite} updatedContribution={contribution} onCardSelect={handleCardSelect} personalPoints={personalCount} userId={userId} setPersonalPoints={updatePersonalPoints} updateCounts={updateCounts} updateAnimalStatus={updateAnimalStatus} />
            <PageExchange className={isExchangePageVisible ? 'page-exchange' : 'page-exchange hidden'} />
            <PageShop className={isShopPageVisible ? 'page-shop' : 'page-shop hidden'} lang={lang} userId={userId} title={playersFavorite} votesA={votes.Harris} votesB={votes.Trump} personalCount={personalCount} contribution={contribution} updateCounts={updateCounts} setPersonalPoints={updatePersonalPoints} topPlayerName={topPlayerName} topPlayerUserName={topPlayerUserName} playerName={playerName} playerUserName={playerUserName}/>

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
            {isModalOpen && (
                <div className="modal-overlay add" onClick={closeModal}>
                <div className="modal-content add" onClick={(e) => e.stopPropagation()} style={{ backgroundImage: `url(${AddImage})` }}>
                    <h2>Energy Is Low!</h2>
                    <button
                        onClick={handleClickAdd}
                        className="modal-button"
                        disabled={isButtonDisabled}
                        style={{
                            position: 'relative', // Для центровки анимации
                        }}
                    >
                        {isButtonDisabled ? (
                            <div className="loader"></div>
                        ) : (
                            'GET'
                        )}
                    </button>
                </div>
                </div>
            )}

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
