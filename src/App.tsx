import React from 'react';
import './App.css';
import { Path } from './components/path';
import { Box } from './elements/box';
import { Polygon } from './components/polygon';

const App: React.FunctionComponent<{}> = () => {
    return (
        <div className="App">
            <Box title="SVG Path converter">
                <Path />
            </Box>
            <Box title="SVG Polygon converter">
                <Polygon />
            </Box>
        </div>
    );
};

export default App;
