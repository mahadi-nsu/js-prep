# Toggleable Sections Template

This template shows how to make sections collapsible using HTML `<details>` and `<summary>` tags.

## How to Make Sections Toggleable

### Basic Structure

```markdown
<details>
<summary><strong>📚 Section Title</strong></summary>

Your content here...

</details>
```

### Complete Topic Template with Toggleable Sections

````markdown
## [Topic Number]. [Topic Name]

<details>
<summary><strong>📚 Concept Overview</strong></summary>

Brief explanation of the concept (2-3 sentences).

</details>

<details>
<summary><strong>🎯 Key Points</strong></summary>

- **Point 1**: Brief explanation
- **Point 2**: Brief explanation
- **Point 3**: Brief explanation

</details>

<details>
<summary><strong>📋 Cheatsheet</strong></summary>

| Aspect    | Description | Example |
| --------- | ----------- | ------- |
| Feature 1 | Description | Example |
| Feature 2 | Description | Example |

</details>

<details>
<summary><strong>💡 Code Snippets</strong></summary>

#### Basic Example

```javascript
// Your code here
const example = "code";
```
````

#### Advanced Example

```javascript
// More complex code
function advancedExample() {
  // code here
}
```

</details>

<details>
<summary><strong>🚀 Best Practices</strong></summary>

✅ **Do's:**

- Best practice 1
- Best practice 2

❌ **Don'ts:**

- Anti-pattern 1
- Anti-pattern 2

</details>

<details>
<summary><strong>🎯 Interview Questions & Answers</strong></summary>

**Q: Common interview question?**

```javascript
// Code example
```

**A:** Answer with explanation

</details>

<details>
<summary><strong>🔍 Deep Dive (Optional)</strong></summary>

Additional technical details, edge cases, or advanced concepts.

</details>
```

## Benefits of Toggleable Sections

### ✅ **User Experience**

- **Clean interface** - Only see what you need
- **Faster navigation** - Collapse sections you don't need
- **Mobile friendly** - Less scrolling on small screens
- **Focus on content** - Reduce visual clutter

### ✅ **For 100+ Topics**

- **Organized structure** - Easy to manage large content
- **Quick scanning** - See all section titles at once
- **Progressive disclosure** - Show details on demand
- **Better performance** - Faster page loading

### ✅ **Interview Preparation**

- **Quick review** - Expand only relevant sections
- **Focused study** - Hide sections you already know
- **Reference mode** - Collapse explanations, keep cheatsheets open
- **Mobile study** - Better experience on phones

## Implementation Tips

### 1. **Consistent Formatting**

```markdown
<summary><strong>🎯 Section Title</strong></summary>
```

- Use emojis for visual distinction
- Use `<strong>` for better visibility
- Keep titles concise

### 2. **Logical Grouping**

- Group related content in same toggle
- Keep sections reasonably sized
- Don't over-fragment content

### 3. **Default State**

- Consider which sections should be open by default
- Important sections (like cheatsheets) might be better open
- Long sections (like interview Q&A) are better collapsed

### 4. **Accessibility**

- Screen readers handle `<details>` well
- Keyboard navigation works naturally
- Semantic HTML structure

## Example: Closures Topic

````markdown
## 2. Closures

<details>
<summary><strong>📚 Concept Overview</strong></summary>

A closure is a function that has access to variables in its outer scope even after the outer function has returned.

</details>

<details>
<summary><strong>🎯 Key Points</strong></summary>

- **Lexical Scoping**: Functions remember their creation context
- **Data Privacy**: Variables are protected from outside access
- **Memory Management**: Closures can cause memory leaks if not handled properly

</details>

<details>
<summary><strong>📋 Cheatsheet</strong></summary>

| Concept        | Description                             | Example                                                                            |
| -------------- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| Basic Closure  | Function with access to outer scope     | `function outer() { let x = 1; return function() { return x; } }`                  |
| Module Pattern | Private variables with public interface | `const module = (function() { let private = 0; return { get: () => private } })()` |

</details>

<details>
<summary><strong>💡 Code Snippets</strong></summary>

#### Basic Closure

```javascript
function outer() {
  let count = 0;
  return function () {
    return ++count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```
````

#### Module Pattern

```javascript
const calculator = (function () {
  let result = 0;

  return {
    add: (x) => {
      result += x;
    },
    subtract: (x) => {
      result -= x;
    },
    getResult: () => result,
  };
})();
```

</details>

<details>
<summary><strong>🎯 Interview Questions</strong></summary>

**Q: What will this output?**

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

**A:** `3, 3, 3` (all closures reference same variable)

</details>
```

This template ensures consistent, user-friendly, and scalable documentation for 100+ JavaScript topics!
