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

#### Example

Example XML:

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

_**config.ts**_

Usage:

```ts
mapping: {
  Name: 'Title', // returns textContent of specified tag
  Url:'URL', 
  ItemGroups: ['Groups', (item, index, array) => {
    return [...item.querySelectorAll('ItemGroup > Name')].map(name => name.textContent).join(',')
  }]
}
```
Output:

| Title  | URL                  | Groups          |
|--------|----------------------|-----------------|
| Item 1 | //example.com/item-1 | Group 1         |
| Item 2 | //example.com/item-2 | Group 1,Group 2 |
| Item 3 | //example.com/item-3 | Group 2,Group 3 |
