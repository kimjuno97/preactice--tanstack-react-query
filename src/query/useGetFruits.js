import { useQuery } from '@tanstack/react-query';
import { customAxios, FRUITS } from '../api/customAxios';

export default function useGetFruits() {
	const { isLoading, error, data, isFetching } = useQuery(
		['fruits'],
		async () => {
			console.log('===== fruit 전체데이터 get 요청 =====');
			const { data } = await customAxios.get(FRUITS);
			return data;
		}
	);

	return { isLoading, error, data, isFetching };
}
