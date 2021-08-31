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
					name: 'User1',
					role: 'Super Awesome User'
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
				title: '',
				noteBody: ''
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
				<div>
					<div>
						<span></span>
					</div>
					<input
						type="text"
						id="title"
						value={singleNote.title}
						onChange={handleChange}
						className="form-control"
						aria-label="Default"
						aria-describedby="inputGroup-sizing-default"
						placeholder="Note title"
					/>
				</div>
				<br />
				<div>
					<div>
						<span></span>
					</div>
					<textarea
						type="text"
						id="noteBody"
						value={singleNote.noteBody}
						onChange={handleChange}
						className="form-control"
						aria-label="Default"
						aria-describedby="inputGroup-sizing-default"
						placeholder="Note detail"
						rows={10}
					></textarea>
				</div>
				<br />

				<input type="submit" value="Save" className="btn btn-primary" />
			</form>
		</div>
	);
}
