'use strict';

var initialTimeText = '20 : 00';
var initialTime = 20;
var secondsPerMin = 60;
var timeUplimit = 60;
var timeLowlimit = 0;
var ksStart = 0;
var ksPause = 1;
var ksContinue = 2;
var xPos = 0;
var yPos = 1;
var changeTimePoint = 5;
var changeImagePoint = 5;
var GOLD = 'gold';
var TREE = 'tree';
var WATER = 'water';
var FIRE = 'fire';
var SOIL = 'soil';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0LmpzIl0sIm5hbWVzIjpbImluaXRpYWxUaW1lVGV4dCIsImluaXRpYWxUaW1lIiwic2Vjb25kc1Blck1pbiIsInRpbWVVcGxpbWl0IiwidGltZUxvd2xpbWl0Iiwia3NTdGFydCIsImtzUGF1c2UiLCJrc0NvbnRpbnVlIiwieFBvcyIsInlQb3MiLCJjaGFuZ2VUaW1lUG9pbnQiLCJjaGFuZ2VJbWFnZVBvaW50IiwiR09MRCIsIlRSRUUiLCJXQVRFUiIsIkZJUkUiLCJTT0lMIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLGtCQUFrQixTQUF4QjtBQUNBLElBQU1DLGNBQWMsRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCO0FBQ0EsSUFBTUMsZUFBZSxDQUFyQjtBQUNBLElBQU1DLFVBQVUsQ0FBaEI7QUFDQSxJQUFNQyxVQUFVLENBQWhCO0FBQ0EsSUFBTUMsYUFBYSxDQUFuQjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGtCQUFrQixDQUF4QjtBQUNBLElBQU1DLG1CQUFtQixDQUF6QjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLFFBQVEsT0FBZDtBQUNBLElBQU1DLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sTUFBYiIsImZpbGUiOiJjb25zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGluaXRpYWxUaW1lVGV4dCA9ICcyMCA6IDAwJ1xuY29uc3QgaW5pdGlhbFRpbWUgPSAyMFxuY29uc3Qgc2Vjb25kc1Blck1pbiA9IDYwXG5jb25zdCB0aW1lVXBsaW1pdCA9IDYwXG5jb25zdCB0aW1lTG93bGltaXQgPSAwXG5jb25zdCBrc1N0YXJ0ID0gMFxuY29uc3Qga3NQYXVzZSA9IDFcbmNvbnN0IGtzQ29udGludWUgPSAyXG5jb25zdCB4UG9zID0gMFxuY29uc3QgeVBvcyA9IDFcbmNvbnN0IGNoYW5nZVRpbWVQb2ludCA9IDVcbmNvbnN0IGNoYW5nZUltYWdlUG9pbnQgPSA1XG5jb25zdCBHT0xEID0gJ2dvbGQnXG5jb25zdCBUUkVFID0gJ3RyZWUnXG5jb25zdCBXQVRFUiA9ICd3YXRlcidcbmNvbnN0IEZJUkUgPSAnZmlyZSdcbmNvbnN0IFNPSUwgPSAnc29pbCdcbiJdfQ==