import { getCompletion } from '../helper.js';
import fs from 'fs';
import colors from 'colors';
import * as Diff from 'diff';

// TRANSFORMING
// Using transfromation or translation tasks
try {
    // TRANSLATION
    let prompt1 = 'Translate the following English text to Spanish:\n' +
        '```Hi, I would like to order a blender```';


    // LANGUAGE IDENTIFICATION
    let prompt2 = 'Tell me which language this is:\n' +
        '```Combien coûte le lampadaire?```';

    // MULTIPLE TRANSLATIONS
    let prompt3 = 'Translate the following  text to French and Spanish ' +
        'and English pirate:\n' +
        '```I want to order a basketball```';

    // TRANSLATIONS WITH LANGUAGE MODES
    let prompt4 = 'Translate the following text to Spanish in both the ' +
        'formal and informal forms:\n' +
        '"Would you like to order a pillow?"';


    // UNIVERSAL TRANSLATION - Multiple inputs
    /*
    let messages = [
        'La performance du système est plus lente que d'habitude.',  // System performance is slower than normal
        'Mi monitor tiene píxeles que no se iluminan.',              // My monitor has pixels that are not lighting
        'Il mio mouse non funziona',                                 // My mouse is not working
        'Mój klawisz Ctrl jest zepsuty',                             // My keyboard has a broken control key
        '我的屏幕在闪烁'                                               // My screen is flashing
    ]

    for (let message of messages) {
        let prompt_a = 'Tell me what language this is: ' + message;
        let language = await getCompletion(prompt_a);

        console.log(language + ': ' + message);

        let prompt_b = 'Translate the following  text to English ' +
            'and Korean: "' + message + '".'

        let translations = await getCompletion(prompt_b);
        console.log(translations + '\n');
    }
    */


    // TONE TRANSFORMATION
    let prompt5 = 'Translate the following from slang to a business letter:\n' +
        '"Dude, This is Joe, check out this spec on this standing lamp."';


    // TRANSFORMING FORMATS
    let data = { 'resturant employees' :[
        {'name':'Shyam', 'email':'shyamjaiswal@gmail.com'},
        {'name':'Bob', 'email':'bob32@gmail.com'},
        {'name':'Jai', 'email':'jai87@gmail.com'}
    ]}

    let prompt6 = 'Translate the following JSON to ' +
        'an HTML table with column headers and title:\n' +
        JSON.stringify(data);

    // SPELLING AND GRAMMER ISSUES
    /*
    let sentences = [
        'The girl with the black and white puppies have a ball.',  // The girl has a ball.
        'Yolanda has her notebook.', // ok
        'Its going to be a long day. Does the car need it’s oil changed?',  // Homonyms
        'Their goes my freedom. There going to bring they’re suitcases.',  // Homonyms
        'Your going to need you’re notebook.',  // Homonyms
        'That medicine effects my ability to sleep. Have you heard of the butterfly affect?', // Homonyms
        'This phrase is to cherck chatGPT for speling abilitty'  // spelling
    ];

    for (let sentence of sentences) {
        let prompt_c = 'Proofread and correct the following text ' +
            'and rewrite the corrected version. If you don\'t find ' +
            'any errors, just say "No errors found". Don\'t use ' +
            'any punctuation around the text:\n' +
            '"""' + sentence + '"""';

        let correction = await getCompletion(prompt_c);
        console.log(correction + '\n');
    };
    */



    let text = 'Got this for my daughter for her birthday cuz she keeps taking ' +
        'mine from my room.  Yes, adults also like pandas too.  She takes ' +
        'it everywhere with her, and it\'s super soft and cute.  One of the ' +
        'ears is a bit lower than the other, and I don\'t think that was ' +
        'designed to be asymmetrical. It\'s a bit small for what I paid for it ' +
        'though. I think there might be other options that are bigger for ' +
        'the same price.  It arrived a day earlier than expected, so I got ' +
        'to play with it myself before I gave it to my daughter.';

    // PROOFREADING AND CORRECTING
    /*
    let prompt7 = 'proofread and correct this review:\n"' +
        text + '"';

    let completion = await getCompletion(prompt7);

    let diff = Diff.diffChars(text, completion);

    diff.forEach((part) => {
        // green for additions, red for deletions
        // grey for common parts
        const color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
    */


    // PROOFREAD, CORRECT AND CHANGE TONE
    let prompt8 = 'Proofread and correct this review. Make it more compelling. ' +
        'Ensure it follows APA style guide and targets an advanced reader. ' +
        'Output in markdown format.\n' +
        '"' + text + '"';

    let completion = await getCompletion(prompt8);
    console.log(completion);
} catch (err) {
    console.error(err);
}
