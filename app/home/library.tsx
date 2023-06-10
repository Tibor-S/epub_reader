import { useEffect, useState } from "react";
import { Image, Text, XStack, YStack, styled } from "tamagui"
import { awaitCoverData } from "../../utils/epub";
import { Title, getAllTitles, getData } from "../../utils/storage";
import Canvas, { ImageData } from 'react-native-canvas'



export default () => {
  
  const [bookTitles, setBookTitles] = useState<Title[]>([]);
  const [bookCovers, setBookCovers] = useState<{[isbn: string]: string}>({});
  const [bookURIs, setBookURIS] = useState<{[isbn: string]: string}>({});
  const [bookRoots, setBookRoots] = useState<{[isbn: string]: string}>({});

  useEffect(() => {
    getAllTitles().then((titles) => {
      setBookTitles(titles.titles);
      return titles.titles;
    })
    .then((titles) => {
      
      const nCovers = {};
      const nURIs = {};
      const nRoots = {};
      const errors: any[] = []
      const promises: Promise<void>[] = []
      for (const title of titles) {
        promises.push(getData(title.isbn)
          .then((data) => {
            nCovers[title.isbn] = data.relImgPath;
            nURIs[title.isbn] = data.uri;
            nRoots[title.isbn] = data.rootFolder;
          }).catch((err) => {
            errors.push(err);
          })
        )
      }
      Promise.allSettled(promises).then((values) => {
        setBookCovers(nCovers);
        setBookURIS(nURIs);
        setBookRoots(nRoots);
        if (errors.length > 0) {
          alert(errors[0]);
        }
      });
    })
  }, []);

  return (
    <XStack flexWrap="wrap" >
      {bookTitles.map(({title, isbn}) => (
        <BookEl title={title} uri={bookURIs[isbn]} cover={bookCovers[isbn]} root={bookRoots[isbn]} key={isbn} />
      ))}
    </XStack>
  )
}

const BookEl = ({title, uri, cover, root}: {title?: string, uri?: string, cover?: string, root?: string}) => {

  const [coverData, setCoverData] = useState<string>();

  useEffect(() => {
    if (uri && cover && root !== undefined) awaitCoverData(uri, cover, root)
      .then((data) => setCoverData(data))
      .catch((err) => console.error(err));
  }, [uri, cover, root]);

  return (
    <BookContainer>
      <Image 
        source={coverData ? {uri: `data:text/css;base64,${coverData}`} : require('../../assets/favicon.png')} 
        style={{flex: 1, }} 
      />
      <Text>{title},{cover}</Text>
    </BookContainer>
  )
} 

const BookContainer = styled(YStack, {
  width: '50%',
  height: 350,
  padding: 20,
  backgroundColor: '#f1e9c6',
});