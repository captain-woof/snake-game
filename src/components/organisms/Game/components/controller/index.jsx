import React, { useEffect, useRef } from "react";
import ArrowIcon from "../../../../atoms/Arrow";
import "./styles.scss";
import controllerKeyMap from "../../../../../keyMaps/controller.json";

function Controller({ setButtonPressed }) {

    // For keyboard button support
    const buttonRefs = {
        up: useRef(null),
        down: useRef(null),
        left: useRef(null),
        right: useRef(null),
    }
    useEffect(() => {
        function handleKeyPress(e) {
            const buttonPressed = controllerKeyMap[e.key];
            buttonRefs[buttonPressed]?.current.click();
        }
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, Object.values(buttonRefs).map((ref) => ref.current));

    return (
        <div id="controller">
            {["up", "down", "left", "right"].map((direction) => (
                <button key={direction} className="controller-button" id={`controller-${direction}-button`} onClick={() => setButtonPressed(direction)} ref={buttonRefs[direction]}>
                    <ArrowIcon />
                </button>
            ))}
        </div>
    )
}

const MemoizedController = React.memo(Controller);
export default MemoizedController;