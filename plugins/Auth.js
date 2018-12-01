/**
* @uses: Auth module API's Request mapping
*
*/
// Get the Auth Token
export const getAuthToken = () => {
	let userToken = localStorage.getItem('authToken')
	return 'Bearer '.concat( userToken )
}
