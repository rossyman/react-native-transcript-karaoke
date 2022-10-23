import { StyleProp, TextStyle } from 'react-native'

import { ProgressType } from './progress-type'

export interface KaraokeProps {
  /**
   * The transcript we wish to provide karaoke styling for
   */
  transcript: string
  /**
   * The current progress of the audio track being played
   */
  progress: number
  /**
   * The format that the current progress is given in
   */
  progressType?: ProgressType
  /**
   * The base style we wish to apply to the displayed transcript
   */
  style?: StyleProp<TextStyle>
  /**
   * The style we wish to apply to previous and current chunks of
   * the transcript
   */
  activeStyle?: StyleProp<TextStyle>
  /**
   * A regular expression pattern to match chunks within a given transcript
   */
  newChunkRegex?: RegExp
  /**
   * A regular expression pattern to match timestamps within given transcript chunks
   */
  timestampRegex?: RegExp
  /**
   * Exposes `onPress` events from chunks
   */
  onSeekTo?: (seekTo: number) => void
}
