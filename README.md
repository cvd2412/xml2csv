# XML2CSV
Options:

* `outPutFileName` Output file's name (Optional)

* `xmlFilePath`: Path to xml file

* `columnDataWrapper` Name of the tag wrapping column data

* `filter` Filter items with function

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
                <Name>Cool group</Name>
                <ItemSortOrderInGroup>0</ItemSortOrderInGroup>
            </ItemGroup>
            <ItemGroup>
                <Id>123455</Id>
                <Name>Awesome group</Name>
                <ItemSortOrderInGroup>0</ItemSortOrderInGroup>
            </ItemGroup>
        </ItemGroups>
    </Item>
    <Item>
        <Id>1230</Id>
        <Name>Item 2</Name>
        <Url>//example.com/item-2</Url>
        <ItemGroups>
            <ItemGroup>
                <Id>123454</Id>
                <Name>Default</Name>
            </ItemGroup>
        </ItemGroups>
    </Item>
</Items>
```

**config.ts**

Usage:
```ts
 mapping: {
   Name: 'Title', // returns textContent of specified tag
   Url: 'URL',
   ItemGroups: ['Groups', (item, index, array) => {
     return [...item.querySelectorAll('ItemGroup > Id')].map(id => id.textContent).join(',')
   }]
}
```
