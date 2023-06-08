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
  console.log(zip.files);
  const xmlText = await getRootPath(zip)
    .then((root) => {
      return zip.file(root).async('text')
    })
    .catch((err) => {
      throw err;
    });
  const parser = new Parser({
    trim: true,
    explicitArray: false,
    explicitRoot: false
  });
  parser.parseString(xmlText, (err: any, doc: any) => {
    if (err) {
      throw err;
    } else {
      const book: Book = {
        metadata: extractMetadata(doc),
        manifest: extractManifest(doc),
        spine: extractSpine(doc),
        guide: extractGuide(doc)
      };
      callback(book)
    }
  });
  
}

const extractGuide = (doc: any) => {
  const guide: {[type: string]: GuideItem} = {};
  const man = doc.guide as {
    reference: {
      '$': {
        href: string,
        title: string,
        type: string
      }
    }[]
  };
  for (let ref of man.reference) {
    guide[ref.$.type] = {
      href: ref.$.href,
      title: ref.$.title,
      type: ref.$.type
    };
  }

  return guide;
};

const extractSpine = (doc: any) => {
  const spine: string[] = [];
  const sp = doc.spine as {
    itemref: {
      '$': {
        idref: string,
      }
    }[]
  };
  for (let item of sp.itemref) {
    spine.push(item.$.idref);
  }

  return spine;
};

const extractManifest = (doc: any) => {
  const manifest: {[id: string]: ManifestItem} = {};
  const man = doc.manifest as {
    item: {
      '$': {
        href: string,
        id: string,
        'media-type': string
      }
    }[]
  };
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
  let item: MetaItem = undefined;
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
  if (res.length >= 2) return res[1];
  else throw new Error('INCORRECT FORMAT: content.opf path not specified');
}