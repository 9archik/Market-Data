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

export interface Links {
	text: string;
	address: string;
}

const Header = () => {

	return (
		<header>
			<div className={[styles.container, 'container'].join(' ')}>
				<FontAwesomeIcon className={styles.logo} icon={faChartLine} />
				
				<Input />

				<Navigation />
			</div>
		</header>
	);
};

export default Header;
