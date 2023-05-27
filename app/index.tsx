import React from "react";
import { View, StyleSheet } from "react-native";
import Title from "../components/Title";
import Upload from "../components/Upload";

export default () => {
  return <View style={styles.container} >
    <Title title={"Epub reader"} />
    <Upload />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: '10%',
    paddingLeft: '5%',
  }
});