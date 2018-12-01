import * as axios from 'axios'

let options = { 
		// baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api/`
		// ,
		// headers: {
		// 	'Authorization': 'Bearer ' 
		// }
	}
export default axios.create(options)
