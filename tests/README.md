# Comparium E2E Test Suite

Comprehensive automated testing for the Comparium fish compatibility application using Playwright.

## What These Tests Do

The test suite validates the **entire user journey** from account creation to data persistence:

### Complete User Flow Test
1. ✅ **Registration** - Create new user account with unique credentials
2. ✅ **Authentication** - Verify login redirects to dashboard
3. ✅ **Tank Management** - Create a tank with species
4. ✅ **Quick Event Logging** - Log water change with one click
5. ✅ **Detailed Event Logging** - Log parameter test with values
6. ✅ **Schedule Creation** - Create recurring maintenance schedules
7. ✅ **Schedule Completion** - Mark tasks complete, auto-log events
8. ✅ **Custom Schedules** - Create custom task schedules
9. ✅ **Favorites** - Add species to favorites
10. ✅ **Comparisons** - Save fish compatibility comparisons
11. ✅ **Logout** - Sign out of account
12. ✅ **Re-authentication** - Log back in
13. ✅ **Data Persistence** - Verify tanks, events, schedules, favorites survived logout

### Maintenance Feature Tests (Standalone)
- ✅ Event deletion
- ✅ Schedule editing
- ✅ Schedule disable/enable toggle
- ✅ Schedule deletion

### Edge Case Tests
- ✅ Duplicate username rejection
- ✅ Invalid login credentials
- ✅ Protected route authentication

### Page Load Tests
- ✅ All main pages load without JS errors
- ✅ Glossary displays 143+ species
- ✅ FAQ accordion functionality

### What Gets Tested
- Firebase Authentication integration
- Firestore data operations (UID-based)
- Tank event logging (quick + detailed)
- Recurring schedule management
- Session management across logout/login
- Data persistence and retrieval
- UI state updates
- Navigation and redirects

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install chromium
```

This downloads the Chromium browser used for testing (~200MB).

## Running Tests

### Test Against Production Site

```bash
npm test
```

This runs tests against https://comparium.net (default).

### Test Against Local Development Server

```bash
TEST_URL=http://localhost:8080 npm test
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Debug Tests Step-by-Step

```bash
npm run test:debug
```

### View Test Report After Run

```bash
npm run test:report
```

## Test Output

### Successful Test Run

```
✓ Complete User Flow > should handle registration, data operations, and persistence
  ✓ Registration successful for user: testuser1234567890
  ✓ Tank created successfully
  ✓ Quick log water change successful
  ✓ Detailed parameter test event logged
  ✓ Maintenance schedule created
  ✓ Schedule marked complete and event logged
  ✓ Custom schedule created
  ✓ Favorite added successfully
  ✓ Comparison created successfully
  ✓ Logout successful
  ✓ Login successful
  ✓ Tank data persisted correctly
  ✓ Maintenance events persisted correctly
  ✓ Schedules persisted correctly
  ✓ Favorite data persisted correctly
  ✓ Comparison history persisted correctly

========================================
✅ ALL TESTS PASSED
========================================
Test User: testuser1234567890
Email: testuser1234567890@example.com

Verified:
  ✓ User registration
  ✓ User login
  ✓ Tank creation
  ✓ Quick event logging
  ✓ Detailed event logging
  ✓ Schedule creation
  ✓ Schedule completion
  ✓ Custom schedules
  ✓ Favorite species management
  ✓ Comparison saving
  ✓ Logout/Login cycle
  ✓ Data persistence (tanks, events, schedules)
========================================
```

### Failed Test

If a test fails, Playwright automatically captures:
- **Screenshot** of the failure
- **Video** of the test run
- **Trace** file for debugging (can replay in Playwright Inspector)

## Test Data

### User Credentials
Each test run creates a unique test user:
- Username: `testuser{timestamp}`
- Email: `testuser{timestamp}@example.com`
- Password: `TestPassword123!`

These test users remain in Firebase after tests complete. To clean up:
1. Go to Firebase Console → Authentication
2. Search for `testuser`
3. Delete test accounts manually, or
4. Let them accumulate (they don't affect production users)

### Test Data Created
Each test run creates:
- 1 tank: "Test Community Tank" (55 gallons, with Neon Tetra)
- 3+ maintenance events: Water Change (x2), Parameter Test
- 2 schedules: Weekly Water Change, Custom "Check CO2 Levels"
- 1 favorite: Cardinal Tetra
- 1+ comparisons: Neon Tetra vs Guppy

## Continuous Integration

To run in CI/CD (GitHub Actions, etc.):

```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install chromium

- name: Run tests
  run: npm test
  env:
    TEST_URL: https://comparium.net
```

## Troubleshooting

### Tests Fail on Registration

**Symptom**: "Username already taken" error

**Cause**: Test user from previous run still exists (shouldn't happen due to timestamp)

**Fix**: Test generates unique usernames with `Date.now()`, so this shouldn't occur unless tests run in the same millisecond

### Tests Fail on Login Redirect

**Symptom**: Timeout waiting for dashboard.html

**Cause**: Firebase auth initialization not completing

**Fix**: Tests wait up to 10 seconds for auth. Check:
1. Firebase is accessible (not blocked)
2. `firebaseAuthReady` promise resolves correctly
3. Network is stable

### Protected Route Test Fails

**Symptom**: Dashboard doesn't redirect to login

**Cause**: Browser still has auth cookies from previous test

**Fix**: Tests clear cookies before running. If issue persists, check `requireAuth()` in auth-manager.js

### Browser Download Fails

**Symptom**: 403 error downloading Chromium

**Cause**: Network restrictions or proxy issues

**Fix**:
```bash
# Set proxy if needed
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080

# Retry install
npx playwright install chromium
```

## Architecture

### Why Playwright?
- Modern, fast, reliable
- Great debugging tools (traces, screenshots, video)
- Supports multiple browsers
- Easy CI/CD integration
- Excellent TypeScript/JavaScript support

### Test Structure
```
tests/
├── user-flow.spec.js    # Main test suite
└── README.md            # This file

playwright.config.js      # Test configuration
package.json             # Test scripts
```

### Key Design Decisions

1. **Sequential Execution** - Tests run one at a time to avoid Firebase conflicts
2. **Unique Test Data** - Each run creates new user to avoid collisions
3. **No Cleanup** - Test data remains in Firebase (allows debugging)
4. **Production Testing** - Tests against real Firebase (not emulators)
5. **Comprehensive Steps** - Each phase logged separately for easy debugging

## Future Enhancements

Potential additions for future testing:

- [ ] Multi-browser testing (Firefox, Safari)
- [ ] Mobile viewport testing
- [ ] Performance testing (page load times)
- [ ] Accessibility testing (ARIA labels, keyboard navigation)
- [ ] Visual regression testing (screenshot comparison)
- [ ] Load testing (concurrent users)
- [ ] Firestore emulator integration (isolated test environment)
- [ ] Test data cleanup automation
- [ ] Species detail page tests
- [ ] Comparison export functionality tests
- [ ] Dark mode toggle tests

## Questions?

If tests fail or behave unexpectedly:

1. Run with `--headed` to see browser: `npm run test:headed`
2. Check screenshots in `test-results/` directory
3. View HTML report: `npm run test:report`
4. Debug step-by-step: `npm run test:debug`

The test suite is designed to catch issues **before** they reach production. If all tests pass, the core user flow is working correctly.
