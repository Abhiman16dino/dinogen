async function genJS(prompt) {

const { TextServiceClient } =
  require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");

const API_KEY = "AIzaSyB1rxyM4hj9Apyg8Xy-WpcZ_7snvfpP-L0"

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

//const prompt = "Repeat after me: one, two,";
let data = await client
.generateText({
  model: MODEL_NAME,
  prompt: {
    text: prompt,
  },
});

 return data[0].candidates[0].output
}

module.exports = { genJS }