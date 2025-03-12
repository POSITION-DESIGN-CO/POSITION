export interface Project {
    sys: { id: string };
    title: string;
    category: string;
    year: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
    };
    location: string;
    featured: boolean;
    order?: number;
    galleryCollection: {
        items: {
            title: string;
            url: string;
            width: number;
            height: number;
            sys: {
                id: string;
            };
        }[];
    };
}

export interface EditorialImage {
    sys: { id: string };
    title: string | null; // Optional title to display
    description: string | null; // Optional description/caption
    image: {
        url: string;
        width: number;
        height: number;
    };
    order: number;
    size: "small" | "medium" | "large";
}

export type HomepageItem =
    | { type: "project"; data: Project; order: number }
    | { type: "editorial"; data: EditorialImage; order: number }
    | { type: "text"; data: { content: string }; order: number };

export type extendedHomePageItem = HomepageItem[];
