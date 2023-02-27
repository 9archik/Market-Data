import {
	VictoryChart,
	VictoryAxis,
	VictoryZoomContainer,
	VictoryCursorContainer,
	createContainer,
	VictoryVoronoiContainer,
	VictoryTheme,
	VictoryCandlestick,
	VictoryCandlestickStyleInterface,
	VictoryTooltip,
	VictoryLabel,
	Flyout,
	VictoryAccessibleGroup,
	CursorHelpers,
	LineSegment,
	Border,
} from 'victory';
import Tool from './Tool/Tool';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Mouse } from '../../redux/store/reducers/mouseSlice';

import { StyleAxis } from './interfaces';
import { useRef, useState, MouseEvent, useEffect, useLayoutEffect } from 'react';
import { calculateXY } from '../../redux/store/reducers/mouseSlice';
import CompanyInfo from './MainCompanyInfo/MainCompanyInfo';
import { styleAxis, styleCandle } from '../../styles/victory/stylesVictory';
import { months } from '../../constants/stocks';
import Chart from './Chart/Chart';
import Checkboxs from './Checkboxs/Checkboxs';
import DetailedInfo from './DetailedInfo/DetailedInfo';
import NewsList from './NewsList/NewsList';

const Stocks = React.memo(() => {
	return (
		<section className="stocks container mt-3">
			<CompanyInfo />
			<Checkboxs />
			<Chart />
			<DetailedInfo />
			<NewsList/>
		</section>
	);
});

export default Stocks;
