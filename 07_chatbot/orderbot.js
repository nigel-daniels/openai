import { getCompletionFromMessages } from '../helper.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs';

// NOTE: This is a Node.js command line version of the order chat.
// Set up the try for reading the file
try {
    // Get the initial context for this
    const initialContext = fs.readFileSync('./context.txt', 'utf8');
    const summary = fs.readFileSync('./summary.txt', 'utf8');
    // Set up the input stream to read the console
    const read = readline.createInterface({ input, output });
    // Populate the initial context
    let context = [
        {'role': 'system', 'content': initialContext},
        {'role': 'user', 'content': ''}
    ];

    // Tell the user how to end the coversation and set up the end flag
    console.log('Just say "done" to stop chatting and to get an order summary.\n');
    let ok = true;

    // Now continually loop chatting until the user is done
    do {
        // Get the LLM response
        let completion = await getCompletionFromMessages(context, undefined, 1);

        // Print the LLM response and add it to the context
        console.log('OrderBot : ' + completion);
        context.push({'role' : 'assistant', 'content': completion});

        // Get the users input and add it to the context
        let prompt = await read.question('You      : ');
        context.push({'role' : 'user', 'content': prompt});

        // Check if the user is done
        ok = prompt == 'done' ? false : true;
    } while (ok);

    // close the input stream
    read.close();

    // Now add the summarization instructions and get a response
    // NOTE: this time we use a low temp for a consistent result
    context.push({'role':'system', 'content': summary});
    let lastCompletion = await getCompletionFromMessages(context, undefined, 0);
    console.log('Summary  : ' + lastCompletion);
    
// Here we catch any thrown errors and report them
} catch (err) {
    console.error(err);
}
