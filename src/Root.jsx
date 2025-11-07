import React, { createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Arabul } from './Arabul';

const Context = createContext()

export const Root = () => (
    <Router>
        <Arabul />
    </Router>
)