import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import {
	DomainTuple,
	LineSegment,
	VictoryAxis,
	VictoryCandlestick,
	VictoryChart,
	VictoryLabel,
	VictoryTheme,
	VictoryTooltip,
	VictoryZoomContainer,
} from 'victory';
import { months } from '../../../constants/stocks';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { stockDataApi } from '../../../redux/store/reducers/API/stockData.api';
import { calculateXY, Mouse } from '../../../redux/store/reducers/mouseSlice';
import { styleAxis, styleCandle } from '../../../styles/victory/stylesVictory';
import { IQueryDataParams } from '../../../redux/store/reducers/API/IQueryDataParams';

import { VictoryCursorContainer } from 'victory';
import { batch } from 'react-redux';
import Checkboxs from '../Checkboxs/Checkboxs';
import CandleStick from '../../CandleStick/CandleStick';
import { setChartSize } from '../../../redux/store/reducers/chartSizeSlice';
import { chartSize } from './../../../redux/store/reducers/chartSizeSlice';
import { setChartInfo } from '../../../redux/store/reducers/chartInfoSlice';
import { debounce } from 'ts-debounce';
import { useParams } from 'react-router-dom';
import { marketInfoApi } from './../../../redux/store/reducers/API/marketInfo.api';
import { setStockQueryParamsName } from '../../../redux/store/reducers/stockQueryParamsSlice';
import LineChart from '../../LineChart/LineChart';
import loaderSpinner from '../../../images/loader-spinner.svg';

const Chart = () => {
	const contRef = useRef<HTMLDivElement>(null!);

	const { name } = useParams();

	const queryParams = useAppSelector((state) => state.stockQueryParamsReducer);

	const { data, isFetching, isError } = queryParams.interval
		? stockDataApi.useGetStockIntraDayDataQuery(queryParams)
		: stockDataApi.useGetStockDataQuery(queryParams);

	const { interval: intervalState } = useAppSelector((state) => state.chartInfoReducer);

	const chartSizeState = useAppSelector((state) => state.chartSizeReducer);

	const { data: chartInfo } = useAppSelector((state) => state.chartInfoReducer);

	const { minDomain } = useAppSelector((state) => state.chartInfoReducer);

	const { maxDomain } = useAppSelector((state) => state.chartInfoReducer);

	const { error } = useAppSelector((state) => state.chartInfoReducer);

	const { type } = useAppSelector((state) => state.chartInfoReducer);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setStockQueryParamsName(name));
	}, [name]);


	useEffect(() => {
		dispatch(setChartInfo(data));
	}, [data, queryParams, intervalState, type]);

	useEffect(() => {
		let chSize: chartSize = {
			height: window.innerWidth > 1420 ? 710 : (window.innerWidth - 20) * 0.5,
			width: window.innerWidth > 1420 ? 1420 : window.innerWidth - 20,
		};
		dispatch(setChartSize(chSize));
	}, []);

	console.log('width', chartSizeState.width);

	console.log('height', chartSizeState.height);

	if (isFetching) {
		return (
			<div
				className="flex justify-center items-center"
				style={{
					maxWidth: 1440,
					maxHeight: 720,
				}}>
				<img width="32" height="32" src={loaderSpinner} className="animate-spin" />
			</div>
		);
	}

	if (error) {
		return (
			<div
				style={{
					maxWidth: 1440,
					maxHeight: 720,
				}}>
				Error
			</div>
		);
	}
	if (chartInfo && chartInfo.length === 0) {
		return (
			<div
				style={{
					maxWidth: 1440,
					maxHeight: 720,
				}}></div>
		);
	}

	return (
		<div className ="mt-3">
			{type === 'candlestick' ? (
				<CandleStick />
			) : (
				<LineChart data={chartInfo} maxDomain={maxDomain} minDomain={minDomain} />
			)}
		</div>
	);
};

export default Chart;
