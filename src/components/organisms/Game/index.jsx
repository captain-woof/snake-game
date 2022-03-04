import { useState } from "react";
import Controller from "./components/controller";
import "./styles.scss";

export default function Game() {

    const [buttonPressed, setButtonPressed] = useState(null); // Tracks the button pressed on controller - 'left', 'right', 'up', 'down'

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

                </div>

                {/* Bottom section - Controller */}
                <div id="game-container__bottom-section">
                    <Controller setButtonPressed={setButtonPressed} />
                </div>
            </div>
        </section>
    )
}