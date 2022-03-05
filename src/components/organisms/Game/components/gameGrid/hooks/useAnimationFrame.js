import { useEffect, useRef } from "react"

// Keeps executing a given callback at intervals
export const useAnimationFrame = (callback, ticksPerSecond = 1, stop = false, deps = []) => {
    const prevTime = useRef(performance.now());

    useEffect(() => {
        let handle = null;

        // Render loop function, called only if a tick is available
        function render(currTime) { // timestamp is in ms
            if (!stop) {
                if (currTime - prevTime.current >= (1000 / ticksPerSecond)) {
                    callback();
                    prevTime.current = currTime;
                }
                handle = requestAnimationFrame(render);
            }
        }

        // Starts render loop
        handle = requestAnimationFrame(render);

        // Cancels render loop
        return () => cancelAnimationFrame(handle);
    }, [...deps, stop])
}