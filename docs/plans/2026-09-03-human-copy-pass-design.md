# Human copy pass design

## Audience and voice

The primary reader is a senior engineer or engineering manager scanning the site for evidence of production judgment. The copy should sound like Abdulhaleem explaining a change in a pull request or technical interview: direct, specific, and comfortable with trade-offs.

## Scope

Rewrite every user-facing string in the rendered site and the prose in `README.md`. Keep internal product and design documents, implementation comments, file paths, code identifiers, commands, stacks, architecture, and all measured figures unchanged.

## Style rules

- Use first person for work Abdulhaleem performed and decisions he made.
- Use active third person for system behavior.
- Remove every rendered em dash and every em dash in `README.md`.
- Remove the banned vocabulary: seamlessly, robust, meticulously, delve, testament to, merely, and unglamorous.
- Break long sentences into short statements instead of joining loose ideas.
- Cut scene-setting, self-congratulation, and claims about what a reviewer should admire.
- Keep technical nouns and causal explanations. Brevity must not flatten the trade-off.

## Content treatment

- The hero keeps the thesis that nondeterministic systems should behave the same way twice.
- Case summaries lead with the system and the failure or constraint.
- Case bodies state what I built, why I chose it, and what I would change.
- Architecture diagrams use short operational labels and no em dashes.
- Shared page headings and notes describe their purpose without commentary about the reader.
- The About page keeps the career chronology and working preferences without personal mythology.
- The footer remains terse.
- The README explains implementation choices in plain engineering language.

## Verification

Search the rendered-copy sources and README for banned vocabulary and em dashes. Review every number, stack entry, command, path, API name, and architecture relationship against the original inventory. Then run TypeScript checks and a production build.
