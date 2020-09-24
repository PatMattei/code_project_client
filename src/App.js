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
      const response = await fetch('https://code-project-api.herokuapp.com/posts', {
        body: JSON.stringify(formInputs),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      updateFormInputs({
				title: '',
				content: '',
				code: '',
				language: '',
				day: '',
      })
      setPosts([data, ...posts])
    }catch(error){
      console.error(error)
    }
	}

	const getPosts = async () => {
		try {
				const response = await fetch('https://code-project-api.herokuapp.com/posts')
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
					<h4>Post an Update To Your 100 Day Code Challenge!</h4>
						<form onSubmit={handleSubmit}>
							<label htmlFor="title">Title</label>
							<input type="text" id="title" value={formInputs.title} onChange={handleChange}/><br/>

							<label htmlFor="content">Today I...</label>
							<textarea id="content"  value={formInputs.content} onChange={handleChange}/><br/>

							<label htmlFor="code">Code Snippets</label>
							<input type="text" id="code" value={formInputs.code} onChange={handleChange}/>

							<label htmlFor="language">Language Used</label>
							<input type="text" id="language" value={formInputs.language} onChange={handleChange}/>

							<label htmlFor="day">Date</label>
							<input type="date" id="day" value={formInputs.day} onChange={handleChange}/><br/>

							<input type="submit" className="submit" />
						</form>
						<hr />
					</nav>

				<Posts posts={posts}/>
			</div>
		</div>
	);
}