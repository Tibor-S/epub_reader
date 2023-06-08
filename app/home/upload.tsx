import { Upload } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Button, Text, YStack, styled } from "tamagui"
import * as DocumentPicker from 'expo-document-picker';
import { Book, useBook } from "../../utils/epub";




export default () => {

  const [uri, setURI] = useState<string>();

  return (
    <UploadContainer>
      <UploadButton
        onPress={() => {
          DocumentPicker.getDocumentAsync()
            .then((res) => {
              if (res.type === "cancel") return;
              const uri = res.uri;

              /// Lägg till bok och uri i db
              console.log(uri);
              useBook(uri, (book: Book) => console.log(book))
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