import { action, makeAutoObservable } from "mobx";
import postsApi, { PostStructure, PostCommentsStructure } from "../data/posts/PostsApi";

export class PostStore {
    public currentPost: PostStructure = {} as PostStructure;
    public postsCommentsList: PostCommentsStructure[] = [];
    // создаем иммитацию пагинации
    public pagination = {
        hasNextPage: true,
        currentPage: 1,
        itemsPerPage: 100,
        totalPages: 10,
    };
    protected pageNumber: number = 1;
    public isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    clearPostData = () => {
        this.currentPost = {} as PostStructure;
    }

    // Получаем инфо о посте через апи
    getPostData = (id: string = "1") => {
        return postsApi
            .getPostData(id)
            .then(
                action((data) => {
                    this.currentPost = data;
                })
            )
            .finally(
                action(() => {
                    this.isLoading = false;
                })
            );
    }

    // Получаем список комментариев поста через апи
    getPostCommentsList = (id: string = "1", page: number) => {
        this.isLoading = true;

        if (page) {
            this.pageNumber = page;
        }

        return postsApi
            .getPostComments(id, page)
            .then(
                action((data) => {
                    this.pagination = {
                        ...this.pagination,
                        currentPage: page,
                        hasNextPage: !!data.length
                    };
                    this.postsCommentsList = [...this.postsCommentsList, ...data];
                })
            )
            .finally(
                action(() => {
                    this.isLoading = false;
                })
            );
    }
}

const postStore = new PostStore();

export default postStore;
