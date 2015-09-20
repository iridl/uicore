# uicore #

This README would normally document whatever steps are necessary to get your application up and running.

### javascript user interface library based on html objects ###

* Concept

*uicore* is a javascript library designed to build tools specified by single html pages that contain a single state space (called **pageform**) and a collection of elements that interact by modifying that state space.  Such elements include controls, images, and external json files, as well as some built-in support for selecting areas and clicking on pointw. **pageform** is subdivided using classes so that the author can control what parts of **pageform** each element monitors, limiting which elements need to be updating on a variable change.  The html pages all parse as pure html -- there is no explicit javascript code.  These html pages use json-ld and PURE templates to define mappings from information specified in JSON (either directly or via JSON-LD with framing), so that PURE templates can be used to convert the information into displayable HTML.

This html pages are written in xhtml, so that elements can be parsed with rdfa, so not only are the elements configured so that the code operates properly, but the configuration can be read by rdfa and the relationships used by global rdf databases.


* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact