import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface Child {
  code: number;
  group: number[];
  name: string;
  link: string;
}

export interface Source {
  code: string;
  name: string;
  logo: string;
  child: Child[];
}

export interface Group {
  code: string;
  id: number;
  name: string;
  logo: IconProp;
}

export interface RespondSource {
  data: Source[];
  message: string;
}

export interface RespondGroup {
  data: Group[];
  message: string;
}

export interface Respond {
  data: RespondData;
  message: string;
}

export interface RespondMulti {
  data: RespondData[];
  message: string;
}

export interface Item {
  category: unknown[];
  created: number;
  description: string;  // content
  content: string;      // content
  enclosures: string;
  link: string;
  published: number;
  title: string;
  media: unknown;
  read: boolean;
  group: number;
}

export interface RespondData {
  category: unknown[];
  code: string;
  description: string;
  image: string;
  name: string;
  link: string;
  title: string;
  items: Item[];
}
