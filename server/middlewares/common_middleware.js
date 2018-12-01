const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');

global.globalVariables={
    'reward_points': 200,
    'reward_coins': 1000,
    'reward_packs': 1,
    'referalBy_points': 200,
    'referalTo_points': 400,
};
global.notificationMessages = {
    'sucess_code': 'Success! You added {X} coins to your account!',
    'error_code1': 'Error. Incorrect code',
    'error_code2': 'Error. Code has reached maximum number of uses', 
    'saved_mail': 'Success! Your email has been connected to your account',
    'ask_save_email': 'Important! Please attach an email to your csgoultimate account. Click here',

    /*Steam Users*/
    'email_update': 'Email updated successfully',
    'try_again': 'Please try again after sometime!!',
    'user_banned': 'You banned  by admin.',
    'maintenance_mode': 'Site is in maintenance mode.',
    'created_user': 'Congratulations! You have been awarded '+globalVariables.reward_coins+' coins for signing up with us!',
    'reward_point': 'Awesome! You have been rewarded '+globalVariables.reward_points+' for your steam username',
    'reward_pack': 'Awesome! You have been rewarded with '+globalVariables.reward_packs+' x Pack',
    'referBy_user': 'Awesome! You have been awarded with '+globalVariables.reward_points+' points',
    'referTo_user': 'Congratulations! You have been awarded with '+globalVariables.referal_points+' points',
    'referBy_history': 'Referal url successfully used, added '+globalVariables.referalBy_points+' points to your account',
    'referTo_history': 'You got '+globalVariables.referalTo_points+' points for first time login.',

    'steam_name_reward': 'Steam name reward - Pack added to your account',
    'coupon_code_history': 'Coupon code activated {X} {amount} added to your account',
    'coupon_code': 'Coupon redeemed and applied successfully.',

    'quicksell': 'Success. You sold an item for {X} coins',
    'quicksell_history': 'you sold A {X}',
    'successful_referal': 'Success! Your ref url was used and you were rewarded with '+globalVariables.reward_points+' points!',
    'market_sell': 'Success! You sold an item on the market for {X}',
    'market_buy': 'Success! You bought an item on the market',
    'market_buy_history': 'Success! You bought an item on the market',
    'market_listing': 'Success! You listed an item on the market!',
    //'market_listing': 'Success! You listed an item on the market Check it here!',
    'market_remove': 'Success! You Remove an item from the market',

    'deposit': 'Success! You desposited {X} (coins/points)',
    'not_working': 'Sorry. This action is currently not available',
    'bought_pack': 'Success. You bought X packs. You can find your packs under my packs page here',
    /* Master Packs */
    'no_money': 'Error. Insufficient funds',
    'No_packs_available': 'No packs available',
    'No_masterpack_available': 'No masterPack found',
    'No_user_found': 'No user found',
    'buy_pack': 'You bought {X} pack on the market.',
    /*My Packs */
    'pack_already_opened': 'Pack already opened',
    'pack_opened': 'Opened a pack',
    'No_mypacks_available': 'You have no packs available, you can buy more {{here}}',

    'delete_history': 'Success! Notification Removed',



};
module.exports = function (req, res, next) {
    return next();
};