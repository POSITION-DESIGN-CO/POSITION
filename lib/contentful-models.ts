export interface About {
    description: string;
    studioImage: {
        url: string;
        title: string;
        width: number;
        height: number;
    };
    founder: {
        name: string;
        role: string;
        image: {
            url: string;
            title: string;
        };
        bio: string[];
    };
    teamMembersCollection: {
        items: {
            name: string;
            role: string;
        }[];
    };
    formerMembers: string[];
    contact: {
        email: string;
        instagram?: string;
        secondaryIG?: string;
        phone?: string;
        location?: string;
    };
    awardsCollection: {
        items: {
            year: number;
            title: string;
            result: string;
        }[];
    };
    publicationsCollection: {
        items: {
            year: number;
            title: string;
            publisher: string;
        }[];
    };
}

export interface Project {
    sys: { id: string };
    title: string;
    slug: string;
    category: string;
    year: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
    };
    featured: boolean;
    description: string;
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
    team?: string[] | null;
    location?: string | null;
    position?: string | null;
    order?: number | null;
}

export interface EditorialImage {
    sys: { id: string };
    title: string | null;
    description: string | null;
    image: {
        url: string;
        width: number;
        height: number;
    };
    order: number;
}

export type HomepageItem =
    | { type: "project"; data: Project; order: number }
    | { type: "editorial"; data: EditorialImage; order: number };
