---
name: mobile-code-style
description: MUST USE whenever creating or editing any .ts/.tsx file in the morpheus-mobile Expo project (under app/, components/, hooks/, lib/, theme/, types/). Enforces file layout, component-splitting thresholds (hard cap 200 lines), naming, styling with StyleSheet, theme tokens, expo-router patterns, and TypeScript-strict conventions. Use BEFORE writing code, not after.
---

# Morpheus Mobile — code conventions

Stack: **Expo SDK 54 + expo-router 6 + React 19 + TypeScript strict**. Every `.ts/.tsx` you author or edit in this project must follow the rules below.

---

## 1. File placement & naming

| Type | Location | Filename |
|---|---|---|
| Route screens | `app/<route>.tsx` (expo-router file-based) | `kebab-case.tsx` |
| Route-only components | `app/<route>.components/<Name>.tsx` | `PascalCase.tsx` |
| Shared components | `components/<name>.tsx` | `kebab-case.tsx` (template style) |
| Hooks | `hooks/use-<name>.ts` | must start with `use-` |
| API / data helpers | `lib/api/<resource>.ts` | `kebab-case.ts` |
| Theme tokens | `theme/<name>.ts` | `kebab-case.ts` |
| Shared types | `types/<domain>.ts` | `kebab-case.ts` |

- **Promotion rule**: a component is route-private until it is imported by ≥ 2 routes — only then move it from `app/<route>.components/` to `components/`.
- Default export for **route files only**. Shared components use named exports.
- Hook file exports exactly one hook with the same name as the file (`use-artist.ts` → `useArtist`).

---

## 2. Component splitting — when to extract

**Hard cap: a single file MUST NOT exceed 200 lines** (including imports + styles). Soft target: ≤ 150 lines.

Extract a subtree into its own file when **any** of these is true:
1. The file is approaching 150 lines.
2. A JSX subtree has > 3 levels of nesting **and** its own conditional logic.
3. The same UI block (card, row, badge) appears > 1 time in the file.
4. A subtree owns local state that no sibling reads.
5. A subtree's inline `StyleSheet` block exceeds ~10 keys.
6. A static config array > 5 items lives inside the component body — hoist to a module-level `const` (or its own file if cross-component).

**Anti-pattern**: extracting a 5-line wrapper just to "make the file shorter". Extraction must produce one of: reuse, reduced nesting, isolated state, or a clearer unit of meaning.

**How to extract** (in order):
1. Identify the subtree's prop boundary (data in, callbacks out).
2. Move to `app/<route>.components/<Name>.tsx` (route-private) or `components/<name>.tsx` (shared).
3. Pass only data + callbacks via props. Prefer `children` composition over prop drilling > 2 levels deep.
4. Co-locate the subtree's `StyleSheet` with the subtree.
5. Re-run the file-size check on the parent — confirm it now fits the cap.

---

## 3. File anatomy (top to bottom, in this order)

```tsx
// 1. Imports — three groups, blank line between
import { useMemo, useState } from 'react';                  // react / react-native
import { Pressable, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';          // 3rd party
import { router } from 'expo-router';

import { api } from '@/lib/api/client';                     // @/ aliases
import { useArtist } from '@/hooks/use-artist';

import { ArtistCard } from './artist-card';                 // relative siblings last

// 2. Types — interface above the component
interface Props {
  artistId: string;
  onSelect?: (id: string) => void;
}

// 3. Module-level constants
const MAX_RESULTS = 20;

// 4. Component
export default function ArtistScreen({ artistId, onSelect }: Props) {
  // Hooks in stable order: useState → useRef → useMemo → useCallback → useEffect → custom hooks
  const [query, setQuery] = useState('');
  const { data } = useArtist(artistId);

  const filtered = useMemo(() => data?.filter(matches(query)), [data, query]);

  const handlePress = (id: string) => onSelect?.(id);

  if (!data) return <Loading />;

  return (
    <View style={styles.container}>
      {/* … */}
    </View>
  );
}

// 5. StyleSheet at the bottom
const styles = StyleSheet.create({
  container: { flex: 1 },
});
```

---

## 4. TypeScript

- `strict: true`. **No `any`.** Use `unknown` and narrow when truly dynamic.
- Props interface: `Props` for screens, `<Name>Props` for shared components.
- Icon name typing: `icon: React.ComponentProps<typeof FontAwesome6>['name'];` — never `string`.
- Cross-file types live in `types/<domain>.ts`. Don't re-declare the same type in two files.
- No `// @ts-ignore`. If unavoidable, use `// @ts-expect-error <reason>` with a reason.

---

## 5. Styling

- **`StyleSheet.create` at the bottom of every file.** Never inline `style={{ ... }}` for static styles.
- Dynamic-only override is the single exception: `style={[styles.x, { backgroundColor: c }]}`.
- All brand colors, radii, spacing come from `theme/`. **Never hardcode `#6366f1` or similar in screens.**
- Key order inside one style object: **layout → box → typography → color → effects**.
  Example: `{ flex, flexDirection, alignItems, padding, margin, width, height, borderRadius, borderWidth, fontSize, fontWeight, color, backgroundColor, opacity, shadowColor }`.
- Pixel values that recur (8, 12, 16, 24) — extract to `theme/spacing.ts` when used in ≥ 3 files.

---

## 6. Imports

- Use `@/` for cross-folder imports. **Never** `../../`.
- Relative `./name` only for same-folder siblings.
- One import per package; no `import * as X`.
- Within a group, sort alphabetically by package name.

---

## 7. State & data

| Kind | Use |
|---|---|
| Local UI state (toggle, input) | `useState` in the component |
| Server state (REST/GraphQL) | `@tanstack/react-query` wrapped in `hooks/use-<resource>.ts` |
| Global app state (auth user, theme) | React Context inside `lib/` or `auth/` — no Redux |
| Persisted secrets (tokens) | `expo-secure-store` |
| Persisted UI prefs | `AsyncStorage` (only when added) |

- Never call `axios`/`fetch` directly from a component. Go through `lib/api/*` and wrap in a hook.

---

## 8. expo-router patterns

- Default export for screen files only.
- Static redirects use `<Redirect href="…" />`, never `useEffect` + `router.replace`.
- `router.replace` to swap the stack (no back), `router.push` to add to it.
- Header config via `<Stack.Screen options>` in the layout — not inside the screen body.
- Route groups `(group)` are URL-invisible; use them for layout grouping, not as URL segments.

---

## 9. Performance — only when proven needed

- **Don't** add `useMemo` / `useCallback` preemptively. Add only when:
  - The value is passed into a `React.memo` child, **or**
  - The computation is measurably expensive (> 4ms in profiler).
- Lists > ~20 items: `FlatList` (not `.map()`).
- For `FlatList`, memoize `renderItem` and `keyExtractor`.

---

## 10. Comments

- **Default: no comments.** Names carry meaning.
- Write a comment **only** for *why* something non-obvious exists: hidden constraint, subtle invariant, workaround for a specific bug.
- Never describe *what* code does.
- No `TODO` without an issue link or owner.

---

## 11. Pre-flight checklist before declaring "done"

Run through this list every time you finish editing a file:

1. File length ≤ 200 lines including styles?
2. No `any`, no `@ts-ignore`?
3. No inline `style={{ ... }}` for static styles?
4. No hardcoded brand colors / spacing — all from `theme/`?
5. No `../../` imports?
6. Default export only on route files; shared components use named exports?
7. Hooks declared in the canonical order (state → ref → memo → callback → effect → custom)?
8. `npx tsc --noEmit -p .` passes?
9. If a list, uses `FlatList` (not `.map()`) for > 20 items?

If any item fails, fix before reporting completion to the user.
