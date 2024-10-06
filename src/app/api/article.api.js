import requestSvc from "app/services/request.service";

const articleApi = {

  async getCategories() {
    const resp = await requestSvc.get('/categories');
    return resp.data;
  },

  async getArticles(params = {}) {
    const resp = await requestSvc.get('/articles', { params });
    return resp.data;
  },

  async getArticleDetail(id) {
    const resp = await requestSvc.get(`/articles/${id}`);
    return resp.data;
  },
};

export default articleApi;
