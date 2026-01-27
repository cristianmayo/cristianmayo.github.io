const _ = require("lodash");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require('eleventy-plugin-toc');
const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");

module.exports = function(config) {
config.setUseGitIgnore(true);

//#region >> Passthrough ========================
    config.addPassthroughCopy("./src/assets/css/**/*.min.css");
    config.addPassthroughCopy("./src/assets/img/**/*");
    //#endregion

    //#region >> Short Codes ========================
    config.addShortcode("dateToday", () => `${new Date().toLocaleString(DateTime.DATE_HUGE)}`);

    config.addShortcode("currentYear", () => `${new Date().getFullYear()}`);
    //#endregion

    //#region >> Custom Filters ========================
    config.addNunjucksFilter("take", (collection, count) => collection.slice(0, count || 10));

    config.addNunjucksFilter("localeDate", (dateObject) => {
        return DateTime
            .fromJSDate(dateObject)
            .toLocaleString(DateTime.DATE_HUGE);
    });

    config.addFilter("ymdDateFormat", (date) => {
        // Create a new Date object from the input date string
        var inputDate = new Date(date);

        // Extract the year, month, and day components from the date object
        var year = inputDate.getFullYear();
        var month = ("0" + (inputDate.getMonth() + 1)).slice(-2);
        var day = ("0" + inputDate.getDate()).slice(-2);

        // Return the date string in the "YYYY/MM/DD" format
        return year + "/" + month + "/" + day;
      });

    config.addFilter("excerpt", (post) => {
        const content = post.replace(/(<([^>]+)>)/gi, "");
        return content.substr(0, content.lastIndexOf(" ", 250)) + "...";
    });

    config.addFilter("truncate", (str, length = 100) => {
        if (!str) { return ""; }
        if (str.length <= length) { return str; }
        return str.substr(0, str.lastIndexOf(" ", length)) + "...";
    });

    config.addFilter("slugify", (str) => {
        if (!str) { return; }

        return slugify(str.replaceAll(".", "-"), {
            lower: true,
            strict: true,
            remove: /["]/g,
        });
    });

    // Get next post in chronological order (newer)
    config.addFilter("getNextPost", (collection, currentPost) => {
        const posts = collection.filter(post => !post.data.draft);
        const currentIndex = posts.findIndex(post => post.url === currentPost.url);
        return currentIndex > 0 ? posts[currentIndex - 1] : null;
    });

    // Get previous post in chronological order (older)
    config.addFilter("getPreviousPost", (collection, currentPost) => {
        const posts = collection.filter(post => !post.data.draft);
        const currentIndex = posts.findIndex(post => post.url === currentPost.url);
        return currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
    });


    config.addNunjucksFilter("sortedCollection", (collection) => collection.sort());

    //#endregion

    //#region >> Articles Config ========================
    config.addCollection("publishedPosts", (collection) => { return _
        .chain(collection.getAllSorted())
        .filter((post) => post.url && post.inputPath.startsWith('./src/articles/')  && !post.data.draft)
        .reverse()
        .value();
    });

    config.addCollection("postsByCategory", (collection) => {
        return _
            .chain(collection.getAllSorted())
            .filter((post) => post.url && post.inputPath.startsWith('./src/articles/') && !post.data.draft)
            .groupBy((post) => post.data.categories)
            .toPairs()
            .reverse()
            .value();
    });
    //#endregion

    //#region >> Blog Config ========================
    // Custom permalink for blog posts based on filename
    config.addCollection("blogPosts", (collection) => {
        return collection.getFilteredByGlob("./src/blog/**/*.md")
            .filter(post => !post.data.draft)
            .sort((a, b) => {
                // Sort by date descending (newest first)
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
    });


    // Extract date parts from filename for permalink
    config.addFilter("extractDateFromFilename", (filename) => {
        const match = filename.match(/(\d{4})(\d{2})(\d{2})_/);
        if (match) {
            return {
                year: match[1],
                month: match[2],
                day: match[3]
            };
        }
        return null;
    });

    // Extract slug from filename
    config.addFilter("extractSlugFromFilename", (filename) => {
        const match = filename.match(/\d{8}_(.*?)\.md$/);
        return match ? match[1] : filename;
    });
    //#endregion

    //#region >> Markdown Overrides ========================
    const markdownItAnchorOptions = {
        level: [1, 2, 3],
        slugify: (str) => slugify(str, {
            lower: true,
            strict: true,
            remove: /["]/g,
        })
    };

    // This is the part that tells 11ty to swap to our custom config
    let markdownLibrary = markdownIt().use(markdownItAnchor, markdownItAnchorOptions);

    config.setLibrary("md", markdownLibrary);
    //#endregion

    //#region >> Plugins ========================
    config.addPlugin(pluginTOC, {
        tags: ['h1', 'h2', 'h3'],
        wrapper: 'nav',
        ul: true,
        flat: false
    });

    // Mermaid plugin configuration with dark theme
    config.addPlugin(pluginMermaid, {
        mermaid_config: {
            theme: 'dark',
            themeVariables: {
                primaryColor: '#ff6e02',
                primaryTextColor: '#dfdfdf',
                primaryBorderColor: '#ff4500',
                lineColor: '#ff6e02',
                secondaryColor: '#2c3238',
                tertiaryColor: '#212529',
                background: '#2c3238',
                mainBkg: '#2c3238',
                textColor: '#dfdfdf',
                fontSize: '16px'
            }
        }
    });

    return {
        dir: {
            input: "src",

            output: "docs"
        }
    };
    //#endregion
}