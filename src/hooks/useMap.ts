import { shallowRef } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

interface IMarkerInfo {
  lng: number
  lat: number
  title: string
}

/**
 * @desc 高德地图
 */
const useMap = () => {
  const AMap = shallowRef<any>(null)

  const map = shallowRef<any>(null)

  const initMap = async (domId: string) => {
    AMap.value = await AMapLoader.load({
      key: '52d5722b7a0a512e19df5dfea1454849', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
    try {
      map.value = new AMap.value.Map(domId, {
        //设置地图容器id
        viewMode: '3D', //是否为3D地图模式
        zoom: 5, //初始化地图级别
        center: [116.39, 39.9], //初始化地图中心点位置
      })
      return Promise.resolve(true)
    } catch (e) {
      console.log(e)
      return Promise.resolve(false)
    }
  }

  const createMarker = (markerList: IMarkerInfo[]) => {
    if (AMap.value) {
      const makers = markerList.map((item: any) => {
        return new AMap.value.Marker({
          position: new AMap.value.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: item.title,
        })
      })
      map.value.add(makers)
      map.value.setFitView()
    }
  }

  const destroyMap = () => {
    map.value && map.value.destroy()
    AMap.value = null
    map.value = null
  }

  return {
    map,
    AMap,
    initMap,
    createMarker,
    destroyMap,
  }
}

export default useMap
