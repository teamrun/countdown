## 使用方法:

1. 引入<a href="./countdown.js">countdown.js
2. 实例化Countdown对象, 传入option参数, 该对象需含有以下参数:

    ctnID: 容器的id, 生成的倒计时dom会放在该container中
    time: 倒计时的时间, 以秒为单位, 如40*60 四十分钟
    showHour: 时间参数大于1小时时, 传入值为true的该属性, 会显示小时数, 否则只会显示分钟.
            例: 传入time为120*60,showHour参数不传或未false, 会从120:00开始倒计时,
            传入true, 会从2:00:00开始记
    zeroCallback: 时间到0之后的回调.

3. 操作countdown,进行start/pause/reset的操作.