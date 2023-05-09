import { getCompletion } from '../helper.js';
import fs from 'fs';

let reviews = [];
try {
    reviews[0] = fs.readFileSync('./review1.txt', 'utf8');
    reviews[1] = fs.readFileSync('./review2.txt', 'utf8');
    reviews[2] = fs.readFileSync('./review3.txt', 'utf8');
    reviews[3] = fs.readFileSync('./review4.txt', 'utf8');

    // SUMMARY - Use a word limit
    let prompt1 = 'Your task is to generate a short summary of a product ' +
        'review from an ecommerce site.\n\n' +
        'Summarize the review below, delimited by triple ' +
        'backticks, in at most 30 words.\n\n' +
        'Review: ```' + reviews[0] + '```';

    // SUMMARY - Focus on shipping for the shipping department
    let prompt2 = 'Your task is to generate a short summary of a product ' +
        'review from an ecommerce site to give feedback to the ' +
        'Shipping Department.\n\n' +
        'Summarize the review below, delimited by triple ' +
        'backticks, in at most 30 words, and focusing on any aspects ' +
        'that mention shipping and delivery of the product.\n\n' +
        'Review: ```' + reviews[0] + '```';

    // SUMMARY - Same summary but we want to focus on pricing and value
    let prompt3 = 'Your task is to generate a short summary of a product ' +
        'review from an ecommerce site to give feedback to the ' +
        'pricing deparmtment, responsible for determining the ' +
        'price of the product..\n\n' +
        'Summarize the review below, delimited by triple ' +
        'backticks, in at most 30 words, and focusing on any aspects ' +
        'that are relevant to the price and perceived value.\n\n' +
        'Review: ```' + reviews[0] + '```';

    // EXTRACT - With the previous examples we get a focus on aspects
    //           but a lot of extrainous information, extract reduces this.
    let prompt4 = 'Your task is to extract relavent information from a ' +
        'product review from an ecommerce site to give feedback to the ' +
        'Shipping Department.\n\n' +
        'From the review below, delimited by triple backticks, ' +
        'extract the information relevant to shipping and delivery.' +
        'Limit to 30 words.\n\n' +
        'Review: ```' + reviews[0] + '```';

    // MULTIPLE - If we have many reviews to summarize we can iterate and
    //            review them together.


    let i = 1;
    for (let review of reviews) {
        let prompt5 = 'Your task is to generate a short summary of a ' +
            'product review from an ecommerce site.\n\n' +
            'Summarize the review below, delimited by triple ' +
            'backticks in at most 20 words.\n\n' +
            'Review: ```' + review + '```';

        let completion = await getCompletion(prompt5);
        console.log(i + ': ' + completion);
        i++;
    };

} catch (err) {
    console.error(err);
}
