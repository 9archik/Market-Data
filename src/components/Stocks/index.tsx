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
import Tool from './Tool';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Mouse } from '../../redux/store/reducers/mouseSlice';

import { StyleAxis } from './interfaces';
import { useRef, useState, MouseEvent, useEffect, useLayoutEffect } from 'react';
import { calculateXY } from '../../redux/store/reducers/mouseSlice';
import CompanyInfo from './CompanyInfo';
import { styleAxis, styleCandle } from '../../styles/victory/stylesVictory';
import { months } from '../../constants/stocks';

const VictoryContainer = createContainer('zoom', 'cursor');

const Stocks = React.memo(() => {
	const contRef = useRef<HTMLDivElement>(null!);

	const mouseCoordinate = useAppSelector((state) => state.mouseReducer);

	const [contWidth, setContWidth] = useState<number>(0);

	const [contHeight, setContHeight] = useState<number>(0);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (contRef && contRef.current) {
			setContHeight(contRef.current.offsetHeight);
			setContWidth(contRef.current.offsetWidth);
			contRef.current.children[0].children[0].attributes[3].nodeValue = `0 0 ${
				contRef.current.offsetWidth + 20
			} ${contRef.current.offsetHeight}`;
		}
	}, [contWidth, contHeight]);

	return (
		<section className="stocks container mt-3">
			<CompanyInfo />

			<div ref={contRef}>
				<VictoryChart
					containerComponent={<VictoryZoomContainer />}
					height={contWidth * 0.5}
					theme={VictoryTheme.material}
					width={contWidth}
					domainPadding={{ x: 20 }}
					style={{ parent: { overflow: 'visible' } }}
					scale={{ x: 'time' }}>
					<VictoryAxis
						tickLabelComponent={<VictoryLabel dy={0} dx={-5} />}
						style={styleAxis}
						offsetX={48}
						orientation={'right'}
						tickComponent={<LineSegment />}
						dependentAxis
					/>
					<VictoryAxis
						tickLabelComponent={<VictoryLabel dy={5} dx={0} />}
						style={styleAxis}
						tickFormat={(t) => `${months[t.getMonth()]} ${t.getFullYear()}`}
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
								flyoutComponent={<Tool xC={mouseCoordinate.x - 75} yC={mouseCoordinate.y - 200} />}
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

										mouseCoordinate.x = x - contRef.current.offsetLeft;
										mouseCoordinate.y = y - contRef.current.offsetTop;
										dispatch(calculateXY(mouseCoordinate));
									},
								},
							},
						]}
						candleColors={{ positive: '#00a000', negative: '#ff0000' }}
						x="x"
						open={'open'}
						close={'close'}
						high={'high'}
						low="low"
						width={200}
						data={[
							{
								x: new Date(2016, 9),
								open: 5,
								close: 10,
								high: 15,
								low: 0,
							},
							{
								x: new Date(2016, 8),
								open: 10,
								close: 15,
								high: 20,
								low: 5,
							},
							{ x: new Date(2016, 1), open: 13, close: 20, high: 22, low: 10 },
							{ x: new Date(2016, 2), open: 25, close: 80, high: 100, low: 4 },
							{ x: new Date(2016, 3), open: 10, close: 15, high: 20, low: 5 },
							{ x: new Date(2016, 4), open: 15, close: 20, high: 22, low: 10 },
							{ x: new Date(2016, 5), open: 48, close: 25, high: 50, low: 4 },
							{ x: new Date(2016, 6), open: 10, close: 19, high: 20, low: 5 },
							{ x: new Date(2016, 7), open: 15, close: 21, high: 22, low: 10 },
							{ x: new Date(2016, 10), open: 15, close: 21, high: 22, low: 10 },
							{ x: new Date(2016, 11), open: 48, close: 25, high: 50, low: 4 },
							{ x: new Date(2017, 0), open: 10, close: 19, high: 20, low: 5 },
							{ x: new Date(2017, 1), open: 13, close: 20, high: 22, low: 10 },
							{ x: new Date(2017, 2), open: 25, close: 80, high: 100, low: 4 },
							{ x: new Date(2017, 3), open: 10, close: 15, high: 20, low: 5 },
							{ x: new Date(2017, 4), open: 15, close: 20, high: 22, low: 10 },
							{ x: new Date(2017, 5), open: 48, close: 25, high: 50, low: 4 },
							{ x: new Date(2017, 6), open: 10, close: 19, high: 20, low: 5 },
							{ x: new Date(2017, 7), open: 15, close: 21, high: 22, low: 10 },
							{ x: new Date(2017, 8), open: 48, close: 25, high: 50, low: 4 },
							{ x: new Date(2017, 9), open: 10, close: 19, high: 20, low: 5 },
							{ x: new Date(2017, 10), open: 15, close: 21, high: 22, low: 10 },
							{ x: new Date(2017, 11), open: 48, close: 25, high: 50, low: 4 },
						]}
					/>
				</VictoryChart>
			</div>
		</section>
	);
});

export default Stocks;
