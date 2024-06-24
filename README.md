<div align="center">

# silverstripe-markdown

</div>

A Silverstripe module for enabling support for Markdown syntax with server-sided rendering and content editing support.

---

## Goal

Let's be honest, the existing [TinyMCE editor](https://www.tiny.cloud/) used by [Silverstripe](https://silverstripe.org/) for editing page content absolutely sucks. It's WYSIWYG editor produces an inaccurate rendering of what will be displayed on the final page, and editing HTML elements in the editor pane is awkward and prone to mistakes. HTML elements either mysteriously disappear or get unexpectedly added.

For technical blogging, this can be an complete nightmare especially when embedding other forms of media such as video, images, and code snippets. It also makes the content a lot less portable. This Silverstripe module proposes using something that is friendlier for programmers instead, and letting the server render the HTML from the source Markdown "code" as desired.

- Integrate an editor into Silverstripe that is friendly with Markdown syntax.
- Add extensible server-sided support for rendering Markdown into HTML with Bootstrap 5 styling.

---

## Related Projects

This module works best with the following projects

- **Blog Tool**
  - A command-line tool written in Python for writing, managing, and publishing content written in Markdown syntax.
  - Support for multiple publishing platforms including [Silverstripe](https://www.silverstripe.org/), [Wordpress](https://wordpress.com/), [dev.to](https://dev.to/) and [Hashnode](http://hashnode.com/).
  - [Link](https://github.com/LoveDuckie/blog-tool)
- **Silverstripe Image Uploader API**
  - Enables for image assets to be uploaded remotely and securely to an existing Silverstripe installation through an exposed API.
  - Accepts [Base64](https://en.wikipedia.org/wiki/Base64) and binary payloads.  

---

## Thanks

This project would not have been possible without the existence of another open-source project.

- **silverstripers/markdown**
  - [Link](https://github.com/HelloBetterLTD/markdownfield)
