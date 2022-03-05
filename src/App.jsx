import Game from './components/organisms/Game';
import MainMenu from './components/organisms/MainMenu';
import MainContainer from "./components/atoms/MainContainer";
import { useState } from 'react';

export default function App() {
  const [mainMenuClose, setMainMenuClose] = useState(false); // Tracks if menu is shown or hidden (when game starts)

  return (
    <MainContainer>
      <MainMenu close={mainMenuClose} setClose={setMainMenuClose} />
      <Game mainMenuClose={mainMenuClose} />
    </MainContainer>
  )
}