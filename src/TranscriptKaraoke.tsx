import { StyleProp, Text, TextStyle } from 'react-native'

export type ProgressType = 'seconds' | 'milliseconds'

export interface TranscriptKaraokeProps {
  transcript: string
  progress: number
  progressType: ProgressType
  style?: StyleProp<TextStyle>
  activeStyle?: StyleProp<TextStyle>
}

export default function TranscriptKaraoke({
  transcript,
  progress,
  progressType,
  style,
  activeStyle
}: TranscriptKaraokeProps): React.ReactNode {
  const NEWLINE_REGEX = /\r?\n/
  const TIMESTAMP_REGEX = /\[([0-9]{2}:[0-9]{2}:[0-9]{2})\]/

  const toMilliseconds = (hrs: number, mins: number, secs: number): number => {
    return toSeconds(hrs, mins, secs) * 1000
  }

  const toSeconds = (hrs: number, mins: number, secs: number): number => {
    return hrs * 60 * 60 + mins * 60 + secs
  }

  const toDurations = (timestamp: string): [number, number, number] => {
    const durations = timestamp
      .split(':')
      .map((duration) => Number(duration))

    if (isNaN(durations[0]) || isNaN(durations[1]) || isNaN(durations[2])) {
      throw new Error(
        `The following timestamp is incorrectly formatted: ${timestamp}`
      )
    }

    return durations as [number, number, number]
  }

  const transcriptChunkAsTimestampedObject = (transcriptChunk: string): Record<number, string> => {
    const timestamp = transcriptChunk
      .match(TIMESTAMP_REGEX)
      ?.pop()

    const transcript = transcriptChunk
      .split(']')
      .pop()
      ?.trim()

    if (!timestamp || !transcript) {
      throw new Error(
        `The following line does not contain a timestamp or is incorrectly formatted: ${transcriptChunk}`
      )
    }

    const timestampKey = progressType === 'seconds'
      ? toSeconds(...toDurations(timestamp))
      : toMilliseconds(...toDurations(timestamp))

    return { [timestampKey]: transcript }
  }

  const transcriptToChunks = (): string[] => {
    return transcript
      .split(NEWLINE_REGEX)
      .map(chunk => chunk.trim())
      .filter(chunk => chunk)
  }

  const transcriptChunksAsTimestampedObject = (): Record<number, string> => {
    return transcriptToChunks().reduce<Record<number, string>>((timestampedObject, chunk) => ({
      ...timestampedObject,
      ...transcriptChunkAsTimestampedObject(chunk)
    }), {})
  }

  const timestampedTranscript = transcriptChunksAsTimestampedObject()

  return (
    <>
      {Object.entries(timestampedTranscript).map(([timestamp, chunk]) => (
        <Text key={timestamp} style={[style, timestamp as unknown as number <= progress && activeStyle]}>
          {chunk}
        </Text>
      ))}
    </>
  )
}
