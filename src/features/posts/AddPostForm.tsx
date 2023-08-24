import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../app/store'

const AddPostForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [addRequestStatus, setAddRequestStatus] = useState<string>('idle')

  const users = useSelector(selectAllUsers)
  const navigate = useNavigate()

  const onTitleChange = (e: ChangeEvent<HTMLInputElement> | undefined) => {
    if (e) {
      setTitle(e.target.value)
    }
  }
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement> | undefined) => {
    if (e) {
      setContent(e.target.value)
    }
  }
  const onAuthorChange = (e: ChangeEvent<HTMLSelectElement> | undefined) => {
    if (e) {
      setUserId(e.target.value)
    }
  }

  const canSave: boolean =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(addNewPost({ title, body: content, userId })).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
        navigate('/')
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post </h2>
      <form>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value="">Select Authors</option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Title</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
          className="resize-none"
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
          className={`${
            !canSave
              ? ' bg-green-200 text-white'
              : 'bg-green-500 text-white rounded-md'
          }`}
        >
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
