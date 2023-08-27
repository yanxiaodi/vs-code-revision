import * as assert from 'assert';
import { PromptHelper } from '../../prompt-helper';

describe('PromptHelper', () => {
    const sinon = require('sinon');
    describe('getRevisionPrompt', () => {
        it('should return the default revision prompt when promptType is "default"', () => {
            const text = 'This is a sample text.';
            const sourceLanguage = 'English';
            const writingStyle = 'formal';
            const expectedPrompt = `Revise this into better sentences and paragraphs in ${sourceLanguage} using a ${writingStyle} tone:\n\n${text}\n\n`;
            sinon.stub(PromptHelper, 'getRevisionPromptType').returns('default');
            const prompt = PromptHelper.getRevisionPrompt(text, sourceLanguage, writingStyle);
            assert.strictEqual(prompt, expectedPrompt);
        });

        it('should return the custom revision prompt when promptType is "custom"', () => {
            const text = 'This is a sample text.';
            const sourceLanguage = 'English';
            const writingStyle = 'formal';
            const customPrompt = 'This is a test prompt. Revise this text: ${text}, in ${sourceLanguage} using a ${writingStyle} tone.';
            const expectedPrompt = customPrompt.replace('${text}', text).replace('${sourceLanguage}', sourceLanguage).replace('${writingStyle}', writingStyle);
            sinon.stub(PromptHelper, 'getRevisionPromptType').returns('custom');
            sinon.stub(PromptHelper, 'getRevisionCustomPrompt').returns(customPrompt);
            const prompt = PromptHelper.getRevisionPrompt(text, sourceLanguage, writingStyle);
            assert.strictEqual(prompt, expectedPrompt);
        });
    });

    describe('getTranslationPrompt', () => {
        it('should return the default translation prompt when promptType is "default"', () => {
            const text = 'This is a sample text.';
            const sourceLanguage = 'English';
            const targetLanguage = 'French';
            const expectedPrompt = `Translate this from ${sourceLanguage} to ${targetLanguage}:\n\n${text}\n\n`;
            sinon.stub(PromptHelper, 'getTranslationPromptType').returns('default');
            const prompt = PromptHelper.getTranslationPrompt(text, sourceLanguage, targetLanguage);
            assert.strictEqual(prompt, expectedPrompt);
        });

        it('should return the custom translation prompt when promptType is "custom"', () => {
            const text = 'This is a sample text.';
            const sourceLanguage = 'English';
            const targetLanguage = 'French';
            const customPrompt = 'This is a test prompt. Translate this text: ${text}, from ${sourceLanguage} to ${targetLanguage}.';
            const expectedPrompt = customPrompt.replace('${text}', text).replace('${sourceLanguage}', sourceLanguage).replace('${targetLanguage}', targetLanguage);
            sinon.stub(PromptHelper, 'getTranslationPromptType').returns('custom');
            sinon.stub(PromptHelper, 'getTranslationCustomPrompt').returns(customPrompt);
            const prompt = PromptHelper.getTranslationPrompt(text, sourceLanguage, targetLanguage);
            assert.strictEqual(prompt, expectedPrompt);
        });
    });
});