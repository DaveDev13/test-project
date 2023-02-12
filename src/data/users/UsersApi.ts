import axios from "axios";
import { PostStructure } from "../posts/PostsApi";

export interface UserStructure {
    id: string;
    name: string;
    email: string;
    gender: string;
    status: string;
    body?: string;
    title?: string;
    user_id?: number;
}

class UsersApi {
    getUsers(page:number = 1): Promise<UserStructure[]> {
        return axios({
            method: "GET",
            url: `${axios.defaults.baseURL}public/v2/users?page=${page}&per_page=10`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
        })
            .then((result: any): UserStructure[] => {
                return result.data;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    getUser = (id: string = '1'): Promise<UserStructure> => {
        return axios({
            method: "GET",
            url: `${axios.defaults.baseURL}public/v2/users/${id}/`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
        })
            .then((result: any): UserStructure => {
                return result.data;
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };

    getUserPosts = (id: string = '1'): Promise<PostStructure[]> => {
        return axios({
            method: "GET",
            url: `${axios.defaults.baseURL}public/v2/users/${id}/posts`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
        })
            .then((result: any): PostStructure[] => {
                return result.data;
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };
}

const usersApi = new UsersApi();

export default usersApi;
