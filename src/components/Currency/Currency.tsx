import Select, { SingleValue } from 'react-select';
import swapSvg from '../../images/swap.svg';
import { useState } from 'react';
import LineChart from '../LineChart/LineChart';
import './style.css';
import { currencyDataApi } from '../../redux/store/reducers/API/currencyData.api';
import Chart from './Chart';
import { useEffect } from 'react';

export interface ICurrency {
	abbr: string;
	symbol: string;
	name: string;
	flag: string;
}

export interface IOption {
	value: string;
	label: string;
}

const currencyArray: ICurrency[] = [
	{ abbr: 'USD', name: 'United States dollar', symbol: '$', flag: 'šøš»' },
	{ abbr: 'RUB', name: 'Russian ruble', symbol: 'ā½', flag: 'š·šŗ' },
	{ abbr: 'GMD', name: 'dalasi', symbol: 'D', flag: 'š¬š²' },
	{ abbr: 'CVE', name: 'Cape Verdean escudo', symbol: 'Esc', flag: 'šØš»' },
	{ abbr: 'TMT', name: 'Turkmenistan manat', symbol: 'm', flag: 'š¹š²' },
	{ abbr: 'QAR', name: 'Qatari riyal', symbol: 'Ų±.Ł', flag: 'š¶š¦' },

	{ abbr: 'GEL', name: 'lari', symbol: 'ā¾', flag: 'š¬šŖ' },
	{ abbr: 'XAF', name: 'Central African CFA franc', symbol: 'Fr', flag: 'š¬š¶' },
	{ abbr: 'XOF', name: 'West African CFA franc', symbol: 'Fr', flag: 'šØš®' },
	{ abbr: 'BHD', name: 'Bahraini dinar', symbol: '.ŲÆ.ŲØ', flag: 'š§š­' },
	{ abbr: 'LYD', name: 'Libyan dinar', symbol: 'Ł.ŲÆ', flag: 'š±š¾' },
	{ abbr: 'DZD', name: 'Algerian dinar', symbol: 'ŲÆŲ¬', flag: 'šŖš­' },
	{ abbr: 'MAD', name: 'Moroccan dirham', symbol: 'DH', flag: 'šŖš­' },
	{ abbr: 'MRU', name: 'Mauritanian ouguiya', symbol: 'UM', flag: 'šŖš­' },
	{ abbr: 'ETB', name: 'Ethiopian birr', symbol: 'Br', flag: 'šŖš¹' },
	{ abbr: 'SSP', name: 'South Sudanese pound', symbol: 'Ā£', flag: 'šøšø' },
	{ abbr: 'EGP', name: 'Egyptian pound', symbol: 'EĀ£', flag: 'šµšø' },
	{ abbr: 'ILS', name: 'Israeli new shekel', symbol: 'āŖ', flag: 'šµšø' },
	{ abbr: 'JOD', name: 'Jordanian dinar', symbol: 'JD', flag: 'šµšø' },
	{ abbr: 'KGS', name: 'Kyrgyzstani som', symbol: 'Ń', flag: 'š°š¬' },
	{ abbr: 'MVR', name: 'Maldivian rufiyaa', symbol: '.Ž', flag: 'š²š»' },
	{ abbr: 'BDT', name: 'Bangladeshi taka', symbol: 'ą§³', flag: 'š§š©' },
	{ abbr: 'KYD', name: 'Cayman Islands dollar', symbol: '$', flag: 'š°š¾' },
	{ abbr: 'AFN', name: 'Afghan afghani', symbol: 'Ų', flag: 'š¦š«' },
	{ abbr: 'HTG', name: 'Haitian gourde', symbol: 'G', flag: 'š­š¹' },
	{ abbr: 'XCD', name: 'Eastern Caribbean dollar', symbol: '$', flag: 'š¦š¬' },
	{ abbr: 'VES', name: 'Venezuelan bolĆ­var soberano', symbol: 'Bs.S.', flag: 'š»šŖ' },
	{ abbr: 'CAD', name: 'Canadian dollar', symbol: '$', flag: 'šØš¦' },
	{ abbr: 'PYG', name: 'Paraguayan guaranĆ­', symbol: 'ā²', flag: 'šµš¾' },
	{ abbr: 'AUD', name: 'Australian dollar', symbol: '$', flag: 'š¹š»' },
	{ abbr: 'TVD', name: 'Tuvaluan dollar', symbol: '$', flag: 'š¹š»' },
	{ abbr: 'MMK', name: 'Burmese kyat', symbol: 'Ks', flag: 'š²š²' },
	{ abbr: 'CUC', name: 'Cuban convertible peso', symbol: '$', flag: 'šØšŗ' },
	{ abbr: 'CUP', name: 'Cuban peso', symbol: '$', flag: 'šØšŗ' },
	{ abbr: 'BSD', name: 'Bahamian dollar', symbol: '$', flag: 'š§šø' },
	{ abbr: 'UAH', name: 'Ukrainian hryvnia', symbol: 'ā“', flag: 'šŗš¦' },
	{ abbr: 'AWG', name: 'Aruban florin', symbol: 'Ę', flag: 'š¦š¼' },
	{ abbr: 'CHF', name: 'Swiss franc', symbol: 'Fr.', flag: 'šØš­' },
	{ abbr: 'KMF', name: 'Comorian franc', symbol: 'Fr', flag: 'š°š²' },
	{ abbr: 'SYP', name: 'Syrian pound', symbol: 'Ā£', flag: 'šøš¾' },
	{ abbr: 'BND', name: 'Brunei dollar', symbol: '$', flag: 'š§š³' },
	{ abbr: 'SGD', name: 'Singapore dollar', symbol: '$', flag: 'š§š³' },
	{ abbr: 'ANG', name: 'Netherlands Antillean guilder', symbol: 'Ę', flag: 'šØš¼' },
	{ abbr: 'GBP', name: 'British pound', symbol: 'Ā£', flag: 'š¬š¬' },
	{ abbr: 'GGP', name: 'Guernsey pound', symbol: 'Ā£', flag: 'š¬š¬' },
	{ abbr: 'LRD', name: 'Liberian dollar', symbol: '$', flag: 'š±š·' },
	{ abbr: 'JPY', name: 'Japanese yen', symbol: 'Ā„', flag: 'šÆšµ' },
	{ abbr: 'WST', name: 'Samoan tÄlÄ', symbol: 'T', flag: 'š¼šø' },
	{ abbr: 'SBD', name: 'Solomon Islands dollar', symbol: '$', flag: 'šøš§' },
	{ abbr: 'EUR', name: 'Euro', symbol: 'ā¬', flag: 'š·šŖ' },
	{ abbr: 'TND', name: 'Tunisian dinar', symbol: 'ŲÆ.ŲŖ', flag: 'š¹š³' },
	{ abbr: 'TWD', name: 'New Taiwan dollar', symbol: '$', flag: 'š¹š¼' },
	{ abbr: 'CDF', name: 'Congolese franc', symbol: 'FC', flag: 'šØš©' },
	{ abbr: 'MXN', name: 'Mexican peso', symbol: '$', flag: 'š²š½' },
	{ abbr: 'LAK', name: 'Lao kip', symbol: 'ā­', flag: 'š±š¦' },
	{ abbr: 'NAD', name: 'Namibian dollar', symbol: '$', flag: 'š³š¦' },
	{ abbr: 'ZAR', name: 'South African rand', symbol: 'R', flag: 'š³š¦' },
	{ abbr: 'SAR', name: 'Saudi riyal', symbol: 'Ų±.Ų³', flag: 'šøš¦' },
	{ abbr: 'DKK', name: 'Danish krone', symbol: 'kr', flag: 'š«š“' },
	{ abbr: 'FOK', name: 'Faroese krĆ³na', symbol: 'kr', flag: 'š«š“' },
	{ abbr: 'HKD', name: 'Hong Kong dollar', symbol: '$', flag: 'š­š°' },
	{ abbr: 'SRD', name: 'Surinamese dollar', symbol: '$', flag: 'šøš·' },
	{ abbr: 'MZN', name: 'Mozambican metical', symbol: 'MT', flag: 'š²šæ' },
	{ abbr: 'IQD', name: 'Iraqi dinar', symbol: 'Ų¹.ŲÆ', flag: 'š®š¶' },
	{ abbr: 'MNT', name: 'Mongolian tĆ¶grĆ¶g', symbol: 'ā®', flag: 'š²š³' },
	{ abbr: 'KES', name: 'Kenyan shilling', symbol: 'Sh', flag: 'š°šŖ' },
	{ abbr: 'KHR', name: 'Cambodian riel', symbol: 'į', flag: 'š°š­' },
	{ abbr: 'SOS', name: 'Somali shilling', symbol: 'Sh', flag: 'šøš“' },
	{ abbr: 'FKP', name: 'Falkland Islands pound', symbol: 'Ā£', flag: 'š«š°' },
	{ abbr: 'NZD', name: 'New Zealand dollar', symbol: '$', flag: 'šµš³' },
	{ abbr: 'NIO', name: 'Nicaraguan cĆ³rdoba', symbol: 'C$', flag: 'š³š®' },
	{ abbr: 'LKR', name: 'Sri Lankan rupee', symbol: 'Rs  ą¶»ą·', flag: 'š±š°' },
	{ abbr: 'NOK', name: 'Norwegian krone', symbol: 'kr', flag: 'š³š“' },
	{ abbr: 'SCR', name: 'Seychellois rupee', symbol: 'āØ', flag: 'šøšØ' },
	{ abbr: 'MGA', name: 'Malagasy ariary', symbol: 'Ar', flag: 'š²š¬' },
	{ abbr: 'NZD', name: 'New Zealand dollar', symbol: '$', flag: 'š³šŗ' },
	{ abbr: 'PKR', name: 'Pakistani rupee', symbol: 'āØ', flag: 'šµš°' },
	{ abbr: 'CZK', name: 'Czech koruna', symbol: 'KÄ', flag: 'šØšæ' },
	{ abbr: 'XPF', name: 'CFP franc', symbol: 'ā£', flag: 'š¼š«' },
	{ abbr: 'TZS', name: 'Tanzanian shilling', symbol: 'Sh', flag: 'š¹šæ' },
	{ abbr: 'STN', name: 'SĆ£o TomĆ© and PrĆ­ncipe dobra', symbol: 'Db', flag: 'šøš¹' },
	{ abbr: 'BTN', name: 'Bhutanese ngultrum', symbol: 'Nu.', flag: 'š§š¹' },
	{ abbr: 'INR', name: 'Indian rupee', symbol: 'ā¹', flag: 'š§š¹' },
	{ abbr: 'ALL', name: 'Albanian lek', symbol: 'L', flag: 'š¦š±' },
	{ abbr: 'BOB', name: 'Bolivian boliviano', symbol: 'Bs.', flag: 'š§š“' },
	{ abbr: 'GTQ', name: 'Guatemalan quetzal', symbol: 'Q', flag: 'š¬š¹' },
	{ abbr: 'HUF', name: 'Hungarian forint', symbol: 'Ft', flag: 'š­šŗ' },
	{ abbr: 'THB', name: 'Thai baht', symbol: 'ąøæ', flag: 'š¹š­' },
	{ abbr: 'TJS', name: 'Tajikistani somoni', symbol: 'ŠŠ', flag: 'š¹šÆ' },
	{ abbr: 'BAM', name: 'Bosnia and Herzegovina convertible mark', symbol: 'undefined', flag: 'š§š¦' },
	{ abbr: 'SDG', name: 'Sudanese pound', symbol: 'undefined', flag: 'šøš©' },
	{ abbr: 'PLN', name: 'Polish zÅoty', symbol: 'zÅ', flag: 'šµš±' },
	{ abbr: 'JEP', name: 'Jersey pound', symbol: 'Ā£', flag: 'šÆšŖ' },
	{ abbr: 'HNL', name: 'Honduran lempira', symbol: 'L', flag: 'š­š³' },
	{ abbr: 'MOP', name: 'Macanese pataca', symbol: 'P', flag: 'š²š“' },
	{ abbr: 'CRC', name: 'Costa Rican colĆ³n', symbol: 'ā”', flag: 'šØš·' },
	{ abbr: 'KID', name: 'Kiribati dollar', symbol: '$', flag: 'š°š®' },
	{ abbr: 'NGN', name: 'Nigerian naira', symbol: 'ā¦', flag: 'š³š¬' },
	{ abbr: 'DJF', name: 'Djiboutian franc', symbol: 'Fr', flag: 'š©šÆ' },
	{ abbr: 'IRR', name: 'Iranian rial', symbol: 'ļ·¼', flag: 'š®š·' },
	{ abbr: 'TRY', name: 'Turkish lira', symbol: 'āŗ', flag: 'š¹š·' },
	{ abbr: 'PGK', name: 'Papua New Guinean kina', symbol: 'K', flag: 'šµš¬' },
	{ abbr: 'BWP', name: 'Botswana pula', symbol: 'P', flag: 'š§š¼' },
	{ abbr: 'KRW', name: 'South Korean won', symbol: 'ā©', flag: 'š°š·' },
	{ abbr: 'RON', name: 'Romanian leu', symbol: 'lei', flag: 'š·š“' },
	{ abbr: 'VUV', name: 'Vanuatu vatu', symbol: 'Vt', flag: 'š»šŗ' },
	{ abbr: 'DOP', name: 'Dominican peso', symbol: '$', flag: 'š©š“' },
	{ abbr: 'LSL', name: 'Lesotho loti', symbol: 'L', flag: 'š±šø' },
	{ abbr: 'BRL', name: 'Brazilian real', symbol: 'R$', flag: 'š§š·' },
	{ abbr: 'RWF', name: 'Rwandan franc', symbol: 'Fr', flag: 'š·š¼' },
	{ abbr: 'IMP', name: 'Manx pound', symbol: 'Ā£', flag: 'š®š²' },
	{ abbr: 'BMD', name: 'Bermudian dollar', symbol: '$', flag: 'š§š²' },
	{ abbr: 'MUR', name: 'Mauritian rupee', symbol: 'āØ', flag: 'š²šŗ' },
	{ abbr: 'YER', name: 'Yemeni rial', symbol: 'ļ·¼', flag: 'š¾šŖ' },
	{ abbr: 'MDL', name: 'Moldovan leu', symbol: 'L', flag: 'š²š©' },
	{ abbr: 'UZS', name: 'Uzbekistani soŹ»m', symbol: "so'm", flag: 'šŗšæ' },
	{ abbr: 'AUD', name: 'Australian dollar', symbol: '$', flag: 'š³š·' },
	{ abbr: 'UGX', name: 'Ugandan shilling', symbol: 'Sh', flag: 'šŗš¬' },
	{ abbr: 'COP', name: 'Colombian peso', symbol: '$', flag: 'šØš“' },
	{ abbr: 'KZT', name: 'Kazakhstani tenge', symbol: 'āø', flag: 'š°šæ' },
	{ abbr: 'BGN', name: 'Bulgarian lev', symbol: 'Š»Š²', flag: 'š§š¬' },
	{ abbr: 'BZD', name: 'Belize dollar', symbol: '$', flag: 'š§šæ' },
	{ abbr: 'AED', name: 'United Arab Emirates dirham', symbol: 'ŲÆ.Ų„', flag: 'š¦šŖ' },
	{ abbr: 'PEN', name: 'Peruvian sol', symbol: 'S/ ', flag: 'šµšŖ' },
	{ abbr: 'OMR', name: 'Omani rial', symbol: 'Ų±.Ų¹.', flag: 'š“š²' },
	{ abbr: 'SHP', name: 'Saint Helena pound', symbol: 'Ā£', flag: 'š¬šø' },
	{ abbr: 'SEK', name: 'Swedish krona', symbol: 'kr', flag: 'šøšŖ' },
	{ abbr: 'UYU', name: 'Uruguayan peso', symbol: '$', flag: 'šŗš¾' },
	{ abbr: 'BYN', name: 'Belarusian ruble', symbol: 'Br', flag: 'š§š¾' },
	{ abbr: 'TOP', name: 'Tongan paŹ»anga', symbol: 'T$', flag: 'š¹š“' },
	{ abbr: 'CKD', name: 'Cook Islands dollar', symbol: '$', flag: 'šØš°' },
	{ abbr: 'NPR', name: 'Nepalese rupee', symbol: 'āØ', flag: 'š³šµ' },
	{ abbr: 'BBD', name: 'Barbadian dollar', symbol: '$', flag: 'š§š§' },
	{ abbr: 'MKD', name: 'denar', symbol: 'den', flag: 'š²š°' },
	{ abbr: 'PHP', name: 'Philippine peso', symbol: 'ā±', flag: 'šµš­' },
	{ abbr: 'BIF', name: 'Burundian franc', symbol: 'Fr', flag: 'š§š®' },
	{ abbr: 'GYD', name: 'Guyanese dollar', symbol: '$', flag: 'š¬š¾' },
	{ abbr: 'ZMW', name: 'Zambian kwacha', symbol: 'ZK', flag: 'šæš²' },
	{ abbr: 'SLL', name: 'Sierra Leonean leone', symbol: 'Le', flag: 'šøš±' },
	{ abbr: 'LBP', name: 'Lebanese pound', symbol: 'Ł.Ł', flag: 'š±š§' },
	{ abbr: 'ISK', name: 'Icelandic krĆ³na', symbol: 'kr', flag: 'š®šø' },
	{ abbr: 'JMD', name: 'Jamaican dollar', symbol: '$', flag: 'šÆš²' },
	{ abbr: 'MYR', name: 'Malaysian ringgit', symbol: 'RM', flag: 'š²š¾' },
	{ abbr: 'GNF', name: 'Guinean franc', symbol: 'Fr', flag: 'š¬š³' },
	{ abbr: 'MWK', name: 'Malawian kwacha', symbol: 'MK', flag: 'š²š¼' },
	{ abbr: 'VND', name: 'Vietnamese Äį»ng', symbol: 'ā«', flag: 'š»š³' },
	{ abbr: 'ZWL', name: 'Zimbabwean dollar', symbol: '$', flag: 'šæš¼' },
	{ abbr: 'IDR', name: 'Indonesian rupiah', symbol: 'Rp', flag: 'š®š©' },
	{ abbr: 'AOA', name: 'Angolan kwanza', symbol: 'Kz', flag: 'š¦š“' },
	{ abbr: 'KPW', name: 'North Korean won', symbol: 'ā©', flag: 'š°šµ' },
	{ abbr: 'FJD', name: 'Fijian dollar', symbol: '$', flag: 'š«šÆ' },
	{ abbr: 'GHS', name: 'Ghanaian cedi', symbol: 'āµ', flag: 'š¬š­' },
	{ abbr: 'ERN', name: 'Eritrean nakfa', symbol: 'Nfk', flag: 'šŖš·' },
	{ abbr: 'AMD', name: 'Armenian dram', symbol: 'Ö', flag: 'š¦š²' },
	{ abbr: 'CLP', name: 'Chilean peso', symbol: '$', flag: 'šØš±' },
	{ abbr: 'TTD', name: 'Trinidad and Tobago dollar', symbol: '$', flag: 'š¹š¹' },
	{ abbr: 'ARS', name: 'Argentine peso', symbol: '$', flag: 'š¦š·' },
	{ abbr: 'KWD', name: 'Kuwaiti dinar', symbol: 'ŲÆ.Ł', flag: 'š°š¼' },
	{ abbr: 'GIP', name: 'Gibraltar pound', symbol: 'Ā£', flag: 'š¬š®' },
	{ abbr: 'PAB', name: 'Panamanian balboa', symbol: 'B/.', flag: 'šµš¦' },
	{ abbr: 'CNY', name: 'Chinese yuan', symbol: 'Ā„', flag: 'šØš³' },
	{ abbr: 'SZL', name: 'Swazi lilangeni', symbol: 'L', flag: 'šøšæ' },
	{ abbr: 'AZN', name: 'Azerbaijani manat', symbol: 'ā¼', flag: 'š¦šæ' },
	{ abbr: 'RSD', name: 'Serbian dinar', symbol: 'Š“ŠøŠ½.', flag: 'š·šø' },
];

const options = currencyArray.map((el) => {
	let value = el.abbr + '-' + el.name;
	let label = el.abbr + '-' + el.name;
	return { value: value, label: label };
});
const Currency = () => {
	const [skip, setSkip] = useState<boolean>(true);

	const [currencyFrom, setCurrencyFrom] = useState<IOption | SingleValue<IOption>>(options[0]);

	const [currencyTo, setCurrencyTo] = useState<IOption | SingleValue<IOption>>(options[1]);

	const [valueFrom, setValueFrom] = useState<number | string>('');

	const [valueTo, setValueTo] = useState<number | string>('');

	const [exchangeRate, setExchangeRate] = useState<number | undefined>(0);

	const onClickSwap = () => {
		setCurrencyTo(currencyFrom);
		setCurrencyFrom(currencyTo);
		setExchangeRate(Number(exchangeTo) / Number(exchangeFrom));
		setSkip(false);
	};

	const onChangeValueTo = (value: string) => {
		setValueTo(value);

		if (exchangeRate) setValueFrom(`${Number(value) / exchangeRate}`);
		setSkip(true);
	};

	const onChangeValueFrom = (value: string) => {
		setValueFrom(value);
		if (exchangeRate) setValueTo(`${Number(value) * exchangeRate}`);
		setSkip(true);
	};

	const {
		data: exchangeFrom,
		isFetching: isFetchingFrom,
		isError: isErrorFrom,
	} = currencyDataApi.useGetConvertDataQuery(
		{
			from: `${currencyFrom?.value.split('-')[0]}`,
			to: `USD`,
		},
		{
			skip: skip,
		},
	);

	const {
		data: exchangeTo,
		isFetching: isFetchingTo,
		isError: isErrorTo,
	} = currencyDataApi.useGetConvertDataQuery(
		{
			from: `${currencyTo?.value.split('-')[0]}`,
			to: `USD`,
		},
		{
			skip: skip,
		},
	);

	useEffect(() => {
		setExchangeRate(Number(exchangeFrom) / Number(exchangeTo));
	}, [exchangeTo, exchangeFrom]);

	const { data, isFetching, isError } =
		currencyFrom?.value.split('-')[0] !== 'USD'
			? currencyDataApi.useGetCurrencyChartDataQuery(
					{
						from: `USD`,
						to: `${currencyFrom?.value.split('-')[0]}`,
						type: 'line',
						exchangeRate: exchangeRate !== undefined ? exchangeRate : 0,
						interval: 'DAILY',
					},
					{
						skip: skip,
					},
			  )
			: currencyDataApi.useGetCurrencyChartDataQuery(
					{
						from: `USD`,
						to: `EUR`,
						type: 'line',
						exchangeRate: exchangeRate !== undefined ? exchangeRate : 0,
						interval: 'DAILY',
					},
					{
						skip: skip,
					},
			  );

	useEffect(() => {
		setSkip(false);
	});

	useEffect(() => {
		if (exchangeRate) {
			setValueTo(`${Number(valueFrom) * exchangeRate}`);
		}
	}, [exchangeRate]);

	return (
		<div className="container">
			<div className="mt-10 flex gap-5 flex-col items-center justify-between md:flex-row">
				<Select
					onChange={(e) => {
						setCurrencyFrom(e);
						setSkip(false);
					}}
					value={currencyFrom}
					options={options}
					isSearchable
					classNamePrefix={'select'}
					className={'select-container'}
				/>

				<button onClick={() => onClickSwap()}>
					<img className="rotate-90 md:rotate-0" src={swapSvg} width="32" height="32" />
				</button>

				<Select
					classNamePrefix={'select'}
					onChange={(e) => {
						setCurrencyTo(e);
						setSkip(false);
					}}
					value={currencyTo}
					options={options}
					className={'select-container'}
					isSearchable
				/>
			</div>
			<div className="input__currency-value mt-10 flex  gap-5 md:gap-20 justify-between">
				<input
					value={valueFrom}
					placeholder={`${currencyFrom?.value.split('-')[0]}`}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValueFrom(e.target.value)}
					type="number"
				/>
				<input
					value={valueTo}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValueTo(e.target.value)}
					type="number"
					placeholder={`${currencyTo?.value.split('-')[0]}`}
				/>
			</div>
			<div className="flex text-center justify-center text-2xl sm:text-4xl my-10 font-bold">
				{`${Math.round(Number(valueFrom) * 100) / 100} ${currencyFrom?.value.split('-')[1]} = ${
					Math.round(Number(valueTo) * 100) / 100
				} ${currencyTo?.value.split('-')[1]}`}
			</div>
			{!isFetching &&
				data &&
				data.data.length > 0 &&
				(!isError && data.data.length === 0 ? (
					<Chart data={data} currencyFrom={currencyFrom} currencyTo={currencyTo} />
				) : (
					<div className="flex justify-center text-2xl font-bold" >Chart Error</div>
				))}
		</div>
	);
};

export default Currency;
