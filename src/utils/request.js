import axios from '@/plugins/axios'

/**
 * @param url
 */
export default (options) => {
  if (typeof options === 'string') {
    const url = options;
    return data => axios({
      url,
      method: "post",
      data,
    })
  } else {
    return axios(options)
  }
}
