import Config from './app/types'

export default {
  outPutFileName: '',
  xmlFilePath: './test.xml',
  columnDataWrapper: 'Item',

  filter: (item) => !!item.querySelector('Name')?.textContent,

  mapping: {
    Name: 'Title',
    EAN: 'Metafield: facts.ean [single_line_text_field]',
    NoIndex: 'Metafield: seo.noindex [boolean]',
    InternalKeywords: ['Tags', (item) => item.textContent?.trim().split(',').filter(i => i).join(',') || ''],
  }
} satisfies Config
