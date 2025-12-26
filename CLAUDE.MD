# Comparium - Claude AI Context Document

## Project Overview

Comparium is a web-based freshwater aquarium fish species compatibility tool that helps aquarists:
- Compare fish species and check compatibility
- Analyze care requirements (temperature, pH, tank size, etc.)
- Identify predation warnings and aggression levels
- Track favorite species and comparison history
- Manage multiple tank setups with species stocking

**Key Stats:**
- 99+ fish species with detailed care data
- Full Firebase integration (Auth + Firestore)
- User authentication and cloud data sync
- Mobile-responsive design
- Offline-capable progressive web app

---

## Tech Stack

**Frontend:**
- Vanilla JavaScript (ES6+ modules)
- HTML5 + CSS3 (no framework)
- Firebase SDK v10.7.1
- GitHub Pages deployment

**Backend:**
- Firebase Authentication (email/password)
- Cloud Firestore (user data, tanks, favorites)
- Firestore Security Rules (strict privacy model)

**Testing:**
- Playwright (@playwright/test v1.57.0)
- End-to-end user flow tests

**Development:**
- Node.js (ES modules, `"type": "module"` in package.json)
- Git-based workflow

---

## Architecture

### Storage Model (Post-Migration)

**Primary Storage: Cloud Firestore**
- User profiles: `users/{uid}`
- Username index: `usernames/{username}` (enforces uniqueness)
- Email index: `emails/{email}` (optional)

**Local Storage (UI Only):**
- `theme`: User's color scheme preference (not synced to cloud)

**Session Storage (Temporary):**
- Form redirects: `signupRedirect`, `loginRedirect`
- Species detail state

### Data Flow

```
User Action → Storage Service → Firebase API → Firestore
                    ↓
              Auth Manager → Firebase Auth
                    ↓
              App Layer (app.js, dashboard, etc.)
```

**Important:** All database operations go through `storage-service.js` - this is the single point of data access.

---

## Key Files & Directories

### HTML Pages
- `index.html` - Main species comparison tool (public)
- `about.html` - Help and information page (public)
- `login.html` - User login page
- `signup.html` - User registration page
- `dashboard.html` - User dashboard (requires auth)
- `my-tanks.html` - Tank management page (requires auth)
- `species.html` - Individual species detail page
- `glossary.html` - Aquarium terminology glossary

### JavaScript Modules

**Core Application:**
- `js/app.js` (21KB) - Main comparison tool logic, compatibility analysis
- `js/fish-data.js` (67KB) - Database of 99+ fish species with full care details
- `js/app-enhancements.js` - Additional UI features and interactions

**Firebase Integration:**
- `js/firebase-init.js` - Firebase SDK initialization, exports global functions
- `js/storage-service.js` (18KB) - Single point of data access (Firestore + localStorage)
- `js/auth-manager.js` (11KB) - Authentication flow, session management

**Feature Modules:**
- `js/species-detail.js` - Individual species page logic
- `js/glossary.js` (22KB) - Aquarium terminology reference
- `js/theme-manager.js` - Dark/light theme switching

### Configuration Files

**Firebase:**
- `firebase.json` - Firebase Hosting configuration
- `.firebaserc` - Firebase project ID
- `firestore.rules` (10KB) - **CRITICAL** Security rules (strict privacy model)
- `firestore.indexes.json` - Firestore composite indexes

**Testing:**
- `playwright.config.js` - Playwright test configuration
- `tests/user-flow.spec.js` - End-to-end user flow tests

**Migration:**
- `scripts/migrate-fish-to-firestore.js` - Fish data migration script
- `FIRESTORE_MIGRATION.md` (10KB) - **READ THIS** Migration strategy & phases

**Documentation:**
- `README.md` - User-facing setup guide
- `REVIEW_FINDINGS.md` - Code review notes
- `FIRESTORE_MIGRATION.md` - Backend migration documentation

---

## Data Models

### User Profile (Firestore: `users/{uid}`)

```javascript
{
  uid: "firebase-auth-uid",          // Firebase Auth UID (immutable)
  username: "john_doe",              // 3-30 chars, alphanumeric + _- (immutable)
  email: "john@example.com",         // Valid email (immutable)
  created: "2025-01-15T10:30:00Z",   // ISO-8601 timestamp (immutable)
  lastLogin: "2025-01-15T14:22:00Z", // Updated on each login
  profile: {
    favoriteSpecies: [               // Array of species keys
      "neon-tetra",
      "guppy"
    ],
    comparisonHistory: [             // Recent comparisons
      {
        id: "1705320000000",
        date: "2025-01-15T10:30:00Z",
        species: ["neon-tetra", "guppy"],
        compatible: true
      }
    ],
    tanks: [                         // User's tank setups
      {
        id: "1705320000001",
        name: "Living Room 55g",
        size: 55,
        notes: "Community tank",
        species: ["neon-tetra", "guppy"],
        created: "2025-01-15T10:30:00Z",
        updated: "2025-01-15T10:30:00Z"
      }
    ]
  }
}
```

### Fish Species (JavaScript: `fish-data.js`)

```javascript
{
  commonName: "Neon Tetra",
  scientificName: "Paracheirodon innesi",
  tempMin: 68,
  tempMax: 79,
  tempUnit: "°F",
  phMin: 5.5,
  phMax: 7.5,
  tankSizeMin: 10,
  tankSizeUnit: "gallons",
  maxSize: 1.5,
  sizeUnit: "inches",
  aggression: "Peaceful",
  diet: "Omnivore",
  schooling: "School of 6+",
  waterHardness: "1-10 dGH",
  lifespan: "5-8 years",
  careLevel: "Easy",
  predatorWarning: "Will eat shrimp fry",  // Optional
  incompatibleWith: ["large-cichlids"]     // Optional
}
```

---

## Authentication System

### Registration Flow
1. User submits username, email, password
2. `storage-service.js` validates username uniqueness in Firestore
3. Firebase Auth creates user with email/password
4. Create `usernames/{username}` document (must exist BEFORE profile)
5. Create `users/{uid}` profile document
6. Return success/error to UI

**Critical:** Username mapping MUST be created before profile due to Firestore rules.

### Login Flow
1. User submits username/email + password
2. `storage-service.js` looks up email from `usernames/{username}` if needed
3. Firebase Auth signs in with email/password
4. Fetch user profile from `users/{uid}`
5. Update `lastLogin` timestamp
6. Redirect to dashboard

### Session Management
- Firebase Auth handles session persistence
- `auth-manager.js` checks auth state on page load
- Redirects unauthenticated users from protected pages

---

## Firestore Security Rules

**Privacy Model:** Strict user isolation

**Users Collection (`users/{uid}`):**
- READ: Owner only
- CREATE: Owner only, requires valid structure + registered username
- UPDATE: Owner only, cannot change uid/username/email/created
- DELETE: Disabled (preserve audit trail)

**Usernames Collection (`usernames/{username}`):**
- READ: Public (for availability checks)
- CREATE: On registration only
- UPDATE/DELETE: Never allowed (permanent claim)

**Important Fields:**
- Immutable: `uid`, `username`, `email`, `created`
- Mutable: `lastLogin`, `profile.*`

See `firestore.rules` for full validation logic.

---

## Fish Compatibility Logic

Located in: `js/app.js`

### Compatibility Checks

1. **Temperature Range Overlap**
   - Compare `tempMin` and `tempMax` between species
   - Flag if no overlap

2. **pH Range Overlap**
   - Compare `phMin` and `phMax`
   - Flag if no overlap

3. **Aggression Levels**
   - Peaceful, Semi-Aggressive, Aggressive
   - Warn about mismatches

4. **Predation Warnings**
   - Check `predatorWarning` field
   - Check `incompatibleWith` arrays
   - Display specific warnings to user

5. **Tank Size Requirements**
   - Use largest `tankSizeMin` among selected species
   - Display minimum recommended tank size

6. **Schooling Behavior**
   - Detect "School of X+" patterns
   - Recommend appropriate group sizes

---

## Development Guidelines

### Code Style

**JavaScript:**
- Use ES6+ features (const/let, arrow functions, template literals)
- Async/await for asynchronous operations
- Modules (import/export)
- No global variables (except Firebase globals from firebase-init.js)

**File Organization:**
- One service per file (storage-service.js, auth-manager.js)
- Shared utilities in dedicated files
- HTML pages import only needed modules

**Error Handling:**
- Always try/catch async operations
- Provide user-friendly error messages
- Log errors to console for debugging

### Firebase Globals

Set by `firebase-init.js`:
- `window.firebaseAuth` - Firebase Auth instance
- `window.firebaseSignUp` - Sign up function
- `window.firebaseSignIn` - Sign in function
- `window.firestoreGetProfile` - Get user profile
- `window.firestoreSetProfile` - Save user profile
- `window.firestoreUsernameExists` - Check username availability
- `window.firestoreCreateUsername` - Register username

**Never import Firebase SDK directly** - use these globals.

### Storage Access Pattern

**DO:**
```javascript
const storageService = new StorageService();
const user = await storageService.getCurrentUser();
await storageService.saveTank(tank);
```

**DON'T:**
```javascript
// Don't access localStorage directly
const user = JSON.parse(localStorage.getItem('user'));

// Don't access Firestore directly
const doc = await getDoc(doc(firestore, 'users', uid));
```

### Adding New Fish Species

1. Open `js/fish-data.js`
2. Add species object with all required fields
3. Add species key to appropriate category in `fishCategories`
4. Test in comparison tool
5. Optionally run migration script: `npm run migrate:fish`

---

## Testing

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Debug mode (step through)
npm run test:debug

# Show test report
npm run test:report
```

### Test Coverage

Located in: `tests/user-flow.spec.js`

**Current tests:**
- User registration flow
- Login flow
- Species comparison
- Tank creation and management
- Favorites management
- Theme switching

### Adding Tests

Follow Playwright conventions:
```javascript
test('feature description', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Test implementation
});
```

---

## Firebase Configuration

### Project Details
- Project ID: `comparium-21b69` (from `.firebaserc`)
- Hosting: Firebase Hosting + GitHub Pages fallback
- Database: Cloud Firestore (Firestore Native mode)

### Deployment Commands

```bash
# Deploy Firestore rules only
firebase deploy --only firestore:rules

# Deploy hosting only
firebase deploy --only hosting

# Deploy everything
firebase deploy

# Test rules locally
firebase emulators:start --only firestore
```

### Firestore Emulator

For local development:
```bash
firebase emulators:start --only firestore
```

Then update `firebase-init.js` to use emulator:
```javascript
connectFirestoreEmulator(firestore, 'localhost', 8080);
```

---

## Common Tasks

### Adding a New Feature Page

1. Create `new-feature.html`
2. Add Firebase check:
   ```html
   <script type="module" src="js/firebase-init.js"></script>
   <script type="module" src="js/auth-manager.js"></script>
   ```
3. Create `js/new-feature.js` if needed
4. Update navigation in existing pages
5. Test authentication flow

### Modifying User Profile Structure

**CRITICAL:** This requires Firestore rules update!

1. Update data model in `storage-service.js`
2. Update validation in `firestore.rules`
3. Test with Firebase emulator
4. Deploy rules: `firebase deploy --only firestore:rules`
5. Test in production

**Never deploy code changes without updating rules first!**

### Debugging Firestore Issues

1. Check browser console for errors
2. Verify Firestore rules in Firebase Console
3. Check user permissions (uid matches?)
4. Test with emulator for detailed logs
5. Review `storage-service.js` error handling

---

## Migration Status

**Phase 1: Firestore Enabled** ✅ COMPLETE
- All new users use Firestore
- localStorage removed for user data
- Username uniqueness enforced

**Phase 2: Data Migration** ⚠️ NOT IMPLEMENTED
- Migrate existing localStorage users to Firestore
- See `FIRESTORE_MIGRATION.md` for implementation plan

**Phase 3: Future Features** 📋 PLANNED
- Public tank sharing (`publicTanks` collection)
- Species database migration to Firestore
- Glossary migration to Firestore
- Admin role system

---

## Important Conventions

### Species Keys
- Format: lowercase, hyphenated (e.g., `neon-tetra`)
- Used consistently across:
  - fish-data.js object keys
  - User favorites arrays
  - Tank species arrays
  - Comparison history

### Timestamps
- Always use ISO-8601 format: `new Date().toISOString()`
- Store as strings, not Date objects (Firestore compatibility)

### IDs
- Use timestamps for unique IDs: `Date.now().toString()`
- Ensures chronological ordering

### Field Naming
- camelCase for JavaScript objects
- snake_case NOT used
- Match Firestore rules exactly

---

## Security Considerations

### Authentication
- Firebase Auth handles password hashing (bcrypt + salting)
- Email verification NOT currently enabled
- Password reset available via Firebase Auth

### Data Privacy
- Users can ONLY access their own data
- No cross-user data sharing (Phase 1)
- Firestore rules enforce server-side validation

### XSS Prevention
- Use `textContent` instead of `innerHTML` when displaying user data
- Sanitize any user inputs displayed on page

### Secrets Management
- Firebase config in `firebase-init.js` (public keys, safe to commit)
- Service account keys NEVER committed to repo
- Use environment variables for sensitive data

---

## Deployment

### GitHub Pages (Current)
- Deployed from `main` branch
- CNAME: Custom domain configuration in `CNAME` file
- Automatic deployment on push to main

### Firebase Hosting (Alternative)
```bash
firebase deploy --only hosting
```

### Pre-Deployment Checklist
- [ ] Run tests: `npm test`
- [ ] Check Firebase rules match code changes
- [ ] Test authentication flow
- [ ] Verify species data is up to date
- [ ] Test on mobile devices
- [ ] Check console for errors

---

## Troubleshooting

### "Database connection unavailable"
- Check Firebase initialization in firebase-init.js
- Verify Firebase project is active
- Check browser console for Firebase errors

### "Username already exists" on registration
- Check `usernames` collection in Firestore Console
- Verify rules allow username creation
- Check for race conditions in username claim

### User data not loading
- Verify user is authenticated: `firebase.auth().currentUser`
- Check Firestore rules allow read access
- Verify uid matches document path
- Check browser console for permission errors

### Tests failing
- Ensure Playwright is installed: `npx playwright install`
- Check test server is running on correct port
- Update test selectors if HTML changed

---

## Performance Optimization

### Firestore Usage
- Minimize reads by caching user profile in memory
- Batch writes when updating multiple fields
- Use pagination for large arrays (comparison history)

### Fish Data
- 67KB fish-data.js loaded on demand
- Consider lazy loading for species detail pages
- Future: Move to Firestore with caching

### CSS/JS
- No bundler currently (vanilla JS)
- Consider minification for production
- Implement service worker for offline caching

---

## Future Enhancements

**Planned Features:**
- [ ] Public tank sharing with privacy controls
- [ ] Community voting on compatibility ratings
- [ ] Fish images and photo galleries
- [ ] Advanced search and filtering
- [ ] Tank stocking calculator with bioload
- [ ] Water parameter tracking over time
- [ ] Species care guides and articles
- [ ] Mobile app (PWA or native)

See README.md for full feature roadmap.

---

## Useful Resources

**Firebase Documentation:**
- Firestore Security Rules: https://firebase.google.com/docs/firestore/security/get-started
- Firebase Auth: https://firebase.google.com/docs/auth/web/start
- Firestore Best Practices: https://firebase.google.com/docs/firestore/best-practices

**Fish Care Data Sources:**
- SeriouslyFish.com
- Aquarium Co-Op
- FishLore
- PlanetCatfish
- FishBase

**Testing:**
- Playwright Docs: https://playwright.dev/docs/intro

---

## Contact & Support

**Repository:** See package.json for Git URL
**Issues:** GitHub Issues (check .github/ directory)
**Questions:** See README.md for contact information

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Migrate fish data to Firestore
npm run migrate:fish

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Start Firebase emulators
firebase emulators:start

# View test report
npm run test:report
```

---

**Last Updated:** December 2024

**Note to AI Assistants:** This document provides comprehensive context for working on Comparium. Always check Firestore rules before modifying data models. Use storage-service.js for all database operations. Test thoroughly with Playwright before deploying changes.
