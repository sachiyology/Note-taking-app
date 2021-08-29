import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Note(props) {
	const [notes, setNotes] = useState([]); // <==== Notes State
	const [token, setToken] = useState('');

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
		<div className="NotePage" className="list-group">
			<ul>
				<div>
					{token && loggedInUser === 'user2'
						? notes.map(note => {
								return (
									<li key={note._id}>
										<Link
											to={`/${note._id}`}
											className="list-group-item list-group-item-action flex-column align-items-start"
										>
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
