import { getCompletion } from '../helper.js';
import fs from 'fs';

// INFERRING
// This is about extract information (e.g. names), understanding sentiment, etc.
// Traditionally you need to collect data, train, deploy seperate models
// With LLM one model can do all of these
try {
    let review = fs.readFileSync('./review.txt', 'utf8');
    let story = fs.readFileSync('./story.txt', 'utf8');

    // SENTEMENT
    // This prompt returns the sentiment of the product review.
    let prompt1 = 'What is the sentiment of the following product review, ' +
        'which is delimited with triple quotes.\n\n' +
        'Review text: """' + review + '"""';


    // SENTEMENT - Concise
    // This prompt returns a single word sentiment.
    let prompt2 = 'What is the sentiment of the following product review, ' +
        'which is delimited with triple quotes.\n\n' +
        'Give your answer as a single word, either "positive" ' +
        'or "negative".\n\n' +
        'Review text: """' + review + '"""';


    // EMOTIVE CONTENT
    // The LLM is good at identifying emotional content
    let prompt3 = 'Identify a list of emotions that the writer of the ' +
        'following review is expressing. Include no more than ' +
        'five items in the list. Format your answer as a list of ' +
        'lower-case words separated by commas.\n\n' +
        'Review text: """' + review + '"""';


    // SPECIFIC EMOTIVE CONTENT
    // Here we just want to identiy a perticular emotion
    let prompt4 = 'Is the writer of the following review expressing anger? ' +
        'The review is delimited with triple quotes. ' +
        'Give your answer as either yes or no.\n\n' +
        'Review text: """' + review + '"""';


    // INFORMATION EXTRACTION
    // This allows us to extract specific items from unstructured information
    let prompt5 = 'Identify the following items from the review text:\n' +
        '- Item purchased by reviewer\n' +
        '- Company that made the item\n\n' +
        'The review is delimited with triple quotes.\n' +
        'Format your response as a JSON object with ' +
        '"Item" and "Brand" as the keys.\n' +
        'If the information isn\'t present, use "unknown" as the value.\n' +
        'Make your response as short as possible.\n' +
        'Review text: """' + review + '"""';


    // MULTI-TASKING
    // This shows we can do many of the items above in one go
    let prompt6 = 'Identify the following items from the review text:\n' +
        '- Sentiment (positive or negative)\n' +
        '- Is the reviewer expressing anger? (true or false)\n' +
        '- Item purchased by reviewer\n' +
        '- Company that made the item\n\n' +
        'The review is delimited with triple quotes.\n' +
        'Format your response as a JSON object with ' +
        '"Sentiment", "Anger", "Item" and "Brand" as the keys.\n' +
        'If the information isn\'t present, use "unknown" as the value.\n' +
        'Make your response as short as possible.\n' +
        'Format the Anger value as a boolean.\n\n' +
        'Review text: """' + review + '"""';


    // INFERING TOPICS
    // This allows us to identify key topics in some text.
    let prompt7 = 'Determine five topics that are being discussed in the ' +
        'following text, which is delimited by triple quotes.\n\n' +
        'Make each item one or two words long.\n\n' +
        'Format your response as a list of items separated by commas.\n' +
        'Text sample: """' + story + '"""';


    // CATEGORIZE BY TOPICS (Zero shot learning)
    // Here we take a topic list and see if the story discusses those topics.
    let topic_list = [
        "nasa",
        "local government",
        "engineering",
        "employee satisfaction",
        "federal government"
    ]


    let prompt8 = 'Determine whether each item in the following list of ' +
        'topics is a topic in the text below, which ' +
        'is delimited with triple quotes.\n\n' +
        'Give your answer as a JSON object with a boolean for each topic.\n' +
        'List of topics: {' + topic_list.join(', ') +'}' +
        'Text sample: """' + story + '"""';


    let completion = await getCompletion(prompt8);
    console.log(completion);
} catch (err) {
  console.error(err);
}
