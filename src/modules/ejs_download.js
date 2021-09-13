export function ejs_download() {

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

  const insertHtml = (html) => {
    const ins_html = `<link href="/assets/css/custom.css" rel="stylesheet"><script src="/assets/js/custom.js"></script>`;
    html = html.replace(/<\/head>/g, ins_html + '</head>');
    return html;
  };

  const download = (html) => {
    const link = document.createElement('a');
    const blob = new Blob([html], {type: 'text/html'})
    link.href = URL.createObjectURL(blob);
    link.download = window.location.pathname.split('/').pop().replace('.html', '.ejs') || 'index.ejs';
    link.click();
  };

  return {
    id: 'EjsDownload',
    label: 'EJSファイルをダウンロード',
    callback: () => {
      fetchSelf()
        .then((text) => {
          const html = insertHtml(text);
          download(html);
        })
    }
  };
}
