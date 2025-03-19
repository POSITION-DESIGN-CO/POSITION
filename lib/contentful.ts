// import {
//     dummyProjects,
//     dummyEditorialImages,
//     dummyAboutCollection,
// } from "./dummy-data";
import type {
    HomepageItem,
    Project,
    About,
    PageAnimations,
} from "./contentful-models";

const CONTENTFUL_API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`;
const CONTENTFUL_HEADERS = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
};

if (
    !process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
    !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
) {
    throw new Error("Contentful environment variables are not set");
}

async function fetchFromContentful(query: string) {
    try {
        const response = await fetch(CONTENTFUL_API_URL, {
            method: "POST",
            headers: CONTENTFUL_HEADERS,
            body: JSON.stringify({ query }),
            next: { revalidate: 1000 },
            // cache: "no-store",
        });
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data from Contentful:", error);
        return null;
    }
}

export async function getPageAnimations(): Promise<PageAnimations> {
    const query = `
      query {
        pageAnimationsCollection(limit: 1) {
          items {
            loadingAnimation {
              url
              }
            homepageAnimation {
              url
              }
            projectPageAnimation {
              url
              }
            aboutPageAnimation {
              url
              }
          }
        }
      }
    `;
    const data = await fetchFromContentful(query);
    return data?.pageAnimationsCollection?.items[0] || {};
}

export async function getAbout(): Promise<About> {
    const aboutQuery = `
        query {
          aboutCollection {
            items {
              sys {
                id
              }
              studioImage {
              url
              title
              width
              height
              }
              description
              founder {
                name
                role
                image {
                  url
                  title
                  width
                  height
                }
                bio
              }
              formerMembers
              contact
              teamMembersCollection(limit: 10)  {
                items {
                  name
                  role
                  bio
                }
              }
              awardsCollection (limit:40) {
                items {
                  year
                  title
                  result
                }
              }
              publicationsCollection (limit:40) {
                items {
                  year
                  title
                  publisher
                }
              }
            }
          }
        }
    `;
    const data = await fetchFromContentful(aboutQuery);
    return data?.aboutCollection.items[0] || { items: [] };
    // return dummyAboutCollection.aboutCollection.items[0];
}

export async function getEditorialImages() {
    const editorialQuery = `
    query {
      editorialCollection {
        items {
          sys {
            id
          }
          title
          description
          image {
            url
            width
            height
          }
          order
        }
      }
    }
  `;

    const data = await fetchFromContentful(editorialQuery);
    return data?.editorialCollection || { items: [] };
    // return dummyEditorialImages.editorialCollection;
}

export async function getProjects() {
    const projectsQuery = `
      query {
        projectCollection {
          items {
            sys { id }
            slug
            title
            description
            category
            year
            thumbnail { url width height }
            location
            order
            featured
          }
        }
      }
    `;
    const data = await fetchFromContentful(projectsQuery);
    return data?.projectCollection || { items: [] };
    // return dummyProjects.projectCollection;
}

export async function getProjectBySlug(slug: string): Promise<Project> {
    const query = `
        query {
        projectCollection(where: { slug: "${slug}" }, limit: 1) {
          items {
            sys { id }
            slug
            title
            description
            category
            position
            team
            year
            thumbnail { url width height }
            location
            galleryCollection {
              items {
                title
                url
                width
                height
                sys { id }
              }
            }
          }
        }
      }
    `;
    const data = await fetchFromContentful(query);
    return data?.projectCollection.items[0] || null;
    // const project = dummyProjects.projectCollection.items.find(
    //     (project) => project.sys.id === id
    // );
    // return project || null;
}

export async function getProjectsByCategory(category: string) {
    const query =
        category === "All"
            ? `
      query {
        projectCollection {
          items {
            sys { id }
            slug
            title
            category
            year
            thumbnail { url width height }
            location
          }
        }
      }
    `
            : `
      query {
        projectCollection(where: { category: "${category}" }) {
          items {
            sys { id }
            slug
            title
            category
            year
            thumbnail { url width height }
            location
          }
        }
      }
    `;
    const data = await fetchFromContentful(query);
    return data?.projectCollection || { items: [] };
    // if (category === "All") {
    //     return dummyProjects.projectCollection;
    // }

    // return {
    //     items: dummyProjects.projectCollection.items.filter(
    //         (project) => project.category === category
    //     ),
    // };
}

export async function getUniqueCategories(): Promise<string[]> {
    const categoryQuery = `
      query {
        projectCollection {
          items {
            category
          }
        }
      }
    `;
    const data = await fetchFromContentful(categoryQuery);
    const categories = data?.projectCollection.items.map(
        (project: any) => project.category
    );
    // const categories = dummyProjects.projectCollection.items.map(
    //     (project) => project.category
    // );
    return ["All", ...Array.from(new Set(categories as string[]))];
}

export async function getHomepageItems(): Promise<HomepageItem[]> {
    const [projectsData, editorialData] = await Promise.all([
        getProjects(),
        getEditorialImages(),
    ]);

    const projectItems: HomepageItem[] = projectsData.items
        .filter((project: any) => project.featured)
        .map((project: any) => ({
            type: "project" as const,
            data: project,
            order: project.order || 999,
        }));

    const editorialItems: HomepageItem[] = editorialData.items.map(
        (editorial: any) => ({
            type: "editorial" as const,
            data: {
                ...editorial,
                description: null,
            },
            order: editorial.order,
        })
    );

    return [...projectItems, ...editorialItems].sort(
        (a, b) => a.order - b.order
    );
    // return [...projectItems].sort((a, b) => a.order - b.order);
}
