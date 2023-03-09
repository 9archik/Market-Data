import { useState, useEffect } from 'react';
import NewsList from '../components/NewsList/NewsList';
import { INews, newsMarketApi } from '../redux/store/reducers/API/newsMarket.api';
const HeadPage = () => {
	const {
		data: newsData,
		isFetching: newsFetching,
		isError: newsError,
	} = newsMarketApi.useGetNewsQuery({
		sort: 'RELEVANCE',
	});

	const [newsList, setNewsList] = useState<INews[] | undefined>([])

	useEffect(() => {
		if (newsData) setNewsList(()=>newsData.slice(0, 10));
	}, [newsData]);

    console.log(newsData);

	if(newsFetching)
	{
	    return <div className="text-3xl mt-5 pb-5">Loading</div>;
	}

	if (!newsData) {
		return <div className="text-3xl mt-5 pb-5">Error</div>;
	}
	return (
		<div className="container">  
            <div className="text-3xl mt-5 pb-5 border-[#cacaca] border-b-[1px] font-bold">Latest news:</div>
			<NewsList newsList={newsList} isFetching={newsFetching} isError={newsError} />
		</div>
	);
};
export default HeadPage;
