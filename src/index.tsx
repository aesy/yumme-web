import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Hello } from './Hello';

const App: React.FC = () => {
    return (
        <div>
            <Hello />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
