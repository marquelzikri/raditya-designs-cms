import { list } from '@keystone-6/core';
import { cloudinaryImage } from '@keystone-6/cloudinary';

import {
  text,
  relationship,
  password,
  timestamp,
} from '@keystone-6/core/fields';
import { Lists } from '.keystone/types';

import 'dotenv/config';

const CloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  apiKey: process.env.CLOUDINARY_API_KEY ?? '',
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  folder: process.env.CLOUDINARY_API_FOLDER ?? '',
};

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      projects: relationship({ ref: 'Project.author', many: true }),
    },
    ui: {
      isHidden: true,
    },
  }),
  SocialMediaConfig: list({
    fields: {
      instagram: text(),
      facebook: text(),
      linkedin: text(),
      twitter: text(),
    },
  }),
  WebsiteConfig: list({
    fields: {
      url: text(),
      title: text(),
      keywords: text(),
      description: text(),
      theme: text(),
      footer_text: text(),
      sidebarLogo: cloudinaryImage({
        cloudinary: CloudinaryConfig,
      }),
      image: cloudinaryImage({
        cloudinary: CloudinaryConfig,
      }),
    },
  }),
  Project: list({
    fields: {
      thumbnail: cloudinaryImage({
        cloudinary: CloudinaryConfig,
      }),
      title: text(),
      permalink: text(),
      keywords: text(),
      description: text(),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.projects',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      categories: relationship({
        ref: 'Category.projects',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
      images: relationship({
        ref: 'Image.projects',
        ui: {
          displayMode: 'cards',
          cardFields: ['image'],
          inlineEdit: { fields: ['image'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['image'] },
        },
        many: true,
      }),
      panoramas: relationship({
        ref: 'Panorama.projects',
        ui: {
          displayMode: 'cards',
          cardFields: ['image'],
          inlineEdit: { fields: ['image'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['image'] },
        },
        many: true,
      }),
    },
  }),
  Image: list({
    ui: {
      isHidden: true,
    },
    fields: {
      image: cloudinaryImage({
        cloudinary: CloudinaryConfig,
      }),
      projects: relationship({ ref: 'Project.images', many: true }),
    },
  }),
  Panorama: list({
    ui: {
      isHidden: true,
    },
    fields: {
      image: cloudinaryImage({
        cloudinary: CloudinaryConfig,
      }),
      projects: relationship({ ref: 'Project.panoramas', many: true }),
    },
  }),
  Category: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      projects: relationship({ ref: 'Project.categories', many: true }),
    },
  }),
};
