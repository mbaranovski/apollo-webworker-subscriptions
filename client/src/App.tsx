import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from "@apollo/react-common";
import { apolloClient } from "./apolloClient";
import { SubComponent } from "./SubComponent";

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="bouncy-ball"></div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reactw
        </a>
        <img src={logo} className="App-logo" alt="logo" />
        <SubComponent />
      </header>

    </div>
    </ApolloProvider>
  );
}

export default App;
