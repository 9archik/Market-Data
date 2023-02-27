import { forwardRef, RefObject, useEffect, useRef, useState, Ref, MutableRefObject } from 'react';
import { batch } from 'react-redux';
import {
	DomainTuple,
	LineSegment,
	VictoryAxis,
	VictoryCandlestick,
	VictoryChart,
	VictoryGroup,
	VictoryLabel,
	VictoryLine,
	VictoryScatter,
	VictoryTheme,
	VictoryTooltip,
	VictoryVoronoiContainer,
	VictoryZoomContainer,
	VictoryZoomContainerProps,
	VictoryVoronoiContainerProps,
	VictoryCursorContainer,
	VictoryArea,
	Candle,
} from 'victory';
import { months } from '../../../constants/stocks';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IStockData } from '../../../models/IStockData';
import { IQueryDataParams } from '../../../redux/store/reducers/API/IQueryDataParams';
import { stockDataApi } from '../../../redux/store/reducers/API/stockData.api';
import { setChartInfo } from '../../../redux/store/reducers/chartInfoSlice';
import { chartSize, setChartSize } from '../../../redux/store/reducers/chartSizeSlice';
import { calculateXY, Mouse } from '../../../redux/store/reducers/mouseSlice';
import { styleAxis, styleCandle } from '../../../styles/victory/stylesVictory';

import Tool from '../Tool/Tool';
import { createContainer } from 'victory';
import VictoryCursorChart from '../VictoryCursorChart/VictoryCursorChart';

const VictoryZoomVoronoiContainer = createContainer<
	VictoryZoomContainerProps,
	VictoryVoronoiContainerProps
>('zoom', 'voronoi');

const CandleStick = () => {
	const chartSizeState = useAppSelector((state) => state.chartSizeReducer);

	const [zoom, setZoom] = useState<number>(1305241712);

	const { data: chartInfo } = useAppSelector((state) => state.chartInfoReducer);

	const { maxDomain } = useAppSelector((state) => state.chartInfoReducer);

	const { minDomain } = useAppSelector((state) => state.chartInfoReducer);

	const { type } = useAppSelector((state) => state.chartInfoReducer);

	const dispatch = useAppDispatch();

	const handleZoomChange = (domain: DomainTuple) => {
		let startDate: any = domain[0];
		let endDate: any = domain[1];
		if (type === 'candlestick') {
			setZoom(() => endDate.getTime() - startDate.getTime());
		} else {
			setZoom(() => endDate - startDate);
		}
	};

	const tickFormatInit = (t: any): string => {
		if (type === 'candlestick') {
			if (zoom > 305241712)
				return `${t.getDate() as string} ${months[t.getMonth()]} ${t.getFullYear()}`;
			else return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()} ${t.getHours()}:00`;
		} else {
			let date: Date = new Date(t.x);
			if (zoom > 305241712)
				return `${t.getDate() as string} ${months[t.getMonth()]} ${t.getFullYear()}`;
			else return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()} ${t.getHours()}:00`;
		}
	};

	return (
		<VictoryChart
			containerComponent={
				<VictoryZoomVoronoiContainer
					onZoomDomainChange={(domain, props) => handleZoomChange(domain.x)}
					voronoiDimension="x"
				/>
			}
			minDomain={{ y: minDomain }}
			maxDomain={{ y: maxDomain }}
			height={720}
			theme={VictoryTheme.material}
			width={1440}
			domainPadding={{ x: type === 'candlestick' ? [4, 4] : [0, 0] }}
			style={{ parent: { overflow: 'visible' } }}
			scale={{ x: 'time' }}>
			<VictoryAxis
				tickLabelComponent={<VictoryLabel dy={0} dx={-5} />}
				style={styleAxis}
				offsetX={48}
				orientation={'right'}
				tickComponent={<LineSegment />}
				dependentAxis
				tickCount={10}
				minDomain={{ y: 0 }}
				maxDomain={{ y: 300 }}
			/>
			<VictoryAxis
				tickLabelComponent={<VictoryLabel dy={5} dx={0} />}
				style={styleAxis}
				tickFormat={(t) => tickFormatInit(t)}
				height={200}
			/>

			{type === 'candlestick' ? (
				<VictoryCandlestick
					style={styleCandle}
					labelComponent={
						<VictoryTooltip
							dx={0}
							dy={0}
							cornerRadius={0}
							pointerLength={0}
							flyoutStyle={{
								stroke: '#303030',
								strokeWidth: 1,
								fill: 'white',
							}}
							style={{ fontSize: 15, fontFamily: 'Open Sans' }}
							centerOffset={{ x: 0, y: 0 }}
							
							flyoutComponent={<Tool />}
						/>
					}
					labels={() => ''}
					candleColors={{ positive: '#00a000', negative: '#ff0000' }}
					x="x"
					y="y"
					open={'open'}
					close={'close'}
					high={'high'}
					low="low"
					width={100}
					data={chartInfo}
				/>
			) : (
				<VictoryGroup data={chartInfo}>
					<VictoryArea style={{ data: { stroke: '#05b1eb', strokeWidth: 1, fill: '#05b1eb25' } }} />
				</VictoryGroup>
			)}
		</VictoryChart>
	);
};

export default CandleStick;
