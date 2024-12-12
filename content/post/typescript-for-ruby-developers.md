+++
date = "2024-01-02T12:00:00-00:00"
title = "TypeScript for Ruby developers"
tags = ['software', 'ruby', 'typescript', 'performance']
+++

Ruby is poetry. In comparison, TypeScript feels like a technical manual. As a Ruby developer, you may look at TypeScript and think, *Why trade elegance for rules?* That's a fair question. But here's the thing: Those rules can save your skin when you need something big, fast and complex.
<!--more-->
TypeScript won't replace Ruby. Instead, it's like learning a second language -- it opens you new doors and makes you also appreciate your first language.

**No more memory issues**

Ruby is great for coding ideas quickly, but its dynamic nature can create runtime surprises. That's fine in small apps. But as codebases grow, Ruby's flexibility can mean bogging memory leaks.

With its static typing, TypeScript catches errors at compile time. Fewer runtime crashes means fewer firefights in production. Consider the example:

```ruby {class="my-class" id="rb-codeblock" lineNos=inline tabWidth=2}
require 'json'

data = JSON.parse('{ "name": "Alice", "age": 30 }')
puts data["age"] # No guarantees this exists.
```
Now the same thing in TypeScript:

```typescript {class="my-class" id="ts-codeblock" lineNos=inline tabWidth=2}
interface Person {
  name: string;
  age: number;
}

const data: Person = JSON.parse('{ "name": "Alice", "age": 30 }');
console.log(data.age); // TypeScript guarantees this is a number.

```

The difference? Ruby leaves it to you to double-check your input. TypeScript enforces structure at compile time. That means fewer bugs and faster debugging.

**Hard Numbers**

TypeScript consistently outpaces Ruby in raw execution:

| Task	             | Ruby (MRI)	 | JavaScript (Node.js) |
|--------------------|---------------|----------------------|
| JSON Serialization | 3,500 ops/sec | 60,000 ops/sec       |
| Array Operations	 | 1,000 ops/sec | 30,000 ops/sec       |

Source: Benchmarks from [The Computer Language Benchmarks Game](https://benchmarksgame-team.pages.debian.net/benchmarksgame/index.html).

You can confidently use TypeScript for tasks Ruby struggles with, such as real-time data processing or high-througput APIs.

**Wide Libraries**

Ruby has Rails, but what about the front end? TypeScript dominates in the browser. Frameworks like React, Angular, and Next.js — built with TypeScript in mind — allows you to create rich experiences Ruby simply can’t touch.

And it is not just front-end. Many popular APIs now offer Typescrip libraires, but omit Ruby. Want to have Infrastructure as Code ? Pulumi only offers TypeScript, go, Java and Python libraries. There is no Ruby.

**Codebase Scalability**

You’ve seen it happen: a Ruby app grows, developers change, and suddenly, no one knows what half the code does. Ruby’s openness is both its strength and its curse.

TypeScript, with its static types and interfaces, forces teams to document as they go. This makes onboarding new devs easier and scaling codebases safer.

Consider a Ruby senior dev who writes a monkey-patched library. Six months later, a junior dev calls a method with unexpected input. Chaos ensues.

In a similar TypeScript scenario, the same library has type definitions. The junior dev gets a compile error before they even run the code. Crisis averted.

**Tooling**

Ruby has good developer tooling, but it is clear that TypeScript has heavyweights behind it. Developers can choose from a wide array of tools:

* Code Completion. No more googling method signatures like in Ruby
* Refactoring is a manual search and replace in Ruby. Full-fledged editors can do it in one click with TypeScript
* Error Catching: TypeScript catches bugs while you type. Ruby waits until you run the code -- if you even test that case.

**In Short**

For me, Ruby is a love letter to developers. TypeScript is a pre-nup: it ensures everyone knows the rules before committing. They’re different, but both have their place.

For Front-end work, Performance-critical work, TypeScript is a better choice.

For web back-ends, small elegant scripts, Ruby still makes sense, as demonstrated by Shopify and Github.

And hey, if you still hate TypeScript after trying it, at least it’s not Python.