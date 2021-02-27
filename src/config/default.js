/* eslint-disable no-irregular-whitespace */
const config = {
  /**
   * Configure the account/resource type for deployment (with 0 or 1)
   * - accountType: controls account type, 0 for global, 1 for china (21Vianet)
   * - driveType: controls drive resource type, 0 for onedrive, 1 for sharepoint document
   *
   * Followed keys is used for sharepoint resource, change them only if you gonna use sharepoint
   * - hostName: sharepoint site hostname (like 'name.sharepoint.com')
   * - sitePath: sharepoint site path (like '/sites/name')
   * !Note: we do not support deploying onedrive & sharepoint at the same time
   */
  type: {
    accountType: 0,
    driveType: 1,
    hostName: null,
    sitePath: null
  },

  /**
   * You can use this tool http://heymind.github.io/tools/microsoft-graph-api-auth
   * to get following params: client_id, client_secret, refresh_token & redirect_uri.
   */
  refresh_token: '0.AAAAJF2-fY_I10mqhavgsE_iQI15BFV2YB5KsrUxAp_1rdw-AF4.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P_uVHA7b3IoeZ07_Smj88FjBnH-dGqMn4eerlq411ssQV6LhEcNfDTP8MkFsFxF8RSazy1UXG9CGKgGDsVdnII5d3NVkDeo7gNHin2KESLfBZ5dBfvbU_dC77bA2eG-58bGl43BclEs6s7nFvEHqWRMzvTFAvdwgSahCShynEjJpIbsvF7nGbIcPnlMTHNWB6F39S1lIQaZXcCclOVohzttb7QfTQF11Vi-f9fdxYYmh07vC2DEkNAlykb_pecVllB8gGyyAiB96vwHwO2sn6YGdOj7bI9FQR8FjsQUmsgzwfirVHOpNv9Dl1avfvvXs6ZrcseaRm5-RIQca1yW-IbQ3BlCT3P5Wmve23WcNtRPD6l3eZVMUMNr1A8TdYVBdTBeTLox9-W0mbel6hNf2tYKKU-FfYT19ZYloqok1sHQcrGNnh7qFbkHKgZeTBEew6Dl4aCmRgMPAhoYMwAcyLe96Z8jH5lLLW8mpaCpSC48ua9rT1Xq-Ejsp1ErRjjVY3htQV8xcnplUxr2IkDHPg1_NAmB_mS7wontoe9jBZnAPsEQUiNp56Iq4d8L2E5PkZW5og6qt7m3loict8QRDV4QB--W5QEUEYS2-3_03hgm3kFMY6hKEQLmbGp_E2H0Hy1cJuDYpaArg8Mxotz72GfGC83VmrU-yupB6oc8Kz4YzgccA3xS2BAX4Cl4aBpMeRSq5iHR0wDowCOAraMsRGdFiGDkKCZG7owf_cUHSHkO2rtYJM0MF3Wxo1hGD4Ej6YOIB12D6pKR5ajjrNlhrbO4VKC4cp16XSbLXtaBfBfRgfHDFne2M-n6X9avVOzZnBOhdVn1vnq8PzYnfbIhkOFMUQQPLZ-1ymj8z9AL-LVtIY3ySqmaJuAwK5zRhYTSO7_1p7rxL0rZ6RiNPGgGxua3uoJWYQUDqPUvcZO5PYtzEBz442EjdUYxWMM',
  client_id: '5504798d-6076-4a1e-b2b5-31029ff5addc',
  client_secret: 'j.fo1d5Lj2-zS38V-_W~35VYV25_FFMAtm',
  redirect_uri: 'https://heymind.github.io/tools/microsoft-graph-api-auth',

  /**
   * The base path for indexing, all files and subfolders are public by this tool. For example: `/Public`.
   */
  base: '/stanley',

  /**
   * Feature: Pagination when a folder has multiple(>${top}) files
   * - top: specify the page size limit of the result set, a big `top` value will slow down the fetching speed
   */
  pagination: {
    enable: true,
    top: 100 // default: 200, accepts a minimum value of 1 and a maximum value of 999 (inclusive)
  },

  /**
   * Feature Caching
   * Enable Cloudflare cache for path pattern listed below.
   * Cache rules:
   * - Entire File Cache  0 < file_size < entireFileCacheLimit
   * - Chunked Cache     entireFileCacheLimit  <= file_size < chunkedCacheLimit
   * - No Cache ( redirect to OneDrive Server )   others
   *
   * Difference between `Entire File Cache` and `Chunked Cache`
   *
   * `Entire File Cache` requires the entire file to be transferred to the Cloudflare server before
   *  the first byte sent to a client.
   *
   * `Chunked Cache` would stream the file content to the client while caching it.
   *  But there is no exact Content-Length in the response headers. ( Content-Length: chunked )
   *
   * `previewCache`: using CloudFlare cache to preview
   */
  cache: {
    enable: true,
    entireFileCacheLimit: 10000000, // 10MB
    chunkedCacheLimit: 100000000, // 100MB
    previewCache: false,
    paths: ['/🥟%20Some%20test%20files/Previews']
  },

  /**
   * Feature: Thumbnail
   * Show a thumbnail of image by ?thumbnail=small (small, medium, large)
   * More details: https://docs.microsoft.com/en-us/onedrive/developer/rest-api/api/driveitem_list_thumbnails?view=odsp-graph-online#size-options
   * Example: https://storage.spencerwoo.com/🥟%20Some%20test%20files/Previews/eb37c02438f.png?thumbnail=mediumSquare
   * You can embed this link (url encoded) directly inside Markdown or HTML.
   */
  thumbnail: true,

  /**
   * Small File Upload (<= 4MB)
   * POST https://<base_url>/<directory_path>/?upload=<filename>&key=<secret_key>
   * The <secret_key> is defined by you
   */
  upload: {
    enable: false,
    key: 'your_secret_key_here'
  },

  /**
   * Feature: Proxy Download
   * Use Cloudflare as a relay to speed up download. (Especially in Mainland China)
   * Example: https://storage.spencerwoo.com/🥟%20Some%20test%20files/Previews/eb37c02438f.png?raw&proxied
   * You can also embed this link (url encoded) directly inside Markdown or HTML.
   */
  proxyDownload: true
}

// IIFE to set apiEndpoint & baseResource
// eslint-disable-next-line no-unused-expressions
!(function({ accountType, driveType, hostName, sitePath }) {
  config.apiEndpoint = {
    graph: accountType ? 'https://microsoftgraph.chinacloudapi.cn/v1.0' : 'https://graph.microsoft.com/v1.0',
    auth: accountType
      ? 'https://login.chinacloudapi.cn/common/oauth2/v2.0'
      : 'https://login.microsoftonline.com/common/oauth2/v2.0'
  }
  config.baseResource = driveType ? `/sites/${hostName}:${sitePath}` : '/me/drive'
})(config.type)

export default config
