if (!Zotero.AnytypeManager) {
    
    /**
     * Anytype integration manager
     */
    Zotero.AnytypeManager = {
        /**
         * Initialize the Anytype plugin
         */
        init: function() {
            // Register event listeners
            this._registerEventListeners();
            
            // Add UI elements
            this._initUI();
            
            Zotero.debug("Zotero Anytype: Plugin initialized");
        },
        
        /**
         * Register required event listeners
         */
        _registerEventListeners: function() {
            // Example: Listen for item changes
            var notifierID = Zotero.Notifier.registerObserver(this.notifierCallback, ['item']);
            
            // Keep track of this so we can unregister it during shutdown
            this._notifierID = notifierID;
        },
        
        /**
         * Notifier callback for Zotero events
         */
        notifierCallback: {
            notify: function(event, type, ids, extraData) {
                if (event === 'add' && type === 'item') {
                    Zotero.debug("Zotero Anytype: New items added - " + ids.join(', '));
                    // Handle new items being added to Zotero
                }
            }
        },
        
        /**
         * Initialize plugin UI components
         */
        _initUI: function() {
            // Add menu items, toolbar buttons, etc.
            let doc = window.document;
            
            // Example: Add a menu item to the Tools menu
            let toolsMenu = doc.getElementById('menu_ToolsPopup');
            if (toolsMenu) {
                let menuItem = doc.createElement('menuitem');
                menuItem.id = 'zotero-anytype-menu';
                menuItem.setAttribute('label', 'Export to Anytype');
                menuItem.addEventListener('command', function() {
                    Zotero.AnytypeManager.exportToAnytype();
                });
                toolsMenu.appendChild(menuItem);
            }
        },
        
        /**
         * Export selected items to Anytype
         */
        exportToAnytype: function() {
            // Get selected items
            var items = Zotero.getActiveZoteroPane().getSelectedItems();
            if (!items.length) {
                alert('Please select at least one item to export.');
                return;
            }
            
            // Process items and export to Anytype
            Zotero.debug("Zotero Anytype: Exporting " + items.length + " items");
            
            // Implementation for exporting to Anytype would go here
            alert('Exported ' + items.length + ' items to Anytype (placeholder).');
        },
        
        /**
         * Clean up when the plugin is unloaded
         */
        cleanup: function() {
            // Unregister notifier
            if (this._notifierID) {
                Zotero.Notifier.unregisterObserver(this._notifierID);
            }
            
            // Remove UI elements
            let doc = window.document;
            let menuItem = doc.getElementById('zotero-anytype-menu');
            if (menuItem) menuItem.remove();
            
            Zotero.debug("Zotero Anytype: Plugin cleaned up");
        }
    };
    
    // Initialize the plugin
    Zotero.AnytypeManager.init();
}
