import { useSelector } from 'react-redux'
import { getPostStatus, getpostError, selectPostIds } from './postSlice'

import PostExcerpt from './PostExcerpt'

const PostsLists: React.FC = () => {
  const orderedPostIds = useSelector(selectPostIds)
  const postStatus = useSelector(getPostStatus)
  const error = useSelector(getpostError)

  let content
  if (postStatus === 'loading') {
    content = (
      <p className="flex justify-center items-center h-screen">Loading...</p>
    )
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt postId={postId} key={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>
  }

  return <section>{content}</section>
}

export default PostsLists
