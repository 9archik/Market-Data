import React from 'react';
import logo from './logo.svg';
import { Link, Route, Router, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Stocks from './components/Stocks';
import StocksPage from './pages/StocksPage';
import News from './components/News';
import NotFoundPage from './pages/NotFoundPage';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/stocks/:name" element={<StocksPage />} />
				<Route path="/currency" element={<></>} />
				<Route index element={<></>} />
				<Route path="/commodities" element={<></>} />
				<Route path="/news" element={<News />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
