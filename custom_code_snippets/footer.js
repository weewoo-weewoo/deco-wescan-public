
document.addEventListener("DOMContentLoaded", function () {
  const mainNav = document.getElementById("main_nav");
  if (!mainNav) return;

  const searchWrapper = document.createElement("div");
  searchWrapper.innerHTML = `
    <div class="dn-nav-search">
      <div role="button"
           tabindex="0"
           class="dn-search-icon"
           onclick="dnInlinePopup(this, 'dn_search_popup_pt', {
             valign: 'none',
             halign: 'none',
             backgroundClass: 'dn-faded-bg'
           });"
           onkeydown="if (event.key === 'Enter') { event.preventDefault(); this.click(); }"
           aria-label="Search"
           aria-haspopup="true"
           aria-expanded="false"
           aria-controls="dn_search_popup_pt">
      </div>
    </div>
  `;

  mainNav.appendChild(searchWrapper.firstElementChild);
});


fetch('https://weewoo-weewoo.github.io/deco-wescan-public/html_components/topbar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('remote-container-topbar').innerHTML = html;
  });

