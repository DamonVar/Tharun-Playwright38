# Selectors in Automation — Revision Notes

## What are Selectors
A selector is a string expression used to locate an element in the DOM so the automation tool can interact with it (click, fill, assert, etc.). Every action (`click()`, `fill()`, `toBeVisible()`) needs a selector to find the correct element first.

## Selector Support by Tool
| Tool | Selector types supported |
|---|---|
| Cypress | CSS only |
| Selenium | XPath, CSS, id, tagname, name, link text, partial link text |
| Playwright | XPath, CSS, text, + 7 built-in locators (`getByRole`, `getByText`, etc.) |

Playwright examples of the three main approaches:
```js
await page.locator('//button[@type="submit"]').click();        // XPath
await page.locator('button[type="submit"]').click();            // CSS
await page.getByRole('button', { name: 'Login' }).click();      // Built-in
```
Useful browser extensions for building/testing locators: **Ortoni Studio**, **SelectorHub**.

---

## XPath

**What it is:** XPath = "XML Path". It's a query language that navigates the HTML DOM tree the same way it navigates XML — by path, using tag names and attributes. It works because HTML is structurally XML-like.

**Why used:** It's the most flexible locator language — it can match by attribute, by visible text, by position, and can travel both down (parent→child) and up (child→parent) the DOM tree, which CSS cannot do.

### Absolute vs Relative XPath
| Type | Starts with | Starts from | Used in real projects? |
|---|---|---|---|
| Absolute | `/` | Root node (`html`) | No — breaks if DOM structure changes |
| Relative | `//` | Any matching node | Yes — standard practice |

```
Absolute: /html/body/div[1]/div/div/div/div[2]/div[1]/form/div[1]/div[2]/input
Relative: //input[@placeholder="Full Name"]
```
Absolute XPath is fragile because it hardcodes the entire path — one structural change breaks it. Relative XPath only cares about the target node's own identifying attributes, so it's far more stable.

### XPath Syntax Patterns

**1. Basic attribute match**
```
//tagname[@attributename='attributevalue']
//input[@name="username"]
```

**2. Full text match**
Used when the element has no unique attribute but has unique visible text.
```
//tagname[text()='fulltext']
//h5[text()='Login']
```

**3. Partial text match**
Used when the text is long, dynamic, or you only know part of it.
```
//tagname[contains(.,'partialtext')]
//p[contains(.,"Forgot your")]
```

**4. AND condition**
Both conditions must be true on the same node.
```
//tagname[@attr1='val1'][@attr2='val2']
//input[@type="text" and @placeholder="Enter Rediffmail ID"]
```

**5. OR condition**
Either condition matching is enough — used to match a group of elements that vary slightly.
```
//tagname[@attr1='val1' or @attr2='val2']
//input[@type="text" or @type="email"]
```

**6. starts-with (prefix match)**
Used when an attribute value has a fixed prefix but a dynamic/random suffix (common with auto-generated IDs).
```
//tagname[starts-with(@attrname, "prefixvalue")]
//input[starts-with(@name, "name")]
```

**7. ends-with (suffix match)**
Used when the dynamic part is at the start and the value ends in a fixed, known string.
```
//tagname[ends-with(@attrname, "suffixvalue")]
```

**8. contains (substring match)**
Used when the fixed known text is somewhere in the middle of a dynamic value.
```
//tagname[contains(@attrname, "commonvalue")]
```

### Traversing the DOM Tree
XPath's biggest advantage over CSS: it can move in **any direction**.

| Direction | Syntax | Notes |
|---|---|---|
| Parent → Child | `//div[@id='xyz']/input` | Direct child only |
| Child → Parent | `//a[@href="xyz"]/..` or `/parent::form` | CSS cannot do this at all |
| Indexing | `(xpath)[1]`, `(xpath)[last()]` | Pick nth match from a set |

### Axes Methods
Axes let you locate an element **relative to another element**, when the target itself has no unique attribute.

| Axis | Meaning | Example |
|---|---|---|
| `following` | Any matching element appearing anywhere after this node | `//input[@id="ABC"]/following::img` |
| `following-sibling` | Matching sibling appearing after this node, same parent | `//li[@id='Abc']/following-sibling::li[2]` |
| `parent` | Direct parent | `//a[@id='abc']/parent::form` |
| `child` | Direct child | `//a[@id='xyz']/child::span` |
| `ancestor` | Any ancestor up the tree (not just direct parent) | `//span[@value="xyz"]/ancestor::div` |
| `descendant` | Any descendant down the tree (not just direct child) | `div/descendant::span` |

---

## CSS Selectors

**What it is:** The same syntax browsers use to apply styles, reused to locate elements. Faster to execute than XPath but less powerful — it can only move **downward** in the DOM.

```js
await page.locator(CSS).click();
```

### CSS Syntax Patterns

**1. By ID**
```
#idvalue
#submit
```

**2. By class**
```
.classvalue
.orangehrm-login-branding
```
Multiple classes on one element — chain them with no space:
```
<div class="class1 class2 class3">
.class1.class2.class3
```

**3. Basic tag + attribute**
```
XPath: //input[@id="userName"]
CSS:   input[id="userName"]
```

**4. Text match — NOT SUPPORTED**
CSS has no way to select by visible text. Use XPath instead when text is the only identifier.

**5. AND condition**
Chain attribute selectors directly (no space).
```
input[placeholder="Full Name"][type="text"]
```

**6. OR condition — NOT SUPPORTED**
CSS has no OR logic across attributes. Use XPath instead.

**7. Prefix match (`^=`)**
```
tagname[attrname^='prefixvalue']
input[name^="name"]
```

**8. Suffix match (`$=`)**
```
tagname[attrname$='suffixvalue']
input[value$='Raju']
```

**9. Contains match (`*=`)**
```
tagname[attrname*='substring']
input[value*='Raju']
```

### Traversing in CSS
| Direction | Syntax | Notes |
|---|---|---|
| Parent → Child (any depth) | `div a` | space = descendant |
| Parent → Direct child | `div > a` | `>` = direct child only |
| nth child | `form > div > div:nth-child(12)` | positional match |
| Child → Parent | **Not possible** | Major CSS limitation |
| Indexing `[n]` / `[last()]` | **Not possible** | Major CSS limitation |
| following-sibling (direct next only) | `#abc + li` | CSS only supports the *immediate* next sibling, not "any sibling after" like XPath |

---

## XPath vs CSS — Quick Comparison
| Capability | XPath | CSS |
|---|---|---|
| Attribute match | Yes | Yes |
| Text match | Yes | No |
| AND | Yes | Yes |
| OR | Yes | No |
| starts-with / ends-with / contains | Yes | Yes (`^=` `$=` `*=`) — no ends-with equivalent by function name, but `$=` covers it |
| Parent → Child | Yes | Yes |
| Child → Parent | Yes | No |
| Indexing | Yes | No |
| Speed | Slower | Faster |

**Interview takeaway:** Prefer CSS when possible (faster, cleaner). Fall back to XPath only when you need text-based matching, OR logic, or upward/indexed traversal — that's the precise justification interviewers look for.

---

## Common Tag → Element Mapping
| Tag | Represents |
|---|---|
| `input` | Text box, radio, checkbox, file upload |
| `a` | Links |
| `span` | Text |
| `img` | Images |
| `video` | Videos |
| `canvas` | Canvas elements |
| `table` | Tables |
| `select` | Dropdowns |
| `button` | Buttons |

---

## Summary Table

| Selector Type | Syntax | When to Use | Example |
|---|---|---|---|
| Absolute XPath | `/html/body/.../input` | Never in real projects (too fragile) | `/html/body/div[1]/div/form/input` |
| Relative XPath — basic | `//tag[@attr='val']` | Element has a unique attribute | `//input[@name="username"]` |
| Relative XPath — text | `//tag[text()='x']` | No unique attribute, but known exact text | `//h5[text()='Login']` |
| Relative XPath — partial text | `//tag[contains(.,'x')]` | Text is long/dynamic | `//p[contains(.,"Forgot your")]` |
| Relative XPath — AND | `//tag[@a='1'][@b='2']` | Need two attributes together to be unique | `//input[@type="text" and @placeholder="..."]` |
| Relative XPath — OR | `//tag[@a='1' or @b='2']` | Match one of several attribute variants | `//input[@type="text" or @type="email"]` |
| Relative XPath — starts-with | `//tag[starts-with(@a,'x')]` | Dynamic suffix, fixed prefix | `//input[starts-with(@name,"name")]` |
| Relative XPath — contains | `//tag[contains(@a,'x')]` | Fixed substring anywhere in value | `//input[contains(@name,"Raju")]` |
| Relative XPath — parent→child | `//div[@id='x']/input` | Direct child navigation | `//div[@id='xyz']/input` |
| Relative XPath — child→parent | `//a[@id='x']/..` or `/parent::tag` | Only way to go upward in DOM | `//a[@id='abc']/parent::form` |
| Relative XPath — indexing | `(xpath)[n]` / `(xpath)[last()]` | Multiple matches, need nth or last | `(//button)[2]` |
| Relative XPath — axes | `.../following::tag`, `/ancestor::tag`, etc. | Target has no unique attribute; locate via a nearby known element | `//li[@id='Abc']/following-sibling::li[2]` |
| CSS — ID | `#idvalue` | Element has unique `id` | `#submit` |
| CSS — Class | `.classvalue` | Element has unique/combination class | `.oxd-main-menu-item` |
| CSS — Attribute | `tag[attr='val']` | Same as XPath basic, but faster | `input[id="userName"]` |
| CSS — AND | `tag[a='1'][b='2']` | Two attributes needed together | `input[placeholder="Full Name"][type="text"]` |
| CSS — starts-with | `tag[attr^='val']` | Dynamic suffix, fixed prefix | `input[name^="name"]` |
| CSS — ends-with | `tag[attr$='val']` | Dynamic prefix, fixed suffix | `input[value$='Raju']` |
| CSS — contains | `tag[attr*='val']` | Fixed substring anywhere | `input[value*='Raju']` |
| CSS — descendant | `div a` | Any depth below parent | `form div input` |
| CSS — direct child | `div > a` | One level below parent only | `form > div > div:nth-child(12)` |
| CSS — next sibling | `#abc + li` | Immediate next sibling only | `#abc + li` |
| Playwright built-in | `getByRole`, `getByText`, `getByPlaceholder`, etc. | Preferred first choice — resilient, accessibility-based | `page.getByRole('button', {name:'Login'})` |
