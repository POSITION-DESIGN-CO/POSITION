import { dummyProjects } from "./dummy-data"

// This is the GraphQL query that will be used to fetch projects from Contentful
const projectsQuery = `
  query {
    projectCollection {
      items {
        sys {
          id
        }
        title
        category
        year
        thumbnail {
          url
          width
          height
        }
        location
        galleryCollection {
          items {
            title
            url
            width
            height
            sys {
              id
            }
          }
        }
      }
    }
  }
`

// This function will fetch all projects from Contentful
export async function getProjects() {
  // When you're ready to connect to Contentful, uncomment this code
  /*
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('Contentful environment variables are not set');
  }

  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query: projectsQuery }),
      }
    );

    const { data } = await response.json();
    return data.projectCollection;
  } catch (error) {
    console.error('Error fetching projects from Contentful:', error);
    return { items: [] };
  }
  */

  // For now, return dummy data
  return dummyProjects.projectCollection
}

// This function will fetch a single project by ID
export async function getProjectById(id: string) {
  // When you're ready to connect to Contentful, uncomment this code
  /*
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('Contentful environment variables are not set');
  }

  const query = `
    query {
      project(id: "${id}") {
        sys {
          id
        }
        title
        category
        year
        thumbnail {
          url
          width
          height
        }
        location
        galleryCollection {
          items {
            title
            url
            width
            height
            sys {
              id
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    const { data } = await response.json();
    return data.project;
  } catch (error) {
    console.error('Error fetching project from Contentful:', error);
    return null;
  }
  */

  // For now, return dummy data
  const project = dummyProjects.projectCollection.items.find((project) => project.sys.id === id)
  return project || null
}

// This function will fetch projects by category
export async function getProjectsByCategory(category: string) {
  // When you're ready to connect to Contentful, uncomment this code
  /*
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('Contentful environment variables are not set');
  }

  const query = category === 'All' 
    ? projectsQuery 
    : `
    query {
      projectCollection(where: { category: "${category}" }) {
        items {
          sys {
            id
          }
          title
          category
          year
          thumbnail {
            url
            width
            height
          }
          location
          galleryCollection {
            items {
              title
              url
              width
              height
              sys {
                id
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    const { data } = await response.json();
    return data.projectCollection;
  } catch (error) {
    console.error('Error fetching projects from Contentful:', error);
    return { items: [] };
  }
  */

  // For now, return filtered dummy data
  if (category === "All") {
    return dummyProjects.projectCollection
  }

  return {
    items: dummyProjects.projectCollection.items.filter((project) => project.category === category),
  }
}

