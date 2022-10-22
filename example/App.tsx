import { useEffect, useState } from 'react';

import TranscriptKaraoke from 'react-native-transcript-karaoke'
import { View } from 'react-native';

export default function App() {

  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [progress, setProgress])

  return (
    <View>
      <TranscriptKaraoke
        transcript={transcript}
        progress={progress}
        progressType='seconds'
        activeStyle={{color: 'red'}}
      />
    </View>
  );
}
