const useSelect = () => {
  const VNodes = (_: any, { attrs }: { attrs: any }) => {
    return attrs.vnodes
  }

  const filterOption = (input: string, option: any) => {
    return option.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  /**
   * @desc 菜单渲染父节点
   */
  const getPopupContainer = (triggerNode: any) => triggerNode.parentNode

  return {
    VNodes,
    filterOption,
    getPopupContainer,
  }
}

export default useSelect
