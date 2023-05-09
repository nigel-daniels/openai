import { getCompletion } from '../helper.js';
import fs from 'fs';

// Have a good process for iteratively getting a working prompts
// here are some iterative frameworks to generate good prompts

// ML DEV is iteratively
/*
                           Idea
                          ^    \
        (Error analysis) /      \
                        /        \
                       /          >
    Experimental result<----------Implementation (code/data) PROMPT
*/

// Prompt guidelines:
//  - Be clear and specific
//  - Analyze why result does not give desired output
//  - Refine the idea and prompt
//  - Repeat

// In this example we will aim to summarize a product fact sheet
try {
    const fact_sheet = fs.readFileSync('./fact_sheet.txt', 'utf8');

    let prompt1 = 'Your task is to help a marketing team create a ' +
    'description for a retail website of a product based ' +
    'on a technical fact sheet.\n\n' +
    'Write a product description based on the information ' +
    'provided in the technical specifications delimited by ' +
    'triple backticks.\n\n' +
    'Technical specifications: ```' + fact_sheet + '```';

    // ISSUE: Text is too long
    // The first version is too verbose so let's limit the
    // response to 50 words or we could say 3 senteces, etc.
    let prompt2 = 'Your task is to help a marketing team create a ' +
    'description for a retail website of a product based ' +
    'on a technical fact sheet.\n\n' +
    'Write a product description based on the information ' +
    'provided in the technical specifications delimited by ' +
    'triple backticks.\n\n' +
    'Use at most 50 words.\n\n' +
    'Technical specifications: ```' + fact_sheet + '```';

    // ISSUE: Focus is incorrect
    // If we were targetting commercial buyers then we may now want to
    // let the model know who the inended audience is
    let prompt3 = 'Your task is to help a marketing team create a ' +
    'description for a retail website of a product based ' +
    'on a technical fact sheet.\n\n' +
    'Write a product description based on the information ' +
    'provided in the technical specifications delimited by ' +
    'triple backticks.\n\n' +
    'The description is intended for furniture retailers, ' +
    'so should be technical in nature and focus on the ' +
    'materials the product is constructed from.\n\n' +
    'Use at most 50 words.\n\n' +
    'Technical specifications: ```' + fact_sheet + '```';

    // ISSUE: We need specific details
    // Refining this further we may consider that including the product IDs
    // is critical for the description.
    let prompt4 = 'Your task is to help a marketing team create a ' +
    'description for a retail website of a product based ' +
    'on a technical fact sheet.\n\n' +
    'Write a product description based on the information ' +
    'provided in the technical specifications delimited by ' +
    'triple backticks.\n\n' +
    'The description is intended for furniture retailers, ' +
    'so should be technical in nature and focus on the ' +
    'materials the product is constructed from.\n\n' +
    'At the end of the description, include every 7-character ' +
    'Product ID in the technical specification.\n\n' +
    'Use at most 50 words.\n\n' +
    'Technical specifications: ```' + fact_sheet + '```';

    // ISSUE: We need a table of dimentsions, and all in HTML
    // This time we nned to extract and tabulate information,
    // at the same time we can get the results in HTML, web ready!
    let prompt5 = 'Your task is to help a marketing team create a ' +
    'description for a retail website of a product based ' +
    'on a technical fact sheet.\n\n' +
    'Write a product description based on the information ' +
    'provided in the technical specifications delimited by ' +
    'triple backticks.\n\n' +
    'The description is intended for furniture retailers, ' +
    'so should be technical in nature and focus on the ' +
    'materials the product is constructed from.\n\n' +
    'At the end of the description, include every 7-character ' +
    'Product ID in the technical specification.\n\n' +
    'Use at most 50 words.\n\n' +
    'After the description, include a table that gives the ' +
    'In the first column include the name of the dimension.\n' +
    'Give the table the title \'Product Dimensions\'.\n\n' +
    'Format everything as HTML that can be used in a website.\n' +
    'Place the description in a <div> element.\n\n' +
    'Technical specifications: ```' + fact_sheet + '```';

    // Iterative process:
    //  - Try something
    //  - Analyze where the result does not give you what you want
    //  - Clarify the instructions, give more time to think
    //  - Refine prompts with a batch of examples (start small and expand cases)

    let completion = await getCompletion(prompt5);

    console.log(completion);
} catch (err) {
    console.error(err);
}
