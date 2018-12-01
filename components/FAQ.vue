<template>
	<v-layout>
		<div class="transparent-bg-main" id="right-content-scroll">
			<h1 class="header_title">{{$props.title}}</h1>
			<p><span lang="en-US"><strong>What is CSGOUltimate?</strong></span></p>
			<p><span lang="en-US">CSGOUltimate lets you assemble your own team of CSGO player cards in order to battle and wager against other players. You will create a squad of up to 6 cards (5 [action] cards + coach)</span></p>
			<p><span lang="en-US"><strong>How do I get coins? / How do I deposit VGO Skins?</strong></span></p>
			<p><span lang="en-US">In the prelaunch phase, you won&rsquo;t be able to make any deposits. Deposits and matches will open up on August 30</span><sup><span lang="en-US">th</span></sup><span lang="en-US">. </span></p>
			<p><span lang="en-US"><strong>Why do I need to use VGO Skins? / What is VGO?</strong></span></p>
			<p><span lang="en-US">7 day trade ban, in order to warrant instant withdrawals</span></p>
			<p><span lang="en-US">VGO Skins are traded and created using block-chain technology. We use them in order to circumvent the 7-day-tradeban that VALVe have implemented in their trading system. This allows you to instantly withdraw and deposit skins using our system. VGO Skins that you withdraw can then be used to trade with other players for CS:GO skins.</span></p>
			<p><span lang="en-US"><strong>How are Skin prices determined?</strong></span></p>
			<p><span lang="en-US">We calculate the prices for each skin using steamanalyst and the VGO database. If you find a skin with an incorrect pricetag, please report it to us using our help-button.</span></p>
			<p><span lang="en-US"><strong>How do I get player cards?</strong></span></p>
			<p><span lang="en-US">You can acquire player cards through numerous ways. The standard option is to open packs. There are four different pack options from the get-go: Bronze-, Silver-, Gold- and Superpacks. Except for the Supers, which contain 20 items, each pack will contain 10 cards. The packs will contain at least 1, 3, 5 or 10 Gold items respectively.</span></p>
			<p><span lang="en-US">Another option to receive cards is to trade with other players or buy them from the marketplace. A small percentage of the buying price will go to CSGOUltimate as a marketing fee.</span></p>
			<p><span lang="en-US"><strong>How many player cards do I need to fight?</strong></span></p>
			<p><span lang="en-US">The minimum amount of player cards needed to start a battle is x.</span></p>
			<p><span lang="en-US"><strong>How many player cards can I use in one match?</strong></span></p>
			<p><span lang="en-US">The maximum number of usable cards per match is 6. This setup must consist of 5 action cards (player cards, role cards etc.) and a coach card, which is optional. Using more cards will increase your chances of winning.</span></p>
			<p><span lang="en-US"><strong>How can I fight? How can I fight against a friend?</strong></span></p>
			<p><span lang="en-US">You can start a match by choosing a challenge from the match list or playing in a tournament. The higher the rating of your opponent, the higher your potential earnings in the matchup. In order to match against a friend, look them up in the Player Search function and give them a direct challenge.</span></p>
			<p><span lang="en-US"><strong>How do tournaments work?</strong></span></p>
			<p><span lang="en-US">Explain tournament tree and seeding and principle, e.g. Swiss system vs single elimination vs double elimination etc.</span></p>
			<p><span lang="en-US">In order to join a tournament, click the tab &ldquo;Tournaments&rdquo; and select the tournament you want to participate in. You will be shown your potential winnings, should you win the tournament. Some tournaments require an entry fee. All tournaments will use a single elimination knock-out system, meaning that each player who is defeated once is out of the tournament. In the beginning, each player will be randomly seeded into a starting position and be matched against a random opponent.</span></p>
			<p><span lang="en-US"><strong>How is a winner picked?</strong></span></p>
			<p><span lang="en-US">Explain algorithm behind the scenes slightly</span></p>
			<p><span lang="en-US">Winning matches is random. You increase your chances of the random generator picking you as the winner by having better cards and having cards that exhibit a strength against the cards your opponent picked. For example, an AWP booster card will perform well against a Pistol Booster card, but poorly against a Flashbang Push card. It&rsquo;s a rock-paper-scissors system. Choose your cards wisely!</span></p>
			<p><span lang="en-US">Keep in mind that no matter how high your chances of winning are, there is always a possibility of losing the match and vice versa.</span></p>
			<p><span lang="en-US"><strong>Are the battles fair?</strong></span></p>
			<p><span lang="en-US">Yes and no. Players with equally rated cards will have a 50/50 chance of winning, but players with better cards will stand a much better chance in the fight.</span></p>
			<p><span lang="en-US"><strong>How much can I win? [Explain odds making and relation to possible winnings]</strong></span></p>
			<p><span lang="en-US">Your winnings are always related to the odds you have when entering the battle. If your team is absolutely hopeless against that of your opponent, but you still manage to be victorious, your earnings will be much higher than if you win a fair 50/50 matchup.</span></p>
			<p><span lang="en-US"><strong>What kinds of cards are there?</strong></span></p>
			<p><span lang="en-US">There&rsquo;s eight different card styles.</span></p>
			<ol>
			<li>
				<p><span lang="en-US">Player cards</span></p>
				<p>These are the backbone of each lineup. The player cards will set your base values for the encounter.</p>
			</li>
			<li>
				<p><span lang="en-US">Coach cards</span></p>
				<p><span lang="en-US">These are the cards which the 6</span><sup><span lang="en-US">th</span></sup><span lang="en-US"> slot is reserved for. Coaches can improve team performance and give further boosts to the battle abilities of your lineup.</span></p>
			</li>
			<li>
				<p><span lang="en-US">Role changer cards</span></p>
				<p><span lang="en-US">These cards can change the role of one or more of your players and give them an edge should a role change be required to counter an opponent&rsquo;s card.</span></p>
			</li>
			<li>
				<p><span lang="en-US">Role booster cards</span></p>
				<p><span lang="en-US">Role boosters will give your role ratings a significant boost.</span></p>
			</li>
			<li>
				<p><span lang="en-US">Map changer cards</span></p>
				<p><span lang="en-US">Can change the map in favor for your team.</span></p>
			</li>
			<li>
				<p><span lang="en-US">Map booster cards</span></p>
				<p><span lang="en-US">Will improve your team&rsquo;s performance on the given map.</span></p>
			</li>
			<li>
				<p><span lang="en-US">Fitness cards</span></p>
				<p><span lang="en-US">Increases the player&rsquo;s fitness rating.</span></p>
			</li>
			<li>
				<p><span lang="en-US">Special player cards</span></p>
				<p><span lang="en-US">Adds special players to your lineup with unique strengths and weaknesses.</span></p>
			</li>
			</ol>
			<p lang="en-US"><br /></p>
			<p><span lang="en-US"><strong>Is every card equally likely to defeat another card? / How does the weakness/strength system work?</strong></span></p>
			<p><span lang="en-US">No. Some cards are a strong counter for other cards, while others perform really poorly in given circumstances. Try to predict your opponent&rsquo;s picks and choose your lineup wisely!</span></p>
			<p><span lang="en-US"><strong>How do I win? [As in: How do I increase my chance to win etc] / How does battling work?</strong></span></p>
			<p><span lang="en-US">Much like the above.</span></p>
			<p lang="en-US"><br /></p>
			<p><span lang="en-US"><strong>Can I trade/sell cards? OR How can I trade/sell cards?</strong></span></p>
			<p><span lang="en-US">You can use the market place to sell your cards directly to other players for a small fee, or trade them directly for other cards if you wish. Visit the marketplace and have a look!</span></p>
			<p><span lang="en-US"><strong>What&rsquo;s an affiliate?</strong></span></p>
			<p><span lang="en-US">Explain affiliate codes and rewards.</span></p>
			<p><span lang="en-US"><strong>How do I refer users?</strong></span></p>
			<p><span lang="en-US">In the referral section, you will find a profile-specific link that you can send your friends when they want to sign up. Using the link, they will receive 50 coins. For every 100 coins they bet, you get 1 coin in return!</span></p>
			<p><span lang="en-US"><strong>How much do I get per referral?</strong></span></p>
			<p><span lang="en-US">Above</span></p>
			<p><span lang="en-US"><strong>How does the lucky wheel work?</strong></span></p>
			<p><span lang="en-US">Explain free spins, possible rewards, cost of a spin etc</span></p>
			<p><span lang="en-US"><strong>How do I make a team?</strong></span></p>
			<p><span lang="en-US">Refer to website feature that lets you assemble your team. E.g. &ldquo;Your team&rdquo; tab on website etc..</span></p>
			<p><span lang="en-US"><strong>How do I withdraw my winnings?</strong></span></p>
			<p><span lang="en-US">Explain withdrawal system</span></p>
			<p><span lang="en-US">Click on &ldquo;withdraw&rdquo; in order to see a collection of skins that you can withdraw for coins. You can sort them by price, or search for specific skins that you want. Select all skins that you want to withdraw, then click &ldquo;Check out&rdquo; and follow the instructions.</span></p>
			<p><span lang="en-US"><strong>How do I get a free spin?</strong></span></p>
			<p><span lang="en-US">Are there even free spins? Just an idea.</span></p>
			<p><span lang="en-US"><strong>Can I get sponsored by this site? / Can I promote this site?</strong></span></p>
			<p><span lang="en-US">We offer paid promotions to Youtubers and Social media personalities with big audiences. </span></p>
			<p><span lang="en-US">Requirements: At least 100000 subscribers, at least 25000 views per month.</span></p>
			<p lang="en-US"><br /></p>
			<p><span lang="en-US"><strong>What if I&rsquo;m addicted?</strong></span></p>
			<p><span lang="en-US">Might make the site a tad more professional if you include links to online gambling addiction help for ethical reasons.</span></p>
			<p><span lang="en-US"><strong>How do transfers work?</strong></span></p>
			<p><a name="_GoBack"></a> <span lang="en-US">Transfer pot system etc</span></p>
			<p><span lang="en-US"><strong>What&rsquo;s instant buy-back?</strong></span></p>
			<p><span lang="en-US">At CSGOUltimate we offer you the option to instantly sell us your cards via the instant buy-back option. This will guarantee you direct payout of coins without any long waiting times.</span></p>
			<p><span lang="en-US"><strong>How much of the selling price of my cards do I get?</strong></span></p>
			<p><span lang="en-US">The market place fee is currently 5% of your selling price, meaning you will receive 95% of the coins.</span></p>
		</div>
	</v-layout>
</template>
<script>
	export default{
	  name: 'FAQ',
	  props: {
	    title: {
	      type: String,
	      default: 'FAQ'
	    },
	    up_date: {
	      type: String,
	      default: 'August 30, 2030'
	    }
	  },
	}
</script>