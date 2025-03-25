interface Animation {
    url: string;
}

export interface PageAnimations {
    loadingAnimationWebm: Animation;
    loadingAnimationMov: Animation;
    homepageAnimationWebm: Animation;
    homepageAnimationMov: Animation;
    projectListAnimationWebm: Animation;
    projectListAnimationMov: Animation;
    projectGridAnimationWebm: Animation;
    projectGridAnimationMov: Animation;
    aboutPageAnimationWebm: Animation;
    aboutPageAnimationMov: Animation;
}

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
            bio?: string | null;
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
        blurDataURL: string;
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
    image: {
        url: string;
        width: number;
        height: number;
    };
    order: number;
    description?: string | null;
}

export type HomepageItem =
    | { type: "project"; data: Project; order: number }
    | { type: "editorial"; data: EditorialImage; order: number };
