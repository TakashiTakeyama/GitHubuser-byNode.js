function fetchUserInfo(userId) {
    fetch(`https://api.github.com/users/${userId}`)
        .then(response => {
            console.log(response.status);
            // エラーレスポンスが返されたことを検知する
            if (!response.ok) {
                console.error("サーバーエラー", response);
            } else {
                response.json().then(userInfo => {
                  const view = escapeHTML`
                  <h4>${userInfo.name} (@${userInfo.login})</h4>
                  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
                  <dl>
                  <dt>Location</dt>
                  <dt>Repositories</dt>
                  <dt>${userInfo.public_repos}</dt>
                  `;
                  const result = document.getElementById("result");
                  result.innerHTML = view;
                });
            }
        }).catch(error => {
            console.error("ネットワークエラー", error);
        });
}

function escapeSpecialChars(str) {
  return str
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;")
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}

