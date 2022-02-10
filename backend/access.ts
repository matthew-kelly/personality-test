export type Session = {
  itemId: string;
  listKey: string;
  data: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
};

export function isSignedIn({ session }: { session: Session }) {
  return !!session;
}

export const isUsersItem = ({ session }: { session: Session }) => {
  if (isAdmin({ session })) {
    return true;
  }

  if (!isSignedIn({ session })) {
    return false;
  }

  return { user: { id: session?.itemId } };
};

export const isAdmin = ({ session }: { session: Session }) => {
  return !!session?.data.isAdmin;
};
