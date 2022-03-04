import React from "react";
import ArrowIcon from "../../../../atoms/Arrow";
import "./styles.scss";

function Controller({ setButtonPressed }) {
    return (
        <div id="controller">
            {["up", "down", "left", "right"].map((direction) => (
                <button key={direction} className="controller-button" id={`controller-${direction}-button`} onClick={() => setButtonPressed(direction)}>
                    <ArrowIcon />
                </button>
            ))}
        </div>
    )
}

const MemoizedController = React.memo(Controller);
export default MemoizedController;