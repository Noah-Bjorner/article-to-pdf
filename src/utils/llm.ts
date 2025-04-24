// feels like I want to take all avaible data from readabilty and give the llm the task to create all the html including title etc. Not split in multiple files.
// fine tune 4.1 mini?

import { Env } from '../../worker-configuration';


export async function llmHTMLContent(env: Env) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}