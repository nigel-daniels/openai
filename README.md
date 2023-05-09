# openai
Test code for ChatGPT prompt engineering course. This is based on the DeepLearning.AI, ChatGPT [Prompt Engineering for Developers](https://learn.deeplearning.ai/chatgpt-prompt-eng/lesson/1/introduction) course. Although I converted all of the examples from Python to JavaScript.

If you want to try these out you will first need to setup your own ChatGPT secret key in your local environment. [Here](https://chatgpt.en.obiscr.com/blog/posts/2023/How-to-get-api-key/) is how you get a key. Once you have this put it in a local (server side) environment variable. For example in Mac OS, assuming you are using `zsh`, append the following to the file `.zshenv` in you own home directory:
```
export OPENAI_API_KEY='your_secret_key_value'
```
When you restart the shell or your machine the environment value `OPENAI_API_KEY` will be available to the `helper.js`.
