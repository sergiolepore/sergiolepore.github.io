
/**
 * Better Youtube tag, with nocookie mode.
 *
 * Syntax:
 *   {% youtube video_id %}
 */
hexo.extend.tag.register('youtube', function(args){
  var id = args[0];

  return '<div class="video-container"><iframe src="//www.youtube-nocookie.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe></div>';
});