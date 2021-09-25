export function ejs_download() {

  /**
   * 表示中のページのソースを取得
   */
  const fetchSelf = () => {
    const url = window.location.href;
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.text();
      }).catch((reason) => {
        console.log(reason);
      });
  };

  /**
   * CSS/JSの挿入。挿入済みのコードは削除する。
   */
  const insertHtml = (html) => {
    const ins_html = `<link href="/assets/css/custom.css" rel="stylesheet"><script src="/assets/js/custom.js"></script>`;
    html = html.replace(/(<link.+?>)?(<script.+?>)?<\/head>/g, ins_html + '</head>');
    return html;
  };

  /**
   * リネーム＆ダウンロード処理
   */
  const download = (html) => {
    const link = document.createElement('a');
    const blob = new Blob([html], {type: 'text/html'});
    link.href = URL.createObjectURL(blob);
    let filename = window.location.pathname.replace(/(.+)\/$/, '$1').split('/').pop();
    filename = filename ? filename.replace(/(\..+)?$/, '.ejs') : 'index.ejs';
    console.log(filename);
    link.download = filename;
    link.click();
  };

  return {
    id: 'EjsDownload',
    label: 'EJSファイルをダウンロード',
    callback: () => {
      fetchSelf()
        .then((text) => {
          text = insertHtml(text);
          download(text);
        })
    }
  };
}
