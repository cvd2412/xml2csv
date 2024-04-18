# XML2CSV
Options:

`outPutFileName` Output file's name (Optional)

`xmlFilePath`: Path to xml file

`columnDataWrapper` Name of the tag wrapping column data

`filter` Filter items with function

### Mapping
Usage:
```ts
 mapping: {
   TagName: 'CSV Header' // returns textContent of specified tag
   TagName: ['CSV Header', () => { ... return string }] // custom return
}
```
