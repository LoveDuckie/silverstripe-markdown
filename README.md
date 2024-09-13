<div align="center">

# silverstripe-markdown

</div>

### A Programmer-Friendly Alternative to the Default TinyMCE Editor

Let’s be honest, the current [TinyMCE editor](https://www.tiny.cloud/) used by [Silverstripe](https://silverstripe.org/) for editing page content falls short in several ways. Its WYSIWYG interface often fails to accurately reflect what will be displayed on the final page, making content editing a frustrating experience. Manipulating HTML elements within the editor is awkward, with tags either mysteriously disappearing or being added unexpectedly. For those who work with technical content, this is more than a minor inconvenience—it’s a nightmare.

### The Problem

For technical bloggers and developers, managing embedded media (videos, images, code snippets) in TinyMCE is a constant challenge. The editor's lack of reliable control over HTML makes the content less portable and error-prone, forcing users to repeatedly fine-tune the formatting to get things right. The result? Wasted time and headaches, especially when consistency across pages is a priority.

### The Solution

This Silverstripe module aims to replace the current WYSIWYG approach with a more programmer-friendly editor that uses **Markdown**. Markdown is widely appreciated for its simplicity and versatility, making it a natural choice for developers who want more control over the final output.

### Key Features

- **Markdown-Friendly Editor:** The module integrates a Markdown editor into Silverstripe, offering a much more streamlined and familiar experience for programmers and technical writers.
- **Server-Side Rendering with Bootstrap 5 Support:** The Markdown input is rendered server-side into clean HTML, styled using **Bootstrap 5**. This ensures consistent and responsive presentation, without sacrificing the control and precision developers expect.
- **Extensible and Customizable:** The module is designed to be extensible, allowing developers to tweak and expand upon the Markdown-to-HTML rendering process as needed.

---

## Usage

```bash
#!/bin/bash
composer require loveduckie/silverstripe-markdown
```

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
