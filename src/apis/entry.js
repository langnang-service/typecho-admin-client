import Mock from 'mockjs'
const TIME_DELAY = 1500
export const insert_entry_item = () => {
  return new Promise(resolve => {
    resolve()
  })
}
export const select_entry_list = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        rows: Mock.mock({
          "array|20": [
            {
              id: () => Mock.Random.id(),
              name: () => Mock.Random.sentence(),
              file: () => Mock.Random.boolean(),
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

export const delete_entry_list = () => {
  return new Promise(resolve => {
    resolve()
  })
}