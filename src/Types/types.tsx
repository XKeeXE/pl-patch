export type LanguageTranslations = {
    [key: string]: string;
}

export type TranslatedText = (key: string) => string;

export type RouteToLink = (route: string, text: string, goHome: boolean) => JSX.Element;

export type slide = {
    color: string, 
    gradient: string,
    icon: JSX.Element | undefined,
    name: string,
    images: image[],
    video: string,
    demoComponent: JSX.Element | undefined,
    links: link[]
}

export type image = {
    url: string,
    title: string,
}

export type link = {
    text: string,
    url: string
}

export type skill = {
    img: string,
    link: link
}

export type language = {
    key: string
    lang: string
}