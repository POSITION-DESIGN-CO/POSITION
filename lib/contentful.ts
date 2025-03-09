import { dummyProjects } from "./dummy-data";

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
        });
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data from Contentful:", error);
        return null;
    }
}

export async function getProjects() {
    const projectsQuery = `
      query {
        projectCollection {
          items {
            sys { id }
            title
            description
            category
            year
            thumbnail { url width height }
            location
          }
        }
      }
    `;
    // const data = await fetchFromContentful(projectsQuery);
    // return data?.projectCollection || { items: [] };
    return dummyProjects.projectCollection;
}

export async function getProjectById(id: string) {
    const query = `
      query {
        project(id: "${id}") {
          sys { id }
          title
          description
          category
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
    `;
    // const data = await fetchFromContentful(query);
    // return data?.project || null;
    const project = dummyProjects.projectCollection.items.find(
        (project) => project.sys.id === id
    );
    return project || null;
}

export async function getProjectsByCategory(category: string) {
    const query =
        category === "All"
            ? `
      query {
        projectCollection {
          items {
            sys { id }
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
            title
            category
            year
            thumbnail { url width height }
            location
          }
        }
      }
    `;
    // const data = await fetchFromContentful(query);
    // return data?.projectCollection || { items: [] };
    if (category === "All") {
        return dummyProjects.projectCollection;
    }

    return {
        items: dummyProjects.projectCollection.items.filter(
            (project) => project.category === category
        ),
    };
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
    return ["All", ...Array.from(new Set(categories as string))];
}
