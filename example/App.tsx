import { ScrollView, TextStyle, View } from 'react-native'
import { useEffect, useState } from 'react'

import { Karaoke } from 'react-native-transcript-karaoke'

export default function App() {

  const [progress, setProgress] = useState(0)

  const transcript = `
    [00:00:03] Tell me something I need to know
    [00:00:07] Then take my breath and never let it go
    [00:00:12] If you just let me invade your space
    [00:00:17] I'll take the pleasure, take it with the pain
    [00:00:22] And if in the moment, I bite my lip
    [00:00:27] Baby, in that moment, you'll know this is
    [00:00:32] Something bigger than us and beyond bliss
    [00:00:37] Give me a reason to believe it,
    [00:00:41] 'Cause if you want to keep me
    [00:00:44] You gotta, gotta, gotta, gotta
    [00:00:47] Got to love me harder
    [00:00:50] And if you really need me
    [00:00:53] You gotta, gotta, gotta, gotta
    [00:00:56] Got to love me harder
    [00:00:58] (Lo-love me harder)
  `

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [progress, setProgress])

  const containerStyles = {
    paddingTop: 90,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#a3a3a3',
    height: '100%'
  }

  const karaokeBaseStyles: TextStyle = {
    fontSize: 30,
    fontWeight: '700',
    paddingBottom: 20,
    lineHeight: 40,
    letterSpacing: 1.15,
    color: '#0F0F0F'
  }

  const karaokeActiveStyles: TextStyle = {
    color: 'white'
  }

  return (
    <View style={containerStyles}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Karaoke
          transcript={transcript}
          progress={progress}
          progressType='seconds'
          style={karaokeBaseStyles}
          activeStyle={karaokeActiveStyles}
          onSeekTo={(seekTo) => setProgress(seekTo)}
        />
      </ScrollView>
    </View>
  )
}
