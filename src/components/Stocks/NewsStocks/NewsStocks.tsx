import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { INews, newsMarketApi } from '../../../redux/store/reducers/API/newsMarket.api';
import { INewsList } from '../../../redux/store/reducers/API/newsMarket.api';
import NewsList from '../../NewsList/NewsList';

const NewsStocks = () => {
	const { name } = useParams();
	const { data, isFetching, isError } = newsMarketApi.useGetCompanyNewsQuery(name);

	const [newsList, setNewsList] = useState<INews[] | null>(null);

	useEffect(() => {
		if (data && data.feed?.length !== 0) {
			let copy: INewsList = {
				feed: data.feed,
			};
			if (copy && copy.feed) setNewsList(copy.feed.slice(0, 5));
		}
	}, [data, isFetching, isError]);

	if (isFetching) {
		return <div className="mt-10">loading...</div>;
	}

	if (isError) {
		return <></>;
	}
	return (
		<div className="mt-10">
			<div className="text-5xl font-bold">News {name ? name?.toUpperCase() : ''}</div>
			<NewsList isError={isError} isFetching={isFetching} newsList={newsList} />
		</div>
	);
};

export default NewsStocks;
