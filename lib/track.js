(function(exports) {
  var CTA_EVENT_ID='Clicked CTA';
  var EXPLORE_EVENT_ID='Explored Towards Goal';

  exports.Track = {
    CTA_EVENT_ID: "Clicked CTA",
    EXPLORE_EVENT_ID: "Explored Goal",
    // Attaches a call-to-action event to a link or form.
    // Example:
    //    Track.cta(".begin-sign-up", "Began Sign up", { color: "Green"
    //                                                 , location: "Header Top-Right"
    //                                                 , category: "Sign up"
    //                                                 , pageSubject: "Pricing overview" });
    cta: function(selector, cta,  options) {
      applyTracking(selector, element, action, CTA_EVENT_ID, options)
    },
    // Attaches a call-to-action event to a link or form.
    // Example:
    //    Track.explore(".visit-newsletter-archive",
    //                  "Visit Newsletter Archive",
    //                  { color: "Blue"
    //                  , location: "Right Sidebar"
    //                  , category: "Sign up"
    //                  , pageSubject: "Pricing overview" });
    explore: function(selector, exploration, options) {
      applyTracking(selector, element, action, EXPLORE_EVENT_ID, options)
    }
  }

  return exports.Track;

  function applyTracking(selector, element, action, event_id, options) {
    forElements(selector, function(element) {
      var decoratedOptions = optionsFor(element, action, options);
      analyticsFnFor(element).call(analytics, element, event_id, decoratedOptions);
    });
  }

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
