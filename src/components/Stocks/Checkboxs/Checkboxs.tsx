import styles from './style.module.css';
import candleStickSvg from '../../../images/candleStick.svg';
import lineChartSvg from '../../../images/lineChart.svg';
export interface IChartType {
	src: string;
	value: string;
	checked: boolean;
}

export interface IIntervalType {
	value: string;
	checked: boolean;
}

const chartTypeList: IChartType[] = [
	{ src: candleStickSvg, value: 'candleStick', checked: true },
	{ src: lineChartSvg, value: 'lineChart', checked: false },
];

const intervalTypeList: IIntervalType[] = [
	{ value: '1', checked: false },
	{ value: '5', checked: false },
	{ value: '15', checked: false },
	{ value: '30', checked: false },
	{ value: '1D', checked: true },
	{ value: '1W', checked: false },
];
const Checkboxs = () => {
	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<div className={styles.typeChartContainer}>
					{chartTypeList.map((el: IChartType) => {
						return (
							<label className={styles.typeChart} id="typeChart">
								<input
									className={styles.checkbox}
									value={el.value}
									type="radio"
									name="type chart"
									checked={el.checked}
								/>
								<span>
									<img src={el.src} alt="" />
								</span>
							</label>
						);
					})}
				</div>
				<div className={styles.intervalContainer}>
					{intervalTypeList.map((el: IIntervalType) => {
						return (
							<label className={styles.interval} id="interval">
								<input
									className={styles.checkbox}
									type="radio"
									value={el.value}
									checked={el.checked}
									name="interval"
								/>
								<span>{el.value}</span>
							</label>
						);
					})}
				</div>
			</form>
		</div>
	);
};

export default Checkboxs;
