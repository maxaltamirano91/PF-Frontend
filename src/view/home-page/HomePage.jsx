import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProjects } from '../../redux/actions';
import Cards from '../../components/cards/Cards';

const HomePage = () => {
	const dispatch = useDispatch();
	const { allProjects } = useSelector((state) => state.project);
	const [renderingCards, setRenderingCards] = useState(5);
	const [displayPagination, setDisplayPagination] = useState(true);

	const handlePagination = () => {
		if (allProjects.length >= renderingCards) {
			setRenderingCards((prevCount) => prevCount + 5);
		} else {
			setDisplayPagination(false);
		}
	};

	useEffect(() => {
		dispatch(getAllProjects(renderingCards));
	}, [dispatch, renderingCards]);

	return (
		<div>
			<Cards projects={allProjects} />
			{displayPagination ? (
				<div>
					<button onClick={handlePagination}>
						Ver más
					</button>
				</div>
			) : (
				<p>Estos son todos los proyectos</p>
			)}
		</div>
	);
};

export default HomePage;