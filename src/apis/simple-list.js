import Mock from 'mockjs'
const TIME_DELAY = 1500
export const insert_simple_list_item = () => {
  return new Promise(resolve => {
    resolve()
  })
}
export const select_simple_list_list = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        rows: Mock.mock({
          "array|20": [
            {
              id: () => Mock.Random.id(),
              name: () => Mock.Random.sentence()
            }
          ]
        })['array'],
        total: 10000,
        page: 1,
        size: 20,
      })
    }, TIME_DELAY)
  })


}

export const delete_simple_list_list = () => {
  return new Promise(resolve => {
    resolve()
  })
}