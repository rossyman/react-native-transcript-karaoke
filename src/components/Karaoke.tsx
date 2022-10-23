import type { KaraokeProps } from '../models/karaoke-props'
import { Text } from 'react-native'
import { asKaraokeMap } from '../utils/as-karaoke-map'

/**
 * Creates an interactive karaoke-styled transcript component
 *
 * @param props Configuration options for the given karaoke component
 */
export function Karaoke({
  transcript,
  progress,
  progressType = 'seconds',
  style,
  activeStyle,
  newChunkRegex = /\r?\n/,
  timestampRegex = /\[([0-9]{2}:[0-9]{2}:[0-9]{2})\]/,
  onSeekTo
}: KaraokeProps): React.ReactElement {

  const karaokeMap: Map<number, string> = asKaraokeMap(
    newChunkRegex,
    timestampRegex,
    progressType,
    transcript
  )

  const seekToTimestamp = (timestamp: number): void => {
    if (onSeekTo) {
      onSeekTo(timestamp)
    }
  }

  return (
    <>
      {[...karaokeMap].map(([timestamp, transcript]) => (
        <Text
          key={timestamp}
          style={[style, timestamp <= progress && activeStyle]}
          onPress={() => seekToTimestamp(timestamp)}
        >
          {transcript}
        </Text>
      ))}
    </>
  )
}
