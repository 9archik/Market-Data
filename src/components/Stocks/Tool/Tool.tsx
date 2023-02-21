import styles from '../style.module.css';
import { CSSProperties, HTMLAttributes, SVGAttributes, useState } from 'react';
import { CandleProps, Flyout } from 'victory';
import {
	styleContainer,
	styleForeignObject,
	styleName,
	styleValue,
} from '../../../styles/victory/toolVictory';
import { IPropType, IToolValues } from '../interfaces';

const Tool = ({xC, yC, datum }: IPropType) => {
	const [arrayValues] = useState<IToolValues[]>([
		{ name: 'open', value: Math.round(datum.open*100)/100 },
		{ name: 'close', value: Math.round(datum.close*100)/100 },
		{ name: 'high', value: Math.round(datum.high*100)/100 },
		{ name: 'low', value: Math.round(datum.low*100)/100 },
	]);

	return (
		<g>
			<foreignObject width={100} height={140} x={xC} y={yC} style={styleForeignObject}>
				<div className={styles.containerTool} style={styleContainer}>
					{arrayValues.map((el) => {
						return (
							<div className={styles.toolListItem}>
								<span style={styleName}>{el.name} </span>{' '}
								<span style={styleValue} className={styles.value}>
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
