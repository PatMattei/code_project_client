import React, { useState, useEffect } from 'react';

export default function Posts (props) {
    return(
        <div>
            {props.posts.map(post => {
                return(
                    <div key={post.id} className="post">
                        <h3>Entry title: {post.title}</h3>
                        <h4>Date: {post.day}</h4>
                        <p>Today I...{post.content}</p>
                        <p>Code Snippet: {post.code}</p>
                        <small>Language Used: {post.language}</small>
                    </div>
                )
            })}
        </div>
    )
}