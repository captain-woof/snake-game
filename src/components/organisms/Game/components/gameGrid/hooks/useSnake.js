import { useEffect, useState } from "react"
import { useAnimationFrame } from "./useAnimationFrame";
import { useRowsColumns } from "./useRowsColumns";
import directionButtonMapping from "../../../../../../keyMaps/directionButton.json";

// Function to generate initial snake body segments array, length 4
const snakeSegmentsArrInitialGenerator = (rows, columns) => {

    const middleRow = parseInt(rows / 2); // Middle row
    const middleColumn = parseInt(columns / 2); // Middle column

    return ([
        {
            prev: [middleRow, middleColumn],
            curr: [middleRow, middleColumn + 1]
        },
        {
            prev: [middleRow, middleColumn - 1],
            curr: [middleRow, middleColumn]
        },
        {
            prev: [middleRow, middleColumn - 2],
            curr: [middleRow, middleColumn - 1]
        },
        {
            prev: [middleRow, middleColumn - 3],
            curr: [middleRow, middleColumn - 2]
        },
    ])
}


export const useSnake = (started, buttonPressed, gridSize) => {
    const { ref: gameGridContainerRef, rows, columns } = useRowsColumns(gridSize); // Returns the number of rows and columns to render
    const [snakeDirection, setSnakeDirection] = useState(buttonPressed); // Tracks direction where the snake is currently going

    /*
    Array below stores info about snake's body position. Each element refers to a body segment of the snake, with the first element as the head and last one as its tail.

    Each element is an object, representing the body segment's current and previous position (row,column).

    Format: [
        {prev: [row, col], curr: [row, col]}
    ]
    */
    const [snakeSegmentsArr, setSnakeSegmentsArr] = useState([]);

    /*
    Below object stores snake body segment coordinates (curr) in a way that allows constant time access to info about whether any body segment exists at a coordinate.

    Format: {
        "row,col": true
    }
    */
    const [snakeSegments, setSnakeSegments] = useState({});

    // Set initial snake segments AS LONG AS game has not started yet
    useEffect(() => {
        if (!started && rows !== 0 && columns !== 0) {
            setSnakeSegmentsArr(snakeSegmentsArrInitialGenerator(rows, columns));
        }
    }, [started, rows, columns])

    // Keep snake segments updated
    useEffect(() => {
        if (snakeSegmentsArr.length !== 0) {
            const newSnakeSegments = {}
            snakeSegmentsArr.forEach(({ curr }) => {
                newSnakeSegments[`${curr[0]},${curr[1]}`] = true;
            })
            setSnakeSegments(newSnakeSegments);
        }
    }, [snakeSegmentsArr])

    // Render loop
    useAnimationFrame(() => {
        //// Advance snake forward
        setSnakeSegmentsArr((prevSnakeSegmentsArr) => {
            if (prevSnakeSegmentsArr.length !== 0) {
                const newSnakeSegmentsArr = [];

                // Get new snake direction
                const newSnakeDirection = directionButtonMapping[snakeDirection][buttonPressed];
                setSnakeDirection(newSnakeDirection);

                // Move snake's head to new position
                const newSnakeHeadCurr = [...prevSnakeSegmentsArr[0].curr];
                switch (newSnakeDirection) {
                    case "up":
                        newSnakeHeadCurr[0] -= 1;
                        break;
                    case "down":
                        newSnakeHeadCurr[0] += 1;
                        break;
                    case "left":
                        newSnakeHeadCurr[1] -= 1;
                        break;
                    case "right":
                        newSnakeHeadCurr[1] += 1;
                        break;
                }

                const newSnakeHead = {
                    prev: prevSnakeSegmentsArr[0].curr,
                    curr: newSnakeHeadCurr
                }
                newSnakeSegmentsArr.push(newSnakeHead);

                // Move rest of the body
                for (let i = 1; i < prevSnakeSegmentsArr.length; i++) {
                    newSnakeSegmentsArr.push({
                        prev: prevSnakeSegmentsArr[i].curr,
                        curr: prevSnakeSegmentsArr[i - 1].curr
                    })
                }
                return newSnakeSegmentsArr;
            } else {
                return prevSnakeSegmentsArr;
            }
        })

    }, 1, false, [buttonPressed])

    // Return stuff
    return {
        snakeSegments,
        gameGridContainerRef,
        rows,
        columns
    }
}