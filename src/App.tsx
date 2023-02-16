import React from 'react';
import logo from './logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Stocks from './components/Stocks';

function App() {
	return (
		<>
			<Header />
			<Stocks />
		</>
	);
}

export default App;
