import React from 'react';
import logo from './logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Stocks from './components/Stocks';
import { IStockToolsQuoteList } from './models/IStockToolsQuote';

function App() {
	return (
		<>
			<Header />
			<Stocks />
		</>
	);
}

export default App;
