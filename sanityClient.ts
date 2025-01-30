import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: 'k4pvjtoe', // Replace with your Sanity project ID
  dataset: 'production',    // Replace with your Sanity dataset
  useCdn: true,
  apiVersion: '2023-01-01',  // Use current API version
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source);

export default client;