export const checkTripleBlockCanMove = ({prevCells, emptyY, emptyX, x, y}) => {
    let newEmptyCells = [];
    let isNearEmptyBlocks = false;
    if (x !== emptyX) {
        const isLeft = x - emptyX < 0;
        if (isLeft) {
            isNearEmptyBlocks = prevCells.find(cell => cell.x === x && cell.y === emptyY)
                && prevCells.find(cell => cell.x === x && cell.y === emptyY + 1);
            newEmptyCells = [
                {x: emptyX, y: emptyY + 1},
                {x: emptyX + 1, y: emptyY}
            ];
            const getChangedBlocks = cell => !(cell.x === x && (cell.y === y || cell.y === emptyY + 1));

            return replaceEmptyBlocks({
                isNearEmptyBlocks, newEmptyCells, prevCells, getChangedBlocks
            });

        } else {
            isNearEmptyBlocks = prevCells.find(cell => cell.x === x + 1 && cell.y === emptyY)
                && prevCells.find(cell => cell.x === x && cell.y === emptyY + 1);
            newEmptyCells = [
                {x: emptyX, y: emptyY + 1},
                {x: emptyX, y: emptyY},
            ];
            const getChangedBlocks = cell =>
                (!((cell.x === x + 1 && cell.y === emptyY) || (cell.x === x && cell.y === emptyY + 1)));

            return replaceEmptyBlocks({
                isNearEmptyBlocks, newEmptyCells, prevCells, getChangedBlocks
            });
        }
    } else if (y !== emptyY) {
        const isUp = y - emptyY < 0;
        if (isUp) {
            const emptyYCells = prevCells.filter(cell => cell.y === y);
            isNearEmptyBlocks = emptyYCells.find(cell => cell.x === emptyX)
                && emptyYCells.find(cell => cell.x === emptyX + 1);
            newEmptyCells = [
                {x: emptyX, y: emptyY + 1},
                {x: emptyX + 1, y: emptyY}
            ];
            const getChangedBlocks = cell => !(cell.y === y && (cell.x === emptyX || cell.x === emptyX + 1));

            return replaceEmptyBlocks({
                isNearEmptyBlocks, newEmptyCells, prevCells, getChangedBlocks
            });
        } else {
            isNearEmptyBlocks = prevCells.find(cell => cell.x === emptyX && cell.y === y + 1)
                && prevCells.find(cell => cell.x === emptyX + 1 && cell.y === y);
            newEmptyCells = [
                {x: emptyX + 1, y: emptyY},
                {x: emptyX, y: emptyY}
            ]
            const getChangedBlocks = cell =>
                (!((cell.y === y && cell.x === emptyX + 1) || (cell.x === emptyX  && cell.y === y + 1)));

            return replaceEmptyBlocks({
                isNearEmptyBlocks, newEmptyCells, prevCells, getChangedBlocks
            });
        }
    }
};

export const checkDoubleWidthBlockCanMove = ({prevCells, emptyY, emptyX, x, y}) => {
    let newEmptyCells;
    let isNearEmptyBlocks = true;

    if (y !== emptyY) {
        const emptyYCells = prevCells.filter(cell => cell.y === y);
        isNearEmptyBlocks = emptyYCells.find(cell => cell.x === emptyX)
            && emptyYCells.find(cell => cell.x === emptyX + 1);
        newEmptyCells = [
            {x: emptyX + 1, y: emptyY},
            {x: emptyX, y: emptyY}
        ]
        const getChangedBlocks = cell => !(cell.y === y && (cell.x === emptyX || cell.x === emptyX + 1));

        return replaceEmptyBlocks({
            isNearEmptyBlocks, newEmptyCells, prevCells, getChangedBlocks
        });
    } else {
        newEmptyCells = [{x: x - emptyX < 0 ? emptyX + 1 : emptyX, y: emptyY}];

        const getChangedBlocks = cell => !(cell.y === y && (cell.x === (x - emptyX < 0 ? x : x + 1)));
        return replaceEmptyBlocks({
            isNearEmptyBlocks, newEmptyCells, prevCells, getChangedBlocks
        });
    }
}

export const checkDoubleHeightBlockCanMove = ({prevCells, emptyY, emptyX, x, y}) => {
    let newEmptyCells;
    let isNearEmptyBlocks = true;

    if (x !== emptyX) {
        const emptyXCells = prevCells.filter(cell => cell.x === x);
        isNearEmptyBlocks = emptyXCells.find(cell => cell.y === emptyY)
            && emptyXCells.find(cell => cell.y === emptyY + 1);
        newEmptyCells = [{x: emptyX, y: emptyY}, {x: emptyX, y: emptyY + 1}];
        const getChangedBlocks = cell => !(cell.x === x && (cell.y === y || cell.y === y + 1));

        return replaceEmptyBlocks({
            isNearEmptyBlocks, newEmptyCells, prevCells, getChangedBlocks
        });

    } else {
        newEmptyCells = [{x: emptyX, y: y - emptyY < 0 ? emptyY + 1 : emptyY}];
        const getChangedBlocks = cell => !(cell.x === x && (cell.y === (y - emptyY < 0 ? y : y + 1)));

        return replaceEmptyBlocks({
            isNearEmptyBlocks, newEmptyCells, prevCells, getChangedBlocks
        });
    }
}

export const checkSingleHeightBlockCanMove = ({prevCells, emptyY, emptyX, x, y}) => {
    const newEmptyCells = [{x: emptyX, y: emptyY}];
    const getChangedBlocks = cell => !(cell.x === x && cell.y === y);
    const isNearEmptyBlocks = prevCells.find(cell => cell.x === x && cell.y === y);
    return replaceEmptyBlocks({
        isNearEmptyBlocks, prevCells, newEmptyCells, getChangedBlocks
    })
};

const replaceEmptyBlocks = ({isNearEmptyBlocks, getChangedBlocks, prevCells, newEmptyCells}) => {
    if (!isNearEmptyBlocks) return {changedEmptyCells: prevCells, hasChanged: false};

    const changedEmptyCells = [...prevCells].filter(getChangedBlocks).concat(newEmptyCells);

    return { changedEmptyCells, hasChanged: true };
};

export const getChangedEmptyBlocks = ({isDoubleWidth, isDoubleHeight, prevCells, emptyY, emptyX, x, y}) => {
    const isRect = !isDoubleHeight && !isDoubleWidth;
    const isTriple = isDoubleHeight && isDoubleWidth;
    if (isTriple) {
       return checkTripleBlockCanMove({prevCells, emptyX, emptyY, x, y});
    } else {
        if (isDoubleHeight) {
           return checkDoubleHeightBlockCanMove({prevCells, emptyX, emptyY, x, y});
        }

        if (isDoubleWidth) {
            return checkDoubleWidthBlockCanMove({prevCells, emptyX, emptyY, x, y})
        }

        if (isRect) {
            return checkSingleHeightBlockCanMove({prevCells, emptyX, emptyY, x, y})
        }
    }
}