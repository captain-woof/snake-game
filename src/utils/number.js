// Returns range of integers from start to end
function* rangeGenerator(start, end) {
    let current = start;
    while (current < end) {
        yield current;
        current += 1;
    }
}
export const range = (start = 0, end) => {
    return [...rangeGenerator(start, end)];
}