import { action, makeAutoObservable } from "mobx";
import { PostStructure } from "../data/posts/PostsApi";
import usersApi, { UserStructure } from "../data/users/UsersApi";

export class UserStore {
    public usersList: UserStructure[] = [];
    public currentUser: UserStructure = {} as UserStructure;
    public postsList: PostStructure[] = [];
    // создаем иммитацию пагинации
    public pagination = {
        currentPage: 1,
        itemsPerPage: 100,
        totalPages: 10,
    };
    protected pageNumber: number = 1;
    public isLoading: boolean = false;
    public activeUsers: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Очищаем данные о юзере
    clearUserData = () => {
        this.currentUser = {} as UserStructure;
    }

    // Очищаем данные о постах юзера
    clearUserPostsData = () => {
        this.postsList = [];
    }

    // Изменяем статус отображаемых пользователей
    changeUserStatus = () => {
        this.activeUsers = !this.activeUsers;
    }

    // Получаем список пользователей через апи
    getUsersList = (page: number) => {
        this.isLoading = true;

        if (page) {
            this.pageNumber = page;
        }

        return usersApi
            .getUsers(page)
            .then(
                action((data) => {
                    this.pagination = {
                        ...this.pagination,
                        currentPage: page,
                    };
                    this.usersList = [...this.usersList, ...data];
                })
            )
            .finally(
                action(() => {
                    this.isLoading = false;
                })
            );
    }

    // Получаем инфо о пользователе через апи
    getUserData = (id?: string) => {
        this.isLoading = true;

        return usersApi
            .getUser(id)
            .then(
                action((data) => {
                    this.currentUser = data;
                })
            )
            .finally(
                action(() => {
                    this.isLoading = false;
                })
            );
    }

    // Получаем посты пользователя через апи
    getUserPostsList = (id?: string) => {
        return usersApi
            .getUserPosts(id)
            .then(
                action((data) => {
                    this.postsList = data;
                })
            );
    }
}

const userStore = new UserStore();

export default userStore;
