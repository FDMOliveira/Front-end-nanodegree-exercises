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
      commentId,
      details,
      headerHeight,
      headerTitleScale,
      lastscrollTop=main.scrollTop;
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
function headerRaisedAnimation() {
  function headerRaised() {
    if (headerHeight >= 86) {
      headerHeight -=5;
      requestAnimationFrame(headerRaised);
    } 
    document.querySelector('header').style.height= headerHeight+'px';
  }
  requestAnimationFrame(headerRaised);

  function header_titleRised() {
    if(headerTitleScale >= 0.76) {
      headerTitleScale*=0.1;
      requestAnimationFrame(header_titleRised);
    }
    document.querySelector('.header__title-wrapper').style.transform='scale('+headerTitleScale+');';
  }
  requestAnimationFrame(header_titleRised);
}
function headerRaisedOutAnimation () {
  function headerRaisedOut() {
    if (headerHeight <= 156) {
      headerHeight +=5;
      requestAnimationFrame(headerRaisedOut);
    } 
    document.querySelector('header').style.height=headerHeight+'px';
  }
  requestAnimationFrame(headerRaisedOut);

  function header_titleRisedOut() {
    if(headerTitleScale <= 1) {
      headerTitleScale*=1.1;
      requestAnimationFrame(header_titleRisedOut);
    }
    document.querySelector('.header__title-wrapper').style.transform='scale('+headerTitleScale+');';
  }
  requestAnimationFrame(header_titleRisedOut);
}
  main.addEventListener('scroll', function() {
    headerTitleScale = 1;
    headerHeight = document.querySelector('header').offsetHeight;
    console.log(headerTitleScale);
    if (main.scrollTop > lastscrollTop)
      headerRaisedAnimation();      
    else 
      headerRaisedOutAnimation();
      lastscrollTop = main.scrollTop;
  });

function loadStoryBatch() {
    function loadStoryAnimation() {
      if (i < stories.length) {
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