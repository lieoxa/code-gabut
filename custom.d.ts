// Tell TypeScript to treat CSS files as valid modules (side-effect imports)
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// face-api.js uses the legacy `typings` field, which `moduleResolution: bundler` ignores.
// This declaration tells TypeScript to accept the import and use its bundled types.
declare module 'face-api.js';
