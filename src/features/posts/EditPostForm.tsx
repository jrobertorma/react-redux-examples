import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RootState} from "../../store";
import {postUpdated} from "./postsSlice";

export const EditPostForm = () => {
  // how to pass parameters to routes is a question for another time, for now will hardcode it :)
  const postId = '1';

  const post = useSelector (
    (state: RootState)  => state.reducers.posts.posts.find(post => post.id === postId)
  )

  // @ts-ignore
  const [title, setTitle] = useState(post.title);
  // @ts-ignore
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();

  const onTitleChanged = (e: any) => setTitle(e.target.value);
  const onContentChanged = (e: any) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({
        id: postId,
        title,
        content
      }))
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
