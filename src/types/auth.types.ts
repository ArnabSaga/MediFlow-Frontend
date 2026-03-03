export interface ILoginResponse {
  token: string;
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string;
    role: string;
    status: string;
    needPasswordChange: boolean;
    isDeleted: boolean;
    deletedAt?: Date | null | undefined;

    createdAt: Date;
    updatedAt: Date;
  };
}

