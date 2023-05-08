import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    organization: 'org-8ION5v6gukEFsPmZBBBWhSwx',
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

async function getCompletion(prompt, model = 'gpt-3.5-turbo') {

    const completion = await openai.createCompletion({
        model: model,
        prompt: prompt,
        temperature: 0       // The degree of randomness in the output
    });

    return completion.data.choices[0].text;
}

export { getCompletion };
