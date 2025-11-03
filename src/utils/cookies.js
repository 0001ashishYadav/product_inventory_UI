const setCookie = (cname, cvalue, exSeconds = 3600) => {
  const maxAge = "Max-Age=" + exSeconds;
  if (typeof window !== "undefined") {
    // browser code
    document.cookie = `${cname}=${cvalue}; ${maxAge}; path=/; SameSite=Lax;`;
  }
};

function getCookie(cname) {
  const name = cname + "=";
  if (typeof window !== "undefined") {
    // browser code
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; path=/; Max-Age=-99999999;";
}

export { setCookie, getCookie, deleteCookie };
