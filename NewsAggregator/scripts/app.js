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
APP.Main = (function() {

  var $ = document.querySelector.bind(document),
      stories = null,
      count = 100,
      main = $('main'),
      inDetails = false,
      isStoryDetails = false,
      commentDetails,
      i=0,
      k=0,
      dataWorker = new Worker("data.js"),
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
    var storyElement = document.querySelector('#s-' + key);
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
        var fragment = document.createDocumentFragment();
  
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
        for (var k = 0; k < kids.length; k++) {
          var comment = document.createElement('aside');
          comment.setAttribute('id', 'sdc-' + kids[k]);
          comment.classList.add('story-details__comment');
          comment.innerHTML = commentHtml;
          fragment.appendChild(comment)
          dataWorker.postMessage([kids[k], 3]);
          dataWorker.onmessage = function(e) {
            commentDetails = e.data;
            var comment = document.body.querySelector(
              '#sdc-' + commentDetails.id);
            comment.innerHTML = storyDetailsCommentTemplate(
              commentDetails,localeData);
          }
        }
        document.querySelector('.js-comments').appendChild(fragment);
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
    // Check if we need to load the next batch of stories.
   /*  if (main.scrollTop > window.innerHeight)
      loadStoryBatch(); */
   });

function loadStoryBatch() {
    if (count >= stories.length)
        count=stories.length;

    function loadStoryAnimation() {
      if (i < count) {
        var story = document.createElement('div');
        story.id = 's-' + stories[i];
        story.classList.add('story');
        main.appendChild(story);
        dataWorker.postMessage([stories[i], 2]);
        dataWorker.onmessage = function(e) {
          details = e.data;
          console.log('mensagem recebida no app.js');
          onStoryData(stories[i], details);
        }
        i++;
        requestAnimationFrame(loadStoryAnimation);
      }
    }
    requestAnimationFrame(loadStoryAnimation);
}
  dataWorker.postMessage(['1','asdda','asdad'])
  dataWorker.onmessage = function(e) {
    stories = e.data;
    loadStoryBatch();
    main.classList.remove('loading');
  }

})();