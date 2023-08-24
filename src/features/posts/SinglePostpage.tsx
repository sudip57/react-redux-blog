import { useSelector } from 'react-redux'
import { selectPostById } from './postSlice'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'
import { RootState } from '../../app/store'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SinglePostpage: React.FC = () => {
  const { postId } = useParams()
  const post = useSelector((state: RootState) =>
    selectPostById(state, Number(postId)),
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }
  return (
    <div className="flex mt-[5rem] ">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p className="postCredit">
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButton post={post} />
      </div>
    </div>
  )
}

export default SinglePostpage
