import { useQueryClient, useMutation } from '@tanstack/react-query';
import { customAxios, FRUITS } from '../api/customAxios';

export default function useDeleteFruit() {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: id => {
			console.log('===== mutationFn =====');
			return customAxios.delete(`${FRUITS}/${id}`);
		},
		onMutate: variables => {
			console.log('===== onMutate =====');
			console.log('variables : ', variables);
			return { id: variables };
		},
		onError: (error, variables, context) => {
			// 에러가 났을때,
			console.log('===== onError =====');
			console.log('error : ', error);
			console.log('variables : ', variables);
			console.log('context : ', context);
		},
		onSuccess: (data, variables, context) => {
			console.log('===== onSuccess =====');
			// data는 mutationFn이 return한 값
			console.log('data : ', data);
			// variables는 mutationFn의 id값이다.
			console.log('variables : ', variables);
			// context는 onMutate에서 내려온 return 값이 담긴다.
			console.log('context : ', context);
			// querkey: : 'fruits'는 다시 get 요청
			queryClient.invalidateQueries({ queryKey: ['fruits'] });
		},
		onSettled: (data, error, variables, context) => {
			console.log('===== onSettled =====');
			console.log('제일 마지막에 무조건 진행');
			console.log('data : ', data);
			console.log('error : ', error);
			console.log('variables : ', variables);
			console.log('context : ', context);
		},
	});
	return { deleteMutation };
}
