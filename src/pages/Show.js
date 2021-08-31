import React, { useState, useEffect, useRef } from 'react';
import { RiDeleteBin6Line } from 'react-icons/fa';

export default function Show(props) {
	const [note, setNote] = useState({});
	const titleInput = useRef(null); // doc.qs('input#title')
	const noteBodyInput = useRef(null); // doc.qs('input#noteBody')
	const buttonAlert = { value1: 'Are you sure?' }; //追加
	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/notes/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: titleInput.current.value,
					noteBody: noteBodyInput.current.value
				})
			});
			const data = await response.json();
			setNote(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/notes/${props.match.params.id}`);
				const data = await response.json();
				setNote(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/notes/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const deletedNote = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/notes');
		}
	};
	return (
		<div className="ShowPage">
			{Object.keys(note).length ? (
				<>
					<h3>{note.title}</h3>
					<p>{note.noteBody}</p>
					<p>{note.timestamps}</p>
					<button onClick={handleDelete} className="btn btn-secondary">
						Delete
					</button>{' '}
				</>
			) : (
				<h1> Loading...</h1>
			)}
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleUpdate}
				className="form-group"
			>
				<label>
					{' '}
					Title:{' '}
					<input
						type="text"
						ref={titleInput}
						defaultValue={note.title}
						className="form-control"
						id="exampleInputEmail1"
					/>
				</label>
				<br />
				<label>
					{' '}
					Note:
					<textarea
						type="text"
						ref={noteBodyInput}
						defaultValue={note.noteBody}
						className="form-control"
						id="exampleFormControlTextarea1"
						rows="10"
					></textarea>
				</label>
				<input type="submit" value="Update" className="btn btn-primary" />
			</form>
			<div className="back-link">
				<a href="/notes">Back to the List</a>{' '}
			</div>
		</div>
	);
}
