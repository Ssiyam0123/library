import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <TouchableOpacity>
        <Link href="/(auth)">Go to auth</Link>
      </TouchableOpacity>
    </View>
  )
}

export default index