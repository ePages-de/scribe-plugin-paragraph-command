(function () {
    'use strict';

    var scribePluginParagraphCommand = function () {
        return function (scribe) {
            var tag = '<p>';
            var nodeName = 'P';
            var commandName = 'p';
            var paragraphCommand = new scribe.api.Command('formatBlock');

            paragraphCommand.execute = function () {
                scribe.api.Command.prototype.execute.call(this, tag);
            };

            paragraphCommand.queryState = function () {
                var selection = new scribe.api.Selection();
                return selection.getContaining(function (node) {
                    return node.nodeName === nodeName;
                });
            };

            paragraphCommand.queryEnabled = function () {
                var selection = new scribe.api.Selection();
                var listNode = selection.getContaining(function (node) {
                    return node.nodeName === 'OL' || node.nodeName === 'UL';
                });

                return scribe.api.Command.prototype.queryEnabled.apply(this, arguments) && scribe.allowsBlockElements() && !listNode;
            };

            scribe.commands[commandName] = paragraphCommand;
        };
    };

    // Module system magic dance
    if (typeof module !== 'undefined' && typeof module.exports === 'object') {
        module.exports = scribePluginParagraphCommand;
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(function () {
            return scribePluginParagraphCommand;
        });
    } else {
        window.scribePluginParagraphCommand = scribePluginParagraphCommand;
    }
}());
