export function dialog(events) {
  const oldDialog = document.getElementById('irToolDialog');
  if (oldDialog) {
    document.body.removeChild(oldDialog);
  }

  const dialog = document.createElement('dialog');
  dialog.setAttribute('id', 'irToolDialog');
  document.body.appendChild(dialog);

  dialog.innerHTML = '<h2>IR案件補助ツール</h2><ul>';
  events.forEach(event => {
    dialog.innerHTML += `
      <li><button style="appearance:none; padding:0.2em 0.8em; border:0; border-radius:0; background:#000; color:#fff; font-size:x-large; cursor:pointer;" id="irTool${event.id}">${event.label}</button></li>
    `;
  });
  dialog.innerHTML += '</ul><p style="text-align:center;"><button id="closeIrToolDialog">閉じる</button></p>';

  events.forEach(event => {
    document.getElementById('irTool' + event.id).addEventListener('click', event.callback);
  });
  document.getElementById('closeIrToolDialog').addEventListener('click', () => {
    dialog.close();
  });
  dialog.showModal();
}
