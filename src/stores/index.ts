import postStore, { PostStore } from "./PostStore";
import userStore, { UserStore } from "./UserStore";

export type RootStore = {
    postStore: PostStore;
    userStore: UserStore;
};

const rootStore: RootStore = {
    postStore,
    userStore,
};

export default rootStore;
