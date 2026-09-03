# Recruiter visuals and route transitions design

## Case-study evidence

Remove the source excerpt model and syntax-highlighting path. Replace code windows with flat evidence rows that compare the previous problem with the new behavior and end with a short statement of practical impact.

Use two or three evidence rows per case. Keep them visually consistent with the portfolio's square, measured grid rather than introducing rounded cards.

## Diagrams

Keep the four inline diagrams because they help readers understand sequence and ownership. Reduce each diagram to three to five plain-English steps. Remove function names, variable names, cloud product names, protocol details, and data-model terminology.

## Route transitions

Keep the site header and footer stable. Wrap the main route content in a persistent client component inside the root layout. Use Framer Motion's `AnimatePresence` to retain the outgoing page for its exit, keyed by the current pathname.

Animate opacity and vertical translation only. Use a 220 ms duration and the existing `[0.2, 0.85, 0.3, 1]` mechanical curve. Enter from 12 pixels below and exit 8 pixels above. Disable movement for reduced-motion users.

## Verification

Confirm that case content and rendered output contain no raw code fields, file paths, or syntax-highlighted markup. Check every diagram label for internal identifiers. Run TypeScript and the production build, then inspect the generated routes and client bundle.
