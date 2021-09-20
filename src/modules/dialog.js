export function dialog(events) {
  const oldDialog = document.getElementById('irToolDialog');
  if (oldDialog) {
    document.body.removeChild(oldDialog);
  }

  const dialog = document.createElement('dialog');
  dialog.setAttribute('id', 'irToolDialog');
  document.body.appendChild(dialog);

  let innerDialog = '<h2 class="dialog_title">IR案件補助ツール</h2><ul class="tools">';
  events.forEach(event => {
    innerDialog += `
      <li class="tool"><button class="tool_button" id="irTool${event.id}">${event.label}</button></li>
    `;
  });
  innerDialog += '</ul><p class="dialog_close"><button class="close_button" id="closeIrToolDialog">閉じる</button></p>';
  dialog.innerHTML = innerDialog;

  events.forEach(event => {
    document.getElementById('irTool' + event.id).addEventListener('click', event.callback);
  });
  document.getElementById('closeIrToolDialog').addEventListener('click', () => {
    dialog.close();
  });
  dialog.showModal();
}
