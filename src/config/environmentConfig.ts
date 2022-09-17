
type EnvironmentConfig = {
    mainServerApiBasePath: string
}

export const EnvironmentConfig = {
    mainServerApiBasePath: import.meta.env.VITE_BASE_SERVER_PATH
}