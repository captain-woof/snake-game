import { useState } from "react";
import Controller from "./components/controller";
import GameGrid from "./components/gameGrid";
import "./styles.scss";

export default function Game() {

    const [buttonPressed, setButtonPressed] = useState(null); // Tracks the button pressed on controller - 'left', 'right', 'up', 'down'
    const [score, setScore] = useState(0); // Number of pellets eaten

    return (
        <section id="game-container">
            <div id="game-container__inner-container">
                {/* Upper section - Title and stuff */}
                <div id="game-container__upper-section">
                    <h1 id="game-container__upper-section__title">Snake game</h1>
                    <p id="game-container__upper-section__instruction">
                        You know the drill! Keep eating, keep growing! 🐍
                    </p>
                </div>

                {/* Game section - Snake grid */}
                <div id="game-container__game-section">
                    <GameGrid buttonPressed={buttonPressed} setScore={setScore} />
                </div>

                {/* Bottom section - Controller and score*/}
                <div id="game-container__bottom-section">
                    <h2 id="game-container__bottom-section__score">Score: {score}</h2>
                    <Controller setButtonPressed={setButtonPressed} />
                </div>
            </div>
        </section>
    )
}