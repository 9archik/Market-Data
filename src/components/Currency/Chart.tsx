import { SingleValue } from 'react-select';
import { ICurrencyChart } from '../../redux/store/reducers/API/currencyData.api';
import LineChart from '../LineChart/LineChart';
import { IOption } from './Currency';

export  interface ICurrencyChartProp {
	data?: ICurrencyChart;
	currencyFrom: IOption | SingleValue<IOption>;
	currencyTo: IOption | SingleValue<IOption>;
}

const Chart = ({data, currencyFrom, currencyTo}: ICurrencyChartProp) => {

    console.log(data);
	return (
		<div className="flex text-center border-t-[2px] pt-5 border-[#c2c2c2] flex-col items-center w-full">
			<span className="text-2xl sm:text-4xl font-bold mb-5">
				Currency chart from USD to{' '}
				{currencyFrom?.value.split('-')[0] === 'USD' ? 'EUR' : currencyFrom?.value.split('-')[0]}
			</span>
			<LineChart
				data={data?.data}
				maxDomain={Number(data?.maxDomain)}
				minDomain={Number(data?.minDomain)}
			/>
		</div>
	);
};

export default Chart;
