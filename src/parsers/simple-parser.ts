import { ParsedTranscript } from '../models/parsed-transcript'
import { Parser } from '../models/parser'

/**
 * Peforms simple parsing on a given transcript. Chunks are expected to be in the form of [HH:mm:ss]
 */
export class SimpleParser extends Parser {

  /**
   * A regular expression to split timestamps and their respective text
   */
  private readonly CHUNK_REGEX = /\[([0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]{3})?)\](.*)/

  /**
   * A regular expression to deliminate new chunks in a transcript
   */
  protected override readonly NEW_CHUNK_REGEX = /\r?\n/

  /**
   * Parses a given transcript following the format of `[HH:mm:ss]` or `[HH:mm:ss.SSS]`
   *
   * @param transcript The transcript we wish to parse
   */
  override parse(transcript: string): ParsedTranscript {
    return this.toChunks(transcript)
      .map(chunk => {
        const chunkGroups = chunk.match(this.CHUNK_REGEX)
        if (!chunkGroups) {
          throw new Error(`The following line is incorrectly formatted: ${chunk}`)
        }
        return { start: this.toTimestamp(chunkGroups[1]), transcript: chunkGroups[2].trim() }
      })
  }
}
