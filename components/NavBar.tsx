import { View, StyleSheet } from "react-native"

export default ({children}: NavBarProps) => {
  return (
    <View style={styles.bar} >
      <View style={styles.line} />
      <View style={styles.nav} >
        {children}
      </View>
    </View>
  );
};

type NavBarProps = {children?: React.ReactNode};


const styles = StyleSheet.create({
  bar: {
    width: '100%',
    marginBottom: 20,
  },

  line: {
    width: '100%',
    height: 4,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'gray',
    borderRadius: 2,
    
  },

  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

