export function toSentenceCase(str:any) {
    return str.replace(/^.|\s\S/g, function(a:any) {
      return a.toUpperCase();
    });
  }