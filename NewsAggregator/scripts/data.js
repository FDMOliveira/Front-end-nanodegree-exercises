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
(function() {

  var HN_API_BASE = 'https://hacker-news.firebaseio.com';
  var HN_TOPSTORIES_URL = HN_API_BASE + '/v0/topstories.json';
  var HN_STORYDETAILS_URL = HN_API_BASE + '/v0/item/[ID].json';
  var requestID = 0,
      data,
      functionNumber;

  onmessage = function(e) {
    var array = e.data[0];
    var functionNumber = e.data[1];
    if(e.data.length==1)
      functionNumber = e.data[0];
    switch(functionNumber) {
      case 1: getTopStories();
              break;
      case 2: getStoryById(array);
              break;
      case 3: getStoryComment(array);
              break;
    }
  }

  // functionNumber 1
  function getTopStories() { 
    request(HN_TOPSTORIES_URL, function(evt) {
      data = evt.target.response;
      postMessage(data);
    });
  }

  // functionNumber 2
  function getStoryById(stories) {
    stories.forEach(element => {
      var storyURL = HN_STORYDETAILS_URL.replace(/\[ID\]/, element);
      request(storyURL, function(evt) {
        data = evt.target.response;
        postMessage([element, data]);
        console.log('função 2');
      });
    });
  }

  // functionNumber 3
  function getStoryComment(comments) {
    data=null;
    var data;
    comments.forEach(CommentId => {
      var storyCommentURL = HN_STORYDETAILS_URL.replace(/\[ID\]/, CommentId);
      request(storyCommentURL, function(evt) {
        console.log('função 3');
        data = evt.target.response;
        postMessage([CommentId,data]);
      });
    })
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
