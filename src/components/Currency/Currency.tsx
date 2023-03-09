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
	{ abbr: 'USD', name: 'United States dollar', symbol: '$', flag: '🇸🇻' },
	{ abbr: 'RUB', name: 'Russian ruble', symbol: '₽', flag: '🇷🇺' },
	{ abbr: 'GMD', name: 'dalasi', symbol: 'D', flag: '🇬🇲' },
	{ abbr: 'CVE', name: 'Cape Verdean escudo', symbol: 'Esc', flag: '🇨🇻' },
	{ abbr: 'TMT', name: 'Turkmenistan manat', symbol: 'm', flag: '🇹🇲' },
	{ abbr: 'QAR', name: 'Qatari riyal', symbol: 'ر.ق', flag: '🇶🇦' },

	{ abbr: 'GEL', name: 'lari', symbol: '₾', flag: '🇬🇪' },
	{ abbr: 'XAF', name: 'Central African CFA franc', symbol: 'Fr', flag: '🇬🇶' },
	{ abbr: 'XOF', name: 'West African CFA franc', symbol: 'Fr', flag: '🇨🇮' },
	{ abbr: 'BHD', name: 'Bahraini dinar', symbol: '.د.ب', flag: '🇧🇭' },
	{ abbr: 'LYD', name: 'Libyan dinar', symbol: 'ل.د', flag: '🇱🇾' },
	{ abbr: 'DZD', name: 'Algerian dinar', symbol: 'دج', flag: '🇪🇭' },
	{ abbr: 'MAD', name: 'Moroccan dirham', symbol: 'DH', flag: '🇪🇭' },
	{ abbr: 'MRU', name: 'Mauritanian ouguiya', symbol: 'UM', flag: '🇪🇭' },
	{ abbr: 'ETB', name: 'Ethiopian birr', symbol: 'Br', flag: '🇪🇹' },
	{ abbr: 'SSP', name: 'South Sudanese pound', symbol: '£', flag: '🇸🇸' },
	{ abbr: 'EGP', name: 'Egyptian pound', symbol: 'E£', flag: '🇵🇸' },
	{ abbr: 'ILS', name: 'Israeli new shekel', symbol: '₪', flag: '🇵🇸' },
	{ abbr: 'JOD', name: 'Jordanian dinar', symbol: 'JD', flag: '🇵🇸' },
	{ abbr: 'KGS', name: 'Kyrgyzstani som', symbol: 'с', flag: '🇰🇬' },
	{ abbr: 'MVR', name: 'Maldivian rufiyaa', symbol: '.ރ', flag: '🇲🇻' },
	{ abbr: 'BDT', name: 'Bangladeshi taka', symbol: '৳', flag: '🇧🇩' },
	{ abbr: 'KYD', name: 'Cayman Islands dollar', symbol: '$', flag: '🇰🇾' },
	{ abbr: 'AFN', name: 'Afghan afghani', symbol: '؋', flag: '🇦🇫' },
	{ abbr: 'HTG', name: 'Haitian gourde', symbol: 'G', flag: '🇭🇹' },
	{ abbr: 'XCD', name: 'Eastern Caribbean dollar', symbol: '$', flag: '🇦🇬' },
	{ abbr: 'VES', name: 'Venezuelan bolívar soberano', symbol: 'Bs.S.', flag: '🇻🇪' },
	{ abbr: 'CAD', name: 'Canadian dollar', symbol: '$', flag: '🇨🇦' },
	{ abbr: 'PYG', name: 'Paraguayan guaraní', symbol: '₲', flag: '🇵🇾' },
	{ abbr: 'AUD', name: 'Australian dollar', symbol: '$', flag: '🇹🇻' },
	{ abbr: 'TVD', name: 'Tuvaluan dollar', symbol: '$', flag: '🇹🇻' },
	{ abbr: 'MMK', name: 'Burmese kyat', symbol: 'Ks', flag: '🇲🇲' },
	{ abbr: 'CUC', name: 'Cuban convertible peso', symbol: '$', flag: '🇨🇺' },
	{ abbr: 'CUP', name: 'Cuban peso', symbol: '$', flag: '🇨🇺' },
	{ abbr: 'BSD', name: 'Bahamian dollar', symbol: '$', flag: '🇧🇸' },
	{ abbr: 'UAH', name: 'Ukrainian hryvnia', symbol: '₴', flag: '🇺🇦' },
	{ abbr: 'AWG', name: 'Aruban florin', symbol: 'ƒ', flag: '🇦🇼' },
	{ abbr: 'CHF', name: 'Swiss franc', symbol: 'Fr.', flag: '🇨🇭' },
	{ abbr: 'KMF', name: 'Comorian franc', symbol: 'Fr', flag: '🇰🇲' },
	{ abbr: 'SYP', name: 'Syrian pound', symbol: '£', flag: '🇸🇾' },
	{ abbr: 'BND', name: 'Brunei dollar', symbol: '$', flag: '🇧🇳' },
	{ abbr: 'SGD', name: 'Singapore dollar', symbol: '$', flag: '🇧🇳' },
	{ abbr: 'ANG', name: 'Netherlands Antillean guilder', symbol: 'ƒ', flag: '🇨🇼' },
	{ abbr: 'GBP', name: 'British pound', symbol: '£', flag: '🇬🇬' },
	{ abbr: 'GGP', name: 'Guernsey pound', symbol: '£', flag: '🇬🇬' },
	{ abbr: 'LRD', name: 'Liberian dollar', symbol: '$', flag: '🇱🇷' },
	{ abbr: 'JPY', name: 'Japanese yen', symbol: '¥', flag: '🇯🇵' },
	{ abbr: 'WST', name: 'Samoan tālā', symbol: 'T', flag: '🇼🇸' },
	{ abbr: 'SBD', name: 'Solomon Islands dollar', symbol: '$', flag: '🇸🇧' },
	{ abbr: 'EUR', name: 'Euro', symbol: '€', flag: '🇷🇪' },
	{ abbr: 'TND', name: 'Tunisian dinar', symbol: 'د.ت', flag: '🇹🇳' },
	{ abbr: 'TWD', name: 'New Taiwan dollar', symbol: '$', flag: '🇹🇼' },
	{ abbr: 'CDF', name: 'Congolese franc', symbol: 'FC', flag: '🇨🇩' },
	{ abbr: 'MXN', name: 'Mexican peso', symbol: '$', flag: '🇲🇽' },
	{ abbr: 'LAK', name: 'Lao kip', symbol: '₭', flag: '🇱🇦' },
	{ abbr: 'NAD', name: 'Namibian dollar', symbol: '$', flag: '🇳🇦' },
	{ abbr: 'ZAR', name: 'South African rand', symbol: 'R', flag: '🇳🇦' },
	{ abbr: 'SAR', name: 'Saudi riyal', symbol: 'ر.س', flag: '🇸🇦' },
	{ abbr: 'DKK', name: 'Danish krone', symbol: 'kr', flag: '🇫🇴' },
	{ abbr: 'FOK', name: 'Faroese króna', symbol: 'kr', flag: '🇫🇴' },
	{ abbr: 'HKD', name: 'Hong Kong dollar', symbol: '$', flag: '🇭🇰' },
	{ abbr: 'SRD', name: 'Surinamese dollar', symbol: '$', flag: '🇸🇷' },
	{ abbr: 'MZN', name: 'Mozambican metical', symbol: 'MT', flag: '🇲🇿' },
	{ abbr: 'IQD', name: 'Iraqi dinar', symbol: 'ع.د', flag: '🇮🇶' },
	{ abbr: 'MNT', name: 'Mongolian tögrög', symbol: '₮', flag: '🇲🇳' },
	{ abbr: 'KES', name: 'Kenyan shilling', symbol: 'Sh', flag: '🇰🇪' },
	{ abbr: 'KHR', name: 'Cambodian riel', symbol: '៛', flag: '🇰🇭' },
	{ abbr: 'SOS', name: 'Somali shilling', symbol: 'Sh', flag: '🇸🇴' },
	{ abbr: 'FKP', name: 'Falkland Islands pound', symbol: '£', flag: '🇫🇰' },
	{ abbr: 'NZD', name: 'New Zealand dollar', symbol: '$', flag: '🇵🇳' },
	{ abbr: 'NIO', name: 'Nicaraguan córdoba', symbol: 'C$', flag: '🇳🇮' },
	{ abbr: 'LKR', name: 'Sri Lankan rupee', symbol: 'Rs  රු', flag: '🇱🇰' },
	{ abbr: 'NOK', name: 'Norwegian krone', symbol: 'kr', flag: '🇳🇴' },
	{ abbr: 'SCR', name: 'Seychellois rupee', symbol: '₨', flag: '🇸🇨' },
	{ abbr: 'MGA', name: 'Malagasy ariary', symbol: 'Ar', flag: '🇲🇬' },
	{ abbr: 'NZD', name: 'New Zealand dollar', symbol: '$', flag: '🇳🇺' },
	{ abbr: 'PKR', name: 'Pakistani rupee', symbol: '₨', flag: '🇵🇰' },
	{ abbr: 'CZK', name: 'Czech koruna', symbol: 'Kč', flag: '🇨🇿' },
	{ abbr: 'XPF', name: 'CFP franc', symbol: '₣', flag: '🇼🇫' },
	{ abbr: 'TZS', name: 'Tanzanian shilling', symbol: 'Sh', flag: '🇹🇿' },
	{ abbr: 'STN', name: 'São Tomé and Príncipe dobra', symbol: 'Db', flag: '🇸🇹' },
	{ abbr: 'BTN', name: 'Bhutanese ngultrum', symbol: 'Nu.', flag: '🇧🇹' },
	{ abbr: 'INR', name: 'Indian rupee', symbol: '₹', flag: '🇧🇹' },
	{ abbr: 'ALL', name: 'Albanian lek', symbol: 'L', flag: '🇦🇱' },
	{ abbr: 'BOB', name: 'Bolivian boliviano', symbol: 'Bs.', flag: '🇧🇴' },
	{ abbr: 'GTQ', name: 'Guatemalan quetzal', symbol: 'Q', flag: '🇬🇹' },
	{ abbr: 'HUF', name: 'Hungarian forint', symbol: 'Ft', flag: '🇭🇺' },
	{ abbr: 'THB', name: 'Thai baht', symbol: '฿', flag: '🇹🇭' },
	{ abbr: 'TJS', name: 'Tajikistani somoni', symbol: 'ЅМ', flag: '🇹🇯' },
	{ abbr: 'BAM', name: 'Bosnia and Herzegovina convertible mark', symbol: 'undefined', flag: '🇧🇦' },
	{ abbr: 'SDG', name: 'Sudanese pound', symbol: 'undefined', flag: '🇸🇩' },
	{ abbr: 'PLN', name: 'Polish złoty', symbol: 'zł', flag: '🇵🇱' },
	{ abbr: 'JEP', name: 'Jersey pound', symbol: '£', flag: '🇯🇪' },
	{ abbr: 'HNL', name: 'Honduran lempira', symbol: 'L', flag: '🇭🇳' },
	{ abbr: 'MOP', name: 'Macanese pataca', symbol: 'P', flag: '🇲🇴' },
	{ abbr: 'CRC', name: 'Costa Rican colón', symbol: '₡', flag: '🇨🇷' },
	{ abbr: 'KID', name: 'Kiribati dollar', symbol: '$', flag: '🇰🇮' },
	{ abbr: 'NGN', name: 'Nigerian naira', symbol: '₦', flag: '🇳🇬' },
	{ abbr: 'DJF', name: 'Djiboutian franc', symbol: 'Fr', flag: '🇩🇯' },
	{ abbr: 'IRR', name: 'Iranian rial', symbol: '﷼', flag: '🇮🇷' },
	{ abbr: 'TRY', name: 'Turkish lira', symbol: '₺', flag: '🇹🇷' },
	{ abbr: 'PGK', name: 'Papua New Guinean kina', symbol: 'K', flag: '🇵🇬' },
	{ abbr: 'BWP', name: 'Botswana pula', symbol: 'P', flag: '🇧🇼' },
	{ abbr: 'KRW', name: 'South Korean won', symbol: '₩', flag: '🇰🇷' },
	{ abbr: 'RON', name: 'Romanian leu', symbol: 'lei', flag: '🇷🇴' },
	{ abbr: 'VUV', name: 'Vanuatu vatu', symbol: 'Vt', flag: '🇻🇺' },
	{ abbr: 'DOP', name: 'Dominican peso', symbol: '$', flag: '🇩🇴' },
	{ abbr: 'LSL', name: 'Lesotho loti', symbol: 'L', flag: '🇱🇸' },
	{ abbr: 'BRL', name: 'Brazilian real', symbol: 'R$', flag: '🇧🇷' },
	{ abbr: 'RWF', name: 'Rwandan franc', symbol: 'Fr', flag: '🇷🇼' },
	{ abbr: 'IMP', name: 'Manx pound', symbol: '£', flag: '🇮🇲' },
	{ abbr: 'BMD', name: 'Bermudian dollar', symbol: '$', flag: '🇧🇲' },
	{ abbr: 'MUR', name: 'Mauritian rupee', symbol: '₨', flag: '🇲🇺' },
	{ abbr: 'YER', name: 'Yemeni rial', symbol: '﷼', flag: '🇾🇪' },
	{ abbr: 'MDL', name: 'Moldovan leu', symbol: 'L', flag: '🇲🇩' },
	{ abbr: 'UZS', name: 'Uzbekistani soʻm', symbol: "so'm", flag: '🇺🇿' },
	{ abbr: 'AUD', name: 'Australian dollar', symbol: '$', flag: '🇳🇷' },
	{ abbr: 'UGX', name: 'Ugandan shilling', symbol: 'Sh', flag: '🇺🇬' },
	{ abbr: 'COP', name: 'Colombian peso', symbol: '$', flag: '🇨🇴' },
	{ abbr: 'KZT', name: 'Kazakhstani tenge', symbol: '₸', flag: '🇰🇿' },
	{ abbr: 'BGN', name: 'Bulgarian lev', symbol: 'лв', flag: '🇧🇬' },
	{ abbr: 'BZD', name: 'Belize dollar', symbol: '$', flag: '🇧🇿' },
	{ abbr: 'AED', name: 'United Arab Emirates dirham', symbol: 'د.إ', flag: '🇦🇪' },
	{ abbr: 'PEN', name: 'Peruvian sol', symbol: 'S/ ', flag: '🇵🇪' },
	{ abbr: 'OMR', name: 'Omani rial', symbol: 'ر.ع.', flag: '🇴🇲' },
	{ abbr: 'SHP', name: 'Saint Helena pound', symbol: '£', flag: '🇬🇸' },
	{ abbr: 'SEK', name: 'Swedish krona', symbol: 'kr', flag: '🇸🇪' },
	{ abbr: 'UYU', name: 'Uruguayan peso', symbol: '$', flag: '🇺🇾' },
	{ abbr: 'BYN', name: 'Belarusian ruble', symbol: 'Br', flag: '🇧🇾' },
	{ abbr: 'TOP', name: 'Tongan paʻanga', symbol: 'T$', flag: '🇹🇴' },
	{ abbr: 'CKD', name: 'Cook Islands dollar', symbol: '$', flag: '🇨🇰' },
	{ abbr: 'NPR', name: 'Nepalese rupee', symbol: '₨', flag: '🇳🇵' },
	{ abbr: 'BBD', name: 'Barbadian dollar', symbol: '$', flag: '🇧🇧' },
	{ abbr: 'MKD', name: 'denar', symbol: 'den', flag: '🇲🇰' },
	{ abbr: 'PHP', name: 'Philippine peso', symbol: '₱', flag: '🇵🇭' },
	{ abbr: 'BIF', name: 'Burundian franc', symbol: 'Fr', flag: '🇧🇮' },
	{ abbr: 'GYD', name: 'Guyanese dollar', symbol: '$', flag: '🇬🇾' },
	{ abbr: 'ZMW', name: 'Zambian kwacha', symbol: 'ZK', flag: '🇿🇲' },
	{ abbr: 'SLL', name: 'Sierra Leonean leone', symbol: 'Le', flag: '🇸🇱' },
	{ abbr: 'LBP', name: 'Lebanese pound', symbol: 'ل.ل', flag: '🇱🇧' },
	{ abbr: 'ISK', name: 'Icelandic króna', symbol: 'kr', flag: '🇮🇸' },
	{ abbr: 'JMD', name: 'Jamaican dollar', symbol: '$', flag: '🇯🇲' },
	{ abbr: 'MYR', name: 'Malaysian ringgit', symbol: 'RM', flag: '🇲🇾' },
	{ abbr: 'GNF', name: 'Guinean franc', symbol: 'Fr', flag: '🇬🇳' },
	{ abbr: 'MWK', name: 'Malawian kwacha', symbol: 'MK', flag: '🇲🇼' },
	{ abbr: 'VND', name: 'Vietnamese đồng', symbol: '₫', flag: '🇻🇳' },
	{ abbr: 'ZWL', name: 'Zimbabwean dollar', symbol: '$', flag: '🇿🇼' },
	{ abbr: 'IDR', name: 'Indonesian rupiah', symbol: 'Rp', flag: '🇮🇩' },
	{ abbr: 'AOA', name: 'Angolan kwanza', symbol: 'Kz', flag: '🇦🇴' },
	{ abbr: 'KPW', name: 'North Korean won', symbol: '₩', flag: '🇰🇵' },
	{ abbr: 'FJD', name: 'Fijian dollar', symbol: '$', flag: '🇫🇯' },
	{ abbr: 'GHS', name: 'Ghanaian cedi', symbol: '₵', flag: '🇬🇭' },
	{ abbr: 'ERN', name: 'Eritrean nakfa', symbol: 'Nfk', flag: '🇪🇷' },
	{ abbr: 'AMD', name: 'Armenian dram', symbol: '֏', flag: '🇦🇲' },
	{ abbr: 'CLP', name: 'Chilean peso', symbol: '$', flag: '🇨🇱' },
	{ abbr: 'TTD', name: 'Trinidad and Tobago dollar', symbol: '$', flag: '🇹🇹' },
	{ abbr: 'ARS', name: 'Argentine peso', symbol: '$', flag: '🇦🇷' },
	{ abbr: 'KWD', name: 'Kuwaiti dinar', symbol: 'د.ك', flag: '🇰🇼' },
	{ abbr: 'GIP', name: 'Gibraltar pound', symbol: '£', flag: '🇬🇮' },
	{ abbr: 'PAB', name: 'Panamanian balboa', symbol: 'B/.', flag: '🇵🇦' },
	{ abbr: 'CNY', name: 'Chinese yuan', symbol: '¥', flag: '🇨🇳' },
	{ abbr: 'SZL', name: 'Swazi lilangeni', symbol: 'L', flag: '🇸🇿' },
	{ abbr: 'AZN', name: 'Azerbaijani manat', symbol: '₼', flag: '🇦🇿' },
	{ abbr: 'RSD', name: 'Serbian dinar', symbol: 'дин.', flag: '🇷🇸' },
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
