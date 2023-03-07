# ReVision README

**ReVision** is a VSCode extension that allows you to quickly and easily revise your written work. It uses [OpenAI](https://openai.com/) to generate new text based on your existing text. It can use different writing styles to improve your writing, and can also be used to translate your text into a different language.

## Features

ReVision depends on the [OpenAI API](https://openai.com/blog/openai-api/). You can sign up for a free account [here](https://beta.openai.com/). Once you have an account, you can generate an API key [here](https://beta.openai.com/account/api-keys). You can then paste your API key into the extension settings.

### Revising

ReVision supports multiple writing styles. You can choose from the following styles:

* professional
* formal
* casual
* humorous
* sarcastic
* informative
* empathetic
* authoritative
* poetic

You can also define your own style by choosing the `other` option in the settings, then specifying your own style in the `otherWritingStyle` setting, for example, narrative.

Click any text in your document or select a sentence/paragraph, then press `Shift+Alt+R` to revise the text. If you haven't selected any text, ReVision will automatically select the current paragraph.

The revised text will be automatically inserted into your document.

Note that the generated text depends on your original text, so the styles may not accurately reflect the style you have selected. For example, you cannot use ReVision to generate a humorous text from a professional text.

### Translating

ReVision can also translate your text into a different language. You need to set the `targetLanguage` setting to the language you want to translate to. You can choose from the following languages:

* English
* Chinese (Simplified)
* Chinese (Traditional)
* Spanish
* French
* German
* Italian
* Portuguese
* Dutch
* Russian
* Arabic
* Japanese
* Korean
* Indonesian
* Thai
* Turkish
* Vietnamese
* Polish
* Swedish
* Norwegian
* Danish
* Finnish
* Greek
* Czech
* Slovak
* Romanian
* Hungarian
* Bulgarian
* Hebrew
* Hindi
* Bengali
* Urdu
* Punjabi
* Tamil
* Telugu
* Marathi
* Gujarati
* Kannada
* Malayalam
* Oriya
* Assamese
* Persian
* Swahili
* Yoruba
* Igbo
* Zulu
* Xhosa

Click any text in your document or select a sentence/paragraph, then press `Shift+T` to translate the text. If you haven't selected any text, ReVision will automatically select the current paragraph.

The translated text will be automatically inserted into your document.

Note that OpenAI supports more languages but we have not yet added them to the extension. Maybe you can help us add them?

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

You can change the writing style, source language and target language in the extension settings.

This extension contributes the following settings:

* `revision.api`: Choose the API you want to use. Currently, only OpenAI is supported. We will support Azure OpenAI in the future.
* `revision.openAIApiKey`: Your OpenAI API key. You can get one [here](https://beta.openai.com/account/api-keys).
* `revision.writingStyle`: The writing style you want to use.
* `revision.otherWritingStyle`: If you choose `other` as the writing style, you can specify your own style here.
* `revision.sourceLanguage`: The source language of your text.
* `revision.targetLanguage`: The target language of your text.

## Known Issues

The keybinding might not work properly on some Linux machines, or conflict with other extensions. Please open issues to describe your environment. Thanks.

## Release Notes

### 0.0.1

Initial release of the extension.

## For more information

* [Translator Helper](https://github.com/yanxiaodi/vscode-translator-helper): A VSCode extension that helps you translate your text into different languages.

**Enjoy!**
