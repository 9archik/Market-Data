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
	VictoryCursorContainerProps,
	VictoryArea,
	createContainer,
	Candle,
	Flyout,
} from 'victory';
import { months } from '../../constants/stocks';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IStockData } from '../../models/IStockData';
import { IQueryDataParams } from '../../redux/store/reducers/API/IQueryDataParams';
import { stockDataApi } from '../../redux/store/reducers/API/stockData.api';
import { setChartInfo } from '../../redux/store/reducers/chartInfoSlice';
import { chartSize, setChartSize } from '../../redux/store/reducers/chartSizeSlice';
import { calculateXY, Mouse } from '../../redux/store/reducers/mouseSlice';
import { styleAxis, styleCandle } from '../../styles/victory/stylesVictory';
import Tool from './Tool';

export interface IScatterData {
	x: number;
	y: number;
}

export const VictoryCursorVoronoiContainer = createContainer<
	VictoryCursorContainerProps,
	VictoryVoronoiContainerProps
>('cursor', 'voronoi');

const LineChart = () => {
	const chartSizeState = useAppSelector((state) => state.chartSizeReducer);

	const { data: chartInfo } = useAppSelector((state) => state.chartInfoReducer);

	const { maxDomain } = useAppSelector((state) => state.chartInfoReducer);

	const { minDomain } = useAppSelector((state) => state.chartInfoReducer);

	const [scatterData, setScatterData] = useState<IScatterData[] | undefined>(undefined);

	const dispatch = useAppDispatch();

	return (
		<VictoryChart
			minDomain={{ y: minDomain }}
			maxDomain={{ y: maxDomain }}
			height={720}
			theme={VictoryTheme.material}
			width={1440}
			domainPadding={{ x: [0, 0] }}
			containerComponent={
				<VictoryCursorVoronoiContainer
					labels={() => ''}
					// onCursorChange={(value, props) => console.log(value) }
					onActivated={(points, props) => {
						 
						let copy: IScatterData[] = [];
						copy.push({ x: points[0].x, y: points[0].y });
						setScatterData(copy);
					}}
					voronoiDimension="x"
				/>
			}
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
				// tickFormat={(t) => tickFormatInit(t)}
				height={200}
			/>

			<VictoryGroup data={chartInfo}>
				<VictoryArea
					labels={() => ''}
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
							flyoutComponent={<Tool />}
						/>
					}
					style={{ data: { stroke: '#05b1eb', strokeWidth: 1, fill: '#05b1eb25' } }}
				/>
			</VictoryGroup>

			<VictoryScatter
				size={6}
				style={{
					data: {
						fill: 'yellow',
					},
				}}
				data={!scatterData ? [] : scatterData}
			/>
		</VictoryChart>
	);
};

export default LineChart;
