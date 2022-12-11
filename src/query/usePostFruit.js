import { useQueryClient, useMutation } from '@tanstack/react-query';
import { customAxios, FRUITS } from '../api/customAxios';

// useMutation은 동작 순서
// onMutate => mutationFn => 성공 여부에 따라 (onError, onSuccess)
// => onSettled 이다.

export default function usePostFruit() {
	const queryClient = useQueryClient();

	const postMutation = useMutation({
		mutationFn: fruit => {
			console.log('====== mutationFn ======');
			return customAxios.post(FRUITS, fruit);
		},
		onMutate: variables => {
			console.log('====== onMutate ======');
			console.log(' variables : ', variables);
			return { status: variables.name };
		},
		onError: (error, variables, context) => {
			console.log('====== onError ======');
			// 에러가 났을때,
			console.log('error : ', error);
			console.log('variables : ', variables);
			console.log('context : ', context);
		},
		onSuccess: (data, variables, context) => {
			console.log('====== onSuccess ======');
			// data는 mutationFn이 return한 데이터
			console.log('data : ', data);
			// variables는 mutationFn의 fruit이다.
			console.log('variables : ', variables);
			// context는 onMutate에서 내려온 return 값이 담긴다.
			console.log('context : ', context);
			// querykey: 'fruits'는 다시 get요청 시도
			queryClient.invalidateQueries({ queryKey: ['fruits'] });
		},
		onSettled: (data, error, variables, context) => {
			console.log('====== onSettled ======');
			console.log('제일마지막에 무조건 진행');
		},
	});
	return { postMutation };
}
