// 车牌号
export const picensePlateReg =
  /^[粤浙京沪川津渝鄂赣冀蒙鲁苏辽吉皖湘黑琼贵桂云藏陕甘宁青豫闽新晋][A-Z][ABCDEFGHJKLMNPQRSTUVWXYZ0123456789]{5,6}$/

// 手机号码
export const phoneReg = /^[1]\d{10}$/

// 座机号码
export const fixedPhone = /^0\d{2,3}-\d{7,8}$/

// 密码(至少包含大写字母，小写字母，数字，特殊字符三种及以上)
export const passwordReg =
  /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,30}$/
// /^[A-Za-z0-9_]{6,16}$/

// 身份证号码
export const IdNoReg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 社会信用代码
export const socialCodeReg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g

// 道路运输许可证
export const roadTransportPermitReg = /^[0-9A-Z]*$/

// 银行卡校验
export const backCardReg = /^([1-9]{1})(\d{14}|\d{15}|\d{17}|\d{18})$/

// 去除字符串前后空格
export const spaceReg = /\s+/g

// 发票代码
export const invoiceNumber = /^[0-9]{10,18}$/

// 发票NO
export const invoiceNO = /^[0-9]{6,18}$/

// 司机姓名不能包含特殊字符
export const driverNameReg = /^[\u4E00-\u9FA5|a-z|A-Z|0-9]*$/g

// 验证数字切最多包含两位小数
export const numberReg = /^(([0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/

// 验证1-100的整数
export const integerReg = /^([1-9]\d?|100)$/

// 验证数字和字母
export const digitalReg = /^[A-Za-z|0-9]*$/

// 验证字母
export const letterReg = /^[A-Za-z]+$/

// 纳税人识别号
export const taxNumberReg = /^[0-9A-Z]{15,20}$/

// 不能包含空格
export const notSpacingReg = /^[^\s]*$/

// 验证邮箱
export const emailReg =
  /^([a-zA-Z0-9])+(([a-zA-Z0-9])|([._-][a-zA-Z0-9])*)+@([a-zA-Z0-9-])+((\.[a-zA-Z0-9-]{2,3}){1,2})$/

// 验证经度
export const longitudeReg =
  /^(-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/

// 验证维度
export const latitudeReg = /^(-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
