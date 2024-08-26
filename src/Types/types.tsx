export type LanguageTranslations = {
    [key: string]: string;
}

export type TranslatedText = (key: string) => string;

export type RouteToLink = (route: string, text: string, goHome: boolean) => JSX.Element;

export type slide = {
    color: string, 
    gradient: string,
    icon: JSX.Element | undefined,
    logo: string,
    name: string,
    images: image[],
    video: string,
    demoComponent: JSX.Element | undefined,
    downloadLink: string,
    sourceCode: string,
}

export type image = {
    url: string,
    title: string,
}

export type link = {
    text: string,
    url: string,
    icon: JSX.Element
}