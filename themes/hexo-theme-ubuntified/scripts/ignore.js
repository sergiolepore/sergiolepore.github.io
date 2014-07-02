
/**
* Ignore tag
*
* Syntax:
*   {% ignore %}
*      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
*      Nam nec turpis a urna placerat venenatis quis in dui. 
*      Nulla porta malesuada metus eu euismod.
*   {% endignore %}
*/
hexo.extend.tag.register('ignore', function(args, content){
  return '';
}, true);