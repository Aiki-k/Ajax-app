function check() {
  const posts = document.querySelectorAll(".post"); // querySelectorAllメソッドで、postをクラス名にもつ要素を取得できます。postというクラス名を持つ要素はメモの数だけ存在します。
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load","true");
    post.addEventListener("click", () => {
      // ここにクリックした時に行う「何らかの処理」を記述していく
      const postId = post.getAttribute("data-id")
      const XHR = new XMLHttpRequest();
      XHR.open("Get", '/posts_${postId}', true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert('Error ${XHR.status}: ${XHR.statusText}'); //HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理が行われます。XHR.statusTextによって、エラーが生じたオブジェクトに含まれるエラーメッセージが表示されます。
          return null; //return null;によってJavaScriptの処理から抜け出すことができます。
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000); 