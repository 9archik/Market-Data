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
import NewsList from '../NewsList/NewsList';
import NewsStocks from './NewsStocks/NewsStocks';

const Stocks = React.memo(() => {
	const [openMore, setOpenMore] = useState<boolean>(false);
	return (
		<section className="stocks relative container mt-3">
			<CompanyInfo />
			<Checkboxs />
			<Chart />
			{!openMore ? (
				<div className="w-full mt-5 flex justify-center">
					<button
						className="py-3 px-7 mt-5 rounded-md text-white bg-black font-bold text-2xl"
						onClick={() => setOpenMore(true)}>
						More information
					</button>
				</div>
			) : (
				<>
					<DetailedInfo />
					<NewsStocks />
				</>
			)}
		</section>
	);
});

export default Stocks;
