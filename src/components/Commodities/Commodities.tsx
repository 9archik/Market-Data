import { commoditiesApi } from '../../redux/store/reducers/API/commoditiesData.api';
import LineChart from '../LineChart/LineChart';

export interface ICommoditiesProp
{
    name: string
}

const CommoditieItem = ({name}: ICommoditiesProp) => {
	const {
		data: itemData,
		isFetching: itemFetching,
		isError: itemError,
	} = commoditiesApi.useGetCommoditiesDataQuery({
		function: name,
	});

	if (itemFetching) {
		return <div className="mt-10">Loading...</div>;
	}
	if (!itemData || itemError) {
		return <>Error</>;
	}

	return (
		<div className="flex font-bold flex-col my-5 gap-5">
			<span className="sm:text-4xl text-2xl">{itemData?.name}</span>
			<span className="sm:text-4xl text-2xl">Unit: {itemData?.unit}</span>
			<LineChart
				data={itemData?.data}
				minDomain={itemData?.minDomain}
				maxDomain={itemData?.maxDomain}
			/>
		</div>
	);
};

export default CommoditieItem;
