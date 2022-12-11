import './App.css';
import axios from 'axios';
import Post from './Post';
import useGetFruits from './query/useGetFruits';
import useDeleteFruit from './query/useDeleteFruit';

export const instance = axios.create({
	baseURL: 'http://localhost:5000',
});

export const FRUITS = '/fruits';

function App() {
	const { isFetching, isLoading, data, error } = useGetFruits();

	const { deleteMutation } = useDeleteFruit();

	if (isLoading) return <h1>Loading</h1>;

	if (error) return <h1>An error has occurred: {error.message}</h1>;

	return (
		<div className='top'>
			<Post />
			<div className='flex'>
				{data.map(({ id, name, img }) => (
					<div key={id}>
						<h1>{name}</h1>
						<button onClick={() => deleteMutation.mutate(id)}>삭제</button>
						<img
							style={{ width: '150px', borderRadius: '9999px' }}
							src={img}
							alt={name}
						/>
					</div>
				))}
				{isFetching && <h1>isFetching...</h1>}
			</div>
		</div>
	);
}

export default App;
