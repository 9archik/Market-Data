import React from 'react';
import logo from './logo.svg';
import { Link, Route, Router, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Stocks from './components/Stocks';
import StocksPage from './pages/StocksPage';
import News from './components/News';
import NotFoundPage from './pages/NotFoundPage';
import CurrencyPage from './pages/CurrencyPage';
import CommoditiesPage from './pages/CommoditiesPage';
import HeadPage from './pages/HeadPage';

function App() {
	return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path="/stocks/:name" element={<StocksPage />} />
					<Route
						path="/currency"
						element={
							<>
								<CurrencyPage />
							</>
						}
					/>
					<Route
						index
						element={
							<>
								<HeadPage />
							</>
						}
					/>
					<Route
						path="/commodities"
						element={
							<>
								<CommoditiesPage />
							</>
						}
					/>
					<Route path="/news" element={<News />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
