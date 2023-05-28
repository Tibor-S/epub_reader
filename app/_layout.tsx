import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";

export default () => {
  return <View style={styles.container} >
    <Slot />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20, 
  }
});