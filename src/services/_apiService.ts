import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const URL = 'https://dog.ceo/api/breed/hound';

export const getApiInstance = (): AxiosInstance => {
	const apiInstance: AxiosInstance = axios.create({
		baseURL: process.env.REACT_API,
	});
	apiInstance.defaults.baseURL = URL;
	apiInstance.defaults.headers.get.Accept = 'application/json';
	apiInstance.interceptors.response.use(
		(response: AxiosResponse) => response,
		(error: AxiosError) => error.response,
	);

	return apiInstance;
};
