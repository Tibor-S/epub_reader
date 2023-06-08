import { Upload } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Button, Text, YStack, styled } from "tamagui"
import { readAsStringAsync } from 'expo-file-system';
import JSZip from 'jszip';
import * as DocumentPicker from 'expo-document-picker';




export default () => {

  const zip = new JSZip();
  const [uri, setURI] = useState<string>();

  return (
    <UploadContainer>
      <UploadButton
        onPress={() => {
          DocumentPicker.getDocumentAsync()
            .then((res) => {
              if (res.type === "cancel") return;
              const uri = res.uri;
              console.log(uri);
              readAsStringAsync(uri, {encoding: 'base64'})
                .then((data) => {
                  zip.loadAsync(data, {base64: true})
                    .then((zip) => {
                      console.log(zip.files);
                    })
                    .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        }}
      >
        <Upload color='#19dd9c' size="$5" />
      </UploadButton>
      <Text>{}</Text>
    </UploadContainer>
  );
}

const UploadContainer = styled(YStack, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

const UploadButton = styled(Button, {
  size: "$4",
  width: 150,
  height: 150,
});