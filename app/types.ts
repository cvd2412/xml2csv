export type ObjectItem = { [key: string]: string }

export type ValueMappingFunction = (item: HTMLElement, index: number, array: (typeof item)[]) => string

interface Config {
  /**
   * Output file's name
   */
  outPutFileName?: string;
  /**
   * Relative path to xml file
   */
  xmlFilePath: string;
  /**
   * ```ts
   * mapping: {
   *   [XML Tag Name]: CSV Header // returns textContent
   *   [XML Tag Name]: [CSV Header, () => { ... }] // custom return
   * }
   * ```
   */
  mapping: {
    [key: string]: string | [string, ValueMappingFunction]
  }
  /**
   * Name of the tag wrapping column data
   */
  columnDataWrapper: string
  /**
   * Filter xml items
   */
  filter?: (item: HTMLElement, index: number, array: (typeof item)[]) => boolean
}

export default Config
