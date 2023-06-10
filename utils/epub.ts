import { readAsStringAsync } from 'expo-file-system';
import { Parser } from 'react-native-xml2js';
import JSZip from 'jszip';

export type MetaItem = {
  ext: {[key: string]: string}
  text: string
}

export type ManifestItem = {
  href: string
  id: string
  mediaType: string
}

export type GuideItem = {
  href: string
  title: string
  type: string
}

export type Book = {
  uri: string
  rootFolder: string
  metadata: {[key: string]: MetaItem[]}
  manifest: {[id: string]: ManifestItem}
  spine: string[]
  guide: {[type: string]: GuideItem}
}

export const useBook = async (uri: string, callback: (book: Book) => void) => {
  const zip = new JSZip();
  await readAsStringAsync(uri, {encoding: 'base64'})
    .then(async (data) => {
      return zip.loadAsync(data, {base64: true})
    })
    .catch((err) => {
      throw new Error('INCORRECT FORMAT: not a zip+epub file'); 
    });
  const rootPath = await getRootPath(zip)
    .catch((err) => {
      throw new Error('INCORRECT FORMAT: content.opf path not specified');
    });
  const file = zip.file(rootPath);
  if (file === null) throw new Error('INCORRECT FORMAT: content.opf not found');
  const xmlText = await file.async('text')
    .catch((err) => {
      throw new Error('INCORRECT FORMAT', err);
    });
  const parser = new Parser({
    trim: true,
    explicitArray: false,
    explicitRoot: false
  });
  console.log(xmlText);

  parser.parseString(xmlText, (err: any, doc: any) => {
    
    if (err) {
      throw err;
    } else {
      const rootFolder = rootPath.replace('content.opf', '');
      const book: Book = {
        rootFolder: rootFolder,
        uri: uri,
        metadata: extractMetadata(doc),
        manifest: extractManifest(doc),
        spine: extractSpine(doc),
        guide: extractGuide(doc)
      };
      console.log('callback');
      
      callback(book)
    }
  });
  
}

export const awaitCoverData = async (bookURI: string, coverURI: string, rootFolder: string) => {
  const zip = new JSZip();
  await readAsStringAsync(bookURI, {encoding: 'base64'})
    .then(async (data) => {
      return zip.loadAsync(data, {base64: true})
    })
    .catch((_) => {
      throw new Error('INCORRECT FORMAT: not a zip+epub file'); 
    });
  const file = zip.file(rootFolder+coverURI);
  if (file === null) {
    return undefined;
  }
  return await file.async('base64')
    .then((data) => {
      const url =  URL.createObjectURL(
        new Blob([data], { type: `image/${coverURI.split('.')[-1]}` } /* (1) */)
      );
      return data;
    })
    .catch((err) => {
      console.error('jszip:', err);
      return undefined;
    })
  
};

const extractGuide = (doc: any) => {
  console.log('extractGuide');
  type Reference = {
    '$': {
      href: string,
      title: string,
      type: string
    }
  }

  const guide: {[type: string]: GuideItem} = {};
  const gui = doc.guide as {
    reference: Reference[] | Reference
  };
  if (!Array.isArray(gui.reference)) {
    guide[gui.reference.$.type] = {
      href: gui.reference.$.href,
      title: gui.reference.$.title,
      type: gui.reference.$.type
    };
    return guide;
  }
  for (let ref of gui.reference) {
    guide[ref.$.type] = {
      href: ref.$.href,
      title: ref.$.title,
      type: ref.$.type
    };
  }

  console.log('extractGuide');
  return guide;
};

const extractSpine = (doc: any) => {
  console.log('extractSpine');
  type ItemRef = {
    '$': {
      idref: string
    }
  }
  const spine: string[] = [];
  const sp = doc.spine as {
    itemref: ItemRef[] | ItemRef
  };
  if (!Array.isArray(sp.itemref)) {
    spine.push(sp.itemref.$.idref);
    return spine;
  }
  for (let item of sp.itemref) {
    spine.push(item.$.idref);
  }

  return spine;
};

const extractManifest = (doc: any) => {
  console.log('extractManifest');
  type Item = {
    '$': {
      href: string,
      id: string,
      'media-type': string
    }
  };
  const manifest: {[id: string]: ManifestItem} = {};
  const man = doc.manifest as {
    item: Item[] | Item
  };
  if (!Array.isArray(man.item)) {
    manifest[man.item.$.id] = {
      href: man.item.$.href,
      id: man.item.$.id,
      mediaType: man.item.$['media-type']
    };
    return manifest;
  }
  for (let item of man.item) {
    manifest[item.$.id] = {
      href: item.$.href,
      id: item.$.id,
      mediaType: item.$['media-type']
    };
  }

  return manifest;
};

const extractMetadata = (doc: any) => {
  console.log('extractMetadata');
  const metadata: {[key: string]: MetaItem[]} = {};
  const meta = doc.metadata as {
    [key: string]: {
      '$': {[key: string]: string}
      '_': string
    }
  };
  for (let [tag, val] of Object.entries(meta)) {
    if (tag === '$' || tag === '_') continue;
    tag = tag.replace('dc:', '')
    handleMetaValues(metadata, tag, val);
  }

  return metadata;
};

const handleMetaValues = (metadata: {[key: string]: MetaItem[]}, tag: string, val: any) => {
  let item: MetaItem | undefined = undefined;
  if (Array.isArray(val)) {
    for (const nval of val) {
      handleMetaValues(metadata, tag, nval)
    }
  } else if (typeof val === 'object') {
    item = {
      ext: val['$'] ? val['$'] : {},
      text: val['_'] ? val['_'] : ''
    };
  } else if (typeof val === 'string') {
    item = {
      ext: {},
      text: val
    };
  }
  if (item === undefined) return;
  if (metadata[tag]) metadata[tag].push(item);
  else metadata[tag] = [item];
};

const getRootPath = async (zip: JSZip) => {
  const cont = zip.file('META-INF/container.xml')
  if (cont === null) throw new Error('INCORRECT FORMAT: META-INF/container.xml not found');
  const res = RegExp(/full-path="([^"]+)"/).exec(await cont.async('text'));
  if (res === null) throw new Error('INCORRECT FORMAT: content.opf path not specified');
  else if (res.length >= 2) return res[1];
  else throw new Error('INCORRECT FORMAT: content.opf path not specified');
}