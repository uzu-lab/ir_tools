export function meta_fill() {

  const $ = jQuery || null;

  /**
   * textareaを表示
   */
  const showTextarea = () => {
    const $textarea = $(`
      <div class="dialog_title">メタ情報自動入力</div>
      <textarea id="irToolMetaArea" class="meta_text_input" rows="15"></textarea>
      <div class="meta_text_control">
        <button class="tool_button" id="irToolMetaConfirm">確認する</button>
      </div>
    `);
    $('#irToolDialog .dialog_inner').empty().append($textarea);
    $('#irToolMetaConfirm').on('click', () => {
      const data = formatData($('#irToolMetaArea').val());
      showConfirm(data);
    });
  };

  /**
   * 確認
   */
  const showConfirm = (data) => {
    console.log(data);
    const $table = $(`
      <table class="meta_table">
        <thead>
          <tr>
            <th>ページ名</th>
            <th>スラッグ</th>
            <th>title</th>
            <th>description</th>
          </tr>
        </thead>
      </table>
    `);
    const $tbody = $('<tbody>');
    data.forEach(row => {
      $tbody.append($(`
        <tr>
          <td>${row.name}</td>
          <td>${row.slug}</td>
          <td>${row.seo_title}</td>
          <td>${row.seo_description}</td>
        </tr>
      `));
    });
    $('#irToolDialog .dialog_inner').empty().append(
      $('<div class="dialog_title">入力内容確認</div>'),
      $table.append($tbody),
      $(`
        <div class="meta_text_control">
          <button class="tool_button back" id="irToolMetaBack">戻る</button>
          <button class="tool_button" id="irToolMetaSubmit">入力する</button>
        </div>
      `)
    );
  };

  /**
   * データ整形
   */
  const formatData = (text) => {
    let rows = text.trim().split(/(\r)?\n/);
    let data = [];
    rows.forEach(row => {
      if (typeof row !== 'string') {
        return;
      }
      row = row.split(/\t/);
      data.push({
        name: row[0],
        slug: row[2] || 'home',
        seo_title: row[3],
        seo_description: row[5]
      });
    });
    return data;
  };

  /**
   * 埋め込み
   */
  const fillData = () => {

  };

  return {
    id: 'MetaFill',
    label: 'メタ情報自動入力',
    callback: () => {
      if (!$) {
        alert('使用できません！');
        return;
      }
      showTextarea();
    }
  };
}
