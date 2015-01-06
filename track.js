(function(exports) {
  var CTA_EVENT_ID='Clicked CTA';

  exports.Track = {
    cta: function(selector, cta,  options) {
      forElements(selector, function(element) {
        var decoratedOptions = optionsFor(element, cta, options);
        analyticsFnFor(element).call(analytics, element, CTA_EVENT_ID, decoratedOptions);
      });
    },
  }

  return exports.Track;
  function forElements(selector, callback) {
    var elements = document.querySelectorAll(selector);
    Array.prototype.forEach.call(elements, callback);
  }

  function analyticsFnFor(element) {
    if (element.tagName === "FORM") {
      return analytics.trackForm
    } else {
      return analytics.trackLink
    }
  }

  function optionsFor(element, cta, options) {
    options.CTA = options.CTA || cta;
    options.pageTitle = options.pageTitle || document.title
    options.pageUrl = options.pageUrl || location.href
    options.pagePath = options.pagePath || location.pathname
    options.type = options.type || elementType(element);
    options.text = options.text || elementText(element);
    return options;
  }

  function elementType(element) {
    if (element.querySelector('img') || element.tagName === "IMG") {
      return "Image";
    }

    if (element.tagName === "FORM") {
      return "Button";
    }

    if (element.tagName === "A") {
      if (element.classList.contains("button")) {
        return "Button";
      } else {
        return "Link";
      }
    }
  }

  function elementText(element) {
    var type = elementType(element);
    if (type === "Image") {
      return element.alt || element.src;
    }

    if (type === "Link") {
      return element.textContent;
    }

    if (type === "Form") {
      return submitButtonText(element);
    }
  }

  function submitButtonText(element) {
    var button = element.querySelector('button') || element.querySelector('input[type="submit"]');
    return button.textContent;
  }
})(window || exports);

document.addEventListener("DOMContentLoaded", function() {
  Track.cta("nav a.twitter", "Check my Twitter", {
    category: "Investigate me",
    color: "Red"
  });

  Track.cta("nav a.github", "Check my Github", {
    category: "Investigate me",
    color: "Red"
  });

  Track.cta("nav a.rss", "Check my RSS", {
    category: "Subscribe",
    color: "Red"
  });
});
