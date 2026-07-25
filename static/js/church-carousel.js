/**
 * 캐러셀형 히어로 배너 동작
 *
 * 페이지 안의 [data-carousel] 요소를 모두 찾아 각각 독립적으로 초기화합니다.
 * 마크업은 layouts/_partials/hbx/blocks/slider/block.html,
 * 모양은 assets/css/custom.css 의 14번 섹션이 담당합니다.
 *
 * 동작 규칙
 *   - data-interval(ms)마다 자동으로 다음 슬라이드로 넘어감 (0이면 자동 전환 없음)
 *   - 마우스를 올리거나 키보드 포커스가 들어오면 멈춤
 *   - 다른 탭으로 이동하면 멈추고, 돌아오면 다시 시작
 *   - 사용자가 OS에서 "동작 줄이기"를 켜 두었으면 자동 전환하지 않음
 *   - 좌우 방향키로 이동 가능
 */
(function () {
  "use strict";

  var DEFAULT_INTERVAL = 6000;
  var MIN_INTERVAL = 1500;

  function initCarousel(root) {
    var slides = Array.prototype.slice.call(
      root.querySelectorAll("[data-carousel-slide]")
    );
    if (slides.length === 0) return;

    var dots = Array.prototype.slice.call(
      root.querySelectorAll("[data-carousel-dot]")
    );
    var prevBtn = root.querySelector("[data-carousel-prev]");
    var nextBtn = root.querySelector("[data-carousel-next]");

    var parsed = parseInt(root.getAttribute("data-interval"), 10);
    var interval = isNaN(parsed) ? DEFAULT_INTERVAL : parsed;
    if (interval > 0 && interval < MIN_INTERVAL) interval = MIN_INTERVAL;

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var current = 0;
    var timer = null;

    function show(index) {
      current = (index + slides.length) % slides.length;

      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle("is-active", active);
        // 화면에 보이지 않는 슬라이드는 스크린리더와 탭 이동에서 제외합니다.
        if (active) {
          slide.removeAttribute("aria-hidden");
        } else {
          slide.setAttribute("aria-hidden", "true");
        }
      });

      dots.forEach(function (dot, i) {
        var active = i === current;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    function stop() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (slides.length < 2 || interval <= 0 || reduceMotion) return;
      timer = window.setInterval(function () {
        show(current + 1);
      }, interval);
    }

    function goTo(index) {
      show(index);
      start(); // 수동 조작 후에는 대기 시간을 다시 채웁니다.
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goTo(current - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goTo(current + 1);
      });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
      });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) start();
    });

    // 모바일 좌우 스와이프
    var touchStartX = null;
    var SWIPE_THRESHOLD = 50;

    root.addEventListener(
      "touchstart",
      function (event) {
        stop();
        touchStartX = event.changedTouches[0].clientX;
      },
      { passive: true }
    );

    root.addEventListener(
      "touchend",
      function (event) {
        if (touchStartX === null) return;
        var delta = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(delta) < SWIPE_THRESHOLD) {
          start();
          return;
        }
        goTo(delta < 0 ? current + 1 : current - 1);
      },
      { passive: true }
    );

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(current - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(current + 1);
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    show(0);
    start();
  }

  function initAll() {
    var roots = document.querySelectorAll("[data-carousel]");
    Array.prototype.forEach.call(roots, initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
