enchant();

window.onload = function() {
    var game = new Game(poipoi.gameSize.width, poipoi.gameSize.height);
    game.preload(
        poipoi.imgPaths['EggGo']
        , poipoi.imgPaths['EggGoJump']
        , poipoi.imgPaths['EggBack']
        , poipoi.imgPaths['EggBackJump']
        , poipoi.imgPaths['EggSunny']
        , poipoi.imgPaths['EggRainy']
        , poipoi.imgPaths['EggFunc1']
        , poipoi.imgPaths['EggFunc2']
        , poipoi.imgPaths['MarkFunc1']
        , poipoi.imgPaths['MarkFunc2']
        , poipoi.imgPaths['start']
        , poipoi.imgPaths['poipoi_board_back']
        , poipoi.imgPaths['home_button']
        , poipoi.imgPaths['egg_bg']
        , poipoi.imgPaths['egg_bg_func']
        , poipoi.imgPaths['earth_tile']
        , poipoi.imgPaths['program_white_board']
        , poipoi.imgPaths['player_clear']
        , poipoi.imgPaths['player_false']
        , poipoi.imgPaths['player_walk']
        , poipoi.imgPaths['enemy']
        , poipoi.imgPaths['clear']
        , poipoi.imgPaths['not_clear']
        , poipoi.imgPaths['goal']
        , poipoi.imgPaths['tutorial_back']
        , poipoi.imgPaths['finger']
        , poipoi.imgPaths['borderHorizon']
        , poipoi.imgPaths['borderVertical']
        , poipoi.imgPaths['cloud']
        , poipoi.imgPaths['raindrop1']
        , poipoi.imgPaths['raindrop2']
        , poipoi.imgPaths['sun']
        , poipoi.imgPaths['flower']
        , poipoi.imgPaths['ground']
        , poipoi.imgPaths['next']
        , poipoi.imgPaths['result']
        , poipoi.imgPaths['tamago']
        , poipoi.imgPaths['star']
        , poipoi.imgPaths['weed']
        , poipoi.imgPaths['end_board']
        , poipoi.imgPaths['player_end']

        , poipoi.mapPaths['map1-1_sunny']
        , poipoi.mapPaths['map1-2_sunny']
        , poipoi.mapPaths['map1-2_rainy']
        , poipoi.mapPaths['map1-3_sunny']
    );

    game.onload = function() {
        game.frame = poipoi.FRAME_RATE;
        game.rootScene.backgroundColor = poipoi.SKY_BLUE;
        var user = User.init();
        user.set('currentStageIndex', 1);

        var titleScene = TitleScene.init();
        game.pushScene(titleScene);
    };


    //game.start();
    game.debug();
};
