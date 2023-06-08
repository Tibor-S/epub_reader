import React, { Suspense } from 'react'
import { Stack, TamaguiProvider } from 'tamagui'
import { Slot } from 'expo-router'
import config from '../tamagui.config'
import { SafeAreaView } from 'react-native'

export default function App() {
  return (
      <TamaguiProvider config={config}>
        <SafeAreaView>
          <Suspense fallback={Stack}>
            <Slot />
          </Suspense>
        </SafeAreaView>
      </TamaguiProvider>
  )
}