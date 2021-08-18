import React from "react";
import ReactDOM from "react-dom";

import { Board } from "./modules/morpion.jsx";

import "../style/main.css";

class App extends React.Component {
    render() {
        return (
            <Board />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);