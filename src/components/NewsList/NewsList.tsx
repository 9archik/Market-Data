import { newsMarketApi, INewsList, INews } from '../../redux/store/reducers/API/newsMarket.api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export interface INewsListProp {
	newsList: INews[] | null | undefined;
	isFetching: any;
	isError: any;
}

const NewsList = ({ newsList, isFetching, isError }: INewsListProp) => {
	return (
		<ul className="flex flex-col gap-10 mt-10">
			{newsList &&
				newsList.map((el) => {
					return (
						<li className="flex items-center gap-14 pb-10 border-b-2 border-[#9b9b9b] ">
							<div>
								<img
									className="max-w-none object-scale-down h-[200px]"
									src={el.banner_image}
									alt=""
									height="200"
									width="260"
								/>
							</div>

							<div className="text-2xl flex flex-col gap-10 justify-center">
								<a
									target="_blank"
									href={el.url}
									className="text-[#033deb] font-bold hover: text-[#ff0000]">
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
