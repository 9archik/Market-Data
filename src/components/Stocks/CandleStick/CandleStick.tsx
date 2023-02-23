import { forwardRef, RefObject, useEffect, useRef, useState, Ref, MutableRefObject } from 'react';
import { batch } from 'react-redux';
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
import { IStockData } from '../../../models/IStockData';
import { IQueryDataParams } from '../../../redux/store/reducers/API/IQueryDataParams';
import { stockDataApi } from '../../../redux/store/reducers/API/stockData.api';
import { setChartInfo } from '../../../redux/store/reducers/chartInfoSlice';
import { chartSize, setChartSize } from '../../../redux/store/reducers/chartSizeSlice';
import { calculateXY, Mouse } from '../../../redux/store/reducers/mouseSlice';
import { styleAxis, styleCandle } from '../../../styles/victory/stylesVictory';

import Tool from '../Tool/Tool';

const CandleStick = forwardRef((ref: any) => {
	
	const mouseCoordinate = useAppSelector((state) => state.mouseReducer);

	const chartSizeState = useAppSelector((state) => state.chartSizeReducer);

	const [zoom, setZoom] = useState<number>(1305241712);

	const { data: chartInfo } = useAppSelector((state) => state.chartInfoReducer);
 

	const { maxDomain } = useAppSelector((state) => state.chartInfoReducer);

	const { minDomain } = useAppSelector((state) => state.chartInfoReducer);

	const dispatch = useAppDispatch();


	const handleZoomChange = (domain: DomainTuple) => {
		let startDate: Date = domain[0] as Date;
		let endDate: Date = domain[1] as Date;

		setZoom(() => endDate.getTime() - startDate.getTime());
	};

	const tickFormatInit = (t: any): string => {
		if (zoom > 305241712)
			return `${t.getDate() as string} ${months[t.getMonth()]} ${t.getFullYear()}`;
		else return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()} ${t.getHours()}:00`;
	};
    
	useEffect(() => {
		if (ref && ref.current) {
			let chSize: chartSize = {
				width: ref.current.offsetHeight,
				height: ref.current.offsetWidth,
			};
			dispatch(setChartSize(chSize));
			ref.current.children[0].children[0].children[0].attributes[3].nodeValue = '0 0 1480 720';
		} else {
			dispatch(setChartSize({ width: window.innerWidth, height: window.innerHeight }));
		}
	}, [ chartSizeState, chartInfo]);

	return (
		<VictoryChart
			containerComponent={
				<VictoryZoomContainer onZoomDomainChange={(domain, props) => handleZoomChange(domain.x)} />
			}
			minDomain={{ y: minDomain }}
			maxDomain={{ y: maxDomain }}
			height={720}
			theme={VictoryTheme.material}
			width={1440}
			domainPadding={{ x: 50 }}
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
				domainPadding={50}
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
						flyoutComponent={
							<Tool
								xC={((mouseCoordinate.x - 100) * 1440) / chartSizeState.width}
								yC={((mouseCoordinate.y - 50) * 720) / chartSizeState.height}
							/>
						}
					/>
				}
				labels={() => ''}
				events={[
					{
						target: 'data',
						eventHandlers: {
							onMouseEnter: (e: any) => {
								let mouseCoordinate: Mouse = { x: 0, y: 0 };
								let x: number = e.pageX;
								let y: number = e.pageY;

								if (ref) {
									mouseCoordinate.x = x - ref.current.offsetLeft;
									mouseCoordinate.y = y - ref.current.offsetTop;
								}

								batch(() => dispatch(calculateXY(mouseCoordinate)));
							},
						},
					},
				]}
				candleColors={{ positive: '#00a000', negative: '#ff0000' }}
				x="x"
				y="y"
				open={'open'}
				close={'close'}
				high={'high'}
				low="low"
				width={200}
				data={chartInfo}
			/>
		</VictoryChart>
	);
});

export default CandleStick;
