import React from 'react';
import Home from '../pages/Home';
/*import About from '../pages/About';*/
import Note from '../pages/Note';
import New from '../pages/New';

const routes = [
	/* {
		Component: New,
		key: 'New',
		path: '/'
	}, */
	{
		Component: Note,
		key: 'Notes',
		path: '/notes'
	},
	{
		Component: New,
		key: 'New',
		path: '/new'
	},
	{
		Component: Home,
		key: 'Login',
		path: '/login'
	} /**/
	/* {
	Component: About,
	key: 'About',
	path: '/about'
	} */
];

export default routes;
