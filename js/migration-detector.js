// ============================================================================
// MIGRATION DETECTOR - Detect localStorage users needing migration
// ============================================================================

class MigrationDetector {
    constructor() {
        this.legacyUserKeys = [];
        this.currentUserKey = null;
    }

    /**
     * Scan localStorage for legacy user data
     * @returns {Object} { hasLegacyData: boolean, users: Array<string>, currentUser: string|null }
     */
    detectLegacyData() {
        const legacyUsers = [];
        let currentUser = null;

        try {
            // Scan for user_{username} patterns
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                // Match user_{username} pattern
                if (key && key.startsWith('user_')) {
                    const username = key.substring(5); // Remove "user_" prefix
                    legacyUsers.push(username);
                }

                // Check for currentUser
                if (key === 'currentUser') {
                    currentUser = localStorage.getItem('currentUser');
                }
            }
        } catch (e) {
            console.error('Error scanning localStorage:', e);
        }

        return {
            hasLegacyData: legacyUsers.length > 0,
            users: legacyUsers,
            currentUser: currentUser
        };
    }

    /**
     * Get legacy user profile from localStorage
     * @param {string} username
     * @returns {Object|null}
     */
    getLegacyUserProfile(username) {
        try {
            const userJson = localStorage.getItem(`user_${username}`);
            if (!userJson) return null;
            return JSON.parse(userJson);
        } catch (e) {
            console.error('Error parsing legacy user data:', e);
            return null;
        }
    }

    /**
     * Check if current logged-in user has legacy data
     * @param {string} username - Current Firestore username
     * @returns {boolean}
     */
    hasLegacyDataForUser(username) {
        return localStorage.getItem(`user_${username}`) !== null;
    }

    /**
     * Clean up legacy data after successful migration
     * @param {string} username
     */
    cleanupLegacyData(username) {
        try {
            localStorage.removeItem(`user_${username}`);
            localStorage.removeItem(`username_map_${username}`);
            localStorage.removeItem('currentUser');
            console.log(`✅ Cleaned up legacy data for ${username}`);
        } catch (e) {
            console.error('Error cleaning up legacy data:', e);
        }
    }

    /**
     * Get summary of legacy data for display
     * @param {string} username
     * @returns {Object|null}
     */
    getLegacyDataSummary(username) {
        const profile = this.getLegacyUserProfile(username);
        if (!profile) return null;

        const tanks = profile.profile?.tanks || [];
        const favorites = profile.profile?.favoriteSpecies || [];
        const comparisons = profile.profile?.comparisonHistory || [];

        return {
            username: username,
            tanksCount: tanks.length,
            favoritesCount: favorites.length,
            comparisonsCount: comparisons.length,
            created: profile.created || 'Unknown',
            hasTanks: tanks.length > 0,
            hasFavorites: favorites.length > 0,
            hasComparisons: comparisons.length > 0
        };
    }
}

// Create singleton
const migrationDetector = new MigrationDetector();
