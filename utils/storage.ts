
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Title = {
  isbn: string
  title: string
}

export type AllTitles = {
  titles: Title[]
}

export type TitleData = {
  uri: string
  rootFolder: string
  relImgPath: string
}

export const addTitle = async (title: Title, data: TitleData) => {
  let all_titles = await AsyncStorage.getItem('all_titles')
  if (all_titles) {
    const parsed = JSON.parse(all_titles) as AllTitles
    parsed.titles = parsed.titles.filter((t) => t.isbn !== title.isbn)
    parsed.titles.push(title)
    await AsyncStorage.setItem('all_titles', JSON.stringify(parsed))
  } else {
    await AsyncStorage.setItem('all_titles', JSON.stringify({titles: [title]}))
  }
  await AsyncStorage.setItem(title.isbn, JSON.stringify(data))
}

export const getAllTitles = async () => {
  let all_titles = await AsyncStorage.getItem('all_titles')
  if (all_titles) {
    return JSON.parse(all_titles) as AllTitles
  } else {
    return {titles: []} as AllTitles
  }
}

export const getData = async (isbn: string) => {
  let data = await AsyncStorage.getItem(isbn)
  if (data) {
    return JSON.parse(data) as TitleData
  } else {
    throw new Error(`No data found for isbn: ${isbn}, try adding the title again.`)
  }
}