import { Button } from "react-native";
import { awaitFile } from "../utils/file";

export default () => {
  return <Button 
    title="Upload" 
    onPress={() => {
      awaitFile()
        .then((file) => {
          console.log(file);
        })
        .catch((err) => {
          console.error(err);
        });
    }}
  />
};