export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { access }
      } = store.getState();

      if (access) {
        config.headers.Authorization = `Bearer ${access}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );
}
