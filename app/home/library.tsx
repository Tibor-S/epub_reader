import { useEffect, useState } from "react";
import { Text, XStack, YStack, styled, Button } from "tamagui"
import { Book, useBook } from "../../utils/epub";
import { Title, TitleData, getAllTitles, getData } from "../../utils/storage";
import { promises } from "fs";



export default () => {
  
  const [bookTitles, setBookTitles] = useState<Title[]>([]);
  const [bookCovers, setBookCovers] = useState<{[isbn: string]: string}>({});
  const [bookURIs, setBookURIS] = useState<{[isbn: string]: string}>({});

  useEffect(() => {
    console.log('useEffect: Loading library titles')
    getAllTitles().then((titles) => {
      setBookTitles(titles.titles);
      return titles.titles;
    })
    .then((titles) => {
      const nCovers = {};
      const nURIs = {};
      const errors: any[] = []
      const promises: Promise<void>[] = []
      for (const title of titles) {
        promises.push(getData(title.isbn)
          .then((data) => {
            nCovers[title.isbn] = data.relImgPath;
            nURIs[title.isbn] = data.uri;
          }).catch((err) => {
            errors.push(err);
          })
        )
      }
      Promise.allSettled(promises).then((values) => {
        setBookCovers(nCovers);
        setBookURIS(nURIs);
        if (errors.length > 0) {
          alert(errors[0]);
        }
      });
    })
  }, []);

  return (
    <XStack flexWrap="wrap" >
      {bookTitles.map(({title, isbn}) => (
        <BookEl title={title} uri={bookURIs[isbn]} cover={bookCovers[isbn]} key={isbn} />
      ))}
    </XStack>
  )
}

const BookEl = ({title, uri, cover}: {title: string, uri: string, cover: string}) => {


  return (
    <BookContainer>
      <Text>{title},{cover}</Text>
    </BookContainer>
  )
} 

const BookContainer = styled(YStack, {
  width: '50%',
  padding: 10,
  backgroundColor: '#f1e9c6',
});