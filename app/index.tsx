import React from "react";
import { View, StyleSheet } from "react-native";
import Title from "../components/Title";
import Upload from "../components/Upload";
import { Redirect, Slot } from "expo-router";

export default () => {
  return <Redirect href="home/upload" />;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20, 
  }
});