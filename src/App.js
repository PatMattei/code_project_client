import React, { useState, useEffect } from 'react';
import Posts from './components/Posts.js';
import './App.css';


export default function App() {
	const [posts, setPosts] = useState([]);
	const [formInputs, updateFormInputs] = useState({
		title: '',
		content: '',
		code: '',
		language: '',
		day: '',
	});

	const handleChange = (event) => {
		const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value })
		updateFormInputs(updateInput);
	}
	
	const handleSubmit = async (event) => {
		event.preventDefault()
    try{
      const response = await fetch('http://localhost:3000/posts', {
        body: JSON.stringify(formInputs),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      updateFormInputs({
        author: '',
        content: '',
        title: ''
      })
      setPosts([data, ...posts])
    }catch(error){
      console.error(error)
    }
	}

	const getPosts = async () => {
		try {
				const response = await fetch('http://localhost:3000/posts')
				const data = await response.json();
				setPosts(data);
				console.log(data);
		} catch(error) {
				console.error(error);
		}
	}
	useEffect(() => {
			(async function(){
					await getPosts();
			})()
	}, []);

	
	return (
		<div className="App">
			<div className="container">
				<nav>
					<h4>Post an Update</h4>
						<form onSubmit={handleSubmit}>
							<label htmlFor="title">Title</label>
							<input type="text" id="title" value={formInputs.title} onChange={handleChange}/>

							<label htmlFor="content">Content</label>
							<textarea id="content"  value={formInputs.content} onChange={handleChange}/>

							<label htmlFor="code">Code Snippets</label>
							<input type="text" id="code" value={formInputs.code} onChange={handleChange}/>

							<label htmlFor="code">Language Used</label>
							<input type="text" id="language" value={formInputs.language} onChange={handleChange}/>

							<label htmlFor="code">Date</label>
							<input type="text" id="day" value={formInputs.day} onChange={handleChange}/>

							<input type="submit" className="submit" />
						</form>
					</nav>

				<Posts posts={posts}/>
			</div>
		</div>
	);
}