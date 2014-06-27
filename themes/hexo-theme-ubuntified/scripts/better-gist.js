
/**
* Better Gist tag
*
* Syntax:
*   {% gist gist_id [{"json":"parameters"}] %}
*
* Parameters:
*   hide_line_numbers: boolean  | Hide/Show line numbers
*   hide_footer: boolean        | Hide/Show footer
*   file: string                | Load a single file from a gist (example.js)
*   line: string                | Load a single line or a range of lines (1,3-5)
*   highlight_line: string      | Highlight a list of line numbers from a gist (1,5,6,7)
*   direct_link: string         | Direct link to gist. Used as a placeholder while loading gist
*/

hexo.extend.tag.register('gist', function(args){
  var gist_id = args[0];
  var parameters = args[1] || '{}';
  var htmlAttributes = Array();
  var placeholder = '';

  parameters = JSON.parse(parameters);

  htmlAttributes.push('data-gist-id="%s"'.replace(/%s/, gist_id));

  if (parameters.hide_line_numbers) {
    htmlAttributes.push('data-gist-hide-line-numbers="%s"'.replace(/%s/, 'true'));
  }
  if (parameters.hide_footer) {
    htmlAttributes.push('data-gist-hide-footer="%s"'.replace(/%s/, 'true'));
  }
  if (parameters.file) {
    htmlAttributes.push('data-gist-file="%s"'.replace(/%s/, parameters.file));
  }
  if (parameters.line) {
    htmlAttributes.push('data-gist-line="%s"'.replace(/%s/, parameters.line));
  }
  if (parameters.highlight_line) {
    htmlAttributes.push('data-gist-highlight-line="%s"'.replace(/%s/, parameters.highlight_line));
  }
  if (parameters.direct_link) {
    placeholder = '<a href="%link" target="_blank" title="Ir a Gist %id">> Enlace al código <</a>'.replace(/%link/, parameters.direct_link).replace(/%id/, gist_id);
  }

  return '<p><code %s>%placeholder</code></p>'.replace(/%s/, htmlAttributes.join(' ')).replace(/%placeholder/, placeholder);
});