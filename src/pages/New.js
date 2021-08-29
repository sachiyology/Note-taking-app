import React, { useState, useEffect } from 'react';
export default function App(props) {
	const [notes, setNotes] = useState([]);
	const [singleNote, setNote] = useState({
		titleInput: '',
		noteBody: ''
	});
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/notes'); // <===== Postman Query
				const data = await response.json(); // Receive data turn it into a js object or array
				setNotes(data); // Store that JS Object or Array
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	const handleClick = async e => {
		try {
			const response = await fetch('/api/notes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: 'Santos',
					role: 'Super Awesome Student'
				})
			});
			const data = await response.json();
			setNotes([...notes, data]);
			setNote(data);
		} catch (error) {
			console.error(error);
		}
	};
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/notes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(singleNote)
			});
			const data = await response.json();
			setNotes([...notes, data]);
			setNote({
				name: '',
				role: ''
			});
		} catch (error) {
			console.error(error);
		}
	};
	const handleChange = e => {
		setNote({ ...singleNote, [e.target.id]: e.target.value });
	};
	return (
		<div className="NewPage">
			{' '}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<div>
						<span></span>
					</div>
					<input
						type="text"
						id="title"
						value={singleNote.title}
						onChange={handleChange}
						placeholder="Title"
						className="form-control"
						id="exampleInputEmail1"
					/>
				</div>

				<div className="form-group">
					<div>
						<span></span>
					</div>
					<textarea
						type="text"
						id="noteBody"
						value={singleNote.noteBody}
						onChange={handleChange}
						placeholder="Description"
						className="form-control"
						id="exampleFormControlTextarea1"
						rows="10"
					></textarea>
				</div>
				<br />

				<input type="submit" value="Save" className="btn btn-secondary" />
			</form>
			<ul>
				{notes.map(note => {
					return (
						<li key={note._id}>
							{note.title} => {note.noteBody}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
