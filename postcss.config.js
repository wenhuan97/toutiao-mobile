module.exports = {
  plugins: {
    //   autoprefixer: {

    //   },
    // 把 px 转成 rem
    'postcss-pxtorem': {
      //   转换 根元素的 基准值
      rootValue: 37.5,
      // 需要转换的 css属性
      propList: ['*']
    }
  }
}
