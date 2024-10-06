import { createAsyncThunk } from "@reduxjs/toolkit";
import articleApi from "app/api/article.api";

const fetcher = {
    fetchCategories: createAsyncThunk('categories/fetch', async () => {
        try {
            const resp = await articleApi.getCategories();
            return resp;
        } catch (error) {
            return Promise.reject(error);
        }
    }),
    fetchArticles: createAsyncThunk('articles/fetch', async (params) => {
        try {
            const resp = await articleApi.getArticles(params);
            return resp;
        } catch (error) {
            return Promise.reject(error);
        }
    }),
    fetchDetails: createAsyncThunk('articles/detail/fetch', async (id) => {
        try {
            const resp = await articleApi.getArticleDetail(id);
            return resp;
        } catch (error) {
            return Promise.reject(error);
        }
    }),
};

export default fetcher;
