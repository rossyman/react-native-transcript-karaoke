import { StyleProp, TextStyle } from 'react-native'

import { Parser } from './parser'
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
   * The parser we wish to use to parse the transcript
   */
  parser?: Parser
  /**
   * Exposes `onPress` events from chunks
   *
   * @param seekTo The duration the user has indicated they want to seek to
   */
  onSeekTo?: (seekTo: number) => void
}
