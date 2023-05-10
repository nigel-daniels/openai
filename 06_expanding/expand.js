import { getCompletion } from '../helper.js';
import fs from 'fs';

// TEMPERATURE
// This is the amount of entropy in selecting a response, for example:
// To complete "My favorite food is ..." the likely hoods are:
// Pizza    0.53
// Sushi    0.30
// Tacos    0.05
//
// With temperature 0 the response will always be the most likely result,
// i.e.'Pizza', with a temperature of 0.3 we may occasionally see 'Sushi',
// and with a higher temperature of 0.7 we could see 'Tacos'
// (with only a 5% chance of selection).
// With a higher temperature in a sequence of completions the results will
// be more divergent the higher the temperature. As a basic approach:
//
// temp. 0 for a predictable and reliable system.
// temp. 0.3 for a task needing variety.
// temp. 0.7 again for even greater variety and creativity.
//
// NOTE: In this example we have different tempratures set so use
//          different getCompletion calls, see below.

try {
    const review = fs.readFileSync('./review.txt', 'utf8');
    const sentement = 'negative';
    // GENERATE REPLY
    // Based on a customer review and a previously extracted sentenment
    // write and email to the reviewer.
    let prompt1 = 'You are a customer service AI assistant.\n' +
        'Your task is to send an email reply to a valued customer.' +
        'Given the customer email delimited by ```, ' +
        'Generate a reply to thank the customer for their review.' +
        'If the sentiment is positive or neutral, thank them for ' +
        'their review.\n' +
        'If the sentiment is negative, apologize and suggest that ' +
        'they can reach out to customer service.\n' +
        'Make sure to use specific details from the review.\n' +
        'Write in a concise and professional tone.\n' +
        'Sign the email as `AI customer agent`.\n' +
        'Customer review: ```' + review + '```\n' +
        'Review sentiment: ' + sentement;


    /* let completion = await getCompletion(prompt1); */
    let completion = await getCompletion(prompt1, undefined,0.7);

    console.log(completion);
} catch (err) {
    console.error(err);
}
