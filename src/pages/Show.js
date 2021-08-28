import React, { useState, useEffect, useRef } from 'react';

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
		alert(buttonAlert.value1); //追加
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
		<div
			className="ShowPage"
			style={{
				background: 'url(./public/img/mandala_1.png)'
			}}
		>
			{Object.keys(note).length ? (
				<>
					<h3>{note.title}</h3>
					<p>{note.noteBody}</p>
					<button
						onClick={handleDelete}
						className="btn btn-secondary btn-lg btn-block"
					>
						Delete
					</button>
				</>
			) : (
				<h1> Loading...</h1>
			)}
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleUpdate}
				className="input-group-prepend"
			>
				<label className="input-group-text" id="inputGroup-sizing-default">
					{' '}
					Title:{' '}
					<input
						type="text"
						ref={titleInput}
						defaultValue={note.title}
						className="form-control"
					/>
				</label>
				<br />

				<label className="input-group-text" id="inputGroup-sizing-default">
					{' '}
					Note:{' '}
					<input
						type="text"
						ref={noteBodyInput}
						defaultValue={note.noteBody}
						className="form-control"
					/>
				</label>
				<input type="submit" value="Update" className="btn btn-primary" />
			</form>
			<div className="back-link">
				<a href="/notes">Back to the List</a>
			</div>
		</div>
	);
}
