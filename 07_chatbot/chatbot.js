import { getCompletionFromMessages } from '../helper.js';


// SYSTEM EXAMPLE
// Here we get the chatbot to talk like Shakespeare,
// this may need to be run a couple of times even with temp at 1
let messages1 = [
    {'role':'system', 'content':'You are an assistant that speaks like Shakespeare.'},
    {'role':'user', 'content':'tell me a joke'},
    {'role':'assistant', 'content':'Why did the chicken cross the road'},
    {'role':'user', 'content':'I don\'t know'}
];

// CONVERSATION EXAMPLE 1 - NOTE: Run these two in order
// Here we have a brief friendly conversation.
let messages2 = [
    {'role':'system', 'content':'You are friendly chatbot.'},
    {'role':'user', 'content':'Hi, my name is Isa'}
];

// Here we ask the chatbot to greet us but it has no
// 'memory' of the conversation above
let messages3 = [
    {'role':'system', 'content':'You are friendly chatbot.'},
    {'role':'user', 'content':'Yes,  can you remind me, What is my name?'}
];


// CONVERSATION CONTEXT
// Now the system has the correct context it can 'remember' the users name
let messages4 = [
    {'role':'system', 'content':'You are friendly chatbot.'},
    {'role':'user', 'content':'Hi, my name is Isa'},
    {'role':'assistant', 'content': "Hi Isa! It's nice to meet you. Is there anything I can help you with today?"},
    {'role':'user', 'content':'Yes, you can remind me, What is my name?'}
];

// The system needs context as each conversation is standalone
// NOTE: We run these with temperature set to 1 to get creative results
let completion = await getCompletionFromMessages(messages4, undefined, 1);
console.log(completion);
