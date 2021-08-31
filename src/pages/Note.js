import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Note(props) {
	const [notes, setNotes] = useState([]); // <==== Notes State
	const [token, setToken] = useState(''); //authenticated
	const [user, setUser] = useState({
		username: '',
		password: ''
	});
	const [loggedInUser, setLoggedInUser] = useState('');

	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/notes');
				const data = await response.json();
				setNotes(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="NotePage">
			<ul className="">
				<div>
					{token
						? notes.map(note => {
								return (
									<li key={note._id}>
										<Link to={`/${note._id}`} className="">
											<h3 className="mb-1">{note.title}</h3>

											<p>{note.noteBody}</p>
										</Link>
									</li>
								);
						  })
						: ''}
				</div>
			</ul>
		</div>
	);
}
