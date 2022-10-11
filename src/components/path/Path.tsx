import React, { ChangeEventHandler, useState } from 'react';
import { convertPath, Coords, Point, SVGPathPointsTypes } from './converter';
import './Path.css';

type TransformFunctions = {
    [key in SVGPathPointsTypes]?: any;
};

const DEFAULT_PATH = 'M0,0 L10,0 L10,10 Z';

const transformFunctions: TransformFunctions = {
    M(coords: Coords): string {
        const [x, y] = coords[0];
        return `<move x="${x}" y="${y}" />`;
    },
    L(coords: Coords): string {
        const [x, y] = coords[0];
        return `<line x="${x}" y="${y}" />`;
    },
    C(coords: Coords): string {
        const [start, end, position] = coords;
        const [x1, y1] = start;
        const [x2, y2] = end;
        const [x3, y3] = position;

        return `<curve x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" x3="${x3}" y3="${y3}"/>`;
    },
    Z(): string {
        return '<close/>';
    },
};

const usePathInput = (): [string, Array<Point>, ChangeEventHandler<HTMLInputElement>] => {
    const [converted, setConverted] = useState<Array<Point>>(convertPath(DEFAULT_PATH));
    const [path, setPath] = useState<string>(DEFAULT_PATH);
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.currentTarget.value;
        setPath(value);
        setConverted(convertPath(value));
    };

    return [path, converted, handleChange];
};

export const Path = () => {
    const [path, converted, handleChange] = usePathInput();

    return (
        <div className="Path">
            <div className="Path__field">
                <input onChange={handleChange} className="Path__input" type="text" value={path} />
            </div>
            <code>
                {'<path>\n'}
                {converted.map((con) => {
                    const transformFc = transformFunctions[con.type];
                    if (transformFc) {
                        return '    ' + transformFc(con.coords) + '\n';
                    }
                    return con.type + '\n';
                })}
                {'</path>'}
            </code>
        </div>
    );
};
