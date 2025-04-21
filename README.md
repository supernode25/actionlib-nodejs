ActionClient 설정
roslibjs로 액션 클라이언트를 설정하는 코드:

var fibonacciClient = new ROSLIB.ActionClient({
    ros: ros,
    serverName: '/fibonacci',
    actionName: 'actionlib_tutorials/FibonacciAction'
});
