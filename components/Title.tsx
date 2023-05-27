import React from 'react';
import {Text, StyleSheet, View } from 'react-native';

export default ({
  title
}: TitleProps) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

type TitleProps = {
  title: string;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
});