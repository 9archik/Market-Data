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
// import { ICandlestick } from '../interfaces';
import { VictoryCursorContainer } from 'victory';
import { batch } from 'react-redux';
import Checkboxs from '../Checkboxs/Checkboxs';
import CandleStick from '../CandleStick/CandleStick';
import { setChartSize } from '../../../redux/store/reducers/chartSizeSlice';
import { chartSize } from './../../../redux/store/reducers/chartSizeSlice';
import { setChartInfo } from '../../../redux/store/reducers/chartInfoSlice';
import { debounce } from 'ts-debounce';
import { useParams } from 'react-router-dom';

const Chart = () => {
	const contRef = useRef<HTMLDivElement>(null!);

	const { name } = useParams();

	const mouseCoordinate = useAppSelector((state) => state.mouseReducer);

	const chartSizeState = useAppSelector((state) => state.chartSizeReducer);

	const { data: chartInfo } = useAppSelector((state) => state.chartInfoReducer);

	const [queryParams, setQueryParams] = useState<IQueryDataParams>({
		function: 'TIME_SERIES_DAILY_ADJUSTED',
		symbol: name,
		outputSize: 'compact',
		apiKey: '88WOO3GUK7BE4DU3',
	});
	const dispatch = useAppDispatch();
	function resize(e: Event) {
		if (contRef && contRef.current) {
			let chSize: chartSize = {
				width: contRef.current.offsetHeight,
				height: contRef.current.offsetWidth,
			};
			dispatch(setChartSize(chSize));
			contRef.current.children[0].children[0].children[0].attributes[3].nodeValue = '0 0 1480 720';
		}
	}

	const { data, isLoading, isError } = stockDataApi.useGetStockDataQuery(queryParams);

	useEffect(() => {
		setQueryParams({
			function: 'TIME_SERIES_DAILY_ADJUSTED',
			symbol: name,
			outputSize: 'compact',
			apiKey: '88WOO3GUK7BE4DU3',
		});
	}, [name]);

	useEffect(() => {
		if (contRef && contRef.current) {
			contRef.current.children[0].children[0].children[0].attributes[3].nodeValue = '0 0 1480 720';
		}
		window.addEventListener('resize', resize);
		return () => window.addEventListener('resize', resize);
	}, [chartInfo]);

	useEffect(() => {
		dispatch(setChartInfo(data));
	}, [data]);

	if (chartInfo && chartInfo.length === 0) {
		return <></>;
	}

	return (
		<>
			<div
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
					}}>
					<CandleStick ref={contRef} />
				</div>
			</div>
		</>
	);
};

export default Chart;
