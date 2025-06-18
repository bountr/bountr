# Bountr

A bounty platform that uses its own GitHub repository to manage bounties while referencing external target repositories for development work.

## Features

- 🎯 **GitHub Native**: Uses GitHub Issues as the storage backend
- 💰 **Bounty System**: Post feature requests with monetary rewards
- 👥 **Developer Applications**: Developers can apply for bounties via issue comments
- 🚀 **GitHub Pages**: Deployed automatically via GitHub Actions
- 📱 **Responsive Design**: Works on all devices
- 🔍 **Search & Filter**: Find bounties by category, status, and amount

## Architecture

- **Bounty Storage**: All bounties are stored as GitHub Issues in the Bountr repository
- **Target Repositories**: Users specify external repositories where they want work done
- **No External Writes**: Bountr never writes to external repositories - only references them
- **Centralized Management**: All bounty discussions, applications, and management happen in the Bountr repo

## How It Works

1. **Post Bounties**: Users create bounties in the Bountr repository, specifying a target repository
2. **Developer Applications**: Developers apply by commenting on the bounty issue in the Bountr repo
3. **Code Contribution**: Accepted developers submit pull requests to the TARGET repository
4. **Reference Back**: Developers link their PR back to the original bounty issue
5. **Reward Payment**: Bounty is paid when the PR is merged in the target repository

## Repository Structure

- **Main Repository**: `github.com/Bountr/Bountr`
- **Issues**: All bounties are stored as GitHub Issues with special labels
- **Discussions**: All bounty-related discussions happen in issue comments
- **Deployment**: Automatically deployed to GitHub Pages at `bountr.github.io/Bountr`

## Setup

1. Fork the `Bountr/Bountr` repository
2. Enable GitHub Pages in repository settings
3. Set up GitHub Actions for automatic deployment
4. Configure GitHub OAuth for authentication
5. Update environment variables as needed

## Configuration

### Environment Variables

Create a `.env.local` file for development:

\`\`\`env
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_CLIENT_ID=your_oauth_app_client_id
GITHUB_CLIENT_SECRET=your_oauth_app_client_secret
GITHUB_PLATFORM_OWNER=Bountr
GITHUB_PLATFORM_REPO=Bountr
\`\`\`

### GitHub OAuth App

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - Application name: `Bountr`
   - Homepage URL: `https://bountr.github.io/Bountr`
   - Authorization callback URL: `https://bountr.github.io/Bountr/api/auth/callback/github`

### Repository Settings

1. Go to repository Settings > Pages
2. Set Source to "GitHub Actions"
3. The site will be available at `https://bountr.github.io/Bountr`

## Usage

### For Bounty Posters

1. Sign in with GitHub
2. Click "Post Bounty"
3. Specify the target repository where you want work done
4. Fill in bounty details (title, description, amount, labels)
5. Submit to create a GitHub issue in the Bountr repository

### For Developers

1. Browse available bounties on Bountr
2. Click on interesting bounties to view details
3. Apply by commenting on the bounty issue
4. If accepted, submit a pull request to the TARGET repository
5. Reference the Bountr issue in your PR
6. Get paid when PR is merged

## Technical Architecture

- **Frontend**: Next.js with Tailwind CSS and shadcn/ui
- **Storage**: GitHub Issues API (Bountr/Bountr repository)
- **Authentication**: GitHub OAuth
- **Deployment**: GitHub Actions + GitHub Pages
- **Styling**: Tailwind CSS with responsive design

## API Integration

Bountr uses the GitHub REST API to:
- Create issues with bounty labels in the Bountr repository
- Fetch issues filtered by bounty labels
- Manage issue comments (applications)
- Validate target repositories (read-only)

## Security Benefits

- ✅ Bountr only needs write access to its own repository
- ✅ No risk of accidentally modifying external repositories
- ✅ Users maintain full control over their target repositories
- ✅ Centralized bounty management and discussion
- ✅ Clear separation between bounty management and code contribution

## Workflow Example

1. **Alice** wants a feature added to `facebook/react`
2. **Alice** creates a bounty on Bountr specifying `facebook/react` as the target
3. **Bob** sees the bounty and applies by commenting on the Bountr issue
4. **Alice** accepts Bob's application
5. **Bob** submits a PR to `facebook/react` and references the Bountr issue
6. **Alice** pays Bob when the PR is merged

## Contributing

1. Fork the Bountr repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request to `Bountr/Bountr`

## License

MIT License - see LICENSE file for details

---

**Repository**: [github.com/Bountr/Bountr](https://github.com/Bountr/Bountr)  
**Website**: [bountr.github.io/Bountr](https://bountr.github.io/Bountr)
