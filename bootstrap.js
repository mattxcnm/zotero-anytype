'use strict';

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import('resource://gre/modules/Services.jsm');

// Window listener - handles plugin initialization for each Zotero window
var WindowListener = {
    onOpenWindow: function(xulWindow) {
        var window = xulWindow.QueryInterface(Ci.nsIInterfaceRequestor)
                              .getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
        
        window.addEventListener('load', function() {
            window.removeEventListener('load', arguments.callee, false);
            if (window.location.href === 'chrome://zotero/content/standalone/standalone.xul' ||
                window.location.href === 'chrome://zotero/content/tab.xul') {
                initZoteroPlugin(window);
            }
        }, false);
    },
    
    onCloseWindow: function(xulWindow) {},
    onWindowTitleChange: function(xulWindow, newTitle) {}
};

// Initializes the plugin
function initZoteroPlugin(window) {
    // Wait for Zotero to be fully initialized
    window.setTimeout(function() {
        if (!window.Zotero) {
            window.setTimeout(arguments.callee, 100);
            return;
        }
        
        // Load the main.js script from our chrome URL
        let loader = window.Zotero.loadScript;
        if (loader) {
            loader("chrome://anytype/content/scripts/main.js");
            window.Zotero.debug("Anytype plugin loaded");
        }
    }, 500);
}

// Bootstrap functions
function startup(data, reason) {
    var wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
    var windows = wm.getEnumerator("navigator:browser");
    
    // Initialize for already open windows
    while (windows.hasMoreElements()) {
        var window = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
        initZoteroPlugin(window);
    }
    
    // Listen for new windows
    wm.addListener(WindowListener);
}

function shutdown(data, reason) {
    var wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
    wm.removeListener(WindowListener);
    
    // Cleanup for all windows
    var windows = wm.getEnumerator("navigator:browser");
    while (windows.hasMoreElements()) {
        var window = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
        if (window.Zotero && window.Zotero.AnytypeManager) {
            window.Zotero.AnytypeManager.cleanup();
            delete window.Zotero.AnytypeManager;
        }
    }
}

function install(data, reason) {}
function uninstall(data, reason) {}
