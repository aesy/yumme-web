/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MOCK_SERVER?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
