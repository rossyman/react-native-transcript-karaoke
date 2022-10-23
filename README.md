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

If you wish to add interactivity to your Karaoke (Similar to Spotify), then you can use the `onSeekTo` prop which exposes `onPress` events from individual chunks.

**By default**, a "chunk" is defined per new-line, a timestamp is in the format of `[HH:mm:ss]` or `[HH:mm:ss.SSS]` and we expect the current progress to be specified in `seconds`.

> 🚨 Please note that at this point in time, we do not support custom timestamp identifiers beyond `HH:mm:ss` or `HH:mm:ss.SSS` out-of-the-box.
> You can implement your own transcript parser by extending the abstract `Parser` class and providing your own implementation via the `parser` prop to give yourself more flexability.
> The abstract `Parser` class has a few utility functions to make your life easier if you do decide to do this.

```tsx
const transcript = `
  [00:00:03] Tell me something I need to know
  [00:00:07] Then take my breath and never let it go
  [00:00:12] If you just let me invade your space
  [00:00:17] I'll take the pleasure, take it with the pain
  [00:00:22] And if in the moment, I bite my lip
  [00:00:27] Baby, in that moment, you'll know this is
  [00:00:32] Something bigger than us and beyond bliss
  [00:00:37] Give me a reason to believe it
`

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
```
