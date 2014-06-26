
/**
* Shell tag
*
* Syntax:
*   {% shellcode [{"json":"parameters"}] %}
*     $ command1
*     $ Command2
*     # Command3
*   {% end-shellcode %}
*
* Parameters:
*   cwd:  string   | Current Working Directory. Default: ~
*   su:   boolean  | Shell in SuperUser mode. Default: false
*/
hexo.extend.tag.register('shellcode', function(args, content){
  var jsonArgs = args[0] || '{}';
  var htmlClasses = Array();
  var htmlTemplate = '';
  var lineTemplate = '';
  var lineArray = Array();
  var indicator = '$';
  var user = 'you';
  var host = 'yourcomputer';
  var cwd;
  var su;

  jsonArgs = JSON.parse(jsonArgs);
  cwd = jsonArgs.cwd || '~';
  su  = jsonArgs.su  || false;

  if (su) {
    indicator = '#';
  }

  lineArray = content.split(/\n/g);

  htmlTemplate = "\
    <div class='ubuntu-terminal'>\
      <div class='head'>\
        <span class='btn'>&#10005;</span>\
        <span class='btn stnd'>&#9472;</span>\
        <span class='btn stnd max'>&#9723;</span>\
        <span>%user@%host:%cwd</span>\
      </div>\
      <div class='term'>\
        %content\
        %user@%host:%cwd%indicator <span class='cursor'>&#9610;</span>\
        <br/>\
      </div>\
    </div>\
  ";

  lineTemplate = "\
    %user@%host:%cwd%indicator <span class='terminal-line'>%line</span>\
    <br>\
  ";

  for (var i = 0; i < lineArray.length; i++) {
    lineArray[i] = lineTemplate.replace(/%line/g, lineArray[i]);
  }

  return htmlTemplate
          .replace(/%content/g, lineArray.join(''))
          .replace(/%user/g, user)
          .replace(/%host/g, host)
          .replace(/%cwd/g, cwd)
          .replace(/%indicator/g, indicator)
  ;
}, true);