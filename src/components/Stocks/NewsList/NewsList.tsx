import { newsMarketApi, INewsList, INews } from '../../../redux/store/reducers/API/newsMarket.api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const NewsList = () => {
	const { name } = useParams();
	const { data, isFetching, isError } = newsMarketApi.useGetCompanyNewsQuery(name);

	const [newsList, setNewsList] = useState<INews[] | null>(null);

	useEffect(() => {
		if (data && data.feed?.length !== 0) {
			let copy: INewsList = {
				feed: data.feed,
			};
			if(copy && copy.feed)
			setNewsList(copy.feed.slice(0,5));
		}
	}, [data, isFetching, isError]);

	console.log(newsList)

	return (
		<ul className="flex flex-col gap-10 mt-10">
			{newsList &&
				newsList.map((el) => {
					return (
						<li className="flex gap-14 pb-10 border-b-2 border-[#9b9b9b] ">
							<div>
								<img
									className="max-w-none h-[200px]"
									src={el.banner_image}
									alt=""
									height="200"
									width="260"
								/>
							</div>

							<div className="text-2xl flex flex-col gap-10 justify-center">
								<a target="_blank" href={el.url} className="text-[#033deb] font-bold hover: text-[#ff0000]">
									{el.title}
								</a>
								<span className="">{el.summary}</span>
							</div>
						</li>
					);
				})}
		</ul>
	);
};

export default NewsList;
