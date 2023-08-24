import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById } from './postSlice'
import { RootState } from '../../app/store'

const PostExcerpt = ({ postId }: { postId: string | number }) => {
  const post = useSelector((state: RootState) => selectPostById(state, postId))
  return (
    <>
      <article className="container">
        <h2>{post?.title}</h2>
        <p>{post?.body.substring(0, 75)}...</p>
        <p className="postCredit -ml-7">
          <Link to={`post/${post?.id}`}>View Post</Link>
          <PostAuthor userId={post?.userId} />
          <TimeAgo timestamp={post?.date} />
        </p>
        <ReactionButton post={post} />
      </article>
    </>
  )
}

export default PostExcerpt
