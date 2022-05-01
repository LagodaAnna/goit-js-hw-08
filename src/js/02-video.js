import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

iframePlayer.setCurrentTime(trackOfCurrentTime());

iframePlayer.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(e) {
  localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(e.seconds));
}

function trackOfCurrentTime() {
  const savedData = localStorage.getItem(CURRENT_TIME_KEY);
  const parsedData = JSON.parse(savedData);
  return parsedData;
}
