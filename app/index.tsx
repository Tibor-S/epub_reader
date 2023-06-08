import { Text, YStack } from "tamagui" 
import { useFocusEffect, useRouter } from "expo-router"

export default () => {
  const router = useRouter();

  useFocusEffect(() => {
    router.replace("/home/upload");
  });
  
  return (
    <YStack justifyContent="center" height="100%">
      <Text alignSelf="center" >Epub reader</Text>
    </YStack>
  );
}