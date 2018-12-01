const common = {
	cardSortOrder(a) {
		let attr = '';
		switch(a){
			case a.overallScore:
				attr = a.overallScore
			break;
			case a.additionAmount:
				attr = a.additionAmount
			break;
			case a.boostPct:
				attr = a.boostPct
			break;
			default:
				attr = a.overallScore
		}
		return attr;
	},
	myFunction2 () {
	    // Do something
	}
}

export default common