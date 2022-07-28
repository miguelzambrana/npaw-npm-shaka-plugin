console.log('Hello')

var youbora = require('youboralib')
require('youbora-adapter-shaka')

window.youbora = youbora

function initPlayer() 
{
    // Install polyfills.
    shaka.polyfill.installAll();

    // Find the video element.
    var video = document.getElementById('video1');

    // Construct a Player to wrap around it.
    var player = new shaka.Player(video);

    // Attach the player to the window so that it can be easily debugged.
    window.player = player;

    /* Dash */
    var source = 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd';

    // init plugin
    if (typeof youbora != "undefined" &&
    typeof youbora.adapters.Shaka != "undefined") {
    youbora.Log.logLevel = youbora.Log.Level.DEBUG
    window.plugin = new youbora.Plugin({
        'accountCode': 'powerdev',
        'parse.CDNNode': true,
        'content.title': 'Title vod dash',
        'content.transactionCode': "transactionTest",
    })

    plugin.setAdapter(new youbora.adapters.Shaka(player))
    }

    // Load the source into the Player.
    player.load(source).catch(function(error) {
        plugin.getAdapter().errorListener(error);
        plugin.disable();
    });
}

document.addEventListener('DOMContentLoaded', initPlayer);