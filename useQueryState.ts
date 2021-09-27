import { useCallback, useState } from 'react'
import { useQuery } from '../utils/useQuery'

export interface IUseQueryState {
  [key: string]: any
}

const mapDataToUrl = (data: IUseQueryState) => {
  const keys = Object.keys(data)
  const joinData: string[] = []
  keys.forEach((key) => {
    if (data[key]) {
      joinData.push(`${key}=${encodeURIComponent(data[key])}`)
    }
  })
  window.history.pushState(null, '', `?${joinData.join('&')}`)
}

/**
 * 自动映射query数据到你的state中
 * 在主动setData的时候，将数据映射到URL上。
 * @returns
 */
const useQueryState = <T extends IUseQueryState>(
  initData: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [data, setData] = useState<T>(initData)
  const queryData = useQuery()

  const returnSetData = useCallback(
    (updateDataFn: Function | T) => {
      const updateData = typeof updateDataFn === 'function' ? updateDataFn(data) : updateDataFn
      let isQueryUpdate = false
      const updateDataKeys = Object.keys(updateData)
      // 对比需要更新的数据 跟 现有数据
      // 如果有需要更新的，则调用 setData合并更新数据
      // 并且将数据映射到url上
      updateDataKeys.forEach((key) => {
        // 对别确认是否需要更新
        if ((data as T)[key] !== updateData[key]) {
          isQueryUpdate = true
        }
      })
      if (isQueryUpdate) {
        setData(() => {
          const $data = {
            ...updateData
          }
          mapDataToUrl($data)
          return $data
        })
      }
  
    },
    [data]
  )

  if (JSON.stringify(queryData) === '{}' && JSON.stringify(data) !== '{}') {
    setData({} as T)
  } else {
    returnSetData(queryData as T)
  }

  return [data, returnSetData]
}

export default useQueryState
