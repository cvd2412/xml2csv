# XML2CSV

## Install

```bash
$ npm run start
```

## Options

| Option              | Description                              |
|---------------------|------------------------------------------|
| `outPutFileName`    | _(Optional)_ Name of the output file       |
| `filter`            | _(Optional)_ Filter items with function    |
| `xmlFilePath`       | Path to xml file                         |
| `columnDataWrapper` | Name of the xml tag wrapping column data |
| `mapping`           | See below                                |

### Mapping

#### Example usage

example.xml
```xml
<Items>
    <Item>
        <Id>1230</Id>
        <Name>Item 1</Name>
        <Url>//example.com/item-1</Url>
        <ItemGroups>
            <ItemGroup>
                <Id>123456</Id>
                <Name>Group 1</Name>
            </ItemGroup>
            ...
        </ItemGroups>
    </Item>
    ...
</Items>
```

config.ts
```ts
export default {
  xmlFilePath: './example.xml',
  columnDataWrapper: 'Item',

  filter: (item) => !!item.querySelector('Name')?.textContent,

  mapping: {
    Name: 'Title',
    EAN: 'Metafield: facts.ean [single_line_text_field]',
    NoIndex: 'Metafield: seo.noindex [boolean]',
    InternalKeywords: ['Tags', (item) => item.textContent?.trim().split(',').filter(i => i).join(',') || ''],
  }
}
```

**config.ts**

#### Output:

| Title  | URL                  | Groups          |
|--------|----------------------|-----------------|
| Item 1 | //example.com/item-1 | Group 1         |
| Item 2 | //example.com/item-2 | Group 1,Group 2 |
| Item 3 | //example.com/item-3 | Group 2,Group 3 |
