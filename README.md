# Subconvert

It's a subscription converter on cloudflare worker.

## Deploy

```shell
yarn
yarn build
```

Copy `main.js` to your worker.

## Usage

```shell
curl -X GET "https://{YOUR_WORKER_ADDR}/sub?from={fromType}&to={convertType}&fromUrl={YOUR_SUB_URL}"
# Or use POST
curl -X POST "https://{YOUR_WORKER_ADDR}/sub?from={fromType}&to={convertType}" --data "{YOUR_SUB_CONTENT}"
```

## Compatibility

|           | SS Base64 | SS Sip002 | SS Sip008 | Clash SS |
| :-------: | :-------: | :-------: | :-------: | :------: |
|   code    | ssbase64  | sssip002  | sssip008  | clashss  |
| As Target |     √     |     √     |     √     |    √     |
| As Source |     √     |     √     |     √     |    √     |

Other formats are W.I.P
