export type LanguageTranslations = {
    [key: string]: string;
}

export type TranslatedText = (key: string) => string;

export type slide = {
    icon: string,
    name: string,
    images: image[],
    video: string,
    demoComponent: JSX.Element | undefined,
    sourceCode: string,
}

export type image = {
    url: string,
    title: string,
}