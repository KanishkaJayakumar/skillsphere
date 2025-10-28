export interface Role {
  roleId: number;
  roleName: string;
}

export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  password?: string;
  roles: Role[];
}
