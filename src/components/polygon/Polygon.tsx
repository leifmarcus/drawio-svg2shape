import React, { ChangeEventHandler, useState } from 'react';
import './Polygon.css';
import { convertPolygon } from './converter';

const DEFAULT_POLYGON = '10,10 10,20 15,15';

const usePolygonInput = (): [string, Array<Array<number>>, ChangeEventHandler<HTMLInputElement>] => {
    const [polygon, setPolygon] = useState<string>(DEFAULT_POLYGON);
    const [converted, setConverted] = useState<Array<Array<number>>>(convertPolygon(DEFAULT_POLYGON));

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.currentTarget.value;
        setPolygon(value);
        setConverted(convertPolygon(value));
    };

    return [polygon, converted, handleChange];
};

export const Polygon: React.FunctionComponent<{}> = () => {
    const [polygon, converted, handleChange] = usePolygonInput();

    return (
        <div className="Polygon">
            <div className="Polygon__field">
                <input onChange={handleChange} className="Polygon__input" type="text" value={polygon} />
            </div>
            <code>
                {'<path>\n'}
                {converted.map((c, index) => {
                    const [x, y] = c;
                    const tagName = index === 0 ? 'move' : 'line';

                    return `    <${tagName} x="${x}" y="${y}" />\n`;
                })}
                {'</path>'}
            </code>
        </div>
    );
};
