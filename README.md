# node

## Branches

```sh
┌──────────────────────────────────────────┐       ┌─────────────────────────┐       ┌───────────┐       ┌──────────┐
|                                          |       |                         |       |           |       |          |
|  @langnang-temp/langnang-temp.github.io  | ====> |   @langnang-temp/node   | ====> |  develop  | ====> |  master  |
|           Sync from template             |       |     Sync to remote      |       |           |       |          |
└──────────────────────────────────────────┘       └─────────────────────────┘       └───────────┘       └──────────┘
```

### Sync to remote

```sh
# add remote url
git remote set-url --add origin [url]
# checkout the branch for sync
git checkout [branch]

git pull
# force push
git push -f
```