/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
