import { StyleSheet, Text, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'
import Home from './src/screen/Home'
import { init } from './src/database'

const App = () => {

  init()
  .then(() =>{
      console.log("Initialized database");
  })
  .catch((err) => {
      console.log("Initializing db failed.");
      console.log(err);
  })

  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
})