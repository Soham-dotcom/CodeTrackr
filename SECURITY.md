# Security

How CodeTrackr handles the [OWASP Top 10 (2021)](https://owasp.org/Top10/), what each control is, where it
lives, and what is still open. Report a problem by opening a GitHub issue without exploit details, or by
contacting the maintainers.

| OWASP risk | What CodeTrackr does | Where |
|---|---|---|
| **A01 Broken access control** | Every analytics read checks the caller owns the data. Group admin actions check the caller's role (owner, admin, member); an admin of one group has no power in another. Hackathon boards are members and organiser only. Integration tests send the forbidden requests and expect 403. | `services/authorization.js`, `services/groupRoles.js`, `routes/groups.js`, `routes/events.js` |
| **A02 Cryptographic failures** | API keys are `ct_<id>_<secret>`; only SHA-256 of the secret is stored and compared in constant time. Group passwords use scrypt. Invite links are random tokens stored only as a hash. The web session is a JWT in an httpOnly cookie. | `services/apiKeys.js`, `services/passwordHash.js`, `services/groupRoles.js` |
| **A03 Injection** | MongoDB queries go through Mongoose with typed schemas; ids are validated before use. User search text is escaped before it becomes a regular expression (an unescaped pattern could stall the server). Uploads are validated (sizes, ranges, timestamps). | `services/textQuery.js`, `routes/extension.js` |
| **A04 Insecure design** | Client-reported time is never trusted: it is credited only as far as window focus vouches for it, capped at 600 s per 10-minute window by an atomic counter. Uploads are idempotent. Linked LeetCode, Codeforces and GitHub accounts count on boards only after the owner proves control with a code in their public profile. | `services/ingestCredit.js`, `services/linkedSync.js` |
| **A05 Security misconfiguration** | `helmet` headers, a CORS allowlist, rate limits. The server refuses to start without `JWT_SECRET`, and the local sign-in bypass is refused in production. | `app.js`, `middleware/auth.js` |
| **A06 Vulnerable and outdated components** | `npm audit` on shipped packages fails CI at high or critical; Dependabot opens weekly update PRs; CodeQL scans the code on every push to main. | `.github/workflows/security.yml`, `.github/workflows/codeql.yml`, `.github/dependabot.yml` |
| **A07 Identification and authentication failures** | Google OAuth with a signed `state` check. VS Code signs in with a device code: each computer gets its own key, revocable, expiring after a year, and a code can be used once. Join and link routes are rate limited per user. | `services/oauthState.js`, `routes/device.js` |
| **A08 Software and data integrity failures** | Installs use lockfiles (`npm ci`); deploys run only after CI passes. Secret scanning (gitleaks) checks the full history. | `.github/workflows/` |
| **A09 Security logging and monitoring failures** | Structured JSON logs with a request id that also appears in error responses; errors go to Sentry when configured; `/health` checks the database. | `services/logger.js` |
| **A10 Server-side request forgery** | The server only calls fixed hosts (LeetCode, Codeforces, GitHub APIs). Usernames are checked against a strict pattern before they are put in a URL; users can't supply a URL. | `services/leetcode.js`, `services/codeforces.js`, `services/github.js` |

## Known gaps

- The web JWT can't be revoked before it expires (1 day); there is no refresh-token rotation.
- Upload timestamps are chosen by the client (bounded to the last 24 hours), so a script can still claim at most one hour per real hour.
- No alerting yet on error rate or failed logins.
