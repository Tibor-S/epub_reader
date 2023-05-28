import { Pressable, StyleSheet, Image } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { IconProps, Library } from './Icons';



export default ({icon, href}: NavButtonProps) => {
  
  return (
    <Link href={href} asChild>
      <Pressable 
        style={styles.button}
      >
        {icon({style: styles.icon})}
      </Pressable>
    </Link>
  );
};

type NavButtonProps = {href: string, icon: ({ style }: IconProps) => JSX.Element};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    padding: 5,
    overflow: 'visible',
  },
  icon: {
    width: '100%',
    height: '100%',
    fill: 'transparent',
    stroke: '#b0d8a8',
    strokeWidth: 24,
    overflow: 'visible',
  }
});