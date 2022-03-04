import "./styles.scss";

export default function Game() {
    return (
        <section id="game-container">
            <div id="game-container__inner-container">
                {/* Upper section */}
                <div id="game-container__upper-section">
                    <h1 id="game-container__upper-section__title">Snake game</h1>
                    <p id="game-container__upper-section__instruction">
                        You know the drill! Keep eating, keep growing! 🐍
                    </p>
                </div>

                {/* Game section */}
                <div id="game-container__game-section">

                </div>

                {/* Bottom section */}
                <div id="game-container__bottom-section">

                </div>
            </div>
        </section>
    )
}