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
	VictoryCursorContainerProps,
	VictoryCursorContainer,
	VictoryArea,
	Candle,
	VictoryContainer,
} from 'victory';
import { months } from '../../constants/stocks';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IStockData } from '../../models/IStockData';
import { IQueryDataParams } from '../../redux/store/reducers/API/IQueryDataParams';
import { stockDataApi } from '../../redux/store/reducers/API/stockData.api';
import { setChartInfo, setIntervalSlice } from '../../redux/store/reducers/chartInfoSlice';
import { chartSize, setChartSize } from '../../redux/store/reducers/chartSizeSlice';
import { calculateXY, Mouse } from '../../redux/store/reducers/mouseSlice';
import { styleAxis, styleCandle } from '../../styles/victory/stylesVictory';

import { createContainer } from 'victory';
import Tool from './Tool';

const VictoryZoomVoronoiContainer = createContainer<
	VictoryZoomContainerProps,
	VictoryVoronoiContainerProps
>('zoom', 'voronoi');

const CandleStick = () => {
	const chartSizeState = useAppSelector((state) => state.chartSizeReducer);

	let contRef = useRef<any>(null);

	const [zoom, setZoom] = useState<number>(1305241712);

	const { data: chartInfo } = useAppSelector((state) => state.chartInfoReducer);

	const { maxDomain } = useAppSelector((state) => state.chartInfoReducer);

	const { minDomain } = useAppSelector((state) => state.chartInfoReducer);

	const dispatch = useAppDispatch();

	const handleZoomChange = (domain: DomainTuple) => {
		let startDate: any = domain[0];
		let endDate: any = domain[1];

		setZoom(endDate - startDate);
	};

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

	const tickFormatInit = (t: any): string => {
		console.log('zoom', zoom);
		if (zoom < 13290722)
		return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()} ${t.getHours()}:${
			t.getMinutes() === 0 ? '00' : t.getMinutes()
		}`;
			if (zoom < 312357790)
				return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()} ${t.getHours()}:00`;

		if (zoom < 6284987037) return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()}`;

		return `${months[t.getMonth()]} ${t.getFullYear()}`;
	};

	const mouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		dispatch(calculateXY({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }));
	};

	useEffect(() => {
		let chSize: chartSize = {
			height: window.innerWidth > 1420 ? 710 : (window.innerWidth - 20) * 0.5,
			width: window.innerWidth > 1420 ? 1420 : window.innerWidth - 20,
		};
		dispatch(setChartSize(chSize));
	}, []);

	useEffect(() => {
		if (contRef && contRef.current) {
			contRef.current.children[0].children[0].attributes[3].nodeValue = '0 0 1460 720';
		}
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	}, [chartInfo]);

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
				containerComponent={
					<VictoryZoomVoronoiContainer
						containerRef={(ref) => (contRef.current = ref)}
						onZoomDomainChange={(domain, props) => handleZoomChange(domain.x)}
						voronoiDimension="x"
						zoomDimension="x"
					/>
				}
				maxDomain={{ y: maxDomain }}
				minDomain={{ y: minDomain }}
				height={720}
				theme={VictoryTheme.material}
				width={1440}
				domainPadding={{ x: [4, 4] }}
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
			</VictoryChart>
		</div>
	);
};

export default CandleStick;
