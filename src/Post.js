import React, { useState } from 'react';

import usePostFruit from './query/usePostFruit';

export default function Post() {
	const { postMutation } = usePostFruit();
	const [inputValues, setInputValues] = useState({ name: '', img: '' });

	const inputValuesHandler = ({ target: { name, value } }) => {
		setInputValues(prev => ({ ...prev, [name]: value }));
	};

	if (postMutation.isLoading) return <h1>추가중..</h1>;
	return (
		<div className='add'>
			<div>
				<div>name</div>
				<input
					name='name'
					type='text'
					value={inputValues.name}
					onChange={inputValuesHandler}
				/>
			</div>
			<div>
				<div>img url</div>
				<input
					name='img'
					type='url'
					value={inputValues.img}
					onChange={inputValuesHandler}
				/>
			</div>
			<div>
				<button onClick={() => postMutation.mutate(inputValues)}> 추가 </button>
			</div>
		</div>
	);
}
