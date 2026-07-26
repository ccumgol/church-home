/**
 * 상단 메뉴 — 화면 폭에 따라 상위 메뉴의 동작을 나눕니다.
 *
 *   PC (1024px 이상)  : 상위 메뉴를 누르면 그대로 이동합니다.
 *                       하위메뉴는 마우스를 올리면 열립니다. (CSS 가 처리)
 *   모바일 (1024px 미만): 마우스 hover 가 없으므로, 상위 메뉴를 누르면
 *                       이동하지 않고 하위메뉴를 펼칩니다.
 *                       하위 항목을 눌러 원하는 곳으로 이동하면 됩니다.
 *
 * 프레임워크의 기본 토글 스크립트는 `role="button"` 인 요소에만 붙는데,
 * 그걸 쓰면 PC 에서도 이동이 막히기 때문에 이 파일에서 따로 처리합니다.
 * (navbar 마크업: layouts/_partials/components/headers/navbar.html)
 */
(function () {
  "use strict";

  var DESKTOP = "(min-width: 1024px)";

  function isDesktop() {
    return window.matchMedia && window.matchMedia(DESKTOP).matches;
  }

  function setOpen(item, link, open) {
    item.classList.toggle("active", open);
    link.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function closeAll(except) {
    document.querySelectorAll(".nav-dropdown.active").forEach(function (item) {
      if (item === except) return;
      var link = item.querySelector(".nav-link");
      if (link) setOpen(item, link, false);
    });
  }

  function init() {
    var links = document.querySelectorAll(".nav-dropdown > .nav-link");

    links.forEach(function (link) {
      var item = link.closest(".nav-dropdown");
      if (!item) return;

      link.addEventListener("click", function (event) {
        // PC 에서는 링크 그대로 — 첫 번째 하위 항목으로 이동합니다.
        if (isDesktop()) return;

        event.preventDefault();
        var willOpen = !item.classList.contains("active");
        closeAll(item);
        setOpen(item, link, willOpen);
      });

      // 키보드: 아래 방향키로도 펼칠 수 있게
      link.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowDown") return;
        event.preventDefault();
        closeAll(item);
        setOpen(item, link, true);
        var first = item.querySelector(".nav-dropdown-link");
        if (first) first.focus();
      });
    });

    // 메뉴 밖을 누르면 닫기
    document.addEventListener("click", function (event) {
      if (event.target.closest(".nav-dropdown")) return;
      closeAll(null);
    });

    // Escape 로 닫기
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll(null);
    });

    // PC 로 넓어지면 열려 있던 모바일 메뉴 상태를 정리합니다.
    if (window.matchMedia) {
      var mq = window.matchMedia(DESKTOP);
      var onChange = function () {
        if (mq.matches) closeAll(null);
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
