// ============================================================================
// MIGRATION SERVICE - Handle localStorage to Firestore migration
// ============================================================================

class MigrationService {
    constructor() {
        this.detector = migrationDetector;
        this.ui = migrationUI;
    }

    /**
     * Main migration orchestrator
     * Checks for legacy data and prompts user to migrate
     */
    async checkAndPromptMigration() {
        try {
            // Wait for Firebase to be ready
            while (!window.firebaseAuthReady) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            const user = await window.firebaseAuthReady;
            if (!user) {
                // Not logged in, skip migration check
                return;
            }

            // Get username from Firestore profile
            const profile = await window.firestoreGetProfile(user.uid);
            if (!profile || !profile.username) {
                console.warn('No profile found for migration check');
                return;
            }

            const username = profile.username;

            // Check if user has legacy data
            if (!this.detector.hasLegacyDataForUser(username)) {
                // No legacy data, nothing to migrate
                return;
            }

            // Check if migration already completed
            if (localStorage.getItem(`migration_completed_${username}`)) {
                return;
            }

            // Check if user should be prompted (respects skip period)
            if (!this.shouldPromptMigration(username)) {
                return;
            }

            // Check if user has already been prompted this session
            if (sessionStorage.getItem(`migration_prompted_${username}`)) {
                return;
            }

            // Get summary of legacy data
            const summary = this.detector.getLegacyDataSummary(username);
            if (!summary) {
                console.warn('Could not load legacy data summary');
                return;
            }

            // Mark as prompted (for this session)
            sessionStorage.setItem(`migration_prompted_${username}`, 'true');

            // Show migration prompt
            this.ui.showMigrationPrompt(
                summary,
                () => this.performMigration(user.uid, username),
                () => this.skipMigration(username)
            );
        } catch (error) {
            console.error('Error in checkAndPromptMigration:', error);
        }
    }

    /**
     * Perform the actual migration
     * @param {string} uid - Firebase Auth UID
     * @param {string} username - Username
     */
    async performMigration(uid, username) {
        this.ui.showMigrationProgress();

        try {
            // 1. Get legacy data
            const legacyProfile = this.detector.getLegacyUserProfile(username);
            if (!legacyProfile) {
                throw new Error('Could not load legacy profile data');
            }

            // 2. Get current Firestore profile
            const firestoreProfile = await window.firestoreGetProfile(uid);
            if (!firestoreProfile) {
                throw new Error('Could not load Firestore profile');
            }

            // 3. Merge data (Firestore takes precedence for duplicates)
            const mergedProfile = this.mergeProfiles(firestoreProfile, legacyProfile);

            // 4. Save merged profile to Firestore
            const saveSuccess = await window.firestoreSetProfile(uid, mergedProfile);
            if (!saveSuccess) {
                throw new Error('Failed to save merged profile to Firestore');
            }

            // 5. Verify save by reading back
            const verifyProfile = await window.firestoreGetProfile(uid);
            if (!verifyProfile) {
                throw new Error('Migration verification failed');
            }

            // 6. Clean up localStorage
            this.detector.cleanupLegacyData(username);

            // 7. Mark migration as complete (in localStorage for persistence)
            localStorage.setItem(`migration_completed_${username}`, new Date().toISOString());

            // 8. Show success
            this.ui.showMigrationSuccess();

            console.log(`✅ Migration successful for ${username}`);

        } catch (error) {
            console.error('Migration failed:', error);
            this.ui.showMigrationError(
                error.message || 'Unknown error occurred',
                () => this.performMigration(uid, username)
            );
        }
    }

    /**
     * Merge legacy and Firestore profiles
     * Strategy: Firestore takes precedence, but add legacy items that don't exist in Firestore
     * @param {Object} firestoreProfile - Current Firestore profile
     * @param {Object} legacyProfile - Legacy localStorage profile
     * @returns {Object} - Merged profile
     */
    mergeProfiles(firestoreProfile, legacyProfile) {
        const merged = JSON.parse(JSON.stringify(firestoreProfile)); // Deep clone

        const legacyTanks = legacyProfile.profile?.tanks || [];
        const legacyFavorites = legacyProfile.profile?.favoriteSpecies || [];
        const legacyComparisons = legacyProfile.profile?.comparisonHistory || [];

        // Merge tanks (avoid duplicates by tank name or ID)
        const existingTankIds = new Set(merged.profile.tanks.map(t => t.id));
        const existingTankNames = new Set(merged.profile.tanks.map(t => t.name.toLowerCase()));

        for (const tank of legacyTanks) {
            if (!existingTankIds.has(tank.id) && !existingTankNames.has(tank.name.toLowerCase())) {
                merged.profile.tanks.push(tank);
            }
        }

        // Merge favorites (simple array union)
        const existingFavorites = new Set(merged.profile.favoriteSpecies);
        for (const species of legacyFavorites) {
            if (!existingFavorites.has(species)) {
                merged.profile.favoriteSpecies.push(species);
            }
        }

        // Merge comparisons (avoid duplicates by ID)
        const existingComparisonIds = new Set(merged.profile.comparisonHistory.map(c => c.id));
        for (const comparison of legacyComparisons) {
            if (!existingComparisonIds.has(comparison.id)) {
                merged.profile.comparisonHistory.push(comparison);
            }
        }

        return merged;
    }

    /**
     * User chose to skip migration (for now)
     * @param {string} username
     */
    skipMigration(username) {
        console.log(`User ${username} skipped migration`);
        // Set flag in localStorage to not prompt again for 7 days
        const skipUntil = new Date();
        skipUntil.setDate(skipUntil.getDate() + 7);
        localStorage.setItem(`migration_skip_until_${username}`, skipUntil.toISOString());
    }

    /**
     * Check if we should prompt for migration (respects skip period)
     * @param {string} username
     * @returns {boolean}
     */
    shouldPromptMigration(username) {
        // Check if user completed migration
        if (localStorage.getItem(`migration_completed_${username}`)) {
            return false;
        }

        // Check if user skipped and skip period hasn't expired
        const skipUntil = localStorage.getItem(`migration_skip_until_${username}`);
        if (skipUntil) {
            const skipDate = new Date(skipUntil);
            if (new Date() < skipDate) {
                return false; // Still in skip period
            }
        }

        return true;
    }
}

// Create singleton
const migrationService = new MigrationService();
