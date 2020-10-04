# Initiative

This is a very simple, distributed initiative tracker for role-playing games. Our party uses it to submit and track our initiative scores while playing D&amp;D over video chat.

## Local Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

1. Create an Azure Table storage account and read/write connection strings

2. Create api/local.settings.json with connection strings to Azure Table storage

```json
{
  "IsEncrypted": false,
  "Values": {
  "MyStorageConnectionAppSetting": "",
  "AZURE_STORAGE_CONNECTION_STRING": "",
  "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```

3. To start the local Azure Functions runtime

```bash
cd api
func host start
```

4. To start the local Vue web server

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

## Azure setup

This project is meant to be deployed as an Azure Static Web App from a github repository.

1. Create an Azure Table storage account and read/write connection strings

2. Add application settings to the Static Web App configuration.

```json
{
  "MyStorageConnectionAppSetting": "",
  "AZURE_STORAGE_CONNECTION_STRING": "",
  "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```

3. Deploy repository contents to the Static Web App.

4. (optional) Configure a custom domain for the Static Web App.
