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
            // next: { revalidate: 1000 },
            cache: "no-store",
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
          loadingAnimationWebm { url }
          loadingAnimationMov { url }

          projectListAnimationWebm { url }
          projectListAnimationMov { url }
   
          projectGridAnimationWebm { url }
          projectGridAnimationMov { url }

          aboutPageAnimationWebm { url }
          aboutPageAnimationMov { url }
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
              url(transform: {width: 1400})
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
          link
          image {
            url(transform: {width: 1400})
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
            thumbnail {         
              url(transform: {width: 1400})
              width 
              height 
              }
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
            thumbnail {         
              url(transform: {width: 1400})
              width 
              height 
              }            
            location
            galleryCollection {
              items {
                title
                url(transform: {width: 1400})
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
    const project = data?.projectCollection?.items[0] || [];

    const projectsWithBlur = await Promise.all(
        project.galleryCollection.items.map(async (project: any) => {
            const blurDataURL = await dynamicBlurDataUrl(project.url);
            return {
                ...project,
                blurDataURL,
            };
        })
    );
    const projects = {
        ...project,
        galleryCollection: { items: projectsWithBlur },
    };

    return projects || null;
    // return data?.projectCollection.items[0] || null;
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
            thumbnail {               
              url(transform: {width: 800})
              width 
              height 
            }
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
            thumbnail {               
              url(transform: {width: 800})
              width 
              height 
            }
            location
          }
        }
      }
    `;
    const data = await fetchFromContentful(query);
    const projects = data?.projectCollection?.items || [];

    const projectsWithBlur = await Promise.all(
        projects.map(async (project: any) => {
            const blurDataURL = await dynamicBlurDataUrl(project.thumbnail.url);
            return {
                ...project,
                thumbnail: {
                    ...project.thumbnail,
                    blurDataURL,
                },
            };
        })
    );

    return { items: projectsWithBlur };
    // return data?.projectCollection || { items: [] };
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

    let allProjectItemsPromise = [];

    const projectItems = projectsData.items.filter(
        (project: any) => project.featured
    );

    for (const item of projectItems) {
        allProjectItemsPromise.push(
            (async () => {
                const blurDataURL = await dynamicBlurDataUrl(
                    item.thumbnail.url
                );
                return {
                    type: "project" as const,
                    data: {
                        ...item,
                        thumbnail: {
                            ...item.thumbnail,
                            blurDataURL: blurDataURL,
                        },
                    },
                    order: item.order || 999,
                };
            })()
        );
    }

    const editorialItems: HomepageItem[] = editorialData.items.map(
        (editorial: any) => ({
            type: "editorial" as const,
            data: {
                ...editorial,
            },
            order: editorial.order,
        })
    );

    return [
        ...(await Promise.all(allProjectItemsPromise)),
        ...editorialItems,
    ].sort((a, b) => a.order - b.order);
    // return [...projectItems].sort((a, b) => a.order - b.order);
}

export async function dynamicBlurDataUrl(url: string) {
    try {
        const res = await fetch(`${url}&w=32&q=70`);
        const buffer = await res.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");

        const blurSvg = `
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'>
            <filter id='b' color-interpolation-filters='sRGB'>
              <feGaussianBlur stdDeviation='0.5' />
            </filter>

            <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
            href='data:image/avif;base64,${base64}' />
          </svg>
        `;

        const toBase64 = (str: string) =>
            typeof window === "undefined"
                ? Buffer.from(str).toString("base64")
                : window.btoa(str);

        return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
    } catch (e) {
        console.error(e);
    }
}
