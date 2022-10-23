![](.images/header.png)

# React Native Transcript Karaoke

Super simple karaoke-style transcript manipulation for react native.

## Installation

```bash
npm install react-native-transcript-karaoke
```

## Usage

> **N.B.**: This component works really well out-of-the-box with [`react-native-track-player`](https://github.com/doublesymmetry/react-native-track-player).

As the passed in `progress` advances, the component will progressively re-style the chunks of text based on their timestamps, applying the styles passed in via `activeStyles`.

The `progress` property can either represent `seconds` or `milliseconds`. All you need to do is tell the component which of the two (via `progressType`) you wish to use and let it handle the rest.

You can also optionally supply your own regular expressions to determine what defines a "chunk" and what defines a "timestamp" within your domain.

**By default**, a "chunk" is defined per new-line, a timestamp is in the format of `[HH:mm:ss]` and we expect the current progress to be specified in `seconds`.

> 🚨 Please note that at this point in time, we do not support custom timestamp identifiers beyond `HH:mm:ss`; the customizable regular expression is purely for finding this timestamp inside of a chunk.

If you wish to add interactivity to your Karaoke (Similar to Spotify), then you can use the `onSeekTo` prop which exposes `onPress` events from individual chunks.

```tsx
<Karaoke
  transcript={transcript}
  progress={progress}
  progressType='seconds'
  activeStyle={{color: 'red'}}
/>
```

For a richer example, see the `/example` directory in our repository.

## API

```ts
interface KaraokeProps {
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
```
