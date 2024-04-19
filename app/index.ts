import fs from "fs";
import { JSDOM } from "jsdom";

import config from '../config'
import Config, { ObjectItem, ValueMappingFunction } from './types'
import toCSV from "./utils";

if (!config?.xmlFilePath) {
  throw Error('File path not defined')
}

if (!config?.columnDataWrapper) {
  throw Error('No Item specified')
}

if (!config?.mapping) {
  throw Error('No mapping specified')
}

const appConfig: Config = config

function mapItems (items: HTMLElement[]) {
  const fields: ObjectItem[] = [];

  items.forEach((item, index, array) => {
    const obj: ObjectItem = {};

    Object.keys(appConfig.mapping).forEach(key => {
      const element: HTMLElement | null = item.querySelector(key);

      if (typeof appConfig.mapping[key] === "string") {
        const value = <string>appConfig.mapping[key]
        obj[value] = element?.textContent?.trim().replace(/[^0-9a-zæøåA-ZÆØÅ_.,\- ]/g, '') || ''

      } else if (typeof appConfig.mapping[key] === "object") {
        if (typeof appConfig.mapping[key][0] !== "string") throw Error('First argument must be a string')
        if (typeof appConfig.mapping[key][1] !== "function") throw Error('Second argument must be a function')

        const value = <ValueMappingFunction>appConfig.mapping[key][1]
        obj[appConfig.mapping[key][0]] = element ? value(element, index, array) : ''
      } else {
        console.log(`Can't find field "${key}" for index ${index}`)
      }
    });

    fields.push(obj);
  });

  if (fields.length) {
    fs.writeFileSync(`./output/${appConfig.outPutFileName || 'csvFromXML'}.csv`, toCSV(fields));
  }
}

async function run() {
  const file = await JSDOM.fromFile(appConfig.xmlFilePath);

  if (!file) return;

  const xmlDoc = file.window.document;

  const items = Array.from(xmlDoc.querySelectorAll<HTMLElement>(appConfig.columnDataWrapper))
      .filter((item, index, array) =>
          appConfig?.filter ? appConfig.filter(item, index, array) : true
      );

  mapItems(items)
}

run()
