import { commoditiesApi } from '../../redux/store/reducers/API/commoditiesData.api';
import CommoditieItem from './Commodities';

const CommoditiesList: string[] = ['WTI', 'BRENT', 'natural_gas'];
const Commodities = () => {
	return (
		<>
			<div className="container">
				{CommoditiesList.map((el) => {
					return (
						<>
							<CommoditieItem name={el} />
						</>
					);
				})}
			</div>
		</>
	);
};

export default Commodities;
