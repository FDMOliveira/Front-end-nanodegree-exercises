/**
 *
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
APP.Data = (function() {

  var HN_API_BASE = 'https://hacker-news.firebaseio.com';
  var HN_TOPSTORIES_URL = HN_API_BASE + '/v0/topstories.json';
  var HN_STORYDETAILS_URL = HN_API_BASE + '/v0/item/[ID].json';
  var requestID = 0;
  var data;

  onmessage = function(e) {
    console.log('mensagem recebida');
    console.log(e);
    var id = e.data[0];
    var functionName = e.data[1];
    if(e.data.length==1)
      functionNumber = e.data[0];

    switch(functionNumber) {
      case 1: getTopStories();
              break;
      case 2: getStoryById(id);
              break;
      case 3: getStoryComment(id);
              break;
    }

    console.log('informação recebida pelo web worker');
    postMessage(data);
  }

  // functionNumber 1
  function getTopStories() { 
    request(HN_TOPSTORIES_URL);
    data = evt.target.response;
  }

  // functionNumber 2
  function getStoryById(id) { // 1
    console.log('função getStoryById invocada');
    var storyURL = HN_STORYDETAILS_URL.replace(/\[ID\]/, id);

    request(storyURL);

    data = evt.target.response;
  }

  // functionNumber 3
  function getStoryComment(id) {
    console.log('função getStoryComment invocada');

    var storyCommentURL = HN_STORYDETAILS_URL.replace(/\[ID\]/, id);

    request(storyCommentURL);

    data = evt.target.response;
  }

  function request(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = callback;
    xhr.send();
  }

  return {
    getTopStories: getTopStories,
    getStoryById: getStoryById,
    getStoryComment: getStoryComment
  };

})();
