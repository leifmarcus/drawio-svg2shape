export const convertPolygon = (polygon: string): Array<Array<number>> => {
    const numbers = polygon.split(/[,\s]/);

    const points: Array<Array<number>> = [];
    let group: Array<number> = [];
    numbers.forEach((n, index) => {
        group.push(Math.round(Number(n) * 100) / 100);

        if ((index + 1) % 2 === 0 && index !== 0) {
            points.push([...group]);
            group = [];
        }
    });

    return points;
};
