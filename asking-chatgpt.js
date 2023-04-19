import { createInterface } from "readline";
import dotenv from "dotenv";

import { Configuration,  OpenAIApi} from "openai";

dotenv.config();

const readline = createInterface({ input: process.stdin, output: process.stdout });

const configuration = new Configuration({organization: process.env.ORGANIZATION_ID, apiKey: process.env.API_KEY_CHATGPT});
const openai = new OpenAIApi(configuration);

const MODEL_GPT = process.env.MODEL_GPT;


console.log("\x1b[33m << Let\'s ask ChatGpt by console (write quit to close) >> \x1b[0m");
readline.setPrompt("\x1b[36m Insert your question: \x1b[0m");
readline.prompt();

readline.on("line", async(line) => {
  if(line === "quit"){
    console.log("\x1b[33m Bye! \x1b[0m");
    readline.close();
  }
  else if(!line){
    console.log("\x1b[33m There is no question. Write quit to close the app. \x1b[0m");
    readline.prompt();
  }
  else{
    const messages = [{role: "user", content: line}];

    try{

      const response =  await openai.createChatCompletion({ model: MODEL_GPT, messages: messages });
      console.log("\x1b[35m ChatGPT: \x1b[0m", response.data["choices"][0].message.content);

    }catch(error){
      console.log(":( Error: ", error);
    }

    readline.prompt();
  }  
});

