export default function ({ store, redirect, error }) {
  if (!store.state.authUser) {
	store.dispatch('showInfoDialog', {
		show: true,
		title: 'Authorization Error!',
		content: 'You are not authorized to view this page, Please login first!'
	})
    return redirect('/')
  }
}
