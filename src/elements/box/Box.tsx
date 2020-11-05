import React, { ReactNode } from 'react';
import './Box.css';

interface BoxProps {
    title?: ReactNode;
}

export const Box: React.FunctionComponent<BoxProps> = ({ children, title }) => {
    return (
        <div className="Box">
            {title && <h2 className="Box__title">{title}</h2>}
            <div>{children}</div>
        </div>
    );
};
