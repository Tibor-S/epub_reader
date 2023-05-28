
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';

export const Library = ({style}: IconProps) => {
  return (
    <Svg style={style} viewBox="0 0 264.15 327.49">
      <Path d="M6,327.47s.57-209.23.17-290.09A31.21,31.21,0,0,1,37.39,6H226.92a31.23,31.23,0,0,1,31.23,31.23V327.47"/>
      <Line x1="6" y1="279.01" x2="258.15" y2="279.01"/>
      <Line x1="6" y1="93.12" x2="258.15" y2="93.12"/>
      <Line x1="6" y1="186.06" x2="258.15" y2="186.06"/>
    </Svg>
  );
};

export const Search = ({style}: IconProps) => {
  return (
    <Svg style={style} viewBox="0 0 247.36 247.36">
      <Circle cx="72.56" cy="72.56" r="66.56"/>
      <Line   x1="161.52" y1="161.52" x2="243.12" y2="243.12"/>
    </Svg>
  );
};

export type IconProps = {style: StyleProp<ViewStyle>};