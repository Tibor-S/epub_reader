import { Upload } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Button, Text, YStack, styled } from "tamagui"
import * as DocumentPicker from 'expo-document-picker';
import { Title, TitleData, addTitle } from "../../utils/storage";
import { Book, useBook } from "../../utils/epub";




export default () => {


  return (
    <UploadContainer>
      <UploadButton
        onPress={() => {
          DocumentPicker.getDocumentAsync()
            .then((res) => {
              if (res.type === "cancel") return;
              const uri = res.uri;

              /// Lägg till bok och uri i db
              useBook(uri, (book: Book) => {
                const isbn = book.metadata.identifier.find((id) => id.ext['opf:scheme'] === 'ISBN')?.text
                console.log(isbn);
                
                const title: Title = {
                  title: book.metadata.title[0].text,
                  isbn: isbn ? isbn : '-1',
                } 
                const data: TitleData = {
                  relImgPath: book.manifest.cover.href,
                  uri: uri,
                  rootFolder: book.rootFolder,
                }
                addTitle(title, data)
              })
                .catch((err) => console.error('UPLOAD | USEBOOK:', err));

            })
            .catch((err) => console.error('UPLOAD | DOCUMENTPICKER:', err));
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