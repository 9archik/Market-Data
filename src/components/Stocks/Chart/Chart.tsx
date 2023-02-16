import { useEffect, useRef, useState } from 'react';
import {
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
import { calculateXY, Mouse } from '../../../redux/store/reducers/mouseSlice';
import { styleAxis, styleCandle } from '../../../styles/victory/stylesVictory';
import Tool from '../Tool/Tool';

const Chart = () => {
	const contRef = useRef<HTMLDivElement>(null!);

	const mouseCoordinate = useAppSelector((state) => state.mouseReducer);

	const [contWidth, setContWidth] = useState<number>(0);

	const [contHeight, setContHeight] = useState<number>(0);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (contRef && contRef.current) {
			setContHeight(contRef.current.offsetHeight);
			setContWidth(contRef.current.offsetWidth);
			contRef.current.children[0].children[0].attributes[3].nodeValue = `0 0 ${1420} ${720}`;
		}
	}, [contWidth, contHeight]);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
			}}>
			<div style={{ maxWidth: 1440, maxHeight: 720 }} ref={contRef}>
				<VictoryChart
					// containerComponent={<VictoryZoomContainer />}

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
					/>
					<VictoryAxis
						tickLabelComponent={<VictoryLabel dy={5} dx={0} />}
						style={styleAxis}
						tickFormat={(t) => `${months[t.getMonth()]} ${t.getFullYear()} ${t.getHours()}:00`}
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
										xC={((mouseCoordinate.x - 100) * 1420) / (contWidth - 20)}
										yC={((mouseCoordinate.y - 50) * 720) / contHeight}
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
							{ x: new Date(2017, 1, 3, 0), open: 13, close: 20, high: 22, low: 10 },
							{ x: new Date(2017, 2, 3, 0), open: 25, close: 80, high: 100, low: 4 },
							{ x: new Date(2017, 3, 3, 0), open: 10, close: 15, high: 20, low: 5 },
							{ x: new Date(2017, 4, 3, 4), open: 15, close: 20, high: 22, low: 10 },
							{ x: new Date(2017, 5, 3, 4), open: 48, close: 25, high: 50, low: 4 },
							{ x: new Date(2017, 6, 3, 4), open: 10, close: 19, high: 20, low: 5 },
							{ x: new Date(2017, 7, 3, 4), open: 15, close: 21, high: 22, low: 10 },
							{ x: new Date(2017, 8, 3, 4), open: 48, close: 25, high: 50, low: 4 },
							{ x: new Date(2017, 9, 3, 4), open: 10, close: 19, high: 20, low: 5 },
							{ x: new Date(2017, 10, 3, 4), open: 15, close: 21, high: 22, low: 10 },
							{ x: new Date(2017, 11, 3, 4), open: 48, close: 25, high: 50, low: 4 },
						]}
					/>
				</VictoryChart>
			</div>
		</div>
	);
};

export default Chart;
