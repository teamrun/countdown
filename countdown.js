(function(){

    window.addReadyListener = function ( fn ){
        if( document.addEventListener ){
            document.addEventListener('DOMContentLoaded', fn);
        }
        else{
            (function(){
                try{
                    document.documentElement.doScroll('left');
                }
                catch(err){
                    setTimeout( arguments.callee, 50 );
                    return;
                }
                fn();
            })();
        }
    }


    function makeDouble(n){
        if(n<10){
            n = String('0'+n);
        }
        return n;
    }

    /*
     * param: ctnID
     *      time: seconds 40*60
     *      warningLine: 
     *      runout: 倒计时结束后的回调
     *      showHour: 是否显示小时数, 还是只显示分钟数  120分钟之类的
     *      style: 样式对象, 可以包含position, font-size, color, left top right bottom
     * 
     * 
     * 
     */
    window.Countdown = function( opt ){
        // this.opt = opt;
        if( !opt ){
            console.log('请传入option参数!')
            return undefined;
        }

        this.cdTimer = undefined;
        this.initAmount = this.left = opt.time;

        this.initDom( opt );

        this.render = this.compileRender(opt.time);
        this.initStatus();
        this.zeroCallback = opt.zeroCallback;

        return this;
    };

    Countdown.prototype.initDom = function( option ) {
        var cdEle = document.createElement('div');
        this.id=cdEle.id="count-down-"+(new Date()).valueOf();

        var ctn = document.getElementById( option.ctnID );
        
        this.dom = cdEle;
        this.ctn = ctn;

        // 创建各个时间的dom容器, 方便后面修改内容
        this.ele = {};
        this.ele.second = document.createElement('span');
        this.ele.second.setAttribute('class', 'cd-second');

        this.ele.minute = document.createElement('span');
        this.ele.minute.setAttribute('class', 'cd-minute');
        // 时间大于60分钟且需要显示小时数时 才创建hour ele
        if( option.time >= 60*60 && option.showHour ){
            this.ele.hour = document.createElement('span');
            this.ele.hour.setAttribute('class', 'cd-hour');
        }

        function newColon(){
            var colon = document.createElement('span');
            colon.setAttribute('class', 'cd-colon');
            colon.innerHTML = ':';
            return colon;
        }
        


        if( this.ele.hour ){
            cdEle.appendChild( this.ele.hour );
            cdEle.appendChild( newColon() );
        }
        cdEle.appendChild( this.ele.minute );
        cdEle.appendChild( newColon() );
        cdEle.appendChild( this.ele.second );
        
        ctn.appendChild( cdEle );
    };

    Countdown.prototype.initStatus = function() {
        this.render(this.initAmount);
    };

    Countdown.prototype.start = function() {
        this.count();
    };
    Countdown.prototype.pause = function() {
        clearInterval( this.cdTimer );
    };
    Countdown.prototype.reset = function() {
        clearInterval( this.cdTimer );
        this.left = this.initAmount;
        this.initStatus();
    };
    Countdown.prototype.count = function() {
        var self = this;
        this.cdTimer = setInterval(function(){
            self.left--;
            if( self.left >= 0 ){
                self.render(self.left);
            }
            else{
                clearInterval( self.cdTimer );
                if( self.zeroCallback instanceof Function ){
                    self.zeroCallback();
                }
            }
            
        }, 1000);
    }

    Countdown.prototype.compileRender = function( initAmount ){

        var self = this;
        
        // 十分钟以内, 分钟数只显示一位
        if( initAmount < 10*60 ){
            // return的render函数也会作为this的方法, 所以this仍会指向Countdown对象
            return function( left ){
                this.ele.minute.innerText = Math.floor(left/60);
                this.ele.second.innerText = makeDouble(left%60);
            }
        }
        // else if( initAmount >= 10*60 &&  ){
        else{
            if( this.ele.hour ){
                return function( left ){
                    self.ele.hour.innerText = Math.floor(left/3600);
                    self.ele.minute.innerText = makeDouble(Math.floor((left%3600)/60));
                    self.ele.second.innerText = makeDouble(left%60);
                }
            }
            else{
                return function( left ){
                    self.ele.minute.innerText = makeDouble(Math.floor(left/60));
                    self.ele.second.innerText = makeDouble(left%60);
                }
            }
        }
    }
})();