import { parseISO, formatDistanceToNow } from 'date-fns'
import { ReactElement } from 'react'

type timestampProps = { timestamp: string | undefined }

const TimeAgo = ({ timestamp }: timestampProps): ReactElement => {
  let timeAgo: string = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo
