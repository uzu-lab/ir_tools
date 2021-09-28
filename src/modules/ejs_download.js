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
    const hdr_ins_html = `<link href="/assets/css/custom.css" rel="stylesheet"><script src="/assets/js/custom.js"></script>`;
    html = html.replace(/(<link.+?>)?(<script.+?>)?<\/head>/g, hdr_ins_html + '</head>');
    const ftr_ins_html = `<script>
      jQuery(function($){
        $('a[href^="/"]').attr('href', function(i, v){
          var local_href = '/';
          if (v !== local_href) {
            local_href = v.replace(/^(.+?)\/?(#.+)?$/, '$1.html$2');
          }
          return local_href;
        });
      });
    </script>`;
    html = html.replace(/<\/body>/g, ftr_ins_html + '</body>');
    return html;
  };

  /**
   * 内部リンクをローカル化
   */
  const localizeHref = (html) => {
    const domain = window.location.hostname;
    const regexp1 = new RegExp('<a(.+?)href="http(s)?:\/\/' + domain + '\/?"', 'g');
    html = html.replace(regexp1, '<a$1href="/"'); // トップへのリンク
    const regexp2 = new RegExp('<a(.+?)href="http(s)?:\/\/' + domain + '(.*?)\/?"', 'g');
    return html.replace(regexp2, '<a$1href="$3"'); // 下層へのリンク
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
          text = localizeHref(text)
          download(text);
        })
    }
  };
}
