app.factory("Page", function ($resource) {

    var title = 'Small Molecules';
    var keywords = 'Small Molecules';
    return {
        title: function() { return title;},
        keywords: function() { return keywords;},
        setTitle: function(newTitle) { title = newTitle; },
        setKeywords: function(newKeywords) { keywords = newKeywords; }
    };
});