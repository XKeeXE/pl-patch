export type LanguageTranslations = {
    [key: string]: string;
}

export type TranslatedText = (key: string) => string;

export type RouteToLink = (route: string, text: string, goHome: boolean) => JSX.Element;

export type slide = {
    color: string, 
    gradient: string,
    icon: JSX.Element | undefined,
    header?: string | undefined,
    name: string,
    video: string,
    links: link[]
    images?: image[],
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