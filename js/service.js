/**
 * Created by bobo on 2017/5/28.
 */

(function (angular) {
    angular.module('app').service('zmHttp',['$window',function ($window) {
        this.jsonp = function (url,params,fn) {
            /*1.在本地创建一个函数*/
            var callBackName = "zm_callback"+Math.random().toString().slice(2)
            // alert(callBackName);
            //名称有了 但是我要往window上面绑定函数 不能使用原生的
            $window[callBackName] = function (data) {
                console.log(data);
                fn(data); //相当于执行了app当中的function 并给他穿了一个参数
                $window.document.body.removeChild(newScript);
            };

            /*2.通过src属性请求网络地址*/
            //d动态创建script
            var  newScript = $window.document.createElement('script');
            /*www.douban.com?apiKey=apiKey&callback=callback*/


            var queryString = "";
            for(var key in params){
                queryString +=key+'='+params[key]+'&'
            }
            queryString +='callback='+callBackName;
            // alert(queryString)
            // apiKey=0b2bdeda43b5688921839c8ecb20399b&callback=zm_callback435950531206478
            //仅仅只是一个查询参数,还需要拼接

            var src= url+'?'+queryString;
            // alert(src)
            newScript.src=src;
            $window.document.body.appendChild(newScript);
        };

    }])
})(angular);
