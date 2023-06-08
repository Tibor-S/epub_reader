import { useState } from "react";
import { Text } from "tamagui"



export default () => {
  
  const [bookURIS, setBookURIS] = useState<string[]>([
    'file:///var/mobile/Containers/Data/Application/812F9E48-9577-40C4-A934-4BE99F349B1D/Library/Caches/ExponentExperienceData/%2540rofk123%252Fepub_reader/DocumentPicker/7F5CCB0F-3DCC-4759-8106-4988A8AB3121.epub',
    'file:///var/mobile/Containers/Data/Application/812F9E48-9577-40C4-A934-4BE99F349B1D/Library/Caches/ExponentExperienceData/%2540rofk123%252Fepub_reader/DocumentPicker/7F5CCB0F-3DCC-4759-8106-4988A8AB3121.epub',
    'file:///var/mobile/Containers/Data/Application/812F9E48-9577-40C4-A934-4BE99F349B1D/Library/Caches/ExponentExperienceData/%2540rofk123%252Fepub_reader/DocumentPicker/7F5CCB0F-3DCC-4759-8106-4988A8AB3121.epub',
    'file:///var/mobile/Containers/Data/Application/812F9E48-9577-40C4-A934-4BE99F349B1D/Library/Caches/ExponentExperienceData/%2540rofk123%252Fepub_reader/DocumentPicker/7F5CCB0F-3DCC-4759-8106-4988A8AB3121.epub',
    'file:///var/mobile/Containers/Data/Application/812F9E48-9577-40C4-A934-4BE99F349B1D/Library/Caches/ExponentExperienceData/%2540rofk123%252Fepub_reader/DocumentPicker/7F5CCB0F-3DCC-4759-8106-4988A8AB3121.epub',
    'file:///var/mobile/Containers/Data/Application/812F9E48-9577-40C4-A934-4BE99F349B1D/Library/Caches/ExponentExperienceData/%2540rofk123%252Fepub_reader/DocumentPicker/7F5CCB0F-3DCC-4759-8106-4988A8AB3121.epub',
  ]);

  return (
    <Text>
      Library
    </Text>
  )
}