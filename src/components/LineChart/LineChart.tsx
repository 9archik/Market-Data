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

export interface ILineChartProps {
	data: any;
	maxDomain: number;
	minDomain: number;
}

const LineChart = ({ data, maxDomain, minDomain }: ILineChartProps) => {
	const contRef = useRef<HTMLDivElement>(null!);
	const chartSizeState = useAppSelector((state) => state.chartSizeReducer);

	const [scatterData, setScatterData] = useState<IScatterData[] | undefined>(undefined);

	const dispatch = useAppDispatch();

	const ref = useRef<any>();

	function resize(e: Event) {
		if (contRef && contRef.current) {
			let chSize: chartSize = {
				height: contRef.current.offsetHeight,
				width: contRef.current.offsetWidth,
			};
			dispatch(setChartSize(chSize));
			contRef.current.children[0].children[0].attributes[3].nodeValue = '0 0 1460 720';
		}
	}

	const mouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		dispatch(calculateXY({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }));
	};

	useEffect(() => {
		if (contRef && contRef.current) {
			contRef.current.children[0].children[0].attributes[3].nodeValue = '0 0 1460 720';
		}
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	}, []);

	useEffect(() => {
		let chSize: chartSize = {
			height: window.innerWidth > 1420 ? 710 : (window.innerWidth - 20) * 0.5,
			width: window.innerWidth > 1420 ? 1420 : window.innerWidth - 20,
		};
		dispatch(setChartSize(chSize));
	}, []);

	return (
		<div
			onMouseMove={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => mouseMove(event)}
			ref={contRef}
			style={{
				width: '100%',
				height: chartSizeState.width * 0.5,
				maxWidth: 1440,
				maxHeight: 720,
				cursor: 'crosshair',
			}}>
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
						onCursorChange={(value, props) => (ref.current = value)}
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

				<VictoryGroup data={data}>
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
								flyoutComponent={
									<Tool valueProp={ref} maxDomain={maxDomain} minDomain={minDomain} />
								}
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
		</div>
	);
};

export default LineChart;
