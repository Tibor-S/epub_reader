import { Slot, useRouter, useSegments  } from "expo-router"
import { YStack, Text, Stack, ToggleGroup, styled, XStack, Button } from "tamagui"
import { Library, Upload } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from "react";
import { IconProps } from "@tamagui/lucide-icons/types/IconProps";

export default () => {

  const segments = useSegments();
  const [tabValue, setTabValue] = useState<string>();

  useEffect(() => {
    setTabValue(segments[1])
  }, [segments])
  Library
  return (
    <YStack height="100%">
      <Text fontSize={32} fontWeight="600">Epub reader</Text>
      <Stack flexGrow={1}>
        <Slot />
      </Stack>
      <Nav>
        <NavButton id="library" currentTab={tabValue} icon={Library} />
        <NavButton id="upload" currentTab={tabValue} icon={Upload} />
      </Nav>

    </YStack>
  )
}

const Nav = styled(XStack, {
  paddingHorizontal: "10%",
  justifyContent: "space-around",
})

const NavButton = (props : {
  id: string;
  currentTab?: string;
  icon: React.NamedExoticComponent<IconProps>;
}) => {
  const router = useRouter();

  return (
    <Button 
      onPress={() => router.push(`/home/${props.id}`)} 
      icon={<props.icon size="$4" color={`${props.currentTab === props.id ? '#19dd9c' : '#000' }`} />} 
      size="$4" 
      backgroundColor="transparent"
    />
  );
}
