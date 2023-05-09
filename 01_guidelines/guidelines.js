import { getCompletion } from '../helper.js';

//////////////////////////// PRINCIPLE 1 ////////////////////////////

// WRITE CLEAR AND SPECIFIC INSTRUCTIONS
// Note: short != clear

// TACTIC 1
// Use delimiters, these can be ```, """, <>, <tag></tag>, :
// This can also be used to prevent user injection

// EXAMPLE
let delim_text = 'You should express what you want a model to do by ' +
'providing instructions that are as clear and ' +
'specific as you can possibly make them. ' +
'This will guide the model towards the desired output, ' +
'and reduce the chances of receiving irrelevant ' +
'or incorrect responses. Don\'t confuse writing a ' +
'clear prompt with writing a short prompt. ' +
'In many cases, longer prompts provide more clarity ' +
'and context for the model, which can lead to ' +
'more detailed and relevant outputs.';

let delim_prompt = 'Summarize the text delimited by triple backticks ' +
'into a single sentence.\n' +
'```' + delim_text + '```';

// TACTIC 2
// Ask for structured output such as JSOn or HTML
// This can be used directly in code
let struct_prompt = 'Generate a list of three made-up book titles along ' +
'with their authors and genres.\n' +
'Provide them in JSON format with the following keys:\n' +
'book_id, title, author, genre.';


// TACTIC 3
// Check if conditions are satisfied, check assumptions required to do the task
// this can prevent a full run. This can be used to consider edge cases.
let cond1_text = 'Making a cup of tea is easy! First, you need to get some ' +
'water boiling. While that\'s happening, ' +
'grab a cup and put a tea bag in it. Once the water is ' +
'hot enough, just pour it over the tea bag. ' +
'Let it sit for a bit so the tea can steep. After a ' +
'few minutes, take out the tea bag. If you ' +
'like, you can add some sugar or milk to taste. ' +
'And that\'s it! You\'ve got yourself a delicious ' +
'cup of tea to enjoy.';

let cond2_text = 'The sun is shining brightly today, and the birds are ' +
'singing. It\'s a beautiful day to go for a ' +
'walk in the park. The flowers are blooming, and the ' +
'trees are swaying gently in the breeze. People ' +
'are out and about, enjoying the lovely weather. ' +
'Some are having picnics, while others are playing ' +
'games or simply relaxing on the grass. It\'s a ' +
'perfect day to spend time outdoors and appreciate the ' +
'beauty of nature.';

let cond_prompt = 'You will be provided with text delimited by triple quotes.\n' +
'If it contains a sequence of instructions, ' +
're-write those instructions in the following format:\n\n' +
'Step 1 - ...\n' +
'Step 2 - ...\n' +
'...\n' +
'Step N - ...\n\n' +
'If the text does not contain a sequence of instructions, ' +
'then simply write "No steps provided."\n' +
'"""' + cond2_text + '"""';


// TACTIC 4
// Few shot prompting, give successful examples of completing the task.
// Then ask the model to perform the task.
let fs_prompt = 'Your task is to answer in a consistent style.\n\n' +
'<child>: Teach me about patience.\n\n' +
'<grandparent>: The river that carves the deepest ' +
'valley flows from a modest spring; the ' +
'grandest symphony originates from a single note; ' +
'the most intricate tapestry begins with a solitary thread.\n\n' +
'<child>: Teach me about resilience.';


//////////////////////////// PRINCIPLE 2 ////////////////////////////

// GIVE THE MODEL TIME TO THINK.
// If the model is too complex it may make a poor guess

// TACTIC 1
// Specify the steps to complete the task such as:
// step 1
// step 2
// ...
// step n
let step_text = 'In a charming village, siblings Jack and Jill set out on ' +
'a quest to fetch water from a hilltop ' +
'well. As they climbed, singing joyfully, misfortune ' +
'struck—Jack tripped on a stone and tumbled ' +
'down the hill, with Jill following suit. ' +
'Though slightly battered, the pair returned home to ' +
'comforting embraces. Despite the mishap, ' +
'their adventurous spirits remained undimmed, and they ' +
'continued exploring with delight.';

let step1_prompt = 'Perform the following actions:\n' +
'1 - Summarize the following text delimited by triple ' +
'backticks with 1 sentence.\n' +
'2 - Translate the summary into French.\n' +
'3 - List each name in the French summary.\n' +
'4 - Output a json object that contains the following ' +
'keys: french_summary, num_names.\n\n' +
'Separate your answers with line breaks.\n\n' +
'Text:\n' +
'```' + step_text + '```';

let step2_prompt = 'Your task is to perform the following actions:\n' +
'1 - Summarize the following text delimited by <> with 1 sentence.\n' +
'2 - Translate the summary into French.\n' +
'3 - List each name in the French summary.\n' +
'4 - Output a json object that contains the following keys: \n' +
'french_summary, num_names.\n\n' +
'Use the following format:\n' +
'Text: <text to summarize>\n' +
'Summary: <summary>\n' +
'Translation: <summary translation>\n' +
'Names: <list of names in Italian summary>\n' +
'Output JSON: <json with summary and num_names>\n\n' +
'Text to summarize: <' + step_text + '>';


// TACTIC 2
// Instruct the model to work out its own solution
// before rushing to a conclusion

// In this prompt the model agrees with the students solution,
// which is incorrect!
let sol1_prompt = 'Determine if the student\'s solution is correct or not.\n\n' +
'Question:\n' +
'I\'m building a solar power installation and I need ' +
'help working out the financials.\n' +
'- Land costs $100 / square foot\n' +
'- I can buy solar panels for $250 / square foot\n' +
'- I negotiated a contract for maintenance that will cost ' +
'me a flat $100k per year, and an additional $10 / square foot\n' +
'What is the total cost for the first year of operations ' +
'as a function of the number of square feet.\n\n' +
'Student\'s Solution:\n' +
'Let x be the size of the installation in square feet.\n' +
'Costs:\n' +
'1. Land cost: 100x\n' +
'2. Solar panel cost: 250x\n' +
'3. Maintenance cost: 100,000 + 100x\n' +
'Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000';

let sol2_prompt = 'Your task is to determine if the student\'s solution is correct or not.\n' +
'To solve the problem do the following:\n' +
'- First, work out your own solution to the problem.\n' +
'- Then compare your solution to the student\'s solution ' +
'and evaluate if the student\'s solution is correct or not.\n' +
'Don\'t decide if the student\'s solution is correct until ' +
'you have done the problem yourself.\n\n' +
'Use the following format:\n' +
'Question:\n' +
'```\n' +
'question here\n' +
'```\n' +
'Student\'s solution:\n' +
'```\n' +
'student\'s solution here\n' +
'```\n' +
'Actual solution:\n' +
'```\n' +
'steps to work out the solution and your solution here\n' +
'```\n' +
'Is the student\'s solution the same as actual solution ' +
'just calculated:\n' +
'```\n' +
'yes or no\n' +
'```\n' +
'Student grade:\n' +
'```\n' +
'correct or incorrect\n' +
'```\n\n' +
'Question:\n' +
'```\n' +
'I\'m building a solar power installation and I need help ' +
'working out the financials. \n' +
'- Land costs $100 / square foot\n' +
'- I can buy solar panels for $250 / square foot\n' +
'- I negotiated a contract for maintenance that will cost ' +
'me a flat $100k per year, and an additional $10 / square foot\n' +
'What is the total cost for the first year of operations ' +
'as a function of the number of square feet.\n' +
'```\n' +
'Student\'s solution:\n' +
'```\n' +
'Let x be the size of the installation in square feet.\n' +
'Costs:\n' +
'1. Land cost: 100x\n' +
'2. Solar panel cost: 250x\n' +
'3. Maintenance cost: 100,000 + 100x\n' +
'Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000\n' +
'```\n' +
'Actual solution:';


//////////////////////////// MODEL LIMITATIONS ////////////////////////////

// Hallucinations
// Makes plausable sounding answers which are not true
// The system does not understand the limitation of it's knowledge

let hal1_prompt = 'Tell me about AeroGlide UltraSlim Smart Toothbrush by Boie.'
// Note the company Boie exists , but the product is fictitious

// To reduce hallucinations:
//      First find relavent information,
//      then answer the question based on the relavent information.
let hal2_prompt = 'Tell me about the AeroGlide UltraSlim Smart Toothbrush by Boie.\n' +
'Use the following steps:\n' +
'1 - Locate information that describes the product.\n' +
'2 - If there is no information describing the product, report it as fictitious.\n' +
'3 - If there is information describing the product, list the main product features.';

let hal3_prompt = 'Tell me about the Toothbrush by Boie.\n' +
'Use the following steps:\n' +
'1 - Locate information that describes the product.\n' +
'2 - If there is no information describing the product, report it as fictitious.\n' +
'3 - If there is information describing the product, list the main product features.';

let completion = await getCompletion(hal2_prompt);

console.log(completion);
