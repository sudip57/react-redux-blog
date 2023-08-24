import { useDispatch } from 'react-redux'
import { reactionAdded } from './postSlice'
import { Reactions } from './types'

interface postProps {
  id: string
  reactions: Record<string, number>
}

interface Post {
  post: postProps | undefined
}
const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
}

const ReactionButton = ({ post }: Post) => {
  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const reactionName = name as keyof Reactions
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(
            reactionAdded({
              postId: post?.id || '',
              reaction: reactionName,
            }),
          )
        }
      >
        {emoji}
        {post?.reactions[name]}
      </button>
    )
  })
  return <div className="">{reactionButtons}</div>
}

export default ReactionButton
