import React from "react";
import "./styles.scss";
import { range } from "../../../../../utils/number";
import { useSnake } from "./hooks/useSnake";
import cx from "classnames";

// GRID SIZE (px)
const GRID_SIZE = 20;

function GameGrid({ buttonPressed, setScore, mainMenuClose }) {

    const { snakeSegments, gameGridContainerRef, rows, columns, foodPosition } = useSnake(mainMenuClose, buttonPressed, GRID_SIZE, setScore); // Returns snake information, and manages snake motion: ;

    return (
        <div id="game-grid-container" ref={gameGridContainerRef}>
            <div id="game-grid" style={{
                width: columns * GRID_SIZE,
                height: rows * GRID_SIZE,
                "--grid-size": GRID_SIZE
            }}>
                {/* Array of rows, going down */}
                {range(0, rows).map((rowIndex) => (
                    <div key={`row-${rowIndex}`} className="game-grid__row">
                        {range(0, columns).map((colIndex) => (
                            <div key={`row-${rowIndex}-col-${colIndex}`} className={cx("game-grid__grid", snakeSegments[`${rowIndex},${colIndex}`] && "snake-body-segment", `${rowIndex},${colIndex}` === foodPosition && "food")} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

const GameGridMemoized = React.memo(GameGrid);
export default GameGridMemoized;