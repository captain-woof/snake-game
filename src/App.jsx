import Game from './components/organisms/Game';
import MainMenu from './components/organisms/MainMenu';
import MainContainer from "./components/atoms/MainContainer";

export default function App() {
  return (
    <MainContainer>
      <MainMenu />
      <Game />
    </MainContainer>
  )
}