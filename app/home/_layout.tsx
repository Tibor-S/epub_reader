import { View, StyleSheet, Button, Pressable, Text } from "react-native";
import { Slot } from "expo-router";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Title from "../../components/Title";
import NavBar from "../../components/NavBar";
import NavButton from "../../components/NavButton";
import { Library, Search } from "../../components/Icons";


export default () => {

  const Tab = createBottomTabNavigator();

  return <View style={styles.container} >
    <Title title={"Epub reader"} />
    <Slot />
    <NavBar>
      <NavButton icon={Library} href="/home/library" />
      <NavButton icon={Search} href="/home/upload" />
    </NavBar>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingTop: 10,
  },
});