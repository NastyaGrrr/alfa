import { v4 } from 'uuid';

const ListItemModel = {
	fromAPI(item: string) {
		return {
			id: v4(),
			isLike: false,
		image: item};
	},
};

export default ListItemModel;
