import { useState } from "react";
import "./styles.scss";
import SnakeGameLogo from "../../../images/snake-game-logo.png";
import Button from "../../atoms/Button";
import cx from "classnames";

export default function MainMenu() {
    const [close, setClose] = useState(false); // Tracks if menu is shown or hidden (when game starts)

    return (
        <section id="menu-container" className={cx(close && "menu-close")}>
            <div id="menu-container__inner-container">
                <img src={SnakeGameLogo} alt="Snake game logo" id="menu-container__inner-container__snake-game-logo" />
                <h1 id="menu-container__inner-container__title">Snake Game</h1>
                <Button id="menu-container__inner-container__start-btn" onClick={() => setClose(true)}>
                    Start
                </Button>
                <p id="menu-container__inner-container__credit">Made by <a href="https://twitter.com/realCaptainWoof" target="_blank">Sohail Saha (CaptainWoof)</a></p>
            </div>
        </section >
    )
}