/**
 * A simple transcript chunk representing the start time of the chunk
 * and the associated text to be styled at a given timestamp
 */
interface SimpleParsedTranscriptChunk {
  start: number
  transcript: string
}

/**
 * An extended transcript chunk representing the start time of the,
 * chunk the end time of the chunk and the associated text to be styled
 * at a given timestamp
 */
interface ExtendedParsedTranscriptChunk extends SimpleParsedTranscriptChunk {
  end: number
}

/**
 * A collection of parsed chunks and their associated information
 */
export type ParsedTranscript = SimpleParsedTranscriptChunk[] | ExtendedParsedTranscriptChunk[]
