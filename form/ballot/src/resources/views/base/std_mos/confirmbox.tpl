{literal}
<script type="text/html" id="confirmboxTemplate">

		<div class="messagebox-body">
			<p><%=body%></p>
		</div>
		<div style="margin:14px 0px;height:42px;line-height:42px;width:100%;text-align:center;">
			<a href="#" class="push-button button btn btn-primary btn-lg confirm_ok" style="width:100px;"><% if (!button_yes_text) { %>Да<% } else { %><%=button_yes_text%><% } %></a> <% if (!hide_button_no) { %><a href="#" class="push-button button btn btn-primary btn-lg confirm_no" style="width:100px;">Нет</a><% } %>
		</div>

</script>
<script type="text/javascript">
function confirmbox(title, body, width, yesCallback, callback_data, hide_button_no, button_yes_text) {

  if (!hide_button_no) {
    var hide_button_no = false;
  }
  if (!button_yes_text) {
    var button_yes_text = false;
  }

	var messageboxBody = OPR.templater('confirmboxTemplate', {title: title, body: body, width: width, hide_button_no: hide_button_no, button_yes_text: button_yes_text});
    messagebox(title, messageboxBody, width, function(){}, false, function(){
       	$('.popup_messagebox .cross, .popup_messagebox .confirm_no').on('click', function() {
			$('.popup_messagebox').fadeOut('fast', clearMessageboxes());
			return false;
		});
		$('.popup_messagebox .confirm_ok').on('click', function() {
			$('.popup_messagebox').fadeOut('fast', clearMessageboxes());
			if (typeof(yesCallback) == 'function') {
				if (typeof(callback_data) != 'undefined') {
					yesCallback(callback_data);
				} else {
					yesCallback();
				}
				yesCallback = false;
			}
			return false;
		}); 
    });

	return false; // for <a> links
}

</script>
{/literal}