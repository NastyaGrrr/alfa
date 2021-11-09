import { AxiosResponse } from 'axios';
import StatusCodes from 'http-status-codes';
import { getApiInstance } from './_apiService';
import { ListType } from "../store/list/types";
import {notification} from "antd";
import ListItemModel from "../models/carrierModel";

export enum EListEndpoints {
	GET_LIST = '/images',
}

const listService = {
	fetchList: async (): Promise<ListType[]> => {
		try {
			const resp: AxiosResponse<{ message: string[] }> = await getApiInstance().get(EListEndpoints.GET_LIST);
			if (resp.status !== StatusCodes.OK) {
				notification.error({
					message: 'Не удалось получить данные',
					description:
						'Попробуйте позднее',
				});
				return  [] as ListType[];
			}
			return resp.data?.message.map(item => ListItemModel.fromAPI(item));
		} catch (err) {
			return [];
		}
	},
};

export default listService;
