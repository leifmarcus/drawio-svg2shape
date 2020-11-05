export type SVGPathPointsTypes = 'M' | 'L' | 'Z' | 'H' | 'V' | 'C';

type BoundingSimple = {
    position: number;
};

export type Coords = Array<Array<number>>;

export interface Point {
    type: SVGPathPointsTypes;
    coords: Coords;
}

export interface PointDefinition {
    type: 'move' | 'line' | 'close' | 'horizontal' | 'vertical';
    coords: Coords;
}

export const getPoints = (svgPath: string): Array<string> => {
    if (typeof svgPath !== 'string') return [];

    return svgPath.split(/(?=[LMCZ])/).map((p) => p.trim());
};

const convertToAbstractPoints = (values: Array<string>): Array<Point> => {
    return values.map((v) => {
        const type = v.substr(0, 1) as SVGPathPointsTypes;
        const plainCoords = v.substr(1);
        const groups = plainCoords.split(' ');
        const coords = groups.map((g) => {
            return g.split(',').map((n) => {
                const number = Math.round(Number(n) * 100) / 100;
                return number;
            });
        });

        // console.log(groups);
        return {
            type,
            coords,
        };
    });
};

export const convertPath = (path: string): Array<Point> => {
    const points = getPoints(path);
    const abstractPoints = convertToAbstractPoints(points);

    return abstractPoints;
};
