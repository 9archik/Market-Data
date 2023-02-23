import React from 'react';
import logo from './logo.svg';
import { Link, Route, Router, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Stocks from './components/Stocks';
import StocksPage from './pages/StocksPage';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/stocks/:name" element={<StocksPage />}/>
				<Route path="/crypto" element={<></>} />
				<Route path="/currency" element={<></>} />
			</Routes>
		</>
	);
}

export default App;
