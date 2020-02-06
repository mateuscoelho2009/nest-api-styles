export const BASE_URL = 'http://localhost:3000/rest';
export const CONVERSATIONS_RESOURSE = '/conversations';
export const MESSAGES_RESOURSE = '/messages';
export const AUTHORS_RESOURSE = '/users';

export const RESOURCES_METADATA = {
  conversations: {
    href: `${BASE_URL}${CONVERSATIONS_RESOURSE}`,
    rel: [ 'collection' ],
    desc: 'View all conversations',
  },
  author: {
    href: `${BASE_URL}${AUTHORS_RESOURSE}`,
    rel: [ 'object' ],
    desc: 'View User Details',
  },
}