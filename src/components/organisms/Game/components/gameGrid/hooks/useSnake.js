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

// Function to increment/decrement position
const getUpdatedPosition = (curr, max, action = "inc") => {
    let newCurr = null;
    if (action === 'inc') { // Increment
        newCurr = (curr + 1) % max;
    } else { // Decrement
        newCurr = (curr - 1 === -1) ? max - 1 : curr - 1;
    }
    return newCurr;
}

// Function to generate random number within a range
const generateRandomNum = (start = 0, end) => {
    return (start + parseInt(Math.random() * (end - start)));
}


export const useSnake = (mainMenuClose, buttonPressed, gridSize, setScore) => {
    const { ref: gameGridContainerRef, rows, columns } = useRowsColumns(gridSize); // Returns the number of rows and columns to render
    const [snakeDirection, setSnakeDirection] = useState(buttonPressed); // Tracks direction where the snake is currently going
    const [foodPosition, setFoodPosition] = useState(null); // Tracks current position of food, "row,col"
    const [ticksPerSecond, setTicksPerSecond] = useState(2); // Tracks ticks per second count
    const [expandSnake, setExpandSnake] = useState(false); // Tracks if snake's body needs to be expanded
    const [gameStatus, setGameStatus] = useState(null); // Tracks game status - "win"/"lose"
    const [started, setStarted] = useState(false); // State to track if game has started

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

    // Start game after a few seconds of opening game screen
    useEffect(() => {
        if (mainMenuClose) {
            setTimeout(() => {
                setStarted(true);
                console.log("GAME STARTED!");
            }, 2 * 1000);
        }
    }, [mainMenuClose])

    // Set initial snake segments AS LONG AS game has not started yet
    useEffect(() => {
        if (mainMenuClose && rows !== 0 && columns !== 0) {
            setSnakeSegmentsArr(snakeSegmentsArrInitialGenerator(rows, columns));
        }
    }, [mainMenuClose, rows, columns])

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

    // Keep advancing snake forward > RENDER LOOP
    useAnimationFrame(() => {
        setSnakeSegmentsArr((prevSnakeSegmentsArr) => {
            if (prevSnakeSegmentsArr.length !== 0 && !expandSnake) {
                const newSnakeSegmentsArr = [];  // This is array of snake body segments

                // Get new snake direction
                const newSnakeDirection = directionButtonMapping[snakeDirection][buttonPressed];
                setSnakeDirection(newSnakeDirection);

                // Move snake's head to new position
                const newSnakeHeadCurr = [...prevSnakeSegmentsArr[0].curr]; // Snake's head position
                switch (newSnakeDirection) {
                    case "up":
                        newSnakeHeadCurr[0] = getUpdatedPosition(newSnakeHeadCurr[0], rows, "dec");
                        break;
                    case "down":
                        newSnakeHeadCurr[0] = getUpdatedPosition(newSnakeHeadCurr[0], rows, "inc");
                        break;
                    case "left":
                        newSnakeHeadCurr[1] = getUpdatedPosition(newSnakeHeadCurr[1], columns, "dec");
                        break;
                    case "right":
                        newSnakeHeadCurr[1] = getUpdatedPosition(newSnakeHeadCurr[1], columns, "inc");
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

    }, ticksPerSecond, !started, [buttonPressed, rows, columns, expandSnake])

    // Add new food if one does not already exist
    useEffect(() => {
        if (snakeSegmentsArr.length !== 0 && rows !== 0 && columns !== 0 && !expandSnake) {
            setFoodPosition((prevFoodPosition) => {
                if (!prevFoodPosition) { // It means food was eaten by snake, or it's the first time for food placement

                    // Keep finding a valid new food position until one is found
                    while (true) {
                        // Generate random position
                        const newFoodPositionRow = generateRandomNum(0, rows);
                        const newFoodPositionColumn = generateRandomNum(0, columns);

                        // Check if the position is unoccupied by snake
                        let i = 0;
                        for (; i < snakeSegmentsArr.length; i++) {
                            const [prevSnakeSegmentRow, prevSnakeSegmentCol] = snakeSegmentsArr[i].curr;
                            if (prevSnakeSegmentRow === newFoodPositionRow && prevSnakeSegmentCol === newFoodPositionColumn) { // If snake segment overlaps potential new food position
                                break;
                            }
                        }

                        // If all segments check passes
                        if (i === snakeSegmentsArr.length) {
                            const newFoodPosition = `${newFoodPositionRow},${newFoodPositionColumn}`;
                            return newFoodPosition;
                        }
                    }
                } else { // This means that food is still not eaten
                    return prevFoodPosition;
                }
            })
        }
    }, [expandSnake, snakeSegmentsArr])

    // Expand snake if it's needed, only ONE time.
    useEffect(() => {
        if (expandSnake) {
            setSnakeSegmentsArr((prevSnakeSegmentsArr) => ([
                ...prevSnakeSegmentsArr,
                {
                    prev: prevSnakeSegmentsArr[prevSnakeSegmentsArr.length - 1].prev,
                    curr: prevSnakeSegmentsArr[prevSnakeSegmentsArr.length - 1].prev
                }
            ]))
            setScore((prevScore) => prevScore + 1);
            setExpandSnake(false);
        }
    }, [expandSnake])

    // Check for collision with food. Set foodPosition to null if it does. Also, enable expanding snake.
    useEffect(() => {
        if (snakeSegmentsArr.length !== 0 && !!foodPosition) {
            const [snakeHeadCurrRow, snakeHeadCurrCol] = snakeSegmentsArr[0].curr;
            if (foodPosition === `${snakeHeadCurrRow},${snakeHeadCurrCol}`) { // If collision
                setFoodPosition(null); // Set food position to null
                setExpandSnake(true); // Expand snake
            }
        }
    }, [snakeSegmentsArr, foodPosition])

    // Check for collision with itself.

    // Return stuff
    return {
        snakeSegments,
        gameGridContainerRef,
        rows,
        columns,
        foodPosition
    }
}