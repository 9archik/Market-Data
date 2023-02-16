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

const Tool = ({ xC, yC, datum }: IPropType) => {
	const [arrayValues] = useState<IToolValues[]>([
		{ name: 'open', value: datum.open },
		{ name: 'close', value: datum.close },
		{ name: 'high', value: datum.high },
		{ name: 'low', value: datum.low },
	]);

	return (
		<g>
			<foreignObject x={xC} y={yC} style={styleForeignObject}>
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
