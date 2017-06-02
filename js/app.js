/**
 * Created by bobo on 2017/5/28.
 */
/*豆瓣api
 * 基地址:https://api.douban.com/
 *
 * 要写豆瓣电影所以在电影中查看
 * 正在热映 把地址拼接到基地址url上面去 就可以拿到豆瓣的热映数据了
 *
 * https://api.douban.com/v2/movie/in_theaters?start=2&count=3  从第2条数据开始,总数取3条
 *
 * 首先title测试能不能使用angular
 *
 * 在app中使用路由 注入路由 配置路由
 * 抽取配置路由
 *
 * 获取点击的type类型 然后拿到地址 就可以访问数据了
 *
 * 出现不能访问 超出限制
 * 配置apiKey
 *
 * s使用$http发送请求
 * 遇到跨域问题,本机访问豆瓣api 遇到跨域问题,1.6之后解决跨域,使用白名单解决跨域(写过以后还是错) 是因为在接收callback时,名称中不能出现小数点,我自己去写jsonp  p拼接地址
 *
 * 加载数据时 数据没了 jsonp加载数据时会有延迟 因为异步
 * 需要手动调用apply
 *
 * 加载中
 * 点击设置详情  电影条目信息  /v2/movie/subject/1764796  拿到地址开始发送请求 使用我们自己弄的发送请求
 *
 *tabbar切换
 *
 *
 *
 *
 * */
(function (angular) {
    /*1.使用路由,注入路由模块*/
    var app = angular.module('app',['ngRoute']);
    // app.controller('zmController',['$scope',function ($scope) {
    //     $scope.name = '豆瓣';
    // }])

    /*1.1.配置路由*/
    // app.config(['$routeProvider',function ($routeProvider) {
    //     $routeProvider.when('/movie/:type',{
    //         templateUrl:'musicList.html',
    //         // controller:'musicController',
    //     }).otherwise({
    //         redirectTo:'/movie/in_theaters'
    //     })
    //
    //     /*跳转的三个位置三个锚点
    //      在豆瓣Api上查看
    //      这些东西写在a标签当中 点击时锚点变化 走上面第一个监听锚点的变化 然后模板放置的位置是ng-view
    //      /movie/in_theaters
    //      /movie/coming_soon
    //      /movie/top250
    //      * */
    // }])
/*2.musicController在此处声明 创建控制器 angular路由的固定步骤*/
//拿到传参的值
//     app.controller('musicController',['$scope','$routeParams','apiKey','$http',function ($scope,$routeParams,apiKey,$http) {
    app.controller('musicController',['$scope','$routeParams','apiKey','zmHttp',function ($scope,$routeParams,apiKey,zmHttp) {
        /*定义正在加载中*/
        $scope.isloading = true;
////////////////////////////////
         //一开始的页数
        $scope.curPage = 1;
        //一页有多少条
        $scope.count = 10;


        //一共有多少页
       var totalCount = "";

////////////////////////

        // alert($routeParams.type)
        var type = $routeParams.type;
        // var url ="https://api.douban.com/v2/movie/"+type+"?apiKey="+apiKey;
        var url ="https://api.douban.com/v2/movie/"+type;
        // console.log(url);
        // alert(url);
        var params = {
            apiKey:apiKey,
            start:0,
            count:10
        }

        /*$http({
            url:url,
            method:'jsonp',

        }).then(function (res) {
            console.log(res);  //解决跨域
        }).catch(function (error) {
            console.log(error);
        })
*/

        zmHttp.jsonp(url,params,function (data) {

            // console.log('zm=>',data);
            $scope.data = data; //异步 改了值 脏值检测
            $scope.isloading = false;
        //一共有几页
          $scope.totalCount = Math.ceil($scope.data.total/$scope.count);

            $scope.$apply();
            // alert($scope.totalCount)

        });
        $scope.isNextPage = true;
        //是否显示上一页
        $scope.isPerPage = false;
        //是否显示下一页


        /*分页  点击上一页 下一页*/

        $scope.pageChange = function (type) {
            if(type){
                $scope.curPage++;
            }else {
                $scope.curPage--;
            }
            // console.log($scope.curPage);
            /*控制上一页,下一页是否显示*/
            $scope.isPerPage = $scope.curPage ==1 ?false:true;
            $scope.isNextPage = $scope.curPage == $scope.totalCount ?false:true;

            //从当前开始请求的页码
            var start = ($scope.curPage-1) * $scope.count;
            // alert(start);


            // alert(url);
            var params = {
                start:start,
                count:$scope.count
            }

            zmHttp.jsonp(url,params,function (data) {

                // console.log('zm=>',data);
                $scope.data = data; //异步 改了值 脏值检测
                $scope.isloading = false;
                //一共有几页
                $scope.totalCount = Math.ceil($scope.data.total/$scope.count);

                $scope.$apply();

            });


        }

    }]);


/******************************************/
/*电影详情*/
    app.controller('detailController',['$scope','$routeParams','zmHttp',function ($scope,$routeParams,zmHttp) {

       console.log($routeParams.id)
        var url ="https://api.douban.com/v2/movie/subject/"+$routeParams.id;
        console.log(url);


        zmHttp.jsonp(url,null,function (data) {

            // console.log('zm=>',data);
            $scope.data = data; //异步 改了值 脏值检测

            $scope.$apply();

        });


    }]);

    app.value('apiKey','0b2bdeda43b5688921839c8ecb20399b');
}) (angular);