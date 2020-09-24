import React, { useState, useEffect } from 'react';

export default function Posts (props) {
    return(
        <div>
            {props.posts.map(post => {
                return(
                    <div key={post.id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>Code Snippet: {post.code}</p>
                        <small>Language Used: {post.language}</small>
                    </div>
                )
            })}
        </div>
    )
}