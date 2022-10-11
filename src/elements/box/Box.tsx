import React, { ReactNode } from 'react';
import './Box.css';

interface BoxProps {
    title?: ReactNode;
    children?: ReactNode;
}

export const Box = ({ children, title }: BoxProps): JSX.Element => {
    return (
        <div className="Box">
            {title && <h2 className="Box__title">{title}</h2>}
            <div>{children}</div>
        </div>
    );
};
