import { useEffect, useRef, useState } from "react";

export const useRowsColumns = (gridSize) => {
    const ref = useRef(null); // Ref to be set on target element
    const [rows, setRows] = useState(0); // Total number of rows
    const [columns, setColumns] = useState(0); // Total number of columns

    // Listen for resize event and set appropriate rows and columns
    useEffect(() => {
        // Function to set rows and columns
        function setRowsColumns() {
            if (!!ref?.current) {
                setRows(Math.floor(ref.current.clientHeight / gridSize));
                setColumns(Math.floor(ref.current.clientWidth / gridSize));
            }
        }

        // Set rows and columns for the first time
        setRowsColumns();

        // Set up resize listener to keep rows and columns updated
        window.addEventListener("resize", setRowsColumns);
        return () => window.removeEventListener("resize", setRowsColumns);

    }, [ref.current])

    return {
        ref,
        rows,
        columns
    }
}