import { ObjectItem } from "./types";

export default function toCSV(items: ObjectItem[]) {
  const replacer = (_: any, value: string | null) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(items[0])
  return [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')
}
