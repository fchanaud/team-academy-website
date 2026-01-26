# Push to GitHub - Instructions

The code has been committed locally. To push to GitHub, follow these steps:

## Option 1: Create Repository via GitHub Website (Recommended)

1. Go to https://github.com/new
2. Repository name: `team-academy-website`
3. Description: "Tennis Academy Marrakech - Modern React website with i18n support"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

7. Then run these commands in your terminal:
```bash
cd /Users/fchanaud/Desktop/project/applications/team-academy-website
git push -u origin main
```

## Option 2: Use GitHub CLI (if installed)

```bash
cd /Users/fchanaud/Desktop/project/applications/team-academy-website
gh repo create team-academy-website --public --source=. --remote=origin --push
```

## Option 3: Create via API (if you have a GitHub token)

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{"name":"team-academy-website","description":"Tennis Academy Marrakech - Modern React website","private":false}'

cd /Users/fchanaud/Desktop/project/applications/team-academy-website
git push -u origin main
```

## Current Git Status

✅ Git repository initialized
✅ All files committed
✅ Remote configured: `git@github.com:fchanaud/team-academy-website.git`
✅ Branch: `main`

Once the repository is created on GitHub, the push command will work!
