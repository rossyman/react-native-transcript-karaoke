import type { KaraokeProps } from '../models/karaoke-props'
import { SimpleParser } from '../parsers/simple-parser'
import { Text } from 'react-native'

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
  parser = new SimpleParser(progressType),
  onSeekTo
}: KaraokeProps): React.ReactElement {

  const parsedTranscript = parser.parse(transcript)

  const seekToTimestamp = (timestamp: number): void => {
    if (onSeekTo) {
      onSeekTo(timestamp)
    }
  }

  return (
    <>
      {parsedTranscript.map(chunk => (
        <Text
          key={chunk.start}
          style={[style, chunk.start <= progress && activeStyle]}
          onPress={() => seekToTimestamp(chunk.start)}
        >
          {chunk.transcript}
        </Text>
      ))}
    </>
  )
}
