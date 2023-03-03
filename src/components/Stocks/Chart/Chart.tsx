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
import Tool from '../Tool/Tool';
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

	const { type } = useAppSelector((state) => state.chartInfoReducer);

	const dispatch = useAppDispatch();

	function resize(e: Event) {
		if (contRef && contRef.current) {
			let chSize: chartSize = {
				height: contRef.current.offsetHeight,
				width: contRef.current.offsetWidth,
			};
			dispatch(setChartSize(chSize));
			contRef.current.children[0].children[0].children[0].attributes[3].nodeValue = '0 0 1480 720';
		}
	}

	console.log(queryParams);

	useEffect(() => {
		dispatch(setStockQueryParamsName(name));
	}, [name]);

	

	useEffect(() => {
		if (contRef && contRef.current) {
			contRef.current.children[0].children[0].children[0].attributes[3].nodeValue = '0 0 1480 720';
		}
		window.addEventListener('resize', resize);
		return () => window.addEventListener('resize', resize);
	}, [chartInfo]);
   
	console.log(data);

	useEffect(() => {
	
		dispatch(setChartInfo(data));
	}, [data, queryParams, intervalState, type]);


	const mouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		let x = e.pageX,
			y = e.pageY;

		dispatch(calculateXY({ x: x - contRef.current.offsetLeft, y: y - contRef.current.offsetTop }));
	};



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
		<>
			<div
				onMouseMove={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => mouseMove(event)}
				ref={contRef}
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				<div
					style={{
						width: chartSizeState.width,
						height: chartSizeState.width * 0.5,
						maxWidth: 1440,
						maxHeight: 720,
						cursor: "crosshair"
					}}>
					{type === 'candlestick' ? <CandleStick /> : <LineChart />}
				</div>
			</div>
		</>
	);
};

export default Chart;
