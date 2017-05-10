angular.module('app')
    .directive('myVideo', function () {
       

        return {
            restrict: 'E',
            replace: true,
            template:   	'<video src="/assets/video/fknt.mp4" controls poster="/assets/img/1313.jpg"></video>',
            link: function (scope, element, attrs) {
                const video = element[0];
                element.bind("click", () => {
                    const method = video.paused ? 'play' : 'pause';
		            video[method]();
                })
            }
    };
});