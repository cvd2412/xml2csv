import Config from './app/types'

export default {
  outPutFileName: 'example',
  xmlFilePath: './example.xml',
  columnDataWrapper: 'Item',

  filter: (item, index, array) => true,

  mapping: {

  }
} satisfies Config
