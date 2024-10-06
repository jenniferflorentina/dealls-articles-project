import requestSvc from "app/services/request.service";

const authApi = {
  path: "/auth",

  async login(payload) {
    const resp = await requestSvc.post(`${this.path}/login`, payload);
    return resp.data;
  },

  async refresh() {
    const resp = await requestSvc.get(`${this.path}/refresh-token`);
    return resp.data;
  },

  async resetPassword(payload) {
    const { user_id, data } = payload;
    const resp = await requestSvc.put(
      `${this.path}/${user_id}/reset-password`,
      data
    );
    return resp.data;
  },
};

export default authApi;
