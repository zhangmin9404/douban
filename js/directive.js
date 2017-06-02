/**
 * Created by bobo on 2017/5/29.
 */

(function (angular) {
    angular.module('app').directive('routerSel',['$location',function ($location) {
        return{
            restrict:'A',
            //所有的dom操作应该在link中操作
            link:function ($scope,ele,attr) {

              console.log($location.url())

                $scope.$location = $location;
              $scope.$watch('$location.url()',function (newV,oldV) {
                  // console.log(( newV, oldV));
                  //获取a标签的href值与newV对比,如果相等,就添加class
                  var href = ele.find('a').attr('href').slice(2);
                  console.log(href);
                  if(href == newV){
                      ele.parent().children().removeClass(attr.routerSel);
                      ele.addClass(attr.routerSel)
                  }
              })

            }

        }

    }])

})(angular);
