import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import type { RootState } from '../../store';
import {fetchPosts, selectAllPosts, selectPostError, selectPostStatus} from './postsSlice';
import {useAppDispatch} from "../../store";

export const PostsList = () => {
  const dispatch = useAppDispatch();
  // we use useRef so react can know not to runn useEffect code twice
  const dataFetchedRef = useRef(false);

  // invoking selector defined at post slice
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector(selectPostStatus)
  const error = useSelector(selectPostError)

  // useEfect behaves like componentDidMount for functional components
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    if (postStatus === 'idle' || postStatus === undefined) {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch])

  const renderedPosts = posts.map((post: any) => (
    <article className="post-excerpt" key={post.acct}>
      <h3>{post.name}</h3>
      <p className="post-content">{post.email}</p>
    </article>
  ))

  let content

  if (postStatus === 'loading') {
    content = <div><p>Loading ...</p></div>
  } else if (postStatus === 'succeeded') {
    content = <div>
        <h2>Posts</h2>
        {renderedPosts}
      </div>
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      {content}
    </section>
  )
}