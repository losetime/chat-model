/**
 * @desc 操作类型枚举
 */
export enum actionTypeEnum {
  ADD = 0, // 添加
  EDIT = 1, // 编辑
  CHECK = 2, // 查看
}

export const chartTypeEnum = [
  {
    label: 'histogram',
    value: 'bar',
  },
  {
    label: 'barGraph',
    value: 'bar',
  },
  {
    label: 'lineChart',
    value: 'line',
  },
  {
    label: 'pieChart',
    value: 'pie',
  },
  {
    label: 'numGraph',
    value: 'numGraph',
  },
  {
    label: 'tableGraph',
    value: 'tableGraph',
  },
]

export const colorsEnum = ['#4989F7', '#1BC38F', '#FF810B', '#6D67FF', '#FF810B']

export enum dictTypeEnum {}
