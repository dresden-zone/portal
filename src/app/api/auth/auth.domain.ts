export interface Invite {
  id: string;
  created: string;
  expire: string;
  email: string;
  roles: number;
}

export interface User {
  id: string;
  created: string;
  updated: string;
  name: string;
  email: string;
  display_name: string;
}
