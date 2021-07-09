export function copyToClipboardAs(type, data) {
  let clipboardFormat;
  if (type === "plain") {
    clipboardFormat = Object.keys(data)
      .map((key) => {
        let text = `${key}\n`;
        text += `${data[key].map((tasks) => tasks.text).join("\n")}`;
        return text;
      })
      .join("\n");
  }
  if (type === "org") {
    clipboardFormat = Object.keys(data)
      .map((key) => {
        let text = `* ${key}\n`;
        text += `${data[key]
          .map((tasks) => `** TODO ${tasks.text}`)
          .join("\n")}`;
        return text;
      })
      .join("\n");
  }
  navigator.clipboard
    .writeText(clipboardFormat)
    .then(() => {
      console.log("success!");
    })
    .catch((err) => {
      console.log(err);
    });
}
export function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
