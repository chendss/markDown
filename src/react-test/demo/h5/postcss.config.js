module.exports = {
    plugins: [
        //{'postcss-cssnext': {}},
        require('postcss-pxtorem')({
            rootValue: 100,
            propWhiteList: [],
            minPixelValue:2 // 替换的最小像素值
        })
    ]
};