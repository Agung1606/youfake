import {
  Client,
  Account,
  ID,
  Databases,
  Storage,
  Query,
  Avatars,
} from "react-native-appwrite";

export const config = {
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  videosCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID,
  videosStorageId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_STORAGE_ID,
  thumbnailStorageId: process.env.EXPO_PUBLIC_APPWRITE_THUMBNAIL_STORAGE_ID,
};

export const client = new Client()
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export async function signIn(email: any, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.log(error);
    if (error.code === 401) {
      throw Error("email atau password salah!!!");
    } else {
      throw Error("Something went wrong");
    }
  }
}

// register user
export async function createUser(
  email: any,
  password: string,
  username: string
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId!,
      config.usersCollectionId!,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.error(error);
    return;
  }
}

// get current user
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error();

    const currentUser = await databases.listDocuments(
      config.databaseId!,
      config.usersCollectionId!,
      [Query.equal("accountId", currentAccount.$id)]
    );

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
    return;
  }
}

// sign out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getVideos({ filter }: { filter: string }) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("type", filter));
    }

    const results = await databases.listDocuments(
      config.databaseId!,
      config.videosCollectionId!,
      buildQuery
    );

    return results.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getVideoById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.videosCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getVidoesByUserId({ id }: { id: string }) {
  try {
    const results = await databases.listDocuments(
      config.databaseId!,
      config.videosCollectionId!,
      [Query.equal("user_id", id), Query.orderDesc("$createdAt")]
    );
    return results.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}
