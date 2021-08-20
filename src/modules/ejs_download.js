export function ejs_download() {
  return {
    id: 'EjsDownload',
    label: 'EJSファイルをダウンロード',
    callback: () => {
      console.log('download');
    }
  };
}
