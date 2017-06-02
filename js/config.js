
/**
 * Created by bobo on 2017/5/28.
 */
(function (angular) {
    angular.module('app').config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/movie/:type', {
            templateUrl: 'musicList.html',
            controller:'musicController',
        }).otherwise({
            redirectTo: '/movie/in_theaters'
        })

        /*跳转的三个位置三个锚点
         在豆瓣Api上查看
         这些东西写在a标签当中 点击时锚点变化 走上面第一个监听锚点的变化 然后模板放置的位置是ng-view
         /movie/in_theaters
         /movie/coming_soon
         /movie/top250
         * */
    }]);
/*详情路由*/
    angular.module('app').config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/detail/:id', {
            templateUrl: 'movie_detail_tpl.html',
            controller:'detailController',
        })

        /*跳转的三个位置三个锚点
         在豆瓣Api上查看
         这些东西写在a标签当中 点击时锚点变化 走上面第一个监听锚点的变化 然后模板放置的位置是ng-view
         /movie/in_theaters
         /movie/coming_soon
         /movie/top250
         * */
    }]);
    /*设置白名单*/
   angular.module('app').config(['$sceDelegateProvider',function ($sceDelegateProvider) {
       $sceDelegateProvider.resourceUrlWhitelist([
           "self",
           "https://api.douban.com/**"
       ])
   }])

})(angular);