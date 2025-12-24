// ============================================================================
// MIGRATION UI - Modal and progress display
// ============================================================================

class MigrationUI {
    constructor() {
        this.modal = null;
    }

    /**
     * Show migration prompt modal
     * @param {Object} summary - Data summary from migrationDetector
     * @param {Function} onMigrate - Callback when user clicks Migrate
     * @param {Function} onSkip - Callback when user clicks Skip
     */
    showMigrationPrompt(summary, onMigrate, onSkip) {
        // Create modal HTML
        const modalHTML = `
            <div class="migration-modal-overlay" id="migration-modal">
                <div class="migration-modal">
                    <h2>🔄 Migrate Your Data to Cloud Storage</h2>
                    <p>We've detected local data in your browser. Would you like to migrate it to secure cloud storage?</p>

                    <div class="migration-data-summary">
                        <h3>What will be migrated:</h3>
                        <div class="migration-data-item">
                            <span>🏠 Tanks</span>
                            <strong>${summary.tanksCount}</strong>
                        </div>
                        <div class="migration-data-item">
                            <span>⭐ Favorite Species</span>
                            <strong>${summary.favoritesCount}</strong>
                        </div>
                        <div class="migration-data-item">
                            <span>📊 Comparison History</span>
                            <strong>${summary.comparisonsCount}</strong>
                        </div>
                    </div>

                    <p><strong>Benefits:</strong></p>
                    <ul>
                        <li>✅ Access your data from any device</li>
                        <li>✅ Automatic cloud backup</li>
                        <li>✅ Never lose your tank plans</li>
                    </ul>

                    <div class="migration-buttons">
                        <button class="btn-migrate" id="btn-migrate">Migrate Now</button>
                        <button class="btn-skip" id="btn-skip">Skip for Now</button>
                    </div>

                    <p style="font-size: 0.85rem; color: #999; margin-top: 1rem;">
                        Your local data will be safely preserved until migration completes.
                    </p>
                </div>
            </div>
        `;

        // Append to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('migration-modal');

        // Attach event listeners
        document.getElementById('btn-migrate').onclick = () => {
            this.closeModal();
            onMigrate();
        };

        document.getElementById('btn-skip').onclick = () => {
            this.closeModal();
            onSkip();
        };
    }

    /**
     * Show migration progress
     */
    showMigrationProgress() {
        if (this.modal) this.closeModal();

        const progressHTML = `
            <div class="migration-modal-overlay" id="migration-progress">
                <div class="migration-modal">
                    <h2>🔄 Migrating Your Data...</h2>
                    <p>Please wait while we transfer your data to cloud storage.</p>
                    <div style="text-align: center; padding: 2rem;">
                        <div class="spinner"></div>
                        <p style="margin-top: 1rem; color: #666;">This should only take a few seconds.</p>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', progressHTML);
        this.modal = document.getElementById('migration-progress');
    }

    /**
     * Show migration success
     */
    showMigrationSuccess() {
        if (this.modal) this.closeModal();

        const successHTML = `
            <div class="migration-modal-overlay" id="migration-success">
                <div class="migration-modal">
                    <h2>✅ Migration Complete!</h2>
                    <p>Your data has been successfully migrated to cloud storage.</p>
                    <p>You can now access your tanks, favorites, and comparisons from any device.</p>
                    <div class="migration-buttons">
                        <button class="btn-migrate" id="btn-continue">Continue to Dashboard</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', successHTML);
        this.modal = document.getElementById('migration-success');

        document.getElementById('btn-continue').onclick = () => {
            this.closeModal();
            window.location.reload();
        };
    }

    /**
     * Show migration error
     * @param {string} errorMessage
     * @param {Function} onRetry - Callback for retry button
     */
    showMigrationError(errorMessage, onRetry) {
        if (this.modal) this.closeModal();

        const errorHTML = `
            <div class="migration-modal-overlay" id="migration-error">
                <div class="migration-modal">
                    <h2>❌ Migration Failed</h2>
                    <p>We encountered an error while migrating your data:</p>
                    <div style="background: #ffebee; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
                        <code>${errorMessage}</code>
                    </div>
                    <p><strong>Don't worry!</strong> Your local data is safe and unchanged.</p>
                    <div class="migration-buttons">
                        <button class="btn-migrate" id="btn-retry">Try Again</button>
                        <button class="btn-skip" id="btn-close">Close</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', errorHTML);
        this.modal = document.getElementById('migration-error');

        document.getElementById('btn-retry').onclick = () => {
            this.closeModal();
            if (onRetry) onRetry();
        };

        document.getElementById('btn-close').onclick = () => {
            this.closeModal();
        };
    }

    /**
     * Close and remove modal
     */
    closeModal() {
        if (this.modal) {
            this.modal.remove();
            this.modal = null;
        }
    }
}

// Create singleton
const migrationUI = new MigrationUI();
