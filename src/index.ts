import { Karaoke } from './components/Karaoke'

export * from './models/progress-type'
export * from './models/karaoke-props'
export * from './utils/as-karaoke-map'
export { Karaoke } from './components/Karaoke'

const TranscriptKaraoke = Karaoke

/**
 * @deprecated Please use the new nomenclature: `import { Karaoke } from 'react-native-transcript-karaoke'`
 */
export default TranscriptKaraoke
