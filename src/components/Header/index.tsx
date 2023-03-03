import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
	VictoryChart,
	VictoryTheme,
	VictoryAxis,
	VictoryCandlestick,
	VictoryZoomContainer,
} from 'victory';
import styles from './style.module.css';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './Navigation/Navigation';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Input from './Input/Input';
import { stockDataApi } from '../../redux/store/reducers/API/stockData.api';
import MobileNavigation from './Navigation/MobileNavigation';

export interface Links {
	text: string;
	address: string;
}

const Header = () => {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	function resize(e: Event) {
		setWindowWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', resize);
		return () => window.addEventListener('resize', resize);
	}, []);
	return (
		<header className="overflow-x-hidden">
			<div className={[styles.container, 'relative', 'container'].join(' ')}>
				<FontAwesomeIcon className={styles.logo} icon={faChartLine} />

				<Input />

				{windowWidth < 768 ? <MobileNavigation /> : <Navigation />}
			</div>
		</header>
	);
};

export default Header;
