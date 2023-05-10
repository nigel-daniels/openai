import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    //organization: 'org-8ION5v6gukEFsPmZBBBWhSwx',
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

async function getCompletion( prompt, model = 'gpt-3.5-turbo', temperature = 0 ) {
    const messages = [{
        role: 'user',
        content: prompt
    }];

    const completion = await openai.createChatCompletion({
        model: model,
        messages: messages,
        temperature: temperature       // The degree of randomness in the output
    });

    return completion.data.choices[0].message.content;
};


// This function expects an array of messages, e.g.:
//
// let messages =  [
//      {'role':'system', 'content':'You are an assistant...'},
//      {'role':'user', 'content':'tell me a joke'},
//      {'role':'assistant', 'content':'Why did the chicken cross the road'},
//      {'role':'user', 'content':'I don\'t know'}
// ]
//
// Note the different role specifications:
//
//  system:     Sets the behaviour of the system for the ensuing conversation.
//              We could have said: 'You are an assistant that speaks like Shakespeare.'
//              The user never sees this but it set's the tone the system
//              uses in the conversation
//  assistant:  This is the chat models compleations.
//  user:       This is the enties the user makes
async function getCompletionFromMessages( messages, model = 'gpt-3.5-turbo', temperature = 0 ) {
    const completion = await openai.createChatCompletion({
        model: model,
        messages: messages,
        temperature: temperature       // The degree of randomness in the output
    });

    return completion.data.choices[0].message.content;
};

export { getCompletion, getCompletionFromMessages };
