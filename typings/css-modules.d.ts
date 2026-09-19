declare module '*.css' {
    const content: { [ className: string ]: string };
    export default content;
}

// `*.module.scss` imports get exact per-file types from generated sibling
// `*.module.scss.d.ts` files (see `npm run types:css`), which TypeScript
// resolves in preference to this wildcard. This fallback remains for
// non-module `.scss` imported without a binding (e.g. global.scss, for
// side effects only) and for any `.module.scss` file whose types have not
// yet been generated.
declare module '*.scss' {
    const content: { [ className: string ]: string };
    export default content;
}
