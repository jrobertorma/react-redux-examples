import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export const SinglePostPage = () => {
  // how to pass parameters to routes is a question for another time, for now will hardcode it :)
  const postId = '1';

  const post = useSelector(
    (state: RootState)  => state.reducers.posts.find(post => post.id === postId)
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  )

}
