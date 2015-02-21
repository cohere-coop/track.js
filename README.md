# track.js
Semantic analytics event triggers for segment.io

## Usage
1. Download the [pre-release
source](https://raw.githubusercontent.com/zincmade/track.js/master/lib/track.js)
2. Add it to your project with a `<script>` tag.
3. Start describing events!
4. Give us feedback on what would be better!

### Example:

```html
<!DOCTYPE html>
<head>
<title>Example Code For Track.js</title>
<script type="text/javascript">
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.0.1";
  analytics.load("YOUR_SEGMENT_WRITE_KEY");
  analytics.page()
  }}();
</script>
<script src="track.js"></script>
</head>
<body>
<p><a class="begin-sign-up" href="http://example.com/sign-up">Sign Up!</a></p>

<p>Not convinced? Wait until you <a class="check-pricing"
href="http://example.com/pricing">see our low, low prices!</a></p>

<script>
Track.cta(".begin-sign-up", "Began Sign up", { color: "Green"
                                             , location: "Header Top-Right"
                                             , category: "Sign up"
                                             , pageSubject: "Home" });

Track.explore(".check-pricing", "Check Pricing",
              { color: "Blue"
              , location: "Right Sidebar"
              , category: "Sign up"
              , pageSubject: "Pricing overview" });

</script>
</body>
</html>
```

## Contributing
We're flattered you want to spend your time helping out. Read our [contributor
guidelines](CONTRIBUTING.md) for more details, or hop onto our [issue
tracker](https://waffle.io/zincmade/track.js) and grab a feature or bug!


## Developing

### Testing Locally
Right now, we're kind of missing test automation. Our smoke-test strategy is:

1. Copy-paste track.js into a site that uses it.
2. Open the segment.com debugger.
3. Poke around at user interface elements.
4. Watch events come through.

We'd love a pull request which adds unit and integration tests!
