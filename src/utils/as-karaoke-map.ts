import type { ProgressType } from '../models/progress-type'

const toDurations = (timestamp: string): [number, number, number] => {
  const durations = timestamp
    .split(':')
    .map((duration) => Number(duration))

  if (isNaN(durations[0]) || isNaN(durations[1]) || isNaN(durations[2])) {
    throw new Error(
      `The following timestamp is incorrectly formatted: ${timestamp}`
    )
  }

  return [durations[0], durations[1], durations[2]]
}

const toTimestamp = (progressType: ProgressType, timestamp: string): number => {
  const [hrs, mins, secs] = toDurations(timestamp)
  const inSeconds = hrs * 60 * 60 + mins * 60 + secs
  return progressType === 'seconds'
    ? inSeconds
    : inSeconds * 1000
}

const asTimestampAndTranscriptTuple = (progressType: ProgressType, timestampRegex: RegExp, transcriptChunk: string): [number, string] => {
  const timestampString = transcriptChunk
    .match(timestampRegex)
    ?.pop()

  const transcript = transcriptChunk
    .split(']')
    .pop()
    ?.trim()

  if (!timestampString || !transcript) {
    throw new Error(
      `The following line does not contain a timestamp or is incorrectly formatted: ${transcriptChunk}`
    )
  }

  return [toTimestamp(progressType, timestampString), transcript]
}

/**
 * Converts a transcript into the format of a map, containing a
 * given timestamp in the format of `ProgressType` as a key and
 * the respective transcript chunk as the value.
 *
 * @param newChunkRegex A regular expression pattern to match chunks within a given transcript
 * @param timestampRegex A regular expression pattern to match timestamps within given transcript chunks
 * @param progressType The format that the current progress is given in
 * @param transcript The transcript we wish to provide karaoke styling for
 * @returns A map of timestamps in the form of ProgressType, to respective chunks within the transcript
 */
export const asKaraokeMap = (
  newChunkRegex: RegExp,
  timestampRegex: RegExp,
  progressType: ProgressType,
  transcript: string
): Map<number, string> => {

  /*
   * We use a map here in order to ensure Type-erasure doesn't occur
   * when using `Object.entries()` in the main component.
   */
  return new Map<number, string>(transcript
    .split(newChunkRegex)
    .map(chunk => chunk.trim())
    .filter(chunk => chunk)
    .map(chunk => asTimestampAndTranscriptTuple(progressType, timestampRegex, chunk)))
}
