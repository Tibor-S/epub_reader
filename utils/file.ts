import * as DocumentPicker from 'expo-document-picker';


const awaitFile = async () => {
  return DocumentPicker.getDocumentAsync()
}

export {
  awaitFile
}