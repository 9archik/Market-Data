
import { CSSProperties, HTMLAttributes, SVGAttributes, useState } from 'react';
import { CandleProps, Flyout } from 'victory';
import {
	styleContainer,
	styleForeignObject,
	styleName,
	styleValue,
} from '../../styles/victory/toolVictory';
import { IPropType, IToolValues } from '../Stocks/interfaces';
import { useAppSelector } from '../../hooks/redux';

const Tool = ({ datum }: IPropType) => {
	const [arrayValues] = useState<IToolValues[]>([
		{ name: 'open', value: Math.round(datum.open * 100) / 100 },
		{ name: 'close', value: Math.round(datum.close * 100) / 100 },
		{ name: 'high', value: Math.round(datum.high * 100) / 100 },
		{ name: 'low', value: Math.round(datum.low * 100) / 100 },
	]);

	const mouseCoordinate = useAppSelector((state) => state.mouseReducer);

	const chartSizeState = useAppSelector((state) => state.chartSizeReducer);

	return (
		<g>
			<foreignObject
				width={100}
				height={140}
				x={((mouseCoordinate.x + 20) * 1420) / chartSizeState.width}
				y={((mouseCoordinate.y + 20) * 710) / chartSizeState.height}
				style={styleForeignObject}>
				<div  style={styleContainer}>
					{arrayValues.map((el) => {
						return (
							<div>
								<span style={styleName}>{el.name} </span>{' '}
								<span style={styleValue} >
									{el.value}
								</span>
							</div>
						);
					})}
				</div>
			</foreignObject>
		</g>
	);
};

export default Tool;
