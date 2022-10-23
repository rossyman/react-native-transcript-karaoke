import { ParsedTranscript } from './parsed-transcript'
import { ProgressType } from './progress-type'

export abstract class Parser {

  /**
   * A regular expression to deliminate new chunks in a transcript
   */
  protected abstract NEW_CHUNK_REGEX: RegExp

  constructor(protected readonly PROGRESS_TYPE: ProgressType) {
  }

  /**
   * Parses a given transcript
   *
   * @param transcript The transcript we wish to parse
   */
  abstract parse(transcript: string): ParsedTranscript

  /**
   * Converts a transcript into an array of chunks omitting empty ones
   *
   * @param transcript The transcript we wish to convert into chunks
   * @returns An array of chunks
   */
  protected toChunks(transcript: string): string[] {
    return transcript
      .split(this.NEW_CHUNK_REGEX)
      .map(chunk => chunk.trim())
      .filter(chunk => chunk)
  }

  /**
   * Converts an ISO-8601 timestamp into a tuple of numbers
   *
   * @param timestamp A timestamp in the format of `HH:mm:ss.SSS`
   * @returns A tuple of `[hours: number, minutes: number, seconds: number, milliseconds?: number]`
   */
  protected toDurations(timestamp: string): [number, number, number, number | undefined] {

    const splitTimestampByMilliseconds = timestamp.split('.')

    const milliseconds = splitTimestampByMilliseconds.length > 1
      ? Number(splitTimestampByMilliseconds.pop())
      : undefined

    const durations = splitTimestampByMilliseconds
      .shift()!
      .split(':')
      .map((duration) => Number(duration))

    const areDurationsInvalid = isNaN(durations[0]) || isNaN(durations[1]) || isNaN(durations[2])
    const areMillisecondsInvalid = milliseconds && isNaN(milliseconds)

    if (areDurationsInvalid || areMillisecondsInvalid) {
      throw new Error(
        `The following timestamp is incorrectly formatted: ${timestamp}`
      )
    }

    return [durations[0], durations[1], durations[2], milliseconds]
  }

  /**
   * Converts a timestamp into it's respective sum based on a `progressType`
   *
   * @param timestamp The timestamp we wish to convert into a number
   * @returns A single number representing the timestamp in the form of `progressType`
   */
  protected toTimestamp(timestamp: string): number {
    const [hrs, mins, secs, millis] = this.toDurations(timestamp)
    return this.PROGRESS_TYPE === 'seconds'
      ? this.toSeconds(hrs, mins, secs)
      : this.toMilliseconds(hrs, mins, secs, millis)
  }

  /**
   * Converts a set of durations into their combined sum in seconds
   *
   * @param hrs A number representing hours
   * @param mins A number representing minutes
   * @param secs A number representing seconds
   * @returns A number representing the whole timestamp in seconds
   */
  protected toSeconds(hrs: number, mins: number, secs: number): number {
    return hrs * 60 * 60 + mins * 60 + secs
  }

  /**
   * Converts a set of durations into their combined sum in milliseconds
   *
   * @param hrs A number representing hours
   * @param mins A number representing minutes
   * @param secs A number representing seconds
   * @param millis A number representing milliseconds
   * @returns A number representing the whole timestamp in milliseconds
   */
  protected toMilliseconds(hrs: number, mins: number, secs: number, millis?: number): number {
    return (this.toSeconds(hrs, mins, secs) * 1000) + (millis ?? 0)
  }
}
