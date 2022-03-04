import React from "react";
import { useRowsColumns } from "./hooks/useRowsColumns";
import "./styles.scss";
import { range } from "../../../../../utils/number";

// GRID SIZE (px)
const GRID_SIZE = 20;

function GameGrid({ buttonPressed, setScore }) {

    const { ref: gameGridContainerRef, rows, columns } = useRowsColumns(GRID_SIZE);

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
                            <div key={`row-${rowIndex}-col-${colIndex}`} className="game-grid__grid" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

const GameGridMemoized = React.memo(GameGrid);
export default GameGridMemoized;