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

  var $ = document.querySelector.bind(document),
      stories,
      main = $('main'),
      inDetails = false,
      isStoryDetails = false,
      commentDetails,
      lastElement,
      commentId,
      details,
      storyChunk,
      firstElementChunk = 0,
      count=100,
      i=0,
      k=0,
      dataWorker = new Worker("./scripts/data.js"),
      localeData = {
        data: {
          intl: {
            locales: 'en-US'
          }
        }
  };

  var tmplStory = $('#tmpl-story').textContent;
  var tmplStoryDetails = $('#tmpl-story-details').textContent;
  var tmplStoryDetailsComment = $('#tmpl-story-details-comment').textContent;

  if (typeof HandlebarsIntl !== 'undefined') {
    HandlebarsIntl.registerWith(Handlebars);
  } else {

    // Remove references to formatRelative, because Intl isn't supported.
    var intlRelative = /, {{ formatRelative time }}/;
    tmplStory = tmplStory.replace(intlRelative, '');
    tmplStoryDetails = tmplStoryDetails.replace(intlRelative, '');
    tmplStoryDetailsComment = tmplStoryDetailsComment.replace(intlRelative, '');
  }

  var storyTemplate =
      Handlebars.compile(tmplStory);
  var storyDetailsTemplate =
      Handlebars.compile(tmplStoryDetails);
  var storyDetailsCommentTemplate =
      Handlebars.compile(tmplStoryDetailsComment);

  function onStoryData (key, details) {
    var storyElement = document.getElementById('s-' + key);
      if (storyElement) {
        storyElement.innerHTML = storyTemplate(details);
        storyElement.addEventListener('click', onStoryClick.bind(this,details));
      }
    }  
    function onStoryClick(details) {    
      setTimeout(showStory.bind(this, details.id), 60);
  
      if (!storyDetails) {
        if (details.url)
          details.urlobj = new URL(details.url);
        var kids = details.kids;
        var commentHtml = storyDetailsCommentTemplate({
          by: '', text: 'Loading comment...'
        }); 
        var storyDetails = document.querySelector("section");
  
        if(!isStoryDetails) {
          storyDetails = document.createElement('section');
          storyDetails.classList.add('story-details');
          document.body.appendChild(storyDetails);
        }
        storyDetails.classList.remove("removeStory");
        storyDetails.id = 'sd-' + details.id;
        storyDetails.innerHTML = storyDetailsTemplate(details);      
        storyDetails.querySelector('.js-close').addEventListener('click', hideStory.bind(this, details.id));
  
        if (typeof kids === 'undefined')
          return;
        
        function getCommentKids() {
          if (k<kids.length) {
            var comment = document.createElement('aside');
            comment.setAttribute('id', 'sdc-' + kids[k]);
            comment.classList.add('story-details__comment');
            comment.innerHTML = commentHtml;
            document.querySelector('.js-comments').appendChild(comment);
            k++;
          }
          requestAnimationFrame(getCommentKids);
        }
        requestAnimationFrame(getCommentKids);
        
        // GETSTORYCOMMENT
        dataWorker.postMessage([kids, 3]);
        dataWorker.onmessage = function(e) {
          commentId = e.data[0];
          commentDetails = e.data[1];
          document.getElementById('sdc-'+commentId).innerHTML = 
            storyDetailsCommentTemplate(commentDetails,localeData);
        }
      }
      // There is a story container
      isStoryDetails = true;
    }

  function showStory(id) {
    inDetails = true;
    var storyDetails = document.querySelector('#sd-' + id);
    if (!storyDetails)
      return;
    storyDetails.classList.add("showStory");  
  }
  function hideStory(id) {
    if (!inDetails)
      return;
    document.querySelector('#sd-' + id).classList.add("removeStory");
  }

  main.addEventListener('scroll', function() {
    // Add a shadow to the header.
    if (main.scrollTop > 70) 
      document.body.classList.add('raised');
    else
      document.body.classList.remove('raised'); 
    console.log(document.querySelector('.story:last-of-type').offsetTop);
      // If the last element of the array is shown, it creates a new one 
      if ((document.querySelector('.story:last-of-type').offsetTop) <= main.scrollTop) {
        loadStoryBatch();
        console.log('carrega!');
    } 
  });

function loadStoryBatch() {
    var elmentsNumberPerChunk = stories.length / 5;
    storyChunk = stories.slice(firstElementChunk, elmentsNumberPerChunk);

    function loadStoryAnimation() {
      if ((firstElementChunk < stories.length) && (i < storyChunk.length)) {
        var story = document.createElement('div');
        story.id = 's-' + stories[i];
        story.classList.add('story');
        main.appendChild(story);
        i++;
        requestAnimationFrame(loadStoryAnimation);
      }
    }
    requestAnimationFrame(loadStoryAnimation);
    
    dataWorker.postMessage([stories, 2]);
    dataWorker.onmessage = function(e) {
      key = e.data[0];
      details = e.data[1];
      onStoryData(key, details);
    }
  firstElementChunk+=elmentsNumberPerChunk;
}
  function firstLoad() {
    dataWorker.postMessage([1]);
    dataWorker.onmessage = function(e) {
      stories = e.data;
      loadStoryBatch();
      main.classList.remove('loading');
    }
  }
  firstLoad();
})();