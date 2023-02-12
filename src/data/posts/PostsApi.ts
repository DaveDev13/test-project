import axios from "axios";

export interface PostStructure {
    id: string;
    body: string;
    title: string;
    user_id: number;
}

export interface PostCommentsStructure {
    id: string;
    body: string;
    name: string;
    email: string;
    post_id: number;
}

class PostsApi {
    getPostData = (id: string): Promise<PostStructure> => {
        return axios({
            method: "GET",
            url: `${axios.defaults.baseURL}public/v2/posts/${id}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
        })
            .then((result: any): PostStructure => {
                return result.data;
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };

    getPostComments = (id: string, page: number, per: number = 1): Promise<PostCommentsStructure[]> => {
        return axios({
            method: "GET",
            url: `${axios.defaults.baseURL}public/v2/posts/${id}/comments?page=${page}&per_page=${per}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
        })
            .then((result: any): PostCommentsStructure[] => {
                return result.data;
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };
}

const postsApi = new PostsApi();

export default postsApi;
