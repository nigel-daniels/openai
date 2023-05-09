import { getCompletion } from '../helper.js';
import fs from 'fs';

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
        "La performance du système est plus lente que d'habitude.",  // System performance is slower than normal
        "Mi monitor tiene píxeles que no se iluminan.",              // My monitor has pixels that are not lighting
        "Il mio mouse non funziona",                                 // My mouse is not working
        "Mój klawisz Ctrl jest zepsuty",                             // My keyboard has a broken control key
        "我的屏幕在闪烁"                                               // My screen is flashing
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


    let completion = await getCompletion(prompt6);

    console.log(completion);
} catch (err) {
    console.error(err);
}
